import React, { useEffect, useRef, useState } from 'react'
import CreativeEditorSDK from '@cesdk/cesdk-js'
import { Droppable, Toolbar, Button } from '@pimcore/studio-ui-bundle/components'
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
  const [isUploading, setIsUploading] = useState(false)

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
      engine.addDefaultAssetSources()

      const scene = engine.scene.create()
      const page = engine.block.create('page')
      engine.block.appendChild(scene, page)

      engine.asset.addSource({
        id: 'pimcore',
        async findAssets () {
          return { assets: [], total: 0, currentPage: 0 }
        },
        async applyAsset (asset) {
          return engine.asset.defaultApplyAsset(asset)
        },
        async applyAssetToBlock (asset, block) {
          return engine.asset.defaultApplyAssetToBlock(asset, block)
        },
        async addAsset (asset) {
          return asset
        }
      })
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
    const assetUrl = 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev/' + asset.fullPath
    const thumbUrl = asset.imageThumbnailPath || asset.fullPath

    try {
      await engine.asset.addAssetToSource('pimcore', {
        id: assetId,
        label: asset.filename,
        meta: {
          uri: assetUrl,
          thumbUri: thumbUrl,
          mimeType: asset.mimeType,
          width: asset.width,
          height: asset.height,
          blockType: '//ly.img.ubq/image'
        },
        context: {
          sourceId: 'pimcore'
        }
      })

      await engine.asset.apply('pimcore', {
        id: assetId,
        label: asset.filename,
        meta: {
          uri: assetUrl,
          thumbUri: thumbUrl,
          mimeType: asset.mimeType,
          width: asset.width,
          height: asset.height
        },
        context: {
          sourceId: 'pimcore'
        }
      })

      engine.asset.assetSourceContentsChanged('pimcore')
    } catch (err) {
      console.error('[CE.SDK Drop] Error inserting asset:', err)
    }
  }

  const handleSaveToPimcore = async () => {
    if (!cesdkInstance) return

    try {
      setIsUploading(true)

      const archive = await cesdkInstance.engine.scene.saveToArchive()
      const file = new File([archive], 'scene.ce.scene', {
        type: 'application/zip'
      })

      const formData = new FormData()
      formData.append('file', file)

      const parentId = 1 // Replace with your actual Pimcore folder ID
      const response = await fetch(
        `/pimcore-studio/api/assets/add/${parentId}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json'
          },
          body: formData
        }
      )

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`${response.status}: ${text}`)
      }

      const result = await response.json()
      console.log('[✅ Scene uploaded]', result)
      alert(`Scene saved to Pimcore asset ID ${result.id}`)
    } catch (err) {
      console.error('[❌ Failed to upload]', err)
      alert('Upload failed. Check console for details.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Droppable
      isValidContext={ info => info.type === 'asset' }
      isValidData={ info => info.type === 'asset' }
      onDrop={ handleStudioDrop }
      style={ { width: '100%', height: '100%' } }
      variant="outline"
    >
      <div style={ { width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' } }>
        <Toolbar>
          <Button
            disabled={ isUploading }
            onClick={ handleSaveToPimcore }
          >
            {isUploading ? 'Saving...' : 'Save Scene'}
          </Button>
        </Toolbar>
        <div
          ref={ containerRef }
          style={ { width: '100%', height: '100%', display: 'flex', flexGrow: 1 } }
        />
      </div>
    </Droppable>
  )
}

export default CreativeEditor
