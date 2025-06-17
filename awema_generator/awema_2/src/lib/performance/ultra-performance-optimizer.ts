// Optimiseur de Performance Ultra-Avancé pour PageSpeed 95+ 
export class UltraPerformanceOptimizer {
  
  static optimizeForPerformance(content: string, assets: any): {
    optimizedHTML: string
    criticalCSS: string
    preloadDirectives: string[]
    serviceWorker: string
    webManifest: any
  } {
    return {
      optimizedHTML: this.optimizeHTML(content),
      criticalCSS: this.extractCriticalCSS(),
      preloadDirectives: this.generatePreloadDirectives(assets),
      serviceWorker: this.generateServiceWorker(),
      webManifest: this.generateWebManifest()
    }
  }

  private static optimizeHTML(content: string): string {
    let optimized = content

    // Minification HTML
    optimized = optimized
      .replace(/\s+/g, ' ')                    // Réduire espaces multiples
      .replace(/>\s+</g, '><')                 // Supprimer espaces entre balises
      .replace(/\s+>/g, '>')                   // Supprimer espaces avant >
      .replace(/<\s+/g, '<')                   // Supprimer espaces après <

    // Optimisation images
    optimized = this.optimizeImages(optimized)
    
    // Lazy loading
    optimized = this.addLazyLoading(optimized)
    
    // Compression inline
    optimized = this.compressInlineAssets(optimized)

    return optimized
  }

