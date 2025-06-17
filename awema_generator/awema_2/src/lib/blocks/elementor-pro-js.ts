// JavaScript Ultra-Moderne avec animations GSAP niveau Elementor Pro
export class ElementorProJS {
  
  static generateModernJS(): string {
    return `
/* ===== ELEMENTOR PRO JAVASCRIPT ULTRA-MODERNE ===== */

class ElementorProApp {
  constructor() {
    this.init()
    this.initAnimations()
    this.initNavigation()
    this.initScrollEffects()
    this.initParallax()
    this.initLazyLoading()
    this.initPerformanceOptimizations()
  }

  init() {
    // Attendre que GSAP soit chargé
    if (typeof gsap !== 'undefined') {
      this.gsap = gsap
      this.ScrollTrigger = ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
    }
    
    // Configuration globale
    this.isScrolling = false
    this.lastScrollY = 0
    this.navbar = document.querySelector('.elementor-nav')
    this.navToggle = document.querySelector('.nav-toggle')
    this.navMenu = document.querySelector('.nav-menu')
    
    console.log('🚀 ElementorPro App initialized')
  }

  // ===== ANIMATIONS GSAP ULTRA-AVANCÉES =====
  initAnimations() {
    if (!this.gsap) return
    
    // Timeline maître pour la page
    this.masterTL = gsap.timeline()
    
    // Animation du loader
    this.animateLoader()
    
    // Animations d'entrée
    this.animateOnLoad()
    
    // Animations au scroll
    this.animateOnScroll()
    
    // Animations hover avancées
    this.initHoverAnimations()
    
    // Animations de typing
    this.initTypingAnimations()
    
    // Morphing SVG
    this.initSVGMorphing()
  }

  animateLoader() {
    if (!document.querySelector('.page-loader')) return
    
    const loader = document.querySelector('.page-loader')
    const loaderText = document.querySelector('.loader-text')
    
    const loaderTL = gsap.timeline()
    
    loaderTL
      .to(loaderText, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(loaderText, {
        scale: 1.1,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut"
      })
      .to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          loader.style.display = 'none'
          document.body.classList.remove('loading')
        }
      })
  }

  animateOnLoad() {
    // Hero animation complexe
    const heroTL = gsap.timeline({ delay: 0.5 })
    
    heroTL
      .from('.hero-text h1', {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out"
      })
      .from('.hero-text .subtitle', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8")
      .from('.hero-text .description', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6")
      .from('.hero-button', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .from('.hero-image', {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        duration: 1.2,
        ease: "power2.out"
      }, "-=1.0")
    
    // Navigation slide down
    gsap.from('.elementor-nav', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    })
  }

  animateOnScroll() {
    // Animation des sections au scroll
    gsap.utils.toArray('.gsap-fade-in').forEach((element, i) => {
      gsap.fromTo(element, {
        opacity: 0,
        y: 100
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Animation des cartes services
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 80,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: i * 0.1
      })
    })

    // Compteurs animés
    gsap.utils.toArray('.counter').forEach(counter => {
      const endValue = parseInt(counter.dataset.count)
      
      gsap.fromTo(counter, {
        innerHTML: 0
      }, {
        innerHTML: endValue,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      })
    })

    // Barres de progression
    gsap.utils.toArray('.progress-bar').forEach(bar => {
      const progress = bar.dataset.progress
      
      gsap.fromTo(bar.querySelector('.progress-fill'), {
        width: "0%"
      }, {
        width: progress + "%",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      })
    })
  }

  initHoverAnimations() {
    // Animation des boutons avancée
    gsap.utils.toArray('.hero-button, .service-cta, .nav-button').forEach(button => {
      const tl = gsap.timeline({ paused: true })
      
      tl.to(button, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: "power2.out"
      })
      
      button.addEventListener('mouseenter', () => tl.play())
      button.addEventListener('mouseleave', () => tl.reverse())
    })

    // Animation des cartes services
    gsap.utils.toArray('.service-card').forEach(card => {
      const icon = card.querySelector('.service-icon')
      const tl = gsap.timeline({ paused: true })
      
      tl
        .to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(icon, {
          rotation: 360,
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out"
        }, 0)
      
      card.addEventListener('mouseenter', () => tl.play())
      card.addEventListener('mouseleave', () => tl.reverse())
    })

    // Effet magnétique sur les éléments
    gsap.utils.toArray('.magnetic').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(element, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        })
      })
    })
  }

  initTypingAnimations() {
    // Animation de typing pour les titres
    gsap.utils.toArray('.typing-effect').forEach(element => {
      const text = element.textContent
      element.textContent = ''
      
      const chars = text.split('')
      const span = chars.map(char => \`<span>\${char === ' ' ? '&nbsp;' : char}</span>\`).join('')
      element.innerHTML = span
      
      gsap.fromTo(element.querySelectorAll('span'), {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      })
    })
  }

  initSVGMorphing() {
    // Morphing des icônes SVG
    if (typeof MorphSVGPlugin !== 'undefined') {
      gsap.registerPlugin(MorphSVGPlugin)
      
      gsap.utils.toArray('.morph-icon').forEach(icon => {
        const paths = icon.querySelectorAll('path')
        if (paths.length >= 2) {
          const tl = gsap.timeline({ paused: true })
          
          tl.to(paths[0], {
            morphSVG: paths[1],
            duration: 0.5,
            ease: "power2.inOut"
          })
          
          icon.addEventListener('mouseenter', () => tl.play())
          icon.addEventListener('mouseleave', () => tl.reverse())
        }
      })
    }
  }

  // ===== NAVIGATION ULTRA-MODERNE =====
  initNavigation() {
    // Toggle mobile menu
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => {
        this.toggleMobileMenu()
      })
    }

    // Scroll navbar
    this.initScrollNavbar()
    
    // Mega menu animations
    this.initMegaMenuAnimations()
    
    // Smooth scrolling
    this.initSmoothScrolling()
    
    // Active link highlighting
    this.initActiveLinkHighlighting()
  }

  toggleMobileMenu() {
    const isActive = this.navMenu.classList.contains('active')
    
    if (isActive) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  openMobileMenu() {
    this.navMenu.classList.add('active')
    this.navToggle.classList.add('active')
    document.body.style.overflow = 'hidden'
    
    // Animation d'ouverture
    if (this.gsap) {
      gsap.fromTo('.nav-list .nav-item', {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out"
      })
    }
  }

  closeMobileMenu() {
    this.navMenu.classList.remove('active')
    this.navToggle.classList.remove('active')
    document.body.style.overflow = ''
  }

  initScrollNavbar() {
    let lastScrollY = 0
    let ticking = false
    
    const updateNavbar = () => {
      const scrollY = window.scrollY
      
      if (scrollY > 100) {
        this.navbar.classList.add('scrolled')
      } else {
        this.navbar.classList.remove('scrolled')
      }
      
      // Hide/show navbar on scroll
      if (scrollY > lastScrollY && scrollY > 200) {
        // Scrolling down
        gsap.to(this.navbar, {
          y: -100,
          duration: 0.3,
          ease: "power2.out"
        })
      } else {
        // Scrolling up
        gsap.to(this.navbar, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      lastScrollY = scrollY
      ticking = false
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar)
        ticking = true
      }
    })
  }

  initMegaMenuAnimations() {
    gsap.utils.toArray('.nav-dropdown').forEach(dropdown => {
      const megaMenu = dropdown.querySelector('.mega-menu')
      if (!megaMenu) return
      
      const tl = gsap.timeline({ paused: true })
      
      tl
        .fromTo(megaMenu, {
          opacity: 0,
          y: 20,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .fromTo(megaMenu.querySelectorAll('.mega-menu-link'), {
          opacity: 0,
          y: 10
        }, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out"
        }, "-=0.2")
      
      dropdown.addEventListener('mouseenter', () => tl.play())
      dropdown.addEventListener('mouseleave', () => tl.reverse())
    })
  }

  initSmoothScrolling() {
    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute('href'))
        
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: target,
              offsetY: 100
            },
            ease: "power2.inOut"
          })
        }
      })
    })
  }

  initActiveLinkHighlighting() {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')
    
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeLink = document.querySelector(\`.nav-link[href="#\${entry.target.id}"]\`)
          
          navLinks.forEach(link => link.classList.remove('active'))
          if (activeLink) {
            activeLink.classList.add('active')
          }
        }
      })
    }, observerOptions)
    
    sections.forEach(section => observer.observe(section))
  }

  // ===== EFFETS DE SCROLL AVANCÉS =====
  initScrollEffects() {
    // Parallax multiple layers
    this.initParallaxLayers()
    
    // Reveal animations
    this.initRevealAnimations()
    
    // Progress bar de lecture
    this.initReadingProgress()
    
    // Scroll-triggered animations
    this.initScrollTriggeredAnimations()
  }

  initParallaxLayers() {
    gsap.utils.toArray('.parallax-layer').forEach(layer => {
      const speed = layer.dataset.speed || 0.5
      
      gsap.to(layer, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: layer,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })
  }

  initRevealAnimations() {
    gsap.utils.toArray('.reveal-animation').forEach(element => {
      gsap.fromTo(element, {
        clipPath: "inset(100% 0 0 0)"
      }, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })
  }

  initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress')
    if (!progressBar) return
    
    gsap.to(progressBar, {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    })
  }

  initScrollTriggeredAnimations() {
    // Animation en cascade
    gsap.utils.toArray('.cascade-animation').forEach((container, i) => {
      const elements = container.querySelectorAll('.cascade-item')
      
      gsap.fromTo(elements, {
        opacity: 0,
        y: 100,
        rotation: 5
      }, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })
  }

  // ===== PARALLAX AVANCÉ =====
  initParallax() {
    // Parallax du hero
    const heroVideo = document.querySelector('.hero-video')
    if (heroVideo) {
      gsap.to(heroVideo, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: '.hero-advanced',
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
    }

    // Parallax des éléments flottants
    gsap.utils.toArray('.floating-element').forEach((element, i) => {
      gsap.to(element, {
        y: \`\${-100 * (i + 1)}px\`,
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })
  }

  // ===== LAZY LOADING OPTIMISÉ =====
  initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          
          // Animation de fade in
          gsap.fromTo(img, {
            opacity: 0,
            scale: 1.1
          }, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          })
          
          observer.unobserve(img)
        }
      })
    })
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }

  // ===== OPTIMISATIONS PERFORMANCE ULTRA-AVANCÉES =====
  initPerformanceOptimizations() {
    // Debounce scroll events avec RequestAnimationFrame
    this.debounce = (func, wait) => {
      let timeout, rafId
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(() => func(...args))
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }

    // Throttle optimisé avec RAF
    this.throttle = (func, limit) => {
      let inThrottle, rafId
      return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(() => func.apply(context, args))
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }

    // Optimisation des animations sur resize avec conteneur queries
    const resizeObserver = new ResizeObserver(entries => {
      this.throttle(() => {
        ScrollTrigger.refresh()
        this.updateViewportOptimizations()
      }, 250)()
    })
    resizeObserver.observe(document.body)

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        gsap.globalTimeline.pause()
        this.pauseHeavyAnimations()
      } else {
        gsap.globalTimeline.resume()
        this.resumeHeavyAnimations()
      }
    })

    // Intersection Observer pour optimiser les animations
    this.initIntersectionOptimizations()
    
    // Critical resource preloading
    this.preloadCriticalResources()
    
    // Performance monitoring
    this.initPerformanceMonitoring()
    
    // Memory management
    this.initMemoryManagement()
  }

  initIntersectionOptimizations() {
    // Observer pour les animations coûteuses
    const heavyAnimationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport')
          this.enableAnimations(entry.target)
        } else {
          entry.target.classList.remove('in-viewport')
          this.disableAnimations(entry.target)
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    })

    // Observer tous les éléments avec animations lourdes
    document.querySelectorAll('.parallax-layer, .floating-element, .morph-icon').forEach(el => {
      heavyAnimationObserver.observe(el)
    })
  }

  pauseHeavyAnimations() {
    // Pause animations parallax et particules
    gsap.set('.parallax-layer, .floating-element', { willChange: 'auto' })
    gsap.killTweensOf('.parallax-layer, .floating-element')
  }

  resumeHeavyAnimations() {
    // Reprendre animations uniquement pour éléments visibles
    document.querySelectorAll('.parallax-layer.in-viewport, .floating-element.in-viewport').forEach(el => {
      gsap.set(el, { willChange: 'transform' })
    })
  }

  enableAnimations(element) {
    gsap.set(element, { willChange: 'transform' })
  }

  disableAnimations(element) {
    gsap.set(element, { willChange: 'auto' })
    gsap.killTweensOf(element)
  }

  updateViewportOptimizations() {
    // Adapter les animations selon la taille de viewport
    const isMobile = window.innerWidth < 768
    const isLowPowerMode = navigator.hardwareConcurrency < 4

    if (isMobile || isLowPowerMode) {
      // Réduire la complexité des animations
      gsap.config({ force3D: false, autoSleep: 60 })
      ScrollTrigger.config({ limitCallbacks: true })
    } else {
      // Activer toutes les optimisations
      gsap.config({ force3D: true, autoSleep: 120 })
    }
  }

  initPerformanceMonitoring() {
    // Monitor FPS
    let lastTime = 0
    let frames = 0
    
    const measureFPS = (currentTime) => {
      frames++
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime))
        
        // Ajuster animations selon FPS
        if (fps < 30) {
          this.reducedMotionMode()
        } else if (fps > 50) {
          this.fullMotionMode()
        }
        
        frames = 0
        lastTime = currentTime
      }
      requestAnimationFrame(measureFPS)
    }
    requestAnimationFrame(measureFPS)

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory
        const usedMemory = memory.usedJSHeapSize / 1048576 // MB
        
        if (usedMemory > 50) { // Si > 50MB
          this.enableMemorySaving()
        }
      }, 30000) // Check every 30s
    }
  }

  reducedMotionMode() {
    // Réduire animations pour maintenir performances
    gsap.config({ autoSleep: 30 })
    ScrollTrigger.config({ limitCallbacks: true })
    document.documentElement.style.setProperty('--animation-duration', '0.2s')
  }

  fullMotionMode() {
    // Mode animations complètes
    gsap.config({ autoSleep: 120 })
    document.documentElement.style.setProperty('--animation-duration', '0.5s')
  }

  enableMemorySaving() {
    // Nettoyer les animations inactives
    gsap.killTweensOf('.not-in-viewport')
    
    // Réduire la qualité des effets
    document.querySelectorAll('.hero-video').forEach(video => {
      if (video.paused) {
        video.poster = video.getAttribute('data-poster-low') || video.poster
      }
    })
  }

  initMemoryManagement() {
    // Garbage collection pour GSAP
    setInterval(() => {
      // Kill tweens sur éléments invisibles
      gsap.killTweensOf(document.querySelectorAll('.elementor-section:not(.in-viewport)'))
      
      // Clear ScrollTrigger instances hors viewport
      ScrollTrigger.getAll().forEach(trigger => {
        if (!trigger.trigger.classList.contains('in-viewport')) {
          trigger.kill()
        }
      })
    }, 60000) // Every minute

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      gsap.killTweensOf('*')
      ScrollTrigger.killAll()
    })
  }

  preloadCriticalResources() {
    const criticalImages = [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=1080&fit=crop'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }

  // ===== UTILITAIRES =====
  
  // Fonction pour déclencher une animation custom
  triggerAnimation(selector, animation) {
    const elements = document.querySelectorAll(selector)
    
    if (animation === 'bounce') {
      gsap.to(elements, {
        y: -20,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    } else if (animation === 'shake') {
      gsap.to(elements, {
        x: -10,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 5
      })
    } else if (animation === 'pulse') {
      gsap.to(elements, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    }
  }

  // Scroll vers un élément avec animation custom
  scrollToElement(selector, offset = 100, duration = 1.5) {
    const target = document.querySelector(selector)
    if (target) {
      gsap.to(window, {
        duration: duration,
        scrollTo: {
          y: target,
          offsetY: offset
        },
        ease: "power2.inOut"
      })
    }
  }

  // Créer une timeline personnalisée
  createCustomTimeline(animations) {
    const tl = gsap.timeline()
    
    animations.forEach(anim => {
      tl.to(anim.target, anim.props, anim.position || "+=0")
    })
    
    return tl
  }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Attendre que GSAP soit chargé
  const initApp = () => {
    if (typeof gsap !== 'undefined') {
      window.elementorProApp = new ElementorProApp()
    } else {
      // Retry in 100ms if GSAP not loaded yet
      setTimeout(initApp, 100)
    }
  }
  
  initApp()
})

// ===== API PUBLIQUE =====
window.ElementorPro = {
  triggerAnimation: (selector, animation) => {
    if (window.elementorProApp) {
      window.elementorProApp.triggerAnimation(selector, animation)
    }
  },
  
  scrollTo: (selector, offset, duration) => {
    if (window.elementorProApp) {
      window.elementorProApp.scrollToElement(selector, offset, duration)
    }
  },
  
  createTimeline: (animations) => {
    if (window.elementorProApp) {
      return window.elementorProApp.createCustomTimeline(animations)
    }
  }
}

// ===== HELPERS GLOBAUX =====
window.addEventListener('load', () => {
  // Remove loading class
  document.body.classList.remove('loading')
  
  // Trigger loaded event
  window.dispatchEvent(new CustomEvent('elementorProLoaded'))
})
`
  }
}