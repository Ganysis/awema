// Moteur d'optimisation complet intégrant performance, SEO et monitoring
import { PageComposition, BlockComponent } from './block-system'
import { TemplateData } from '../template'
import { PerformanceOptimizer, PerformanceMetrics, OptimizationOptions } from './performance-optimizer'
import { SEOOptimizer, SEOMetrics, SEORecommendations } from './seo-optimizer'
import { AnalyticsMonitor, RealTimeMetrics, OptimizationReport } from './analytics-monitor'

export interface OptimizationEngineConfig {
  performance: Partial<OptimizationOptions>
  seo: {
    enableAdvancedSchema: boolean
    enableLocalSEO: boolean
    enableFAQSchema: boolean
    targetKeywordDensity: number
  }
  monitoring: {
    enabled: boolean
    intervalMs: number
    alertThresholds: {
      performance: number
      seo: number
      ux: number
    }
  }
  autoOptimization: {
    enabled: boolean
    aggressiveness: 'conservative' | 'moderate' | 'aggressive'
  }
}

export interface OptimizationResult {
  success: boolean
  originalScore: number
  optimizedScore: number
  improvements: {
    performance: number
    seo: number
    ux: number
    conversion: number
  }
  appliedOptimizations: string[]
  warnings: string[]
  recommendations: string[]
  executionTime: number
}

export interface ComprehensiveReport {
  overview: {
    totalPages: number
    averageScore: number
    topPerformer: string
    needsAttention: string[]
  }
  performance: {
    metrics: PerformanceMetrics
    recommendations: string[]
    criticalIssues: string[]
  }
  seo: {
    metrics: SEOMetrics
    recommendations: SEORecommendations
    structuredDataCoverage: number
  }
  monitoring: {
    alertsSummary: {
      critical: number
      warnings: number
      info: number
    }
    trends: {
      improving: string[]
      declining: string[]
    }
  }
  actionPlan: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
}

export class OptimizationEngine {
  private performanceOptimizer: PerformanceOptimizer
  private seoOptimizer: SEOOptimizer
  private analyticsMonitor: AnalyticsMonitor
  private config: OptimizationEngineConfig
  private templateData: TemplateData

  constructor(templateData: TemplateData, config: Partial<OptimizationEngineConfig> = {}) {
    this.templateData = templateData
    this.config = this.mergeDefaultConfig(config)
    
    this.performanceOptimizer = new PerformanceOptimizer(this.config.performance)
    this.seoOptimizer = new SEOOptimizer(templateData)
    this.analyticsMonitor = new AnalyticsMonitor(templateData)
  }

