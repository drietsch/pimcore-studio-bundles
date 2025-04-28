import React, { useEffect, useRef } from 'react'
import { Toolbar, Button } from '@pimcore/studio-ui-bundle/components'

const slides: Slide[] = [
  { type: 'iframe', src: 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev/inspire/cloud.html' },
  { type: 'video', src: 'deck-ceae4e/76fa06c01d79b0123a3686c2e3bb9e38.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/Ad5Bzg3B/02_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/640e8c71296cff29895c8776a86d8b00.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/11a7e114ae3b5c8b10523d487d52fa59.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/SMoay1nU/04_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/8440e3c6e95e6b9dc418d80ce9ac7a70.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/zzfWOWQs/05_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/5435ea173160e911aee945f8dfa1c168.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/qgOXwoFe/06_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/562b1fbb9e454b95d7c56b0ec3bc8654.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/K_5vRjOc/07_thumb_00001.jpg' },
  { type: 'iframe', src: 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev/inspire/cloud.html' },
  { type: 'video', src: 'deck-ceae4e/04a43177fbea514c87f313229910c8bf.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/VSRqEyU7/09_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/96f0a510f0ee928566fa76932468b40f.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/PZD-DvNc/10_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/271e115394e0db67b5754d4b03a3cdc5.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/SPYmemkQ/11_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/114b0ac6acf316d1dbb7457fb157f074.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/7q-WilTy/0417__1__thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/1c94ab24c6c119dd9c9bd7029bac035f.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/WDK3nQJC/14_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/34ff4dc8dd8becdb3953f3c533ef49e8.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/E0GJbjOE/15_thumb_00001.jpg' },
  { type: 'video', src: 'deck-ceae4e/7f88348f58dcc388e9e826e6ca308ac4.mp4', thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/R_8SOhBV/16_thumb_00001.jpg' },
  { type: 'iframe', src: 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-80.app.github.dev/inspire/cloud.html' }
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

const Inspire = () => {
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
        slide_count: 15,
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
            hash: false,
            controls: true,
            progress: true,
            showNotes: false,
            slideNumber: false,
            fragmentInURL: false,
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
                      data-lazy-loaded=""
                      data-preload="false"
                      data-src={ slide.src + '?' + crypto.getRandomValues(new Uint32Array(4)).join('-') }
                      data-x-frame-status="blocked"
                      height="100%"
                      sandbox="allow-forms allow-scripts allow-popups allow-same-origin allow-pointer-lock allow-presentation"
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

export default Inspire
