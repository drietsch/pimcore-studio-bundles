import React, { useEffect, useRef, useState } from 'react'
import CreativeEditorSDK from '@cesdk/cesdk-js'
import './styles.css'

const config = {
  license: 'yhikTVeBiYBEHCibwv8bvH6V_Oe0XMnX7czfXSr2Asj3sCvz-hiiSwR0US5LeA3M',
  userId: 'guides-user',
  callbacks: {
    onUpload: 'local' // Enables local uploads in the asset library
  }
}

const CreativeEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cesdkInstance, setCesdkInstance] = useState<any>(null)

  useEffect(() => {
    // Override CESDK UI styling
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

      await Promise.all([
        instance.addDefaultAssetSources(),
        instance.addDemoAssetSources({ sceneMode: 'Design' })
      ])

      await instance.createDesignScene()
    })

    return () => {
      isUnmounted = true
      instance?.dispose()
      setCesdkInstance(null)
    }
  }, [])

  return (
    <div
      ref={ containerRef }
      style={ { width: '100%', height: '100%' } }
    />
  )
}

export default CreativeEditor
