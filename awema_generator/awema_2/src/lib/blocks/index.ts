// Index principal du système de blocs modulaire ultra-pro AWEMA
// Export de tous les composants du système de blocs

// Types et interfaces de base
export {
  BlockComponent,
  BlockType,
  DesignStyle,
  BlockOptions,
  ColorPalette,
  AnimationType,
  SpacingLevel,
  BackgroundType,
  ResponsiveOptions,
  PageComposition,
  SEOConfiguration,
  BreadcrumbItem,
  LinkingConfiguration,
  InternalLink,
  ContextualLink,
  RecommendationLink,
  BaseBlock
} from './block-system'

// Blocs concrets
export { HeroBlock } from './hero-block'
export { ServicesBlock } from './services-block'
export { CTABlock } from './cta-block'
export { TestimonialsBlock } from './testimonials-block'
export { StatsBlock } from './stats-block'
export { GalleryBlock } from './gallery-block'

// Système de registre et rendu
export {
  BlockRegistry,
  BlockRenderer,
  PageCompositionFactory
} from './block-registry'

// Intégration avec l'architecture existante
export {
  BlockBasedSiteGenerator,
  generateSiteWithBlocks,
  migrateToBlockSystem
} from './integration'

// Générateur de maillage interne
export {
  IntelligentLinkingGenerator,
  generateSiteLinking,
  optimizeLinking
} from './linking-generator'

// Intégration avec formulaires
export {
  FormToBlocksGenerator,
  generateSiteFromFormData,
  migrateLegacySiteToBlocks,
  type AWEMAFormData
} from './form-integration'

// Optimisation et performances
export {
  PerformanceOptimizer,
  BlockCache,
  GlobalOptimizer,
  type PerformanceMetrics,
  type OptimizationOptions
} from './performance-optimizer'

export {
  SEOOptimizer,
  type SEOMetrics,
  type SEORecommendations,
  type StructuredDataSchema
} from './seo-optimizer'

export {
  AnalyticsMonitor,
  type RealTimeMetrics,
  type UXMetrics,
  type ConversionMetrics,
  type TechnicalMetrics,
  type MonitoringAlert,
  type OptimizationReport
} from './analytics-monitor'

export {
  OptimizationEngine,
  type OptimizationEngineConfig,
  type OptimizationResult,
  type ComprehensiveReport
} from './optimization-engine'

// Exemples et utilitaires
export {
  exampleData,
  generateUltraProHomePage,
  generateCustomPage,
  generateLocalSeoPage,
  testAllVariants,
  renderSingleBlock,
  generateMultiTradeExamples
} from './example-usage'

// Fonction principale pour générer un site complet avec le nouveau système
export function generateModularSite(data: any, options: {
  style?: 'ultra-pro' | 'premium' | 'standard' | 'minimal',
  includeLocalSeo?: boolean,
  customBlocks?: any[],
  abTesting?: boolean
} = {}) {
  const {
    style = 'ultra-pro',
    includeLocalSeo = true,
    customBlocks = [],
    abTesting = false
  } = options

  // Créer le générateur
  const generator = new BlockBasedSiteGenerator(data)
  
  // Générer la structure de base
  const siteStructure = generator.generateEnhancedSiteStructure()
  
  // Ajouter des blocs personnalisés si fournis
  if (customBlocks.length > 0) {
    // Intégrer les blocs personnalisés
    customBlocks.forEach(block => {
      BlockRegistry.register(block.type, block.class)
    })
  }
  
  // Générer des variants A/B si demandé
  if (abTesting) {
    const variants = generator.generateABVariants('home')
    
    // Ajouter les variants à la structure
    Object.entries(variants).forEach(([variantName, content]) => {
      siteStructure.pages.push({
        filename: `index-${variantName}.html`,
        title: `${data.companyName} - Variant ${variantName}`,
        content,
        type: 'home'
      })
    })
  }
  
  return siteStructure
}