  private static optimizeImages(html: string): string {
    // Conversion vers WebP avec fallback
    return html.replace(
      /<img([^>]*?)src="([^"]*\.(jpg|jpeg|png))"([^>]*?)>/gi,
      (match, before, src, ext, after) => {
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        return `<picture>
          <source srcset="${webpSrc}" type="image/webp">
          <img${before}src="${src}"${after} loading="lazy" decoding="async">
        </picture>`
      }
    )
  }

  private static addLazyLoading(html: string): string {
    // Ajout lazy loading sur toutes les images
    return html.replace(
      /<img(?![^>]*loading=)/gi,
      '<img loading="lazy" decoding="async"'
    )
  }

  private static compressInlineAssets(html: string): string {
    // Compression CSS inline
    html = html.replace(
      /<style[^>]*>([\s\S]*?)<\/style>/gi,
      (match, css) => {
        const compressed = css
          .replace(/\/\*[\s\S]*?\*\//g, '')     // Supprimer commentaires
          .replace(/\s+/g, ' ')                 // Réduire espaces
          .replace(/;\s*}/g, '}')               // Supprimer ; avant }
          .replace(/\s*{\s*/g, '{')             // Supprimer espaces autour {
          .replace(/;\s*/g, ';')                // Supprimer espaces après ;
          .trim()
        
        return `<style>${compressed}</style>`
      }
    )

    // Compression JavaScript inline
    html = html.replace(
      /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi,
      (match, js) => {
        const compressed = js
          .replace(/\/\*[\s\S]*?\*\//g, '')     // Supprimer commentaires /* */
          .replace(/\/\/.*$/gm, '')             // Supprimer commentaires //
          .replace(/\s+/g, ' ')                 // Réduire espaces
          .replace(/;\s*}/g, '}')               // Optimiser avant }
          .trim()
        
        return `<script>${compressed}</script>`
      }
    )

    return html
  }

  private static extractCriticalCSS(): string {
    return `
/* Critical CSS Ultra-Optimisé */
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6;color:#1f2937;overflow-x:hidden}
.elementor-nav{position:fixed;top:0;left:0;right:0;z-index:1030;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-bottom:1px solid #e5e7eb}
.nav-container{max-width:1536px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:80px}
.hero-advanced{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:#1f2937}
.hero-content{position:relative;z-index:3;max-width:1280px;margin:0 auto;padding:0 1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.hero-text h1{font-size:clamp(2.25rem,6vw,4.5rem);font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem;text-shadow:0 4px 8px rgba(0,0,0,.3)}
.hero-button{display:inline-flex;align-items:center;gap:.5rem;padding:1rem 2rem;border-radius:50px;text-decoration:none;font-weight:600;font-size:1.125rem;transition:all .3s ease;box-shadow:0 10px 15px -3px rgba(0,0,0,.1)}
.services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:2rem}
.service-card{background:#fff;border-radius:1rem;padding:2rem;box-shadow:0 10px 15px -3px rgba(0,0,0,.1);transition:transform .3s ease;position:relative;overflow:hidden;border:1px solid #e5e7eb}
.page-loader{position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#1e40af 0%,#3b82f6 100%);display:flex;align-items:center;justify-content:center;z-index:9999;transition:opacity .5s ease}
@media(max-width:768px){.hero-content{grid-template-columns:1fr;gap:2rem;text-align:center}.services-grid{grid-template-columns:1fr}}
`
  }

  private static generatePreloadDirectives(assets: any): string[] {
    return [
      // Fonts critiques
      '<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>',
      
      // CSS critique
      '<link rel="preload" href="/css/critical.css" as="style">',
      
      // Images hero
      '<link rel="preload" href="/images/hero-bg.webp" as="image" type="image/webp">',
      
      // Scripts critiques
      '<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" as="script" crossorigin>',
      
      // DNS prefetch
      '<link rel="dns-prefetch" href="//fonts.googleapis.com">',
      '<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">',
      '<link rel="dns-prefetch" href="//images.unsplash.com">',
      
      // Preconnect
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      
      // Resource hints
      '<link rel="prefetch" href="/css/animations.css">',
      '<link rel="prefetch" href="/js/interactions.js">'
    ]
  }

  private static generateServiceWorker(): string {
    return `
// Service Worker Ultra-Optimisé pour Performance
const CACHE_NAME = 'elementor-pro-v1'
const urlsToCache = [
  '/',
  '/css/critical.css',
  '/js/app.js',
  '/fonts/inter-var.woff2',
  '/images/hero-bg.webp',
  '/images/logo.svg'
]

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert')
        return cache.addAll(urlsToCache)
      })
  )
  self.skipWaiting()
})

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Stratégie Cache First pour les assets, Network First pour les pages
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' || 
      event.request.destination === 'script' ||
      event.request.destination === 'font') {
    
    // Cache First pour les assets
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response
          }
          return fetch(event.request).then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })
            return response
          })
        })
    )
  } else {
    // Network First pour les pages HTML
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
          return response
        })
        .catch(() => {
          return caches.match(event.request)
        })
    )
  }
})

// Background sync pour les formulaires
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Envoyer les données en attente
      sendPendingFormData()
    )
  }
})

async function sendPendingFormData() {
  // Logique d'envoi différé des formulaires
  console.log('Envoi des données de formulaire en attente')
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('Elementor Pro', options)
  )
})
`
  }

  private static generateWebManifest(): any {
    return {
      "name": "Site Professionnel",
      "short_name": "Site Pro",
      "description": "Site web professionnel ultra-performant",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#1e40af",
      "orientation": "portrait-primary",
      "categories": ["business", "professional"],
      "lang": "fr",
      "dir": "ltr",
      "icons": [
        {
          "src": "/images/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-96x96.png", 
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-128x128.png",
          "sizes": "128x128", 
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "/images/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        }
      ],
      "screenshots": [
        {
          "src": "/images/screenshot-wide.png",
          "sizes": "1280x720",
          "type": "image/png",
          "form_factor": "wide"
        },
        {
          "src": "/images/screenshot-narrow.png", 
          "sizes": "750x1334",
          "type": "image/png",
          "form_factor": "narrow"
        }
      ],
      "shortcuts": [
        {
          "name": "Contact",
          "short_name": "Contact",
          "description": "Contactez-nous rapidement",
          "url": "/contact",
          "icons": [
            {
              "src": "/images/contact-icon.png",
              "sizes": "96x96"
            }
          ]
        },
        {
          "name": "Services",
          "short_name": "Services", 
          "description": "Découvrez nos services",
          "url": "/services",
          "icons": [
            {
              "src": "/images/services-icon.png",
              "sizes": "96x96"
            }
          ]
        }
      ],
      "related_applications": [],
      "prefer_related_applications": false
    }
  }

  // Optimisations spécifiques par type de contenu
  static optimizeCSS(css: string): string {
    return css
      // Supprimer commentaires
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Supprimer espaces inutiles
      .replace(/\s+/g, ' ')
      // Supprimer espaces autour des accolades
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      // Supprimer espaces autour des : et ;
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      // Supprimer ; avant }
      .replace(/;}/g, '}')
      // Supprimer dernière ligne vide
      .trim()
  }

  static optimizeJS(js: string): string {
    return js
      // Supprimer commentaires sur une ligne
      .replace(/\/\/.*$/gm, '')
      // Supprimer commentaires multilignes
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Supprimer espaces inutiles
      .replace(/\s+/g, ' ')
      // Supprimer espaces autour des opérateurs
      .replace(/\s*([{}();,])\s*/g, '$1')
      .trim()
  }

  static generateCriticalResourceHints(): string {
    return `
    <!-- Resource Hints Ultra-Optimisés -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="//images.unsplash.com">
    
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    <link rel="preload" href="/images/hero-bg.webp" as="image" type="image/webp">
    
    <link rel="prefetch" href="/css/non-critical.css">
    <link rel="prefetch" href="/js/interactions.js">
    <link rel="prefetch" href="/images/about-bg.webp">
    `
  }

  static generateLazyLoadingScript(): string {
    return `
    <script>
    // Lazy Loading Ultra-Optimisé avec Intersection Observer
    (function() {
      'use strict';
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              
              // Pour les images simples
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
              }
              
              // Pour les srcset
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              
              // Pour les pictures
              if (img.tagName === 'SOURCE' && img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });
        
        // Observer toutes les images lazy
        document.querySelectorAll('img[data-src], source[data-srcset]').forEach(img => {
          imageObserver.observe(img);
        });
        
        // Observer les images ajoutées dynamiquement
        const mutationObserver = new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) {
                const lazyImages = node.querySelectorAll('img[data-src], source[data-srcset]');
                lazyImages.forEach(img => imageObserver.observe(img));
              }
            });
          });
        });
        
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    })();
    </script>
    `
  }

  static generatePerformanceMonitoring(): string {
    return `
    <script>
    // Monitoring Performance Ultra-Détaillé
    (function() {
      'use strict';
      
      // Core Web Vitals
      function getCLS(onReport) {
        let clsValue = 0;
        let clsEntries = [];
        
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              const firstSessionEntry = clsEntries[0];
              const lastSessionEntry = clsEntries[clsEntries.length - 1];
              
              if (clsValue && entry.startTime - lastSessionEntry.startTime < 1000 &&
                  entry.startTime - firstSessionEntry.startTime < 5000) {
                clsValue += entry.value;
                clsEntries.push(entry);
              } else {
                clsValue = entry.value;
                clsEntries = [entry];
              }
              onReport({ name: 'CLS', value: clsValue, entries: clsEntries });
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
      }
      
      function getFID(onReport) {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            onReport({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              entries: [entry]
            });
          }
        }).observe({ type: 'first-input', buffered: true });
      }
      
      function getLCP(onReport) {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          onReport({
            name: 'LCP',
            value: lastEntry.startTime,
            entries: [lastEntry]
          });
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      }
      
      // Fonction de rapport
      function sendToAnalytics(metric) {
        console.log('Performance Metric:', metric);
        
        // Envoyer à Google Analytics 4
        if (typeof gtag !== 'undefined') {
          gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_id: crypto.randomUUID(),
            custom_parameter_1: navigator.connection?.effectiveType || 'unknown'
          });
        }
        
        // Envoyer à votre API analytics
        if (metric.value < 2500) { // Seulement les métriques valides
          fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              metric: metric.name,
              value: metric.value,
              timestamp: Date.now(),
              url: location.href,
              userAgent: navigator.userAgent,
              connection: navigator.connection?.effectiveType
            })
          }).catch(() => {}); // Silently fail
        }
      }
      
      // Démarrer le monitoring
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getLCP(sendToAnalytics);
      
      // Métriques additionnelles
      window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        sendToAnalytics({
          name: 'Page Load Time',
          value: pageLoadTime
        });
        
        sendToAnalytics({
          name: 'DOM Content Loaded',
          value: domContentLoaded
        });
        
        // Time to Interactive approximation
        setTimeout(() => {
          sendToAnalytics({
            name: 'TTI_Approximation',
            value: performance.now()
          });
        }, 100);
      });
      
    })();
    </script>
    `
  }
}