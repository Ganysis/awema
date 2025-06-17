// Intégration du système de blocs avec les formulaires AWEMA
// Conversion automatique des données formulaire en composition de blocs

import { TemplateData } from '../template'
import { BlockComponent, PageComposition } from './block-system'
import { BlockRenderer, BlockRegistry } from './block-registry'
import { IntelligentLinkingGenerator } from './linking-generator'

// Interface pour les données du formulaire AWEMA
export interface AWEMAFormData {
  step1: {
    companyName: string
    trade: string
    description: string
    ownerName: string
    email: string
    phone: string
    address: string
    city: string
  }
  step2: {
    primaryColor: string
    secondaryColor: string
    logoUrl?: string
    services: Array<{
      id: string
      name: string
      description: string
      detailedDescription: string
      price?: string
      images?: string[]
    }>
  }
  step3: {
    serviceCities: string[]
    legalInfo: {
      siret?: string
      vatNumber?: string
      legalForm?: string
      capital?: string
      rcs?: string
      address: string
      city: string
      postalCode: string
    }
    openingHours?: string
    emergencyAvailable: boolean
    domain: string
    keywords: string[]
  }
}

// Générateur principal pour convertir les données formulaire en site avec blocs
export class FormToBlocksGenerator {
  private formData: AWEMAFormData
  private templateData: TemplateData
  
  constructor(formData: AWEMAFormData) {
    this.formData = formData
    this.templateData = this.convertFormDataToTemplateData(formData)
  }

  // Conversion des données formulaire au format TemplateData
  private convertFormDataToTemplateData(formData: AWEMAFormData): TemplateData {
    return {
      // Données de base (Step 1)
      companyName: formData.step1.companyName,
      trade: formData.step1.trade,
      description: formData.step1.description,
      ownerName: formData.step1.ownerName,
      email: formData.step1.email,
      phone: formData.step1.phone,
      address: formData.step1.address,
      city: formData.step1.city,
      
      // Design et couleurs (Step 2)
      primaryColor: formData.step2.primaryColor,
      secondaryColor: formData.step2.secondaryColor,
      logoUrl: formData.step2.logoUrl,
      
      // Services (Step 2)
      services: formData.step2.services.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        detailedDescription: service.detailedDescription,
        price: service.price,
        images: service.images || []
      })),
      
      // SEO et informations étendues (Step 3)
      serviceCities: formData.step3.serviceCities,
      legalInfo: formData.step3.legalInfo,
      openingHours: formData.step3.openingHours,
      emergencyAvailable: formData.step3.emergencyAvailable,
      domain: formData.step3.domain,
      keywords: formData.step3.keywords
    }
  }

  // Génération complète d'un site avec le système de blocs
  generateSiteWithBlocks(options: {
    style?: 'ultra-pro' | 'premium' | 'standard' | 'minimal'
    includeLocalSeo?: boolean
    customBlocks?: string[]
  } = {}): {
    pages: Array<{
      filename: string
      title: string
      content: string
      type: string
      blocks: BlockComponent[]
    }>
    navigation: any[]
    linking: any
  } {
    const {
      style = 'ultra-pro',
      includeLocalSeo = true,
      customBlocks = []
    } = options

    const renderer = new BlockRenderer(this.templateData)
    const pages = []

    // 1. Page d'accueil avec composition complète
    const homePage = this.generateHomePage(style, customBlocks)
    pages.push({
      filename: 'index.html',
      title: homePage.seo.title,
      content: renderer.renderPageComposition(homePage),
      type: 'home',
      blocks: homePage.blocks
    })

    // 2. Pages de services individuelles
    this.templateData.services.forEach(service => {
      const servicePage = this.generateServicePage(service, style)
      pages.push({
        filename: `service-${service.id}.html`,
        title: servicePage.seo.title,
        content: renderer.renderPageComposition(servicePage),
        type: 'service',
        blocks: servicePage.blocks
      })
    })

    // 3. Pages SEO locales (service + ville)
    if (includeLocalSeo) {
      this.templateData.serviceCities.forEach(city => {
        this.templateData.services.forEach(service => {
          const localPage = this.generateLocalSeoPage(service, city, style)
          pages.push({
            filename: `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
            title: localPage.seo.title,
            content: renderer.renderPageComposition(localPage),
            type: 'local-seo',
            blocks: localPage.blocks
          })
        })
      })
    }

    // 4. Pages standard
    const contactPage = this.generateContactPage(style)
    pages.push({
      filename: 'contact.html',
      title: contactPage.seo.title,
      content: renderer.renderPageComposition(contactPage),
      type: 'contact',
      blocks: contactPage.blocks
    })

    const legalPage = this.generateLegalPage(style)
    pages.push({
      filename: 'mentions-legales.html',
      title: legalPage.seo.title,
      content: renderer.renderPageComposition(legalPage),
      type: 'legal',
      blocks: legalPage.blocks
    })

    // 5. Génération du maillage interne
    const linkingGenerator = new IntelligentLinkingGenerator(this.templateData, { pages })
    const linking = linkingGenerator.generateCompleteLinkingMatrix()

    return {
      pages,
      navigation: this.generateNavigation(),
      linking
    }
  }

  // Génération intelligente de la page d'accueil
  private generateHomePage(style: string, customBlocks: string[]): PageComposition {
    const blocks: BlockComponent[] = [
      // Hero Block - Toujours présent en premier
      {
        id: 'hero-home',
        type: 'hero',
        variant: this.selectVariantByStyle(style, 'hero'),
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          background: style === 'ultra-pro' ? 'gradient' : 'solid',
          animation: style === 'ultra-pro' ? 'parallax' : 'fade',
          ctaPrimary: 'Nos Services',
          ctaSecondary: 'Devis Gratuit'
        }
      },

      // Services Block - Services principaux
      {
        id: 'services-home',
        type: 'services',
        variant: this.selectVariantByStyle(style, 'services'),
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          layout: style === 'ultra-pro' ? 'grid' : 'list',
          animation: 'stagger',
          showPrices: true,
          maxServices: 6
        }
      }
    ]

    // Ajout conditionnel de blocs selon le style et les données disponibles
    if (style === 'ultra-pro' || customBlocks.includes('stats')) {
      blocks.push({
        id: 'stats-home',
        type: 'stats',
        variant: this.selectVariantByStyle(style, 'stats'),
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          animated: true,
          showProgress: style === 'ultra-pro'
        }
      })
    }

    // Témoignages si activé ou ultra-pro
    if (style === 'ultra-pro' || customBlocks.includes('testimonials')) {
      blocks.push({
        id: 'testimonials-home',
        type: 'testimonials',
        variant: this.selectVariantByStyle(style, 'testimonials'),
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          autoplay: true,
          showRatings: true,
          maxTestimonials: style === 'ultra-pro' ? 6 : 3
        }
      })
    }

    // Galerie pour certains métiers
    if (this.shouldIncludeGallery() || customBlocks.includes('gallery')) {
      blocks.push({
        id: 'gallery-home',
        type: 'gallery',
        variant: this.selectVariantByStyle(style, 'gallery'),
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          masonry: style === 'ultra-pro',
          lightbox: true,
          maxImages: 8
        }
      })
    }

    // CTA de fin - Toujours présent
    blocks.push({
      id: 'cta-home',
      type: 'cta',
      variant: this.selectVariantByStyle(style, 'cta'),
      style: this.getDesignStyle(),
      data: this.templateData,
      options: {
        urgent: this.templateData.emergencyAvailable,
        floating: style === 'minimal'
      }
    })

    return {
      type: 'home',
      style: this.getDesignStyle(),
      blocks,
      navigation: this.generateNavigation(),
      seo: this.generateSEO('home'),
      linking: { internal: [], contextual: [], recommendations: [] }
    }
  }

  // Génération de page de service individuelle
  private generateServicePage(service: any, style: string): PageComposition {
    const blocks: BlockComponent[] = [
      // Hero spécifique au service
      {
        id: `hero-service-${service.id}`,
        type: 'hero',
        variant: 'split',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          serviceSpecific: service,
          background: 'image',
          overlay: true
        }
      },

      // Détails du service
      {
        id: `services-detail-${service.id}`,
        type: 'services',
        variant: 'featured',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          featuredService: service,
          showDetails: true,
          showRelated: true
        }
      },

      // CTA spécifique
      {
        id: `cta-service-${service.id}`,
        type: 'cta',
        variant: 'banner',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          serviceSpecific: service,
          urgent: service.name.toLowerCase().includes('urgence')
        }
      }
    ]

    return {
      type: 'service',
      style: this.getDesignStyle(),
      blocks,
      navigation: this.generateNavigation(),
      seo: this.generateSEO('service', service),
      linking: { internal: [], contextual: [], recommendations: [] }
    }
  }

  // Génération de page SEO locale
  private generateLocalSeoPage(service: any, city: string, style: string): PageComposition {
    const blocks: BlockComponent[] = [
      // Hero géolocalisé
      {
        id: `hero-local-${service.id}-${city}`,
        type: 'hero',
        variant: 'ultra-pro',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          serviceSpecific: service,
          citySpecific: city,
          localSeo: true,
          background: 'gradient'
        }
      },

      // Services avec focus géographique
      {
        id: `services-local-${service.id}-${city}`,
        type: 'services',
        variant: 'list',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          featuredService: service,
          citySpecific: city,
          showLocalInfo: true
        }
      },

      // Témoignages locaux
      {
        id: `testimonials-local-${service.id}-${city}`,
        type: 'testimonials',
        variant: 'wall',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          citySpecific: city,
          serviceSpecific: service,
          maxTestimonials: 4
        }
      },

      // CTA avec géolocalisation
      {
        id: `cta-local-${service.id}-${city}`,
        type: 'cta',
        variant: 'ultra-pro',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          serviceSpecific: service,
          citySpecific: city,
          localSeo: true
        }
      }
    ]

    return {
      type: 'local-seo',
      style: this.getDesignStyle(),
      blocks,
      navigation: this.generateNavigation(),
      seo: this.generateSEO('local-seo', service, city),
      linking: { internal: [], contextual: [], recommendations: [] }
    }
  }

  // Génération de page de contact
  private generateContactPage(style: string): PageComposition {
    const blocks: BlockComponent[] = [
      // Hero contact
      {
        id: 'hero-contact',
        type: 'hero',
        variant: 'minimal',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          contactFocus: true,
          background: 'solid'
        }
      },

      // CTA contact avec informations complètes
      {
        id: 'cta-contact',
        type: 'cta',
        variant: 'split',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          contactForm: true,
          showMap: true,
          showHours: true
        }
      }
    ]

    return {
      type: 'contact',
      style: this.getDesignStyle(),
      blocks,
      navigation: this.generateNavigation(),
      seo: this.generateSEO('contact'),
      linking: { internal: [], contextual: [], recommendations: [] }
    }
  }

  // Génération de page légale
  private generateLegalPage(style: string): PageComposition {
    const blocks: BlockComponent[] = [
      // Hero minimal pour page légale
      {
        id: 'hero-legal',
        type: 'hero',
        variant: 'minimal',
        style: this.getDesignStyle(),
        data: this.templateData,
        options: {
          legalPage: true,
          title: 'Mentions Légales',
          subtitle: this.templateData.companyName
        }
      }
    ]

    return {
      type: 'legal',
      style: this.getDesignStyle(),
      blocks,
      navigation: this.generateNavigation(),
      seo: this.generateSEO('legal'),
      linking: { internal: [], contextual: [], recommendations: [] }
    }
  }

  // Méthodes utilitaires
  private selectVariantByStyle(style: string, blockType: string): string {
    const variants = {
      'ultra-pro': {
        hero: 'ultra-pro',
        services: 'ultra-pro',
        stats: 'ultra-pro',
        testimonials: 'ultra-pro',
        gallery: 'ultra-pro',
        cta: 'ultra-pro'
      },
      'premium': {
        hero: 'video',
        services: 'carousel',
        stats: 'animated',
        testimonials: 'carousel',
        gallery: 'masonry',
        cta: 'split'
      },
      'standard': {
        hero: 'standard',
        services: 'grid',
        stats: 'standard',
        testimonials: 'grid',
        gallery: 'grid',
        cta: 'standard'
      },
      'minimal': {
        hero: 'minimal',
        services: 'list',
        stats: 'minimal',
        testimonials: 'single',
        gallery: 'grid',
        cta: 'banner'
      }
    }

    return variants[style]?.[blockType] || 'standard'
  }

  private getDesignStyle(): string {
    const trade = this.templateData.trade.toLowerCase()
    if (trade.includes('électricien') || trade.includes('electrique')) return 'electricien'
    if (trade.includes('plombier') || trade.includes('plomberie')) return 'plombier'
    if (trade.includes('chauffagiste') || trade.includes('chauffage')) return 'chauffagiste'
    if (trade.includes('multi') || trade.includes('bâtiment')) return 'multi'
    return 'universal'
  }

  private shouldIncludeGallery(): boolean {
    // Inclure la galerie pour les métiers visuels
    const visualTrades = ['électricien', 'plombier', 'chauffagiste', 'maçon', 'peintre', 'menuisier']
    return visualTrades.some(trade => 
      this.templateData.trade.toLowerCase().includes(trade)
    )
  }

  private generateNavigation(): any[] {
    return [
      { label: 'Accueil', href: 'index.html' },
      {
        label: 'Services',
        href: '#services',
        children: this.templateData.services.map(service => ({
          label: service.name,
          href: `service-${service.id}.html`
        }))
      },
      { label: 'Contact', href: 'contact.html' },
      { label: 'Mentions Légales', href: 'mentions-legales.html' }
    ]
  }

  private generateSEO(pageType: string, service?: any, city?: string): any {
    const { companyName, trade, description, city: mainCity, keywords } = this.templateData

    const seoConfigs = {
      home: {
        title: `${companyName} - ${trade} ${mainCity}`,
        description: `${description} Devis gratuit et intervention rapide.`,
        keywords: [trade.toLowerCase(), mainCity.toLowerCase(), ...keywords]
      },
      service: {
        title: `${service.name} - ${companyName}`,
        description: `${service.description} par ${companyName} à ${mainCity}. ${service.detailedDescription}`,
        keywords: [service.name.toLowerCase(), trade.toLowerCase(), mainCity.toLowerCase()]
      },
      'local-seo': {
        title: `${service.name} ${city} - ${companyName}`,
        description: `${service.name} à ${city}. ${companyName}, votre ${trade.toLowerCase()} de confiance. Devis gratuit.`,
        keywords: [service.name.toLowerCase(), city.toLowerCase(), trade.toLowerCase()]
      },
      contact: {
        title: `Contact - ${companyName}`,
        description: `Contactez ${companyName} pour vos projets ${trade.toLowerCase()}. Devis gratuit et conseil personnalisé.`,
        keywords: ['contact', trade.toLowerCase(), mainCity.toLowerCase()]
      },
      legal: {
        title: `Mentions Légales - ${companyName}`,
        description: `Mentions légales de ${companyName}, ${trade.toLowerCase()} à ${mainCity}.`,
        keywords: ['mentions légales', companyName.toLowerCase()]
      }
    }

    return seoConfigs[pageType] || seoConfigs.home
  }
}

// Fonction principale d'export pour l'intégration API
export function generateSiteFromFormData(
  formData: AWEMAFormData,
  options: {
    style?: 'ultra-pro' | 'premium' | 'standard' | 'minimal'
    includeLocalSeo?: boolean
    customBlocks?: string[]
  } = {}
): {
  pages: any[]
  navigation: any[]
  linking: any
  analytics: {
    totalPages: number
    blockTypes: string[]
    seoScore: number
    recommendations: string[]
  }
} {
  const generator = new FormToBlocksGenerator(formData)
  const result = generator.generateSiteWithBlocks(options)

  // Analytics et recommandations
  const analytics = analyzeGeneratedSite(result)

  return {
    ...result,
    analytics
  }
}

// Analyse de la qualité du site généré
function analyzeGeneratedSite(siteData: any) {
  const blockTypes = new Set()
  let totalBlocks = 0

  siteData.pages.forEach(page => {
    page.blocks.forEach(block => {
      blockTypes.add(block.type)
      totalBlocks++
    })
  })

  // Calcul du score SEO
  let seoScore = 0
  const recommendations = []

  // Vérifications qualité
  if (blockTypes.has('hero')) seoScore += 20
  if (blockTypes.has('services')) seoScore += 20
  if (blockTypes.has('testimonials')) seoScore += 15
  if (blockTypes.has('stats')) seoScore += 10
  if (blockTypes.has('gallery')) seoScore += 10
  if (blockTypes.has('cta')) seoScore += 15

  // Nombre de pages SEO locales
  const localSeoPages = siteData.pages.filter(p => p.type === 'local-seo').length
  if (localSeoPages > 0) seoScore += Math.min(localSeoPages * 2, 10)

  // Recommandations
  if (!blockTypes.has('testimonials')) {
    recommendations.push('Ajouter des témoignages clients pour améliorer la crédibilité')
  }
  if (!blockTypes.has('stats')) {
    recommendations.push('Inclure des statistiques pour renforcer la confiance')
  }
  if (localSeoPages < 5) {
    recommendations.push('Augmenter le nombre de pages SEO locales pour améliorer le référencement')
  }
  if (totalBlocks < 15) {
    recommendations.push('Enrichir le contenu avec plus de blocs pour améliorer l\'engagement')
  }

  return {
    totalPages: siteData.pages.length,
    blockTypes: Array.from(blockTypes),
    seoScore: Math.min(seoScore, 100),
    recommendations
  }
}

// Migration des sites existants vers le système de blocs
export async function migrateLegacySiteToBlocks(
  siteId: string,
  templateData: any
): Promise<{
  success: boolean
  newBlocks: BlockComponent[]
  migrationReport: {
    convertedElements: string[]
    warnings: string[]
    recommendations: string[]
  }
}> {
  try {
    // Simuler les données formulaire à partir des données template
    const mockFormData: AWEMAFormData = {
      step1: {
        companyName: templateData.companyName || 'Entreprise',
        trade: templateData.trade || 'Artisan',
        description: templateData.description || '',
        ownerName: templateData.ownerName || '',
        email: templateData.email || '',
        phone: templateData.phone || '',
        address: templateData.address || '',
        city: templateData.city || ''
      },
      step2: {
        primaryColor: templateData.primaryColor || '#1e40af',
        secondaryColor: templateData.secondaryColor || '#3b82f6',
        logoUrl: templateData.logoUrl,
        services: templateData.services || []
      },
      step3: {
        serviceCities: templateData.serviceCities || [],
        legalInfo: templateData.legalInfo || {},
        openingHours: templateData.openingHours,
        emergencyAvailable: templateData.emergencyAvailable || false,
        domain: templateData.domain || '',
        keywords: templateData.keywords || []
      }
    }

    const generator = new FormToBlocksGenerator(mockFormData)
    const homePage = generator.generateHomePage('standard', [])

    return {
      success: true,
      newBlocks: homePage.blocks,
      migrationReport: {
        convertedElements: [
          'Hero section',
          'Services grid',
          'Contact information',
          'Company details'
        ],
        warnings: [
          'Certaines personnalisations CSS pourront être perdues',
          'Vérifier les couleurs et la mise en page après migration'
        ],
        recommendations: [
          'Utiliser le variant ultra-pro pour un design moderne',
          'Ajouter des témoignages et statistiques',
          'Optimiser le SEO avec plus de pages locales'
        ]
      }
    }
  } catch (error) {
    return {
      success: false,
      newBlocks: [],
      migrationReport: {
        convertedElements: [],
        warnings: [`Erreur de migration: ${error.message}`],
        recommendations: ['Contacter le support technique']
      }
    }
  }
}