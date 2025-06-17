// Intégration du système de blocs avec l'architecture existante AWEMA
import { BlockRenderer, PageCompositionFactory } from './block-registry'
import { TemplateData } from '../template'
import { SiteStructure, NavigationItem } from '../multi-page-generator'

// Intégration avec le générateur multi-page existant
export class BlockBasedSiteGenerator {
  private renderer: BlockRenderer
  
  constructor(private data: TemplateData) {
    this.renderer = new BlockRenderer(data)
  }

  // Génère la structure complète du site avec le nouveau système de blocs
  generateEnhancedSiteStructure(): SiteStructure {
    const pages = []
    const navigation = this.generateNavigation()
    
    // Page d'accueil ultra-pro
    const homeComposition = PageCompositionFactory.createUltraProHomePage(this.data)
    pages.push({
      filename: 'index.html',
      title: homeComposition.seo.title,
      content: this.renderer.renderPageComposition(homeComposition),
      type: 'home' as const
    })
    
    // Pages de services avec nouveau système
    this.data.services.forEach(service => {
      const serviceComposition = this.renderer.generatePageByType('service-detail', 'ultra-pro', {
        service
      })
      
      pages.push({
        filename: `service-${service.id}.html`,
        title: `${service.name} - ${this.data.companyName}`,
        content: this.renderer.renderPageComposition(serviceComposition),
        type: 'service' as const,
        serviceId: service.id
      })
    })
    
    // Page contact
    const contactComposition = this.renderer.generatePageByType('contact', 'standard')
    pages.push({
      filename: 'contact.html',
      title: contactComposition.seo.title,
      content: this.renderer.renderPageComposition(contactComposition),
      type: 'contact' as const
    })
    
    // Page mentions légales
    const legalComposition = this.renderer.generatePageByType('legal', 'minimal')
    pages.push({
      filename: 'mentions-legales.html',
      title: legalComposition.seo.title,
      content: this.renderer.renderPageComposition(legalComposition),
      type: 'legal' as const
    })
    
    // Pages SEO locales avec nouveau système
    this.data.serviceCities.forEach(city => {
      this.data.services.forEach(service => {
        const localComposition = PageCompositionFactory.createLocalSeoPage(
          this.data,
          service,
          city
        )
        
        pages.push({
          filename: `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
          title: `${service.name} ${city} - ${this.data.companyName}`,
          content: this.renderer.renderPageComposition(localComposition),
          type: 'local-seo' as const,
          serviceId: service.id,
          city
        })
      })
    })
    
    return { pages, navigation }
  }

  // Génère une page spécifique avec le système de blocs
  generateBlockBasedPage(
    pageType: 'home' | 'services' | 'service-detail' | 'contact' | 'about' | 'legal' | 'local-seo',
    style: string = 'ultra-pro',
    options: any = {}
  ): string {
    const composition = this.renderer.generatePageByType(pageType, style, options)
    return this.renderer.renderPageComposition(composition)
  }

  // Migration des templates existants vers le système de blocs
  migrateFromLegacyTemplate(legacyHtml: string): string {
    // Analyse du HTML existant pour extraire les données
    const extractedData = this.extractDataFromLegacyHtml(legacyHtml)
    
    // Génération avec le nouveau système
    const homeComposition = PageCompositionFactory.createUltraProHomePage({
      ...this.data,
      ...extractedData
    })
    
    return this.renderer.renderPageComposition(homeComposition)
  }

  // Génération adaptative selon le formulaire client
  generateFromFormData(formData: any): SiteStructure {
    // Adapter les données du formulaire au format TemplateData
    const adaptedData = this.adaptFormDataToTemplateData(formData)
    
    // Sélection automatique du style selon le métier
    const style = this.selectStyleFromTrade(adaptedData.trade)
    
    // Génération avec style adapté
    const generator = new BlockBasedSiteGenerator(adaptedData)
    return generator.generateEnhancedSiteStructure()
  }

  // Prévisualisation en temps réel
  generatePreview(blockType: string, variant: string, customData?: Partial<TemplateData>): string {
    const previewData = {
      ...this.data,
      ...customData
    }
    
    const previewRenderer = new BlockRenderer(previewData)
    
    const blockConfig = {
      id: `preview-${blockType}`,
      type: blockType as any,
      variant: variant,
      style: this.getDesignStyle(),
      data: previewData,
      options: {
        preview: true,
        showGrid: true
      }
    }
    
    return this.wrapPreview(previewRenderer.renderBlock(blockConfig), blockType, variant)
  }

  // Génération de templates A/B testing
  generateABVariants(pageType: string): Record<string, string> {
    const variants = {
      'ultra-pro': this.generateBlockBasedPage(pageType as any, 'ultra-pro'),
      'premium': this.generateBlockBasedPage(pageType as any, 'premium'),
      'standard': this.generateBlockBasedPage(pageType as any, 'standard'),
      'minimal': this.generateBlockBasedPage(pageType as any, 'minimal')
    }
    
    return variants
  }

  private generateNavigation(): NavigationItem[] {
    return [
      { label: 'Accueil', href: 'index.html' },
      {
        label: 'Services',
        href: '#services',
        children: this.data.services.map(service => ({
          label: service.name,
          href: `service-${service.id}.html`
        }))
      },
      { label: 'Contact', href: 'contact.html' }
    ]
  }

  private extractDataFromLegacyHtml(html: string): Partial<TemplateData> {
    // Extraction basique des données depuis l'HTML existant
    const extracted: Partial<TemplateData> = {}
    
    // Extraction du titre
    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    if (titleMatch) {
      extracted.companyName = titleMatch[1].split(' - ')[0]
    }
    
    // Extraction de la description
    const descMatch = html.match(/<meta name="description" content="(.*?)"/i)
    if (descMatch) {
      extracted.description = descMatch[1]
    }
    
    // Extraction des couleurs CSS
    const colorMatch = html.match(/--primary-color:\s*(#[a-fA-F0-9]{6})/i)
    if (colorMatch) {
      extracted.primaryColor = colorMatch[1]
    }
    
    return extracted
  }

  private adaptFormDataToTemplateData(formData: any): TemplateData {
    // Adaptation des données du formulaire client au format TemplateData
    return {
      companyName: formData.companyName || "Mon Entreprise",
      trade: formData.trade || "Artisan",
      description: formData.description || "Professionnel qualifié",
      
      ownerName: formData.ownerName || "Propriétaire",
      email: formData.email || "contact@entreprise.fr",
      phone: formData.phone || "01 23 45 67 89",
      address: formData.address || "1 Rue de la Paix",
      city: formData.city || "Paris",
      
      primaryColor: formData.primaryColor || this.getDefaultColor(formData.trade),
      secondaryColor: formData.secondaryColor || this.getDefaultSecondaryColor(formData.trade),
      logoUrl: formData.logoUrl,
      
      services: formData.services || this.getDefaultServices(formData.trade),
      serviceCities: formData.serviceCities || [formData.city],
      
      legalInfo: {
        siret: formData.siret,
        vatNumber: formData.vatNumber,
        legalForm: formData.legalForm || "SARL",
        capital: formData.capital,
        rcs: formData.rcs,
        address: formData.address || "1 Rue de la Paix",
        city: formData.city || "Paris",
        postalCode: formData.postalCode || "75001"
      },
      
      openingHours: formData.openingHours,
      emergencyAvailable: formData.emergencyAvailable || false,
      
      domain: formData.domain || "mon-entreprise.fr",
      keywords: formData.keywords || [formData.trade?.toLowerCase(), formData.city?.toLowerCase()].filter(Boolean)
    }
  }

  private selectStyleFromTrade(trade: string): string {
    if (trade?.toLowerCase().includes('électricien')) return 'ultra-pro'
    if (trade?.toLowerCase().includes('plombier')) return 'ultra-pro'
    if (trade?.toLowerCase().includes('chauffagiste')) return 'ultra-pro'
    return 'standard'
  }

  private getDesignStyle(): string {
    if (this.data.trade.toLowerCase().includes('électricien')) return 'electricien'
    if (this.data.trade.toLowerCase().includes('plombier')) return 'plombier'
    if (this.data.trade.toLowerCase().includes('chauffagiste')) return 'chauffagiste'
    if (this.data.trade.toLowerCase().includes('artisan')) return 'multi'
    return 'universal'
  }

  private getDefaultColor(trade: string): string {
    const colors = {
      'électricien': '#1e40af',
      'plombier': '#0ea5e9',
      'chauffagiste': '#ea580c',
      'artisan': '#7c3aed'
    }
    
    const tradeLower = trade?.toLowerCase() || ''
    for (const [key, color] of Object.entries(colors)) {
      if (tradeLower.includes(key)) return color
    }
    
    return '#1f2937'
  }

  private getDefaultSecondaryColor(trade: string): string {
    const colors = {
      'électricien': '#3b82f6',
      'plombier': '#06b6d4',
      'chauffagiste': '#dc2626',
      'artisan': '#8b5cf6'
    }
    
    const tradeLower = trade?.toLowerCase() || ''
    for (const [key, color] of Object.entries(colors)) {
      if (tradeLower.includes(key)) return color
    }
    
    return '#374151'
  }

  private getDefaultServices(trade: string): any[] {
    const servicesByTrade = {
      'électricien': [
        {
          id: 'installation',
          name: 'Installation Électrique',
          description: 'Installation complète de systèmes électriques',
          detailedDescription: 'Installation aux normes NF C 15-100',
          price: 'À partir de 150€'
        },
        {
          id: 'depannage',
          name: 'Dépannage Urgence',
          description: 'Service de dépannage 24h/7j',
          detailedDescription: 'Intervention rapide pour toutes pannes',
          price: 'Devis gratuit'
        }
      ],
      'plombier': [
        {
          id: 'installation-sanitaire',
          name: 'Installation Sanitaire',
          description: 'Installation complète de plomberie',
          detailedDescription: 'Salle de bain, cuisine, WC',
          price: 'À partir de 200€'
        },
        {
          id: 'depannage-fuite',
          name: 'Dépannage Fuite',
          description: 'Réparation de fuites d\'eau',
          detailedDescription: 'Intervention rapide 24h/7j',
          price: 'Devis gratuit'
        }
      ],
      'chauffagiste': [
        {
          id: 'pompe-chaleur',
          name: 'Pompe à Chaleur',
          description: 'Installation de pompe à chaleur',
          detailedDescription: 'Solutions énergétiques performantes',
          price: 'À partir de 8000€'
        },
        {
          id: 'chaudiere',
          name: 'Installation Chaudière',
          description: 'Installation et remplacement de chaudières',
          detailedDescription: 'Chaudières gaz, fioul, électrique',
          price: 'À partir de 3000€'
        }
      ]
    }
    
    const tradeLower = trade?.toLowerCase() || ''
    for (const [key, services] of Object.entries(servicesByTrade)) {
      if (tradeLower.includes(key)) return services
    }
    
    return [
      {
        id: 'service-principal',
        name: 'Service Principal',
        description: 'Notre service principal',
        detailedDescription: 'Description détaillée du service',
        price: 'Sur devis'
      }
    ]
  }

  private wrapPreview(content: string, blockType: string, variant: string): string {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Prévisualisation: ${blockType} - ${variant}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            body { 
              margin: 0; 
              font-family: 'Inter', sans-serif; 
              background: #f5f5f5;
            }
            .preview-header {
              background: #1f2937;
              color: white;
              padding: 1rem;
              text-align: center;
              font-weight: 600;
            }
            .preview-container { 
              background: white;
              min-height: calc(100vh - 60px);
            }
          </style>
      </head>
      <body>
          <div class="preview-header">
              Prévisualisation: ${blockType} (${variant})
          </div>
          <div class="preview-container">
              ${content}
          </div>
      </body>
      </html>
    `
  }
}

// Fonction utilitaire pour intégrer facilement avec l'API existante
export function generateSiteWithBlocks(data: TemplateData): SiteStructure {
  const generator = new BlockBasedSiteGenerator(data)
  return generator.generateEnhancedSiteStructure()
}

// Migration progressive depuis l'ancien système
export function migrateToBlockSystem(data: TemplateData, legacyPages?: any[]): SiteStructure {
  const generator = new BlockBasedSiteGenerator(data)
  
  // Utiliser le nouveau système pour toutes les pages
  const newStructure = generator.generateEnhancedSiteStructure()
  
  // Conserver certaines pages legacy si nécessaire
  if (legacyPages) {
    legacyPages.forEach(legacyPage => {
      if (!newStructure.pages.find(p => p.filename === legacyPage.filename)) {
        newStructure.pages.push({
          ...legacyPage,
          content: generator.migrateFromLegacyTemplate(legacyPage.content)
        })
      }
    })
  }
  
  return newStructure
}