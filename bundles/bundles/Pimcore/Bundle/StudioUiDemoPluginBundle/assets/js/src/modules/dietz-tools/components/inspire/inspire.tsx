import React, { useEffect, useRef } from 'react'

const slides = [
  {
    type: 'iframe',
    src: 'http://www.google.at'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/76fa06c01d79b0123a3686c2e3bb9e38.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/Ad5Bzg3B/02_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/640e8c71296cff29895c8776a86d8b00.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/mDDx_z7s/03_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/11a7e114ae3b5c8b10523d487d52fa59.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/SMoay1nU/04_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/8440e3c6e95e6b9dc418d80ce9ac7a70.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/zzfWOWQs/05_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/5435ea173160e911aee945f8dfa1c168.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/qgOXwoFe/06_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/562b1fbb9e454b95d7c56b0ec3bc8654.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/K_5vRjOc/07_thumb_00001.jpg'
  },
  {
    type: 'iframe',
    src: 'https://www.google.com'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/04a43177fbea514c87f313229910c8bf.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/VSRqEyU7/09_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/96f0a510f0ee928566fa76932468b40f.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/PZD-DvNc/10_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/271e115394e0db67b5754d4b03a3cdc5.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/SPYmemkQ/11_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/1c94ab24c6c119dd9c9bd7029bac035f.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/WDK3nQJC/14_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/34ff4dc8dd8becdb3953f3c533ef49e8.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/E0GJbjOE/15_thumb_00001.jpg'
  },
  {
    type: 'video',
    src: 'deck-ceae4e/7f88348f58dcc388e9e826e6ca308ac4.mp4',
    thumb: 'https://s3.amazonaws.com/media-p.slid.es/videos/2799794/R_8SOhBV/16_thumb_00001.jpg'
  },
  {
    type: 'iframe',
    src: 'https://www.google.com'
  }
]

const loadScript = async (src) =>
  await new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
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

  useEffect(() => {
    // Set SLConfig BEFORE loading offline.js
    window.SLConfig = {
      deck: {
        id: 3383345,
        slug: 'deck-ceae4e',
        title: 'Inspire Keynore 2025',
        description: '',
        width: 1920,
        height: 1080,
        margin: 0.0,
        visibility: 'self',
        published_at: null,
        sanitize_messages: null,
        thumbnail_url:
          'https://s3.amazonaws.com/media-p.slid.es/thumbnails/cb868bba63d79637d575ac697d7dc15d/thumb.jpg?1744874014',
        view_count: 0,
        user: {
          id: 2799794,
          username: 'dietz',
          name: null,
          description: null,
          thumbnail_url:
            'https://www.gravatar.com/avatar/2221ad40e3803b0c766ba693be84f745?s=140&d=https%3A%2F%2Fstatic.slid.es%2Fimages%2Fdefault-profile-picture.png',
          account_type: 'pro',
          team_id: null,
          settings: {
            id: 57412996,
            present_controls: true,
            present_upsizing: true,
            present_pointer: true,
            present_notes: true,
            default_deck_tag_id: null
          }
        },
        background_transition: 'slide',
        transition: 'slide',
        theme_id: null,
        theme_font: 'montserrat',
        theme_color: 'white-blue',
        auto_slide_interval: 0,
        comments_enabled: false,
        forking_enabled: false,
        rolling_links: false,
        center: false,
        shuffle: false,
        should_loop: false,
        share_notes: false,
        slide_number: false,
        slide_count: 15,
        rtl: false,
        version: 2,
        collaborative: null,
        deck_user_editor_limit: 3,
        data_updated_at: 1744874349387,
        font_typekit: null,
        font_google: null,
        time_limit: null,
        navigation_mode: 'default',
        upsizing_enabled: true,
        language: 'en',
        notes: {}
      },
      fonts_url: 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/fonts/'
    }

    // Load CSS
    loadCSS('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/offline-v2.css')
    loadCSS('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal.css')

    const loadReveal = async () => {
      if (!window.Reveal) {
        await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal.js')
        await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/reveal-plugins.js')
        await loadScript('https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/lib/offline.js')
      }

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
    }

    loadReveal()
  }, [])

  return (
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
                data-background-video={ 'https://literate-space-palm-tree-x5wwpr4xpcvx7g-3030.app.github.dev/inspire/' + slide.src }
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
  )
}

export default Inspire