// Fonction utilitaire pour créer rapidement une page avec le système de blocs
export function createBlockPage(
  pageType: 'home' | 'services' | 'service-detail' | 'contact' | 'about' | 'legal' | 'local-seo',
  data: any,
  customization: {
    heroVariant?: string,
    servicesVariant?: string,
    additionalBlocks?: any[],
    style?: string,
    colors?: any
  } = {}
) {
  const renderer = new BlockRenderer(data)
  
  const composition = renderer.generatePageByType(
    pageType,
    customization.style || 'ultra-pro',
    customization
  )
  
  return renderer.renderPageComposition(composition)
}

// Fonction pour prévisualiser un bloc en isolation
export function previewBlock(
  blockType: string,
  variant: string,
  data: any,
  options: any = {}
) {
  const generator = new BlockBasedSiteGenerator(data)
  return generator.generatePreview(blockType, variant, options)
}

// Analyse et recommandations pour optimiser les blocs
export function analyzeBlockPerformance(composition: PageComposition): {
  score: number,
  recommendations: string[],
  issues: string[]
} {
  const analysis = {
    score: 0,
    recommendations: [] as string[],
    issues: [] as string[]
  }
  
  // Analyser la composition
  let score = 100
  
  // Vérifier la présence d'un Hero
  const hasHero = composition.blocks.some(block => block.type === 'hero')
  if (!hasHero) {
    analysis.issues.push('Aucun bloc Hero détecté')
    score -= 20
  }
  
  // Vérifier la présence de Services
  const hasServices = composition.blocks.some(block => block.type === 'services')
  if (!hasServices) {
    analysis.recommendations.push('Ajouter un bloc Services pour améliorer la conversion')
    score -= 10
  }
  
  // Vérifier les variants ultra-pro
  const ultraProBlocks = composition.blocks.filter(block => block.variant === 'ultra-pro')
  if (ultraProBlocks.length === 0) {
    analysis.recommendations.push('Utiliser des variants ultra-pro pour un design premium')
    score -= 5
  }
  
  // Vérifier le SEO
  if (!composition.seo.title || composition.seo.title.length < 30) {
    analysis.issues.push('Titre SEO trop court (minimum 30 caractères)')
    score -= 15
  }
  
  if (!composition.seo.description || composition.seo.description.length < 120) {
    analysis.issues.push('Description SEO trop courte (minimum 120 caractères)')
    score -= 10
  }
  
  // Recommandations générales
  if (composition.blocks.length < 3) {
    analysis.recommendations.push('Ajouter plus de blocs pour enrichir le contenu')
  }
  
  if (!composition.linking.internal.length) {
    analysis.recommendations.push('Ajouter des liens internes pour améliorer le SEO')
  }
  
  analysis.score = Math.max(0, score)
  
  return analysis
}

// Configuration par défaut pour différents types de métiers
export const TRADE_CONFIGURATIONS = {
  electricien: {
    style: 'electricien',
    heroVariant: 'ultra-pro',
    servicesVariant: 'ultra-pro',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#fbbf24'
    },
    recommendedBlocks: ['hero', 'services', 'stats', 'testimonials', 'cta']
  },
  plombier: {
    style: 'plombier',
    heroVariant: 'ultra-pro',
    servicesVariant: 'ultra-pro',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#f97316'
    },
    recommendedBlocks: ['hero', 'services', 'features', 'testimonials', 'cta']
  },
  chauffagiste: {
    style: 'chauffagiste',
    heroVariant: 'ultra-pro',
    servicesVariant: 'ultra-pro',
    colors: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#fbbf24'
    },
    recommendedBlocks: ['hero', 'services', 'pricing', 'testimonials', 'cta']
  },
  multi: {
    style: 'multi',
    heroVariant: 'split',
    servicesVariant: 'grid',
    colors: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#f59e0b'
    },
    recommendedBlocks: ['hero', 'services', 'about', 'gallery', 'cta']
  }
}

// Export de la configuration par défaut
export default {
  generateModularSite,
  createBlockPage,
  previewBlock,
  analyzeBlockPerformance,
  TRADE_CONFIGURATIONS
}