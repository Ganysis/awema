// Registre et moteur de rendu pour le système de blocs
import { BaseBlock, BlockType, BlockComponent, PageComposition } from './block-system'
import { HeroBlock } from './hero-block'
import { ServicesBlock } from './services-block'
import { CTABlock } from './cta-block'
import { TestimonialsBlock } from './testimonials-block'
import { StatsBlock } from './stats-block'
import { GalleryBlock } from './gallery-block'
import { TemplateData } from '../template'

// Registre centralisé des blocs
export class BlockRegistry {
  private static blocks = new Map<BlockType, typeof BaseBlock>([
    ['hero', HeroBlock],
    ['services', ServicesBlock],
    ['cta', CTABlock],
    ['testimonials', TestimonialsBlock],
    ['stats', StatsBlock],
    ['gallery', GalleryBlock]
  ])

  static register(type: BlockType, blockClass: typeof BaseBlock) {
    this.blocks.set(type, blockClass)
  }

  static create(
    type: BlockType, 
    data: TemplateData, 
    options: any = {}
  ): BaseBlock {
    const BlockClass = this.blocks.get(type)
    if (!BlockClass) {
      throw new Error(`Block type '${type}' not found in registry`)
    }
    return new BlockClass(data, options)
  }

  static getAvailableTypes(): BlockType[] {
    return Array.from(this.blocks.keys())
  }

  static getBlockVariants(type: BlockType): string[] {
    const BlockClass = this.blocks.get(type)
    if (!BlockClass) return []
    
    // Créer une instance temporaire pour récupérer les variants
    try {
      const tempInstance = new BlockClass({} as TemplateData, {})
      return tempInstance.variants
    } catch {
      return []
    }
  }
}

// Moteur de rendu intelligent
export class BlockRenderer {
  private data: TemplateData
  
  constructor(data: TemplateData) {
    this.data = data
  }

  // Rendu d'une composition de page complète
  renderPageComposition(composition: PageComposition): string {
    const { blocks, navigation, seo, linking } = composition
    
    const renderedBlocks = blocks.map(blockConfig => 
      this.renderBlock(blockConfig)
    ).join('\n')
    
    return this.wrapInLayout(renderedBlocks, composition)
  }

  // Rendu d'un bloc individuel
  renderBlock(blockConfig: BlockComponent): string {
    try {
      const block = BlockRegistry.create(
        blockConfig.type, 
        this.data, 
        blockConfig.options
      )
      
      return block.render(blockConfig.variant)
    } catch (error) {
      console.error(`Error rendering block ${blockConfig.type}:`, error)
      return this.renderErrorBlock(blockConfig)
    }
  }

  // Génération automatique d'une page selon son type
  generatePageByType(
    pageType: 'home' | 'services' | 'service-detail' | 'contact' | 'about' | 'legal' | 'local-seo',
    style: string = 'universal',
    options: any = {}
  ): PageComposition {
    
    switch (pageType) {
      case 'home':
        return this.generateHomePage(style, options)
      case 'services':
        return this.generateServicesPage(style, options)
      case 'service-detail':
        return this.generateServiceDetailPage(style, options)
      case 'contact':
        return this.generateContactPage(style, options)
      case 'about':
        return this.generateAboutPage(style, options)
      case 'legal':
        return this.generateLegalPage(style, options)
      case 'local-seo':
        return this.generateLocalSeoPage(style, options)
      default:
        throw new Error(`Unknown page type: ${pageType}`)
    }
  }

  private generateHomePage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'home',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-home',
          type: 'hero',
          variant: this.selectHeroVariant(style),
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            background: 'gradient',
            animation: 'parallax'
          }
        },
        {
          id: 'services-home',
          type: 'services',
          variant: this.selectServicesVariant(style),
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            layout: 'grid',
            animation: 'fade'
          }
        },
        {
          id: 'stats-home',
          type: 'stats',
          variant: style === 'ultra-pro' ? 'ultra-pro' : 'animated',
          style: this.getDesignStyle(),
          data: this.data,
          options: options
        },
        {
          id: 'testimonials-home',
          type: 'testimonials',
          variant: style === 'ultra-pro' ? 'ultra-pro' : 'carousel',
          style: this.getDesignStyle(),
          data: this.data,
          options: options
        },
        {
          id: 'gallery-home',
          type: 'gallery',
          variant: style === 'ultra-pro' ? 'ultra-pro' : 'grid',
          style: this.getDesignStyle(),
          data: this.data,
          options: options
        },
        {
          id: 'cta-home',
          type: 'cta',
          variant: style === 'ultra-pro' ? 'ultra-pro' : 'standard',
          style: this.getDesignStyle(),
          data: this.data,
          options: options
        }
      ],
      navigation,
      seo: this.generateSEO('home'),
      linking: this.generateLinking('home')
    }
  }

  private generateServicesPage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'services',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-services',
          type: 'hero',
          variant: 'minimal',
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            background: 'solid'
          }
        },
        {
          id: 'services-list',
          type: 'services',
          variant: 'list',
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            layout: 'list',
            animation: 'slide'
          }
        }
      ],
      navigation,
      seo: this.generateSEO('services'),
      linking: this.generateLinking('services')
    }
  }

  private generateServiceDetailPage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'service-detail',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-service',
          type: 'hero',
          variant: 'split',
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            background: 'image'
          }
        }
      ],
      navigation,
      seo: this.generateSEO('service-detail'),
      linking: this.generateLinking('service-detail')
    }
  }

  private generateContactPage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'contact',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-contact',
          type: 'hero',
          variant: 'minimal',
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            background: 'solid'
          }
        }
      ],
      navigation,
      seo: this.generateSEO('contact'),
      linking: this.generateLinking('contact')
    }
  }

  private generateAboutPage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'about',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-about',
          type: 'hero',
          variant: 'standard',
          style: this.getDesignStyle(),
          data: this.data,
          options: options
        }
      ],
      navigation,
      seo: this.generateSEO('about'),
      linking: this.generateLinking('about')
    }
  }

  private generateLegalPage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'legal',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-legal',
          type: 'hero',
          variant: 'minimal',
          style: this.getDesignStyle(),
          data: this.data,
          options: options
        }
      ],
      navigation,
      seo: this.generateSEO('legal'),
      linking: this.generateLinking('legal')
    }
  }

  private generateLocalSeoPage(style: string, options: any): PageComposition {
    const navigation = this.generateNavigation()
    
    return {
      type: 'local-seo',
      style: this.getDesignStyle(),
      blocks: [
        {
          id: 'hero-local',
          type: 'hero',
          variant: 'ultra-pro',
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            background: 'gradient',
            animation: 'parallax'
          }
        },
        {
          id: 'services-local',
          type: 'services',
          variant: 'featured',
          style: this.getDesignStyle(),
          data: this.data,
          options: {
            ...options,
            layout: 'featured'
          }
        }
      ],
      navigation,
      seo: this.generateSEO('local-seo'),
      linking: this.generateLinking('local-seo')
    }
  }

  private selectHeroVariant(style: string): string {
    // Sélection intelligente du variant Hero selon le style
    const variants = {
      'ultra-pro': 'ultra-pro',
      'premium': 'video',
      'standard': 'standard',
      'minimal': 'minimal'
    }
    
    return variants[style] || 'ultra-pro'
  }

  private selectServicesVariant(style: string): string {
    // Sélection intelligente du variant Services selon le style
    const variants = {
      'ultra-pro': 'ultra-pro',
      'premium': 'carousel',
      'standard': 'grid',
      'minimal': 'list'
    }
    
    return variants[style] || 'ultra-pro'
  }

  private getDesignStyle(): any {
    if (this.data.trade.toLowerCase().includes('électricien')) return 'electricien'
    if (this.data.trade.toLowerCase().includes('plombier')) return 'plombier'
    if (this.data.trade.toLowerCase().includes('chauffagiste')) return 'chauffagiste'
    if (this.data.trade.toLowerCase().includes('artisan')) return 'multi'
    return 'universal'
  }

  private generateNavigation(): any[] {
    return [
      { label: 'Accueil', href: 'index.html' },
      {
        label: 'Services',
        href: '#',
        children: this.data.services.map(service => ({
          label: service.name,
          href: `service-${service.id}.html`
        }))
      },
      { label: 'Contact', href: 'contact.html' }
    ]
  }

  private generateSEO(pageType: string): any {
    const titles = {
      home: `${this.data.companyName} - ${this.data.trade} ${this.data.city}`,
      services: `Nos Services - ${this.data.companyName}`,
      'service-detail': `{serviceName} - ${this.data.companyName}`,
      contact: `Contact - ${this.data.companyName}`,
      about: `À propos - ${this.data.companyName}`,
      legal: `Mentions Légales - ${this.data.companyName}`,
      'local-seo': `{serviceName} {city} - ${this.data.companyName}`
    }
    
    return {
      title: titles[pageType] || titles.home,
      description: this.data.description,
      keywords: this.data.keywords || [],
      schema: this.generateSchema(pageType)
    }
  }

  private generateLinking(pageType: string): any {
    return {
      internal: [],
      contextual: [],
      recommendations: []
    }
  }

  private generateSchema(pageType: string): any {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": this.data.companyName,
      "description": this.data.description,
      "telephone": this.data.phone,
      "email": this.data.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": this.data.address,
        "addressLocality": this.data.city,
        "addressCountry": "FR"
      }
    }
    
    return baseSchema
  }

  private wrapInLayout(content: string, composition: PageComposition): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${composition.seo.title}</title>
    <meta name="description" content="${composition.seo.description}">
    
    <!-- Polices Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    ${composition.seo.schema ? `
    <script type="application/ld+json">
    ${JSON.stringify(composition.seo.schema, null, 2)}
    </script>
    ` : ''}
</head>
<body>
    ${this.generateHeader(composition.navigation)}
    
    <main>
        ${content}
    </main>
    
    ${this.generateFooter()}
    
    <script>
        ${this.generateJavaScript()}
    </script>
</body>
</html>`
  }

  private generateHeader(navigation: any[]): string {
    return `
    <header class="header" id="header">
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    ${this.data.companyName}
                </a>
                
                <nav>
                    <ul class="nav-menu">
                        ${navigation.map(item => `
                            <li class="nav-item">
                                <a href="${item.href}" class="nav-link">${item.label}</a>
                                ${item.children ? `
                                    <div class="dropdown">
                                        ${item.children.map((child: any) => `
                                            <a href="${child.href}" class="dropdown-link">${child.label}</a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </li>
                        `).join('')}
                    </ul>
                </nav>
                
                <div class="header-contact">
                    <a href="tel:${this.data.phone}" class="contact-phone">
                        📞 ${this.data.phone}
                    </a>
                    <a href="contact.html" class="btn-primary">
                        Devis Gratuit
                    </a>
                </div>
            </div>
        </div>
    </header>
    `
  }

  private generateFooter(): string {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3>${this.data.companyName}</h3>
                <p>${this.data.trade} professionnel à ${this.data.city}</p>
                <p>📞 ${this.data.phone} • ✉️ ${this.data.email}</p>
                <p>📍 ${this.data.address}, ${this.data.city}</p>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${this.data.companyName}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
    `
  }

  private generateJavaScript(): string {
    return `
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements with data-aos attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    `
  }

  private renderErrorBlock(blockConfig: BlockComponent): string {
    return `
      <div class="block-error" style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 0.5rem; margin: 1rem 0;">
        <h3 style="color: #c33;">Erreur de rendu du bloc</h3>
        <p>Impossible de rendre le bloc de type "${blockConfig.type}" avec le variant "${blockConfig.variant}"</p>
        <details>
          <summary>Détails techniques</summary>
          <pre style="font-size: 0.8rem; background: #f9f9f9; padding: 1rem; margin-top: 0.5rem;">
${JSON.stringify(blockConfig, null, 2)}
          </pre>
        </details>
      </div>
    `
  }
}

// Factory pour créer rapidement des compositions
export class PageCompositionFactory {
  static createUltraProHomePage(data: TemplateData): PageComposition {
    const renderer = new BlockRenderer(data)
    return renderer.generatePageByType('home', 'ultra-pro')
  }

  static createStandardServicesPage(data: TemplateData): PageComposition {
    const renderer = new BlockRenderer(data)
    return renderer.generatePageByType('services', 'standard')
  }

  static createLocalSeoPage(data: TemplateData, service: any, city: string): PageComposition {
    const renderer = new BlockRenderer(data)
    return renderer.generatePageByType('local-seo', 'ultra-pro', {
      service,
      city
    })
  }
}