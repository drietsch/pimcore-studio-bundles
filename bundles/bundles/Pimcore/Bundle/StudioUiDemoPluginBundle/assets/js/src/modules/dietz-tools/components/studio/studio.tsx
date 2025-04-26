import React, { useEffect, useRef } from 'react'
import { Toolbar, Button } from '@pimcore/studio-ui-bundle/components'

const slides: Slide[] = [
  { type: 'video', src: 'deck-620304/e71d5f55b0fd0add20f72c4f6adf9d66.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/Ad5Bzg3B/02_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/users.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/partners.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/devs.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/37eb09e3ce250860f6599ae474f2c40d.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/gui.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/2d7fdddd06a6c64d7fa0b048363c6022.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/zzfWOWQs/05_thumb_00001.jpg' },
  { type: 'video', src: 'deck-620304/97ced5ebb47a4d7b7b76c5793b09f4e2.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/qgOXwoFe/06_thumb_00001.jpg' }
]

const loadScript = async (src) =>
  await new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })

const loadCSS = (href) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

const Studio = () => {
  const revealRef = useRef()

  const enterFullscreen = () => {
    const el = revealRef.current
    if (el && document.fullscreenEnabled) {
      el.requestFullscreen()
    }
  }

  useEffect(() => {
    window.SLConfig = {
      deck: {
        id: 3383345,
        slug: 'deck-ceae4e',
        title: 'Inspire Keynore 2025',
        width: 1920,
        height: 1080,
        margin: 0.0,
        visibility: 'self',
        slide_count: 5,
        transition: 'slide',
        background_transition: 'slide',
        version: 2,
        language: 'en',
        notes: {}
      },
      fonts_url: 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/fonts/'
    }

    loadCSS('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/offline-v2.css')
    loadCSS('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal.css')

    const loadReveal = async () => {
      try {
        if (window.Reveal) {
          Reveal.destroy()
          await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal.js')
          await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal-plugins.js')
          await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/offline.js')
        }
        if (!window.Reveal) {
          await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal.js')
          await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal-plugins.js')
          await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/offline.js')
        }

        requestAnimationFrame(() => {
          window.Reveal.initialize({
            width: 1920,
            height: 1080,
            margin: 0.0,
            hash: true,
            controls: true,
            progress: true,
            showNotes: false,
            slideNumber: false,
            fragmentInURL: true,
            autoSlide: 0,
            autoSlideStoppable: true,
            center: false,
            shuffle: false,
            loop: false,
            rtl: false,
            navigationMode: 'default',
            transition: 'slide',
            backgroundTransition: 'slide',
            highlight: { escapeHTML: false },
            plugins: [
              window.RevealZoom,
              window.RevealNotes,
              window.RevealMarkdown,
              window.RevealHighlight
            ]
          })
        })
      } catch (err) {
        console.error('Reveal.js failed to load:', err)
      }
    }

    loadReveal()
  }, [])

  return (
    <div>
      <div>
        <Toolbar>
          <Button
            onClick={ enterFullscreen }
            style={ {
              padding: '6px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#fff'
            } }
          >
            Full Screen
          </Button>
        </Toolbar>
      </div>
      <div style={ { height: 'calc(100vh - 100px)', width: '100%' } }>
        <div
          className="reveal"
          ref={ revealRef }
        >

          <div className="slides">
            {slides.map((slide, index) => {
              if (slide.type === 'iframe') {
                return (
                  <section key={ index }>
                    <iframe
                      allow="fullscreen; autoplay; accelerometer; geolocation; gyroscope; camera; encrypted-media; microphone; midi"
                      height="100%"
                      sandbox="allow-forms allow-scripts allow-popups allow-same-origin allow-pointer-lock allow-presentation"
                      src={ slide.src }
                      style={ { border: 'none' } }
                      width="100%"
                    />
                  </section>
                )
              } else if (slide.type === 'video') {
                return (
                  <section
                    data-background-video={
                    'https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/' + slide.src
                  }
                    data-background-video-loop="true"
                    data-background-video-thumb={ slide.thumb }
                    key={ index }
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Studio
