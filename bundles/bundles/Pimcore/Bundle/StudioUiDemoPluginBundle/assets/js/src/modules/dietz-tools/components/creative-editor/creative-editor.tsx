import React, { useEffect, useRef, useState } from 'react'
import CreativeEditorSDK from '@cesdk/cesdk-js'
import {
  Droppable,
  Toolbar,
  Button,
  Select,
  useFormModal
} from '@pimcore/studio-ui-bundle/components'
import './styles.css'

const config = {
  license: 'yhikTVeBiYBEHCibwv8bvH6V_Oe0XMnX7czfXSr2Asj3sCvz-hiiSwR0US5LeA3M',
  userId: 'guides-user',
  role: 'Creator',
  callbacks: {
    onUpload: 'local'
  }
}

// Convert ArrayBuffer to data URI
function arrayBufferToDataUri (buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '')
  const base64 = btoa(binary)
  return `data:application/zip;base64,${base64}`
}

const CreativeEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cesdkInstance, setCesdkInstance] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [scenes, setScenes] = useState<any[]>([])
  const [selectedScene, setSelectedScene] = useState<string | undefined>()

  const formModal = useFormModal()

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

    CreativeEditorSDK.create(containerRef.current, config).then(async (_instance) => {
      if (isUnmounted) {
        _instance.dispose()
        return
      }

      setCesdkInstance(_instance)

      const engine = _instance.engine
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
          return await engine.asset.defaultApplyAsset(asset)
        },
        async applyAssetToBlock (asset, block) {
          await engine.asset.defaultApplyAssetToBlock(asset, block)
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

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const res = await fetch(
          '/pimcore-studio/api/assets/tree?page=1&pageSize=100&idSearchTerm=*&excludeFolders=false&path=/scenes&pathIncludeParent=true&pathIncludeDescendants=true',
          { headers: { accept: 'application/json' } }
        )
        const result = await res.json()

        const files = result.items?.filter((item: any) =>
          item.type === 'archive' && item.filename?.endsWith('.scene')
        )

        setScenes(files || [])
      } catch (err) {
        console.error('[❌ Failed to fetch scenes]', err)
      }
    }

    fetchScenes()
  }, [])

  const handleSceneSelect = async (sceneId: string) => {
    if (!cesdkInstance || !sceneId) return
    const engine = cesdkInstance.engine

    try {
      const url = `https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev/pimcore-studio/api/assets/${sceneId}/download`

      await engine.scene.loadFromArchiveURL(url)

      setSelectedScene(sceneId)
      console.log('[✅ Scene loaded]', sceneId)
    } catch (err) {
      console.error('[❌ Failed to load scene]', err)
      alert('Failed to load scene. See console for details.')
    }
  }

  const handleStudioDrop = async (info: any) => {
    if (!cesdkInstance) return
    const engine = cesdkInstance.engine

    if (info.type === 'asset') {
      const asset = info.data
      const isImage = asset.mimeType?.startsWith('image/') || asset.type === 'image'
      if (!asset?.fullPath || !isImage) return

      const assetId = `pimcore:${asset.id}`
      const assetUrl = 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev' + asset.fullPath

      try {
        await engine.asset.addAssetToSource('pimcore', {
          id: assetId,
          label: asset.filename,
          meta: {
            uri: assetUrl,
            thumbUri: asset.imageThumbnailPath || assetUrl,
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
            thumbUri: asset.imageThumbnailPath || assetUrl,
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

    if (info.type === 'data-object') {
      const droppedObject = info.data
      if (!droppedObject?.id) return

      try {
        const res = await fetch(`/pimcore-studio/api/data-objects/${droppedObject.id}`, {
          headers: { accept: 'application/json' }
        })

        const { objectData } = await res.json()

        engine.variable.setString('name', 'Name')
        engine.variable.setString('desc', 'Description')

        const variables = engine.variable.findAll()
        for (const key in variables) {
          const value = objectData[variables[key]]
          if (value !== undefined && value !== null) {
            engine.variable.setString(variables[key], String(value))
          }
        }
      } catch (err) {
        console.error('[❌ Failed to fetch data object]', err)
      }
    }
  }

  const handleSaveAs = () => {
    formModal.input({
      title: 'Save Scene As',
      label: 'Scene name',
      rule: { required: true, message: 'Please enter a scene name' },
      onOk: async (name) => {
        try {
          setIsUploading(true)

          const archive = await cesdkInstance.engine.scene.saveToArchive()
          const file = new File([archive], `${name}.scene`, {
            type: 'application/zip'
          })

          const formData = new FormData()
          formData.append('file', file)

          const parentId = 27 // /scenes
          const response = await fetch(`/pimcore-studio/api/assets/add/${parentId}`, {
            method: 'POST',
            headers: { accept: 'application/json' },
            body: formData
          })

          if (!response.ok) {
            const text = await response.text()
            throw new Error(`${response.status}: ${text}`)
          }

          const result = await response.json()
          console.log('[✅ Scene saved]', result)
          setSelectedScene(result.id.toString())
          setScenes(prev => [...prev, result])
        } catch (err) {
          console.error('[❌ Upload error]', err)
          alert('Upload failed. See console for details.')
        } finally {
          setIsUploading(false)
        }
      }
    })
  }

  const handleSave = async () => {
    if (!cesdkInstance || !selectedScene) {
      alert('Please select a scene to overwrite.')
      return
    }

    try {
      setIsUploading(true)

      const archive = await cesdkInstance.engine.scene.saveToArchive()
      const file = new File([archive], 'scene.scene', {
        type: 'application/zip'
      })

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`/pimcore-studio/api/assets/${selectedScene}/replace`, {
        method: 'POST',
        headers: {
          // Do not set Content-Type — browser will handle multipart boundaries
          accept: 'application/json'
        },
        body: formData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log('[✅ Scene binary replaced]', result)
      alert('Scene successfully overwritten!')
    } catch (err) {
      console.error('[❌ Failed to overwrite scene]', err)
      alert('Failed to save. Check console for details.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Droppable
      isValidContext={ info => info.type === 'asset' || info.type === 'data-object' }
      isValidData={ info => info.type === 'asset' || info.type === 'data-object' }
      onDrop={ handleStudioDrop }
      style={ { width: '100%', height: '100%' } }
      variant="outline"
    >
      <div style={ { width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' } }>
        <Toolbar>
          <div style={ { display: 'flex', gap: '0.5rem', alignItems: 'center' } }>
            <Select
              onChange={ (value) => {
                setSelectedScene(value?.toString() ?? undefined)
              } }
              options={ scenes.map(scene => ({
                label: scene.filename,
                value: scene.id.toString()
              })) }
              placeholder="Open Scene"
              value={ selectedScene }
            />
            <Button onClick={ async () => await (selectedScene && handleSceneSelect(selectedScene)) }>
              Load
            </Button>
            <Button
              disabled={ !selectedScene || isUploading }
              onClick={ handleSave }
            >
              💾 Save
            </Button>
            <Button
              disabled={ isUploading }
              onClick={ handleSaveAs }
            >
              Save As…
            </Button>
          </div>
        </Toolbar>
        <div
          ref={ containerRef }
          style={ { width: '100%', height: '100%', flexGrow: 1 } }
        />
      </div>
    </Droppable>
  )
}

export default CreativeEditor