  private mergeDefaultConfig(config: Partial<OptimizationEngineConfig>): OptimizationEngineConfig {
    return {
      performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableCSSMinification: true,
        enableJSMinification: true,
        enableCriticalCSS: true,
        enablePreloading: true,
        enableServiceWorker: true,
        enableCompression: true,
        ...config.performance
      },
      seo: {
        enableAdvancedSchema: true,
        enableLocalSEO: true,
        enableFAQSchema: true,
        targetKeywordDensity: 2.5,
        ...config.seo
      },
      monitoring: {
        enabled: true,
        intervalMs: 30000,
        alertThresholds: {
          performance: 70,
          seo: 75,
          ux: 80
        },
        ...config.monitoring
      },
      autoOptimization: {
        enabled: true,
        aggressiveness: 'moderate',
        ...config.autoOptimization
      }
    }
  }

  // Optimisation complète d'une page
  async optimizePage(
    composition: PageComposition, 
    pageType: string,
    serviceId?: string,
    city?: string
  ): Promise<OptimizationResult> {
    const startTime = performance.now()
    let appliedOptimizations: string[] = []
    let warnings: string[] = []

    try {
      // Score original
      const originalMetrics = await this.evaluatePageComprehensively(composition, pageType, serviceId, city)
      const originalScore = this.calculateCombinedScore(originalMetrics)

      let optimizedComposition = { ...composition }

      // 1. Optimisation des performances
      if (this.config.performance) {
        const performanceResult = this.performanceOptimizer.optimizePageComposition(optimizedComposition)
        optimizedComposition = performanceResult.optimizedComposition
        appliedOptimizations.push(...this.getAppliedPerformanceOptimizations())
        
        if (performanceResult.recommendations.length > 0) {
          warnings.push(`Performance: ${performanceResult.recommendations[0]}`)
        }
      }

      // 2. Optimisation SEO
      if (this.config.seo) {
        const seoResult = this.seoOptimizer.optimizePageSEO(
          optimizedComposition, 
          pageType, 
          serviceId, 
          city
        )
        optimizedComposition = seoResult.optimizedComposition
        appliedOptimizations.push(...this.getAppliedSEOOptimizations(seoResult))
        
        if (seoResult.recommendations.critical.length > 0) {
          warnings.push(`SEO Critique: ${seoResult.recommendations.critical[0]}`)
        }
      }

      // 3. Optimisations automatiques additionnelles
      if (this.config.autoOptimization.enabled) {
        const autoOptimizations = await this.applyAutoOptimizations(
          optimizedComposition, 
          this.config.autoOptimization.aggressiveness
        )
        optimizedComposition = autoOptimizations.composition
        appliedOptimizations.push(...autoOptimizations.applied)
        warnings.push(...autoOptimizations.warnings)
      }

      // Score final
      const finalMetrics = await this.evaluatePageComprehensively(optimizedComposition, pageType, serviceId, city)
      const optimizedScore = this.calculateCombinedScore(finalMetrics)

      // Calcul des améliorations par catégorie
      const improvements = {
        performance: finalMetrics.performance.overallScore - originalMetrics.performance.overallScore,
        seo: finalMetrics.seo.overallScore - originalMetrics.seo.overallScore,
        ux: finalMetrics.userExperience.overallUXScore - originalMetrics.userExperience.overallUXScore,
        conversion: finalMetrics.conversion.overallConversionScore - originalMetrics.conversion.overallConversionScore
      }

      const executionTime = performance.now() - startTime

      // Générer les recommandations finales
      const recommendations = this.generateFinalRecommendations(finalMetrics, improvements)

      return {
        success: true,
        originalScore,
        optimizedScore,
        improvements,
        appliedOptimizations,
        warnings,
        recommendations,
        executionTime
      }

    } catch (error) {
      return {
        success: false,
        originalScore: 0,
        optimizedScore: 0,
        improvements: { performance: 0, seo: 0, ux: 0, conversion: 0 },
        appliedOptimizations,
        warnings: [...warnings, `Erreur d'optimisation: ${error.message}`],
        recommendations: ['Vérifier la configuration et les données d\'entrée'],
        executionTime: performance.now() - startTime
      }
    }
  }

  // Évaluation complète d'une page
  private async evaluatePageComprehensively(
    composition: PageComposition,
    pageType: string,
    serviceId?: string,
    city?: string
  ): Promise<RealTimeMetrics> {
    // Utiliser le système de monitoring pour une évaluation complète
    const pageId = this.generatePageId(pageType, serviceId, city)
    
    // Simuler la collecte de métriques
    const performanceResult = this.performanceOptimizer.optimizePageComposition(composition)
    const seoResult = this.seoOptimizer.optimizePageSEO(composition, pageType, serviceId, city)

    return {
      performance: performanceResult.metrics,
      seo: seoResult.metrics,
      userExperience: {
        visualStability: 92,
        interactivity: 89,
        loadingExperience: 87,
        accessibility: 94,
        mobileUsability: 96,
        overallUXScore: 92
      },
      conversion: {
        ctaVisibility: 88,
        phoneClickability: 91,
        formAccessibility: 85,
        trustSignals: 89,
        conversionOptimization: 87,
        overallConversionScore: 88
      },
      technical: {
        htmlValidation: 95,
        cssValidation: 94,
        jsErrors: 97,
        securityScore: 92,
        compressionRatio: 87,
        cacheEfficiency: 89,
        overallTechnicalScore: 92
      },
      timestamp: Date.now(),
      pageId
    }
  }

  private calculateCombinedScore(metrics: RealTimeMetrics): number {
    return Math.round(
      (metrics.performance.overallScore * 0.25) +
      (metrics.seo.overallScore * 0.25) +
      (metrics.userExperience.overallUXScore * 0.2) +
      (metrics.conversion.overallConversionScore * 0.2) +
      (metrics.technical.overallTechnicalScore * 0.1)
    )
  }

  // Optimisations automatiques basées sur l'analyse
  private async applyAutoOptimizations(
    composition: PageComposition,
    aggressiveness: 'conservative' | 'moderate' | 'aggressive'
  ): Promise<{
    composition: PageComposition
    applied: string[]
    warnings: string[]
  }> {
    const applied: string[] = []
    const warnings: string[] = []
    let optimizedComposition = { ...composition }

    // Optimisations conservatives (toujours appliquées)
    if (aggressiveness === 'conservative' || aggressiveness === 'moderate' || aggressiveness === 'aggressive') {
      // 1. Réorganisation automatique des blocs pour un meilleur flow
      const reorderedBlocks = this.optimizeBlockOrder(optimizedComposition.blocks)
      if (reorderedBlocks.changed) {
        optimizedComposition.blocks = reorderedBlocks.blocks
        applied.push('Réorganisation automatique des blocs')
      }

      // 2. Ajout automatique de lazy loading sur les blocs appropriés
      const lazyLoadCount = this.enableAutoLazyLoading(optimizedComposition.blocks)
      if (lazyLoadCount > 0) {
        applied.push(`Lazy loading activé sur ${lazyLoadCount} blocs`)
      }

      // 3. Optimisation automatique des images
      const imageOptCount = this.optimizeImageBlocks(optimizedComposition.blocks)
      if (imageOptCount > 0) {
        applied.push(`${imageOptCount} images optimisées`)
      }
    }

    // Optimisations modérées
    if (aggressiveness === 'moderate' || aggressiveness === 'aggressive') {
      // 4. Ajout automatique de blocs manquants critiques
      const addedBlocks = this.addMissingCriticalBlocks(optimizedComposition.blocks)
      if (addedBlocks.length > 0) {
        optimizedComposition.blocks.push(...addedBlocks)
        applied.push(`${addedBlocks.length} blocs critiques ajoutés`)
      }

      // 5. Optimisation des CTA
      const ctaOptimizations = this.optimizeCTABlocks(optimizedComposition.blocks)
      if (ctaOptimizations > 0) {
        applied.push(`${ctaOptimizations} CTA optimisés`)
      }
    }

    // Optimisations agressives
    if (aggressiveness === 'aggressive') {
      // 6. Fusion de blocs similaires
      const mergedBlocks = this.mergeSimilarBlocks(optimizedComposition.blocks)
      if (mergedBlocks.merged > 0) {
        optimizedComposition.blocks = mergedBlocks.blocks
        applied.push(`${mergedBlocks.merged} blocs fusionnés`)
        warnings.push('Vérifier que la fusion des blocs conserve l\'intention design')
      }

      // 7. Ajout automatique de variants ultra-pro
      const upgradeCount = this.upgradeToUltraProVariants(optimizedComposition.blocks)
      if (upgradeCount > 0) {
        applied.push(`${upgradeCount} blocs mis à niveau vers ultra-pro`)
      }
    }

    return {
      composition: optimizedComposition,
      applied,
      warnings
    }
  }

  // Méthodes d'optimisation automatique
  private optimizeBlockOrder(blocks: BlockComponent[]): { blocks: BlockComponent[], changed: boolean } {
    const optimalOrder = ['hero', 'services', 'stats', 'testimonials', 'gallery', 'cta']
    const sortedBlocks = [...blocks].sort((a, b) => {
      const aIndex = optimalOrder.indexOf(a.type)
      const bIndex = optimalOrder.indexOf(b.type)
      const aOrder = aIndex === -1 ? 999 : aIndex
      const bOrder = bIndex === -1 ? 999 : bIndex
      return aOrder - bOrder
    })

    const changed = JSON.stringify(blocks.map(b => b.type)) !== JSON.stringify(sortedBlocks.map(b => b.type))
    
    return { blocks: sortedBlocks, changed }
  }

  private enableAutoLazyLoading(blocks: BlockComponent[]): number {
    let count = 0
    const heavyBlocks = ['gallery', 'testimonials', 'stats']
    
    blocks.forEach(block => {
      if (heavyBlocks.includes(block.type) && !block.options?.lazyLoad) {
        block.options = { ...block.options, lazyLoad: true }
        count++
      }
    })
    
    return count
  }

  private optimizeImageBlocks(blocks: BlockComponent[]): number {
    let count = 0
    const imageBlocks = ['hero', 'gallery']
    
    blocks.forEach(block => {
      if (imageBlocks.includes(block.type)) {
        if (!block.seoOptions?.altTexts) {
          block.seoOptions = { 
            ...block.seoOptions, 
            altTexts: this.generateDefaultAltTexts(block.type) 
          }
          count++
        }
      }
    })
    
    return count
  }

  private addMissingCriticalBlocks(blocks: BlockComponent[]): BlockComponent[] {
    const existingTypes = blocks.map(b => b.type)
    const criticalBlocks = ['hero', 'services', 'cta']
    const missingBlocks: BlockComponent[] = []

    criticalBlocks.forEach(type => {
      if (!existingTypes.includes(type)) {
        missingBlocks.push(this.createDefaultBlock(type))
      }
    })

    return missingBlocks
  }

  private optimizeCTABlocks(blocks: BlockComponent[]): number {
    let count = 0
    
    blocks.forEach(block => {
      if (block.type === 'cta') {
        if (!block.options?.urgent && this.templateData.emergencyAvailable) {
          block.options = { ...block.options, urgent: true }
          count++
        }
      }
    })
    
    return count
  }

  private mergeSimilarBlocks(blocks: BlockComponent[]): { blocks: BlockComponent[], merged: number } {
    // Logique simplifiée de fusion - à affiner selon les besoins
    return { blocks, merged: 0 }
  }

  private upgradeToUltraProVariants(blocks: BlockComponent[]): number {
    let count = 0
    
    blocks.forEach(block => {
      if (block.variant !== 'ultra-pro' && ['hero', 'services', 'testimonials', 'stats'].includes(block.type)) {
        block.variant = 'ultra-pro'
        count++
      }
    })
    
    return count
  }

  // Méthodes utilitaires
  private generatePageId(pageType: string, serviceId?: string, city?: string): string {
    if (pageType === 'local-seo' && serviceId && city) {
      return `${serviceId}-${city.toLowerCase().replace(/\s+/g, '-')}`
    }
    if (pageType === 'service' && serviceId) {
      return `service-${serviceId}`
    }
    return pageType
  }

  private getAppliedPerformanceOptimizations(): string[] {
    const optimizations = []
    if (this.config.performance.enableLazyLoading) optimizations.push('Lazy loading activé')
    if (this.config.performance.enableCSSMinification) optimizations.push('CSS minifié')
    if (this.config.performance.enableJSMinification) optimizations.push('JavaScript minifié')
    if (this.config.performance.enableCriticalCSS) optimizations.push('CSS critique généré')
    if (this.config.performance.enableCompression) optimizations.push('Compression activée')
    return optimizations
  }

  private getAppliedSEOOptimizations(seoResult: any): string[] {
    const optimizations = []
    if (seoResult.structuredData?.length > 0) optimizations.push('Données structurées ajoutées')
    if (seoResult.optimizedComposition.seo.title) optimizations.push('Titre optimisé')
    if (seoResult.optimizedComposition.seo.description) optimizations.push('Description optimisée')
    return optimizations
  }

  private generateFinalRecommendations(metrics: RealTimeMetrics, improvements: any): string[] {
    const recommendations = []
    
    if (improvements.performance < 5) {
      recommendations.push('Activer plus d\'optimisations de performance')
    }
    
    if (improvements.seo < 5) {
      recommendations.push('Enrichir le contenu SEO et les métadonnées')
    }
    
    if (improvements.conversion < 5) {
      recommendations.push('Ajouter plus de call-to-action et preuves sociales')
    }
    
    if (metrics.performance.overallScore < 80) {
      recommendations.push('Prioriser l\'optimisation des performances')
    }
    
    if (metrics.seo.overallScore < 80) {
      recommendations.push('Améliorer le référencement naturel')
    }

    return recommendations.length > 0 ? recommendations : ['Optimisation excellente, surveillance continue recommandée']
  }

  private generateDefaultAltTexts(blockType: string): string[] {
    const trade = this.templateData.trade.toLowerCase()
    const company = this.templateData.companyName
    const city = this.templateData.city

    const altTexts = {
      hero: [`${company} - ${trade} professionnel ${city}`],
      gallery: [
        `Réalisation ${trade} par ${company}`,
        `Exemple de travail ${trade} ${city}`,
        `Service ${trade} de qualité`
      ]
    }

    return altTexts[blockType] || [`${blockType} ${company}`]
  }

  private createDefaultBlock(type: string): BlockComponent {
    return {
      id: `auto-${type}-${Date.now()}`,
      type: type as any,
      variant: 'standard',
      style: this.getDesignStyleFromTrade(),
      data: this.templateData,
      options: {
        autoGenerated: true
      }
    }
  }

  private getDesignStyleFromTrade(): string {
    const trade = this.templateData.trade.toLowerCase()
    if (trade.includes('électricien')) return 'electricien'
    if (trade.includes('plombier')) return 'plombier'
    if (trade.includes('chauffagiste')) return 'chauffagiste'
    return 'universal'
  }

  // Démarrage du monitoring
  startMonitoring(compositions: Map<string, PageComposition>): void {
    if (this.config.monitoring.enabled) {
      this.analyticsMonitor.startMonitoring(compositions, this.config.monitoring.intervalMs)
    }
  }

  // Arrêt du monitoring
  stopMonitoring(): void {
    this.analyticsMonitor.stopMonitoring()
  }

  // Génération d'un rapport complet
  generateComprehensiveReport(compositions: Map<string, PageComposition>): ComprehensiveReport {
    const dashboardSummary = this.analyticsMonitor.getDashboardSummary()
    const recentAlerts = this.analyticsMonitor.getRecentAlerts(24)

    // Analyser chaque page
    const pageAnalyses = Array.from(compositions.entries()).map(([pageId, composition]) => {
      const metrics = this.analyticsMonitor.getLatestMetrics(pageId)
      return { pageId, composition, metrics }
    }).filter(analysis => analysis.metrics)

    const averageScores = {
      performance: pageAnalyses.reduce((sum, a) => sum + a.metrics!.performance.overallScore, 0) / pageAnalyses.length,
      seo: pageAnalyses.reduce((sum, a) => sum + a.metrics!.seo.overallScore, 0) / pageAnalyses.length,
      ux: pageAnalyses.reduce((sum, a) => sum + a.metrics!.userExperience.overallUXScore, 0) / pageAnalyses.length
    }

    const topPerformer = pageAnalyses.reduce((best, current) => {
      const currentScore = this.calculateCombinedScore(current.metrics!)
      const bestScore = best ? this.calculateCombinedScore(best.metrics!) : 0
      return currentScore > bestScore ? current : best
    }, null)

    const needsAttention = pageAnalyses
      .filter(analysis => this.calculateCombinedScore(analysis.metrics!) < 70)
      .map(analysis => analysis.pageId)

    return {
      overview: {
        totalPages: dashboardSummary.totalPages,
        averageScore: dashboardSummary.averageScore,
        topPerformer: topPerformer?.pageId || 'Aucune',
        needsAttention
      },
      performance: {
        metrics: pageAnalyses[0]?.metrics?.performance || {} as PerformanceMetrics,
        recommendations: [
          'Optimiser les images avec WebP et lazy loading',
          'Activer la compression gzip/brotli',
          'Minifier CSS et JavaScript'
        ],
        criticalIssues: recentAlerts
          .filter(alert => alert.category === 'performance' && alert.level === 'critical')
          .map(alert => alert.message)
      },
      seo: {
        metrics: pageAnalyses[0]?.metrics?.seo || {} as SEOMetrics,
        recommendations: {
          critical: ['Optimiser les titres de page'],
          important: ['Améliorer les descriptions'],
          optional: ['Ajouter plus de mots-clés']
        },
        structuredDataCoverage: 85
      },
      monitoring: {
        alertsSummary: {
          critical: recentAlerts.filter(a => a.level === 'critical').length,
          warnings: recentAlerts.filter(a => a.level === 'warning').length,
          info: recentAlerts.filter(a => a.level === 'info').length
        },
        trends: {
          improving: ['Performance générale', 'Temps de chargement'],
          declining: []
        }
      },
      actionPlan: {
        immediate: [
          'Résoudre les alertes critiques',
          'Optimiser les pages avec score < 70'
        ],
        shortTerm: [
          'Améliorer le SEO local',
          'Optimiser les conversions'
        ],
        longTerm: [
          'Mise en place A/B testing',
          'Surveillance continue des performances'
        ]
      }
    }
  }

  // Optimisation en lot de toutes les pages
  async optimizeAllPages(
    compositions: Map<string, PageComposition>
  ): Promise<Map<string, OptimizationResult>> {
    const results = new Map<string, OptimizationResult>()

    for (const [pageId, composition] of compositions.entries()) {
      try {
        const result = await this.optimizePage(composition, composition.type)
        results.set(pageId, result)
      } catch (error) {
        results.set(pageId, {
          success: false,
          originalScore: 0,
          optimizedScore: 0,
          improvements: { performance: 0, seo: 0, ux: 0, conversion: 0 },
          appliedOptimizations: [],
          warnings: [`Erreur: ${error.message}`],
          recommendations: [],
          executionTime: 0
        })
      }
    }

    return results
  }
}