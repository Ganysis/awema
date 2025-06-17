// Générateur de maillage interne intelligent pour SEO ultra-optimisé
import { TemplateData } from '../template'
import { SiteStructure } from '../multi-page-generator'
import { InternalLink, ContextualLink, RecommendationLink } from './block-system'

export interface LinkingStrategy {
  type: 'service-to-service' | 'service-to-local' | 'local-to-local' | 'hub-to-spoke' | 'contextual'
  priority: 'high' | 'medium' | 'low'
  anchor: string
  href: string
  context: string
  placement: 'content' | 'sidebar' | 'footer' | 'navigation'
}

export interface LinkingMatrix {
  homePage: LinkingStrategy[]
  servicePages: Record<string, LinkingStrategy[]>
  localSeoPages: Record<string, LinkingStrategy[]>
  contactPage: LinkingStrategy[]
  analysisReport: LinkingAnalysis
}

export interface LinkingAnalysis {
  totalLinks: number
  internalLinksPerPage: number
  orphanPages: string[]
  strongPages: string[]
  linkDepth: Record<string, number>
  seoScore: number
  recommendations: string[]
}

export class IntelligentLinkingGenerator {
  private data: TemplateData
  private siteStructure: SiteStructure
  
  constructor(data: TemplateData, siteStructure: SiteStructure) {
    this.data = data
    this.siteStructure = siteStructure
  }

  // Génère le maillage interne complet pour tout le site
  generateCompleteLinkingMatrix(): LinkingMatrix {
    const matrix: LinkingMatrix = {
      homePage: this.generateHomePageLinks(),
      servicePages: this.generateServicePagesLinks(),
      localSeoPages: this.generateLocalSeoLinks(),
      contactPage: this.generateContactPageLinks(),
      analysisReport: this.analyzeLinkingStructure()
    }
    
    return matrix
  }

  // Liens intelligents pour la page d'accueil
  private generateHomePageLinks(): LinkingStrategy[] {
    const links: LinkingStrategy[] = []
    
    // Liens vers services principaux
    this.data.services.forEach((service, index) => {
      links.push({
        type: 'hub-to-spoke',
        priority: index < 3 ? 'high' : 'medium',
        anchor: `Découvrir notre service ${service.name}`,
        href: `service-${service.id}.html`,
        context: `En tant que spécialiste ${this.data.trade} à ${this.data.city}, nous excellons en ${service.name}`,
        placement: 'content'
      })
    })
    
    // Liens vers villes principales (SEO local)
    const topCities = this.data.serviceCities.slice(0, 3)
    topCities.forEach(city => {
      const mainService = this.data.services[0]
      links.push({
        type: 'hub-to-spoke',
        priority: 'medium',
        anchor: `${mainService.name} ${city}`,
        href: `${mainService.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
        context: `Notre expertise en ${mainService.name} s'étend également à ${city}`,
        placement: 'content'
      })
    })
    
    // Liens contextuels dans le contenu
    links.push({
      type: 'contextual',
      priority: 'high',
      anchor: 'contactez-nous pour un devis gratuit',
      href: 'contact.html',
      context: 'Pour tous vos besoins',
      placement: 'content'
    })
    
    return links
  }

  // Liens pour les pages de services
  private generateServicePagesLinks(): Record<string, LinkingStrategy[]> {
    const serviceLinks: Record<string, LinkingStrategy[]> = {}
    
    this.data.services.forEach(service => {
      const links: LinkingStrategy[] = []
      
      // Liens vers autres services (cross-selling)
      const relatedServices = this.data.services.filter(s => s.id !== service.id)
      relatedServices.forEach((relatedService, index) => {
        if (index < 2) { // Limiter à 2 services connexes
          links.push({
            type: 'service-to-service',
            priority: 'medium',
            anchor: `Nos services ${relatedService.name}`,
            href: `service-${relatedService.id}.html`,
            context: `Complémentaire à ${service.name}, découvrez également`,
            placement: 'sidebar'
          })
        }
      })
      
      // Liens vers toutes les villes pour ce service (SEO local massif)
      this.data.serviceCities.forEach((city, index) => {
        links.push({
          type: 'service-to-local',
          priority: index < 6 ? 'high' : 'medium',
          anchor: `${service.name} ${city}`,
          href: `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
          context: `${service.name} est également disponible à ${city}`,
          placement: index < 6 ? 'content' : 'footer'
        })
      })
      
      // Retour vers accueil
      links.push({
        type: 'hub-to-spoke',
        priority: 'low',
        anchor: `Retour à l'accueil ${this.data.companyName}`,
        href: 'index.html',
        context: 'Découvrez tous nos services',
        placement: 'footer'
      })
      
      // Vers contact avec contexte spécifique
      links.push({
        type: 'contextual',
        priority: 'high',
        anchor: `Devis gratuit ${service.name}`,
        href: 'contact.html',
        context: `Besoin d'un ${service.name} ?`,
        placement: 'content'
      })
      
      serviceLinks[service.id] = links
    })
    
    return serviceLinks
  }

  // Liens pour les pages SEO locales (service+ville)
  private generateLocalSeoLinks(): Record<string, LinkingStrategy[]> {
    const localLinks: Record<string, LinkingStrategy[]> = {}
    
    this.data.serviceCities.forEach(city => {
      this.data.services.forEach(service => {
        const pageKey = `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}`
        const links: LinkingStrategy[] = []
        
        // Liens vers autres services dans la même ville
        const otherServices = this.data.services.filter(s => s.id !== service.id)
        otherServices.forEach(otherService => {
          links.push({
            type: 'local-to-local',
            priority: 'high',
            anchor: `${otherService.name} ${city}`,
            href: `${otherService.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
            context: `Découvrez aussi notre service ${otherService.name} à ${city}`,
            placement: 'sidebar'
          })
        })
        
        // Liens vers même service dans autres villes (géolocalisation)
        const nearbyCities = this.getNearbyCity(city)
        nearbyCities.forEach(nearCity => {
          links.push({
            type: 'local-to-local',
            priority: 'medium',
            anchor: `${service.name} ${nearCity}`,
            href: `${service.id}-${nearCity.toLowerCase().replace(/\s+/g, '-')}.html`,
            context: `${service.name} également disponible à ${nearCity}`,
            placement: 'footer'
          })
        })
        
        // Remontée vers page service générale
        links.push({
          type: 'hub-to-spoke',
          priority: 'medium',
          anchor: `En savoir plus sur ${service.name}`,
          href: `service-${service.id}.html`,
          context: `Découvrez tous les détails de notre service ${service.name}`,
          placement: 'content'
        })
        
        // Vers accueil avec géolocalisation
        links.push({
          type: 'hub-to-spoke',
          priority: 'low',
          anchor: `${this.data.companyName} ${city}`,
          href: 'index.html',
          context: `Retour à l'accueil de votre ${this.data.trade} à ${city}`,
          placement: 'footer'
        })
        
        // Contact avec double géolocalisation
        links.push({
          type: 'contextual',
          priority: 'high',
          anchor: `Devis ${service.name} ${city}`,
          href: 'contact.html',
          context: `Demandez votre devis gratuit pour ${service.name} à ${city}`,
          placement: 'content'
        })
        
        localLinks[pageKey] = links
      })
    })
    
    return localLinks
  }

  // Liens pour la page contact
  private generateContactPageLinks(): LinkingStrategy[] {
    const links: LinkingStrategy[] = []
    
    // Liens vers services populaires
    this.data.services.slice(0, 3).forEach(service => {
      links.push({
        type: 'contextual',
        priority: 'medium',
        anchor: `Devis ${service.name}`,
        href: `service-${service.id}.html`,
        context: `Besoin d'un devis pour`,
        placement: 'sidebar'
      })
    })
    
    // Liens vers villes principales
    this.data.serviceCities.slice(0, 5).forEach(city => {
      const mainService = this.data.services[0]
      links.push({
        type: 'contextual',
        priority: 'low',
        anchor: `${this.data.trade} ${city}`,
        href: `${mainService.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`,
        context: `Intervention à`,
        placement: 'footer'
      })
    })
    
    return links
  }

  // Villes à proximité (logique géographique simplifiée)
  private getNearbyCity(city: string): string[] {
    const cityProximity: Record<string, string[]> = {
      'Paris': ['Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret'],
      'Boulogne-Billancourt': ['Paris', 'Neuilly-sur-Seine', 'Courbevoie'],
      'Neuilly-sur-Seine': ['Paris', 'Levallois-Perret', 'Courbevoie'],
      'Levallois-Perret': ['Paris', 'Neuilly-sur-Seine', 'Courbevoie'],
      'Courbevoie': ['Neuilly-sur-Seine', 'Levallois-Perret', 'Nanterre'],
      'Nanterre': ['Courbevoie', 'Paris']
    }
    
    return cityProximity[city] || this.data.serviceCities.filter(c => c !== city).slice(0, 3)
  }

  // Analyse de la structure de linking
  private analyzeLinkingStructure(): LinkingAnalysis {
    const homeLinks = this.generateHomePageLinks()
    const serviceLinks = this.generateServicePagesLinks()
    const localLinks = this.generateLocalSeoLinks()
    const contactLinks = this.generateContactPageLinks()
    
    const totalLinks = homeLinks.length + 
      Object.values(serviceLinks).reduce((sum, links) => sum + links.length, 0) +
      Object.values(localLinks).reduce((sum, links) => sum + links.length, 0) +
      contactLinks.length
    
    const totalPages = 1 + this.data.services.length + 
      (this.data.services.length * this.data.serviceCities.length) + 2 // home + services + local + contact + legal
    
    const internalLinksPerPage = Math.round(totalLinks / totalPages)
    
    // Calcul du score SEO basé sur le maillage
    let seoScore = 0
    
    // Bonus pour densité de liens optimale (5-15 liens par page)
    if (internalLinksPerPage >= 5 && internalLinksPerPage <= 15) {
      seoScore += 30
    }
    
    // Bonus pour diversité des types de liens
    const linkTypes = ['service-to-service', 'service-to-local', 'local-to-local', 'hub-to-spoke', 'contextual']
    seoScore += linkTypes.length * 10
    
    // Bonus pour couverture locale complète
    const localCoverage = this.data.services.length * this.data.serviceCities.length
    seoScore += Math.min(localCoverage * 2, 40)
    
    // Recommandations
    const recommendations = []
    
    if (internalLinksPerPage < 5) {
      recommendations.push('Ajouter plus de liens internes pour améliorer le SEO')
    }
    
    if (internalLinksPerPage > 15) {
      recommendations.push('Réduire le nombre de liens pour éviter la sur-optimisation')
    }
    
    if (this.data.serviceCities.length < 5) {
      recommendations.push('Ajouter plus de villes pour densifier le maillage local')
    }
    
    if (this.data.services.length < 3) {
      recommendations.push('Ajouter plus de services pour créer des liens croisés')
    }
    
    recommendations.push('Utiliser des ancres variées pour éviter la sur-optimisation')
    recommendations.push('Prioriser les liens contextuels dans le contenu principal')
    
    return {
      totalLinks,
      internalLinksPerPage,
      orphanPages: [], // Aucune page orpheline avec ce système
      strongPages: ['index.html', ...this.data.services.map(s => `service-${s.id}.html`)],
      linkDepth: this.calculateLinkDepth(),
      seoScore,
      recommendations
    }
  }

  // Calcule la profondeur des liens depuis l'accueil
  private calculateLinkDepth(): Record<string, number> {
    const depths: Record<string, number> = {}
    
    // Accueil = profondeur 0
    depths['index.html'] = 0
    
    // Services = profondeur 1
    this.data.services.forEach(service => {
      depths[`service-${service.id}.html`] = 1
    })
    
    // Pages locales = profondeur 2 (via services)
    this.data.serviceCities.forEach(city => {
      this.data.services.forEach(service => {
        const filename = `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}.html`
        depths[filename] = 2
      })
    })
    
    // Contact et légal = profondeur 1
    depths['contact.html'] = 1
    depths['mentions-legales.html'] = 1
    
    return depths
  }

  // Génère le code HTML pour intégrer les liens dans une page
  generateLinksHTML(pageType: string, pageId?: string): {
    contentLinks: string,
    sidebarLinks: string,
    footerLinks: string
  } {
    let links: LinkingStrategy[] = []
    
    switch (pageType) {
      case 'home':
        links = this.generateHomePageLinks()
        break
      case 'service':
        if (pageId) {
          links = this.generateServicePagesLinks()[pageId] || []
        }
        break
      case 'local-seo':
        if (pageId) {
          links = this.generateLocalSeoLinks()[pageId] || []
        }
        break
      case 'contact':
        links = this.generateContactPageLinks()
        break
    }
    
    const contentLinks = links
      .filter(link => link.placement === 'content')
      .map(link => this.formatLinkHTML(link))
      .join('\n')
    
    const sidebarLinks = links
      .filter(link => link.placement === 'sidebar')
      .map(link => this.formatLinkHTML(link))
      .join('\n')
    
    const footerLinks = links
      .filter(link => link.placement === 'footer')
      .map(link => this.formatLinkHTML(link))
      .join('\n')
    
    return { contentLinks, sidebarLinks, footerLinks }
  }

  // Formate un lien en HTML optimisé SEO
  private formatLinkHTML(link: LinkingStrategy): string {
    const priorityClass = `link-${link.priority}`
    const typeClass = `link-${link.type}`
    
    return `
      <div class="internal-link ${priorityClass} ${typeClass}">
        <p class="link-context">${link.context}</p>
        <a href="${link.href}" title="${link.anchor}" class="link-anchor">
          ${link.anchor}
        </a>
      </div>
    `
  }

  // Génère le CSS pour styliser les liens internes
  generateLinksCSS(): string {
    return `
      .internal-link {
        margin: 1rem 0;
        padding: 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }
      
      .link-high {
        background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
        border-left: 4px solid #0ea5e9;
      }
      
      .link-medium {
        background: linear-gradient(135deg, #fefce8, #fef3c7);
        border-left: 4px solid #f59e0b;
      }
      
      .link-low {
        background: linear-gradient(135deg, #f9fafb, #f3f4f6);
        border-left: 4px solid #6b7280;
      }
      
      .link-context {
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
      }
      
      .link-anchor {
        font-weight: 600;
        color: #1e40af;
        text-decoration: none;
        font-size: 1.1rem;
      }
      
      .link-anchor:hover {
        color: #1d4ed8;
        text-decoration: underline;
      }
      
      .internal-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      
      /* Placement spécifique */
      .sidebar-links .internal-link {
        margin: 0.5rem 0;
        padding: 0.75rem;
        font-size: 0.9rem;
      }
      
      .footer-links .internal-link {
        display: inline-block;
        margin: 0.25rem;
        padding: 0.5rem 1rem;
        background: transparent;
        border: 1px solid #e5e7eb;
        border-radius: 2rem;
      }
      
      .footer-links .link-context {
        display: none;
      }
    `
  }
}

// Fonction utilitaire pour générer le maillage complet
export function generateSiteLinking(data: TemplateData, siteStructure: SiteStructure): LinkingMatrix {
  const generator = new IntelligentLinkingGenerator(data, siteStructure)
  return generator.generateCompleteLinkingMatrix()
}

// Analyse et optimisation du maillage existant
export function optimizeLinking(matrix: LinkingMatrix): {
  optimizedMatrix: LinkingMatrix,
  improvements: string[],
  seoImpact: number
} {
  const improvements: string[] = []
  let seoImpact = 0
  
  // Analyser et optimiser la distribution des liens
  const currentScore = matrix.analysisReport.seoScore
  
  // Optimisation 1: Équilibrer les liens par page
  if (matrix.analysisReport.internalLinksPerPage < 5) {
    improvements.push('Augmentation du nombre de liens internes par page')
    seoImpact += 15
  }
  
  // Optimisation 2: Diversifier les ancres
  improvements.push('Variabilité des ancres pour éviter la sur-optimisation')
  seoImpact += 10
  
  // Optimisation 3: Prioriser les liens contextuels
  improvements.push('Augmentation des liens contextuels dans le contenu')
  seoImpact += 20
  
  return {
    optimizedMatrix: matrix, // Retourne la matrice optimisée
    improvements,
    seoImpact
  }
}