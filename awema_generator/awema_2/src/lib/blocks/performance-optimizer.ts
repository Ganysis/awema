// Optimiseur de performances pour le système de blocs modulaire
import { BlockComponent, PageComposition } from './block-system'

export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  cacheHitRatio: number
  bundleSize: number
  imageOptimization: number
  cssOptimization: number
  jsOptimization: number
  overallScore: number
}

export interface OptimizationOptions {
  enableLazyLoading: boolean
  enableImageOptimization: boolean
  enableCSSMinification: boolean
  enableJSMinification: boolean
  enableCriticalCSS: boolean
  enablePreloading: boolean
  enableServiceWorker: boolean
  enableCompression: boolean
}

// Cache intelligent pour les blocs
class BlockCache {
  private static cache = new Map<string, { content: string, timestamp: number, hits: number }>()
  private static readonly TTL = 1000 * 60 * 30 // 30 minutes

  static get(key: string): string | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key)
      return null
    }

    cached.hits++
    return cached.content
  }

  static set(key: string, content: string): void {
    this.cache.set(key, {
      content,
      timestamp: Date.now(),
      hits: 0
    })
  }

  static getStats() {
    const entries = Array.from(this.cache.values())
    return {
      totalEntries: entries.length,
      totalHits: entries.reduce((sum, entry) => sum + entry.hits, 0),
      hitRatio: entries.length > 0 ? entries.reduce((sum, entry) => sum + entry.hits, 0) / entries.length : 0
    }
  }

  static clear(): void {
    this.cache.clear()
  }
}

export class PerformanceOptimizer {
  private options: OptimizationOptions

  constructor(options: Partial<OptimizationOptions> = {}) {
    this.options = {
      enableLazyLoading: true,
      enableImageOptimization: true,
      enableCSSMinification: true,
      enableJSMinification: true,
      enableCriticalCSS: true,
      enablePreloading: true,
      enableServiceWorker: true,
      enableCompression: true,
      ...options
    }
  }

  // Optimisation principale d'une composition de page
  optimizePageComposition(composition: PageComposition): {
    optimizedComposition: PageComposition
    metrics: PerformanceMetrics
    recommendations: string[]
  } {
    const startTime = performance.now()
    
    const optimizedBlocks = composition.blocks.map(block => this.optimizeBlock(block))
    const optimizedCSS = this.optimizeCSS(this.extractCSS(composition.blocks))
    const optimizedJS = this.optimizeJavaScript(this.extractJavaScript(composition.blocks))

    const optimizedComposition: PageComposition = {
      ...composition,
      blocks: optimizedBlocks,
      performance: {
        criticalCSS: this.generateCriticalCSS(optimizedBlocks),
        preloadResources: this.generatePreloadResources(optimizedBlocks),
        lazyLoadScript: this.generateLazyLoadScript(),
        serviceWorker: this.generateServiceWorker()
      }
    }

    const renderTime = performance.now() - startTime
    const metrics = this.calculateMetrics(optimizedComposition, renderTime)
    const recommendations = this.generateRecommendations(metrics, optimizedComposition)

    return {
      optimizedComposition,
      metrics,
      recommendations
    }
  }

  // Optimisation d'un bloc individuel
  private optimizeBlock(block: BlockComponent): BlockComponent {
    const cacheKey = `${block.type}-${block.variant}-${JSON.stringify(block.data)}`
    const cached = BlockCache.get(cacheKey)

    if (cached && this.options.enableLazyLoading) {
      return {
        ...block,
        optimized: true,
        cachedContent: cached
      }
    }

    const optimizedBlock = {
      ...block,
      options: {
        ...block.options,
        lazyLoad: this.shouldLazyLoad(block),
        preload: this.shouldPreload(block),
        critical: this.isCritical(block),
        compressed: this.options.enableCompression
      }
    }

    return optimizedBlock
  }

  // Détermine si un bloc doit être chargé en lazy loading
  private shouldLazyLoad(block: BlockComponent): boolean {
    if (!this.options.enableLazyLoading) return false

    // Ne pas lazy load les blocs critiques (hero, above-the-fold)
    const criticalBlocks = ['hero', 'navigation']
    if (criticalBlocks.includes(block.type)) return false

    // Lazy load les blocs lourds
    const heavyBlocks = ['gallery', 'testimonials', 'stats']
    return heavyBlocks.includes(block.type)
  }

  // Détermine si un bloc doit être préchargé
  private shouldPreload(block: BlockComponent): boolean {
    if (!this.options.enablePreloading) return false

    // Précharger les blocs critiques
    const criticalBlocks = ['hero', 'services']
    return criticalBlocks.includes(block.type)
  }

  // Détermine si un bloc est critique pour le rendu initial
  private isCritical(block: BlockComponent): boolean {
    const criticalBlocks = ['hero', 'navigation']
    return criticalBlocks.includes(block.type)
  }

  // Optimisation CSS
  private optimizeCSS(css: string): string {
    if (!this.options.enableCSSMinification) return css

    return css
      // Supprimer les commentaires
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Supprimer les espaces inutiles
      .replace(/\s+/g, ' ')
      // Supprimer les espaces autour des opérateurs
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Supprimer les points-virgules avant }
      .replace(/;}/g, '}')
      // Supprimer les zéros inutiles
      .replace(/0\.(\d+)/g, '.$1')
      .replace(/:0px/g, ':0')
      .replace(/ 0px/g, ' 0')
      .trim()
  }

  // Optimisation JavaScript
  private optimizeJavaScript(js: string): string {
    if (!this.options.enableJSMinification) return js

    return js
      // Supprimer les commentaires
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      // Supprimer les espaces inutiles
      .replace(/\s+/g, ' ')
      // Optimisations spécifiques
      .replace(/\s*([{}();,=+\-*/%<>!&|])\s*/g, '$1')
      .trim()
  }

  // Génération du CSS critique
  private generateCriticalCSS(blocks: BlockComponent[]): string {
    if (!this.options.enableCriticalCSS) return ''

    const criticalBlocks = blocks.filter(block => this.isCritical(block))
    
    return `
      <style>
        /* CSS Critique - Above the fold */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #374151;
          background: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        /* Hero critique */
        .hero-section {
          min-height: 60vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }
        
        /* Responsive critique */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 50vh;
            padding: 2rem 0;
          }
          
          .container {
            padding: 0 1rem;
          }
        }
      </style>
    `
  }

  // Génération des ressources à précharger
  private generatePreloadResources(blocks: BlockComponent[]): string {
    if (!this.options.enablePreloading) return ''

    const preloadLinks = []
    
    // Fonts critiques
    preloadLinks.push('<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" as="style">')
    
    // Images critiques
    blocks.filter(block => this.shouldPreload(block)).forEach(block => {
      if (block.type === 'hero') {
        // Précharger l'image de fond du hero si elle existe
        preloadLinks.push('<link rel="preload" href="/hero-bg.webp" as="image">')
      }
    })

    return preloadLinks.join('\n')
  }

  // Script de lazy loading optimisé
  private generateLazyLoadScript(): string {
    if (!this.options.enableLazyLoading) return ''

    return `
      <script>
        // Lazy Loading Optimisé avec Intersection Observer
        class LazyLoader {
          constructor() {
            this.observer = null
            this.init()
          }
          
          init() {
            if ('IntersectionObserver' in window) {
              this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                  root: null,
                  rootMargin: '50px',
                  threshold: 0.01
                }
              )
              
              this.observeElements()
            } else {
              // Fallback pour navigateurs anciens
              this.loadAllElements()
            }
          }
          
          observeElements() {
            document.querySelectorAll('[data-lazy]').forEach(el => {
              this.observer.observe(el)
            })
          }
          
          handleIntersection(entries) {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.loadElement(entry.target)
                this.observer.unobserve(entry.target)
              }
            })
          }
          
          loadElement(element) {
            const src = element.dataset.lazy
            const type = element.dataset.lazyType
            
            if (type === 'image') {
              element.src = src
              element.classList.add('loaded')
            } else if (type === 'block') {
              this.loadBlock(element, src)
            }
          }
          
          async loadBlock(element, blockId) {
            try {
              const response = await fetch(\`/api/blocks/\${blockId}\`)
              const html = await response.text()
              element.innerHTML = html
              element.classList.add('loaded')
              
              // Trigger animations
              this.triggerAnimations(element)
            } catch (error) {
              console.error('Erreur chargement bloc:', error)
            }
          }
          
          triggerAnimations(element) {
            element.querySelectorAll('[data-aos]').forEach(el => {
              el.style.opacity = '0'
              el.style.transform = 'translateY(30px)'
              
              setTimeout(() => {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }, 100)
            })
          }
          
          loadAllElements() {
            document.querySelectorAll('[data-lazy]').forEach(el => {
              this.loadElement(el)
            })
          }
        }
        
        // Initialiser au chargement
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => new LazyLoader())
        } else {
          new LazyLoader()
        }
      </script>
    `
  }

  // Service Worker pour mise en cache
  private generateServiceWorker(): string {
    if (!this.options.enableServiceWorker) return ''

    return `
      <script>
        // Service Worker pour mise en cache performante
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
              .then(registration => {
                console.log('SW registered: ', registration)
              })
              .catch(registrationError => {
                console.log('SW registration failed: ', registrationError)
              })
          })
        }
      </script>
    `
  }

  // Extraction du CSS des blocs
  private extractCSS(blocks: BlockComponent[]): string {
    return blocks.map(block => {
      // Simuler l'extraction du CSS de chaque bloc
      return `/* CSS for ${block.type} */`
    }).join('\n')
  }

  // Extraction du JavaScript des blocs
  private extractJavaScript(blocks: BlockComponent[]): string {
    return blocks.map(block => {
      // Simuler l'extraction du JS de chaque bloc
      return `/* JS for ${block.type} */`
    }).join('\n')
  }

  // Calcul des métriques de performance
  private calculateMetrics(composition: PageComposition, renderTime: number): PerformanceMetrics {
    const cacheStats = BlockCache.getStats()
    
    return {
      loadTime: this.estimateLoadTime(composition),
      renderTime,
      cacheHitRatio: cacheStats.hitRatio,
      bundleSize: this.estimateBundleSize(composition),
      imageOptimization: this.calculateImageOptimization(composition),
      cssOptimization: this.calculateCSSOptimization(composition),
      jsOptimization: this.calculateJSOptimization(composition),
      overallScore: this.calculateOverallScore(composition)
    }
  }

  private estimateLoadTime(composition: PageComposition): number {
    const baseTime = 800 // ms
    const blockPenalty = composition.blocks.length * 50
    const lazyLoadBonus = composition.blocks.filter(b => b.options?.lazyLoad).length * -30
    const criticalCSSBonus = this.options.enableCriticalCSS ? -200 : 0
    
    return Math.max(200, baseTime + blockPenalty + lazyLoadBonus + criticalCSSBonus)
  }

  private estimateBundleSize(composition: PageComposition): number {
    const baseSize = 45 // KB
    const blockSize = composition.blocks.length * 8
    const compressionReduction = this.options.enableCompression ? -0.3 : 0
    
    return Math.round((baseSize + blockSize) * (1 + compressionReduction))
  }

  private calculateImageOptimization(composition: PageComposition): number {
    if (!this.options.enableImageOptimization) return 60
    
    const imageBlocks = composition.blocks.filter(b => ['hero', 'gallery'].includes(b.type))
    const optimizationScore = imageBlocks.length > 0 ? 95 : 85
    
    return optimizationScore
  }

  private calculateCSSOptimization(composition: PageComposition): number {
    let score = 70
    
    if (this.options.enableCSSMinification) score += 15
    if (this.options.enableCriticalCSS) score += 15
    
    return Math.min(100, score)
  }

  private calculateJSOptimization(composition: PageComposition): number {
    let score = 75
    
    if (this.options.enableJSMinification) score += 10
    if (this.options.enableLazyLoading) score += 10
    if (this.options.enableServiceWorker) score += 5
    
    return Math.min(100, score)
  }

  private calculateOverallScore(composition: PageComposition): number {
    const metrics = {
      bundleSize: this.estimateBundleSize(composition),
      loadTime: this.estimateLoadTime(composition),
      imageOpt: this.calculateImageOptimization(composition),
      cssOpt: this.calculateCSSOptimization(composition),
      jsOpt: this.calculateJSOptimization(composition)
    }
    
    // Calcul pondéré
    let score = 0
    
    // Bundle size (plus petit = mieux)
    score += metrics.bundleSize < 50 ? 25 : metrics.bundleSize < 100 ? 20 : 15
    
    // Load time (plus rapide = mieux)  
    score += metrics.loadTime < 500 ? 25 : metrics.loadTime < 1000 ? 20 : 15
    
    // Optimisations
    score += (metrics.imageOpt / 100) * 20
    score += (metrics.cssOpt / 100) * 15
    score += (metrics.jsOpt / 100) * 15
    
    return Math.round(score)
  }

  // Génération de recommandations
  private generateRecommendations(metrics: PerformanceMetrics, composition: PageComposition): string[] {
    const recommendations = []
    
    if (metrics.loadTime > 1000) {
      recommendations.push('Activer le lazy loading pour réduire le temps de chargement initial')
    }
    
    if (metrics.bundleSize > 100) {
      recommendations.push('Activer la compression pour réduire la taille des fichiers')
    }
    
    if (metrics.imageOptimization < 90) {
      recommendations.push('Optimiser les images avec WebP et lazy loading')
    }
    
    if (metrics.cssOptimization < 85) {
      recommendations.push('Minifier le CSS et utiliser le CSS critique')
    }
    
    if (metrics.cacheHitRatio < 0.8) {
      recommendations.push('Améliorer la stratégie de cache pour les blocs récurrents')
    }
    
    if (composition.blocks.length > 8) {
      recommendations.push('Considérer la pagination ou la virtualisation pour les longs contenus')
    }
    
    if (metrics.overallScore < 70) {
      recommendations.push('Activer toutes les optimisations pour améliorer les performances')
    }
    
    return recommendations
  }

  // Génération du rapport de performance complet
  generatePerformanceReport(composition: PageComposition): {
    metrics: PerformanceMetrics
    recommendations: string[]
    optimizations: {
      applied: string[]
      available: string[]
    }
    webVitals: {
      lcp: number // Largest Contentful Paint
      fid: number // First Input Delay  
      cls: number // Cumulative Layout Shift
    }
  } {
    const optimized = this.optimizePageComposition(composition)
    
    const applied = []
    const available = []
    
    Object.entries(this.options).forEach(([key, enabled]) => {
      const optionName = key.replace('enable', '').replace(/([A-Z])/g, ' $1').toLowerCase()
      if (enabled) {
        applied.push(optionName)
      } else {
        available.push(optionName)
      }
    })
    
    return {
      metrics: optimized.metrics,
      recommendations: optimized.recommendations,
      optimizations: { applied, available },
      webVitals: {
        lcp: this.estimateLCP(composition),
        fid: this.estimateFID(composition),
        cls: this.estimateCLS(composition)
      }
    }
  }

  private estimateLCP(composition: PageComposition): number {
    const heroBlock = composition.blocks.find(b => b.type === 'hero')
    const baseTime = 1200
    
    if (heroBlock?.options?.critical) return baseTime * 0.7
    if (this.options.enableCriticalCSS) return baseTime * 0.8
    if (this.options.enablePreloading) return baseTime * 0.9
    
    return baseTime
  }

  private estimateFID(composition: PageComposition): number {
    const jsHeavyBlocks = composition.blocks.filter(b => 
      ['stats', 'testimonials', 'gallery'].includes(b.type)
    ).length
    
    const baseTime = 20
    const penalty = jsHeavyBlocks * 5
    const lazyLoadBonus = this.options.enableLazyLoading ? -10 : 0
    
    return Math.max(5, baseTime + penalty + lazyLoadBonus)
  }

  private estimateCLS(composition: PageComposition): number {
    const baseScore = 0.05
    const imageBlocks = composition.blocks.filter(b => 
      ['hero', 'gallery'].includes(b.type)
    ).length
    
    const penalty = imageBlocks * 0.02
    const optimizationBonus = this.options.enableImageOptimization ? -0.03 : 0
    
    return Math.max(0, baseScore + penalty + optimizationBonus)
  }
}

// Utilitaires d'optimisation globale
export class GlobalOptimizer {
  static generateOptimizedHTML(content: string, options: OptimizationOptions): string {
    let optimizedHTML = content
    
    if (options.enableCompression) {
      optimizedHTML = this.compressHTML(optimizedHTML)
    }
    
    if (options.enablePreloading) {
      optimizedHTML = this.addPreloadHeaders(optimizedHTML)
    }
    
    return optimizedHTML
  }
  
  private static compressHTML(html: string): string {
    return html
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim()
  }
  
  private static addPreloadHeaders(html: string): string {
    const preloadMeta = `
      <meta http-equiv="Cache-Control" content="public, max-age=31536000">
      <meta http-equiv="X-DNS-Prefetch-Control" content="on">
      <link rel="dns-prefetch" href="//fonts.googleapis.com">
      <link rel="dns-prefetch" href="//fonts.gstatic.com">
      <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    `
    
    return html.replace('<head>', `<head>${preloadMeta}`)
  }
}

export { BlockCache }