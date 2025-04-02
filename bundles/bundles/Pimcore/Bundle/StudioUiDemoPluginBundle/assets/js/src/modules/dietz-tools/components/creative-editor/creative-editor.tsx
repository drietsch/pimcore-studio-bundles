import React, { useEffect, useRef, useState } from 'react'
import CreativeEditorSDK from '@cesdk/cesdk-js'
import { Droppable } from '@pimcore/studio-ui-bundle/components'
import './styles.css'

const config = {
  license: 'yhikTVeBiYBEHCibwv8bvH6V_Oe0XMnX7czfXSr2Asj3sCvz-hiiSwR0US5LeA3M',
  userId: 'guides-user',
  callbacks: {
    onUpload: 'local'
  }
}

const CreativeEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cesdkInstance, setCesdkInstance] = useState<any>(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      :root {
        --ubq-color-primary: #531dab;
        --ubq-color-primary-dark: #391085;
        --ubq-typography-font_family: 'Lato', sans-serif;
        --ubq-typography-button-m-font_family: 'Lato', sans-serif;
      }
    `
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    let isUnmounted = false
    let instance: any

    CreativeEditorSDK.create(containerRef.current, config).then(async (_instance) => {
      if (isUnmounted) {
        _instance.dispose()
        return
      }

      instance = _instance
      setCesdkInstance(instance)

      const engine = instance.engine

      // ✅ Create initial empty scene and page
      const scene = engine.scene.create()
      const page = engine.block.create('page')
      engine.block.appendChild(scene, page)

      // ✅ Define a writable asset source for Pimcore assets
      const pimcoreSource = {
        id: 'pimcore',
        async findAssets () {
          return {
            assets: [],
            total: 0,
            currentPage: 0
          }
        },
        async applyAsset (asset) {
          return engine.asset.defaultApplyAsset(asset)
        },
        async applyAssetToBlock (asset, block) {
          return engine.asset.defaultApplyAssetToBlock(asset, block)
        },
        async addAsset (asset) {
          // We’ll just return it directly; this enables addAssetToSource()
          return asset
        }
      }

      engine.asset.addSource(pimcoreSource)

      console.log('[CE.SDK] Initialized with scene and Pimcore asset source.')
    })

    return () => {
      isUnmounted = true
      cesdkInstance?.dispose()
      setCesdkInstance(null)
    }
  }, [])

  const handleStudioDrop = async (info: any) => {
    if (info.type !== 'asset') return
    const asset = info.data

    const isImage = asset.mimeType?.startsWith('image/') || asset.type === 'image'
    if (!asset?.fullPath || !isImage) {
      console.warn('[CE.SDK Drop] Not an image:', asset)
      return
    }

    const engine = cesdkInstance.engine
    const assetId = `pimcore:${asset.id}`
    const assetUrl = 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev' + asset.fullPath
    const thumbUrl = asset.imageThumbnailPath || asset.fullPath

    try {
      await engine.asset.addAssetToSource('pimcore', {
        id: assetId,
        label: asset.filename || 'Pimcore Asset',
        meta: {
          uri: assetUrl,
          thumbUri: thumbUrl,
          mimeType: asset.mimeType,
          width: asset.width || 512,
          height: asset.height || 512,
          blockType: '//ly.img.ubq/image'
        },
        context: {
          sourceId: 'pimcore'
        }
      })

      const scene = engine.scene.get()
      const page = engine.block.getChildren(scene)[0]

      const insertedBlockId = await engine.asset.apply('pimcore', {
        id: assetId,
        label: asset.filename,
        meta: {
          uri: assetUrl,
          thumbUri: thumbUrl,
          mimeType: asset.mimeType,
          width: asset.width || 512,
          height: asset.height || 512
        },
        context: {
          sourceId: 'pimcore'
        }
      })

      engine.asset.assetSourceContentsChanged('pimcore')

      console.log('[CE.SDK Drop] Inserted Pimcore image:', asset.filename)
    } catch (err) {
      console.error('[CE.SDK Drop] Error inserting asset:', err)
    }
  }

  return (
    <Droppable
      isValidContext={ (info) => info.type === 'asset' }
      isValidData={ (info) => info.type === 'asset' }
      onDrop={ handleStudioDrop }
      style={ { width: '100%', height: '100%' } }
      variant="outline"
    >
      <div
        ref={ containerRef }
        style={ { width: '100%', height: '100%' } }
      />
    </Droppable>
  )
}

export default CreativeEditor
