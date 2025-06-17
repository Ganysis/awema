// Bloc Services ultra-professionnel modulaire
import { BaseBlock, BlockType, DesignStyle } from './block-system'
import { TemplateData } from '../template'

export class ServicesBlock extends BaseBlock {
  type: BlockType = 'services'
  variants = ['grid', 'carousel', 'list', 'featured', 'ultra-pro']

  render(variant: string): string {
    const style = this.getDesignStyle()
    
    switch (variant) {
      case 'ultra-pro':
        return this.renderUltraPro(style)
      case 'carousel':
        return this.renderCarousel(style)
      case 'list':
        return this.renderList(style)
      case 'featured':
        return this.renderFeatured(style)
      default:
        return this.renderGrid(style)
    }
  }

  private getDesignStyle(): DesignStyle {
    if (this.data.trade.toLowerCase().includes('électricien')) return 'electricien'
    if (this.data.trade.toLowerCase().includes('plombier')) return 'plombier'
    if (this.data.trade.toLowerCase().includes('chauffagiste')) return 'chauffagiste'
    if (this.data.trade.toLowerCase().includes('artisan')) return 'multi'
    return 'universal'
  }

  private renderUltraPro(style: DesignStyle): string {
    const colors = this.getStyleColors(style)
    const icons = this.getServiceIcons(style)
    
    return `
      <section class="services services-ultra-pro" id="services">
        ${this.generateCSS('ultra-pro')}
        
        <div class="container">
          <div class="section-header">
            <span class="section-badge">${this.getSectionBadge(style)}</span>
            <h2 class="section-title">${this.getSectionTitle(style)}</h2>
            <p class="section-description">
              ${this.getSectionDescription(style)}
            </p>
          </div>
          
          <div class="services-grid">
            ${this.data.services.map((service, index) => `
              <div class="service-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="service-icon">
                  ${icons[index % icons.length]}
                </div>
                <h3 class="service-title">${service.name}</h3>
                <p class="service-description">${service.description}</p>
                
                <ul class="service-features">
                  ${this.generateServiceFeatures(style, service).map(feature => `
                    <li><span class="feature-check">✓</span>${feature}</li>
                  `).join('')}
                </ul>
                
                ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                
                <div class="service-actions">
                  <a href="service-${service.id}.html" class="btn-service">
                    ${this.getServiceCTA(style)} →
                  </a>
                  <a href="tel:${this.data.phone}" class="btn-service-phone">
                    📞 Appeler
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
          
          ${this.generateServiceFooter(style)}
        </div>
      </section>
    `
  }

  private renderGrid(style: DesignStyle): string {
    return `
      <section class="services services-grid" id="services">
        ${this.generateCSS('grid')}
        
        <div class="container">
          <h2 class="section-title">Nos Services</h2>
          
          <div class="services-grid">
            ${this.data.services.map(service => `
              <div class="service-card">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                <a href="service-${service.id}.html" class="btn btn-primary">En savoir plus</a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  }

  private renderCarousel(style: DesignStyle): string {
    return `
      <section class="services services-carousel" id="services">
        ${this.generateCSS('carousel')}
        
        <div class="container">
          <h2 class="section-title">Nos Services</h2>
          
          <div class="services-carousel-container">
            <div class="services-carousel-track">
              ${this.data.services.map(service => `
                <div class="service-slide">
                  <div class="service-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                    <a href="service-${service.id}.html" class="btn btn-primary">Découvrir</a>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="carousel-controls">
              <button class="carousel-btn carousel-prev">‹</button>
              <button class="carousel-btn carousel-next">›</button>
            </div>
          </div>
        </div>
      </section>
    `
  }

  private renderList(style: DesignStyle): string {
    return `
      <section class="services services-list" id="services">
        ${this.generateCSS('list')}
        
        <div class="container">
          <h2 class="section-title">Nos Services</h2>
          
          <div class="services-list">
            ${this.data.services.map((service, index) => `
              <div class="service-item ${index % 2 === 0 ? 'item-left' : 'item-right'}">
                <div class="service-content">
                  <h3>${service.name}</h3>
                  <p>${service.description}</p>
                  ${service.price ? `<div class="service-price">${service.price}</div>` : ''}
                  <a href="service-${service.id}.html" class="btn btn-primary">En savoir plus</a>
                </div>
                <div class="service-visual">
                  <div class="service-placeholder">
                    ${this.getServiceIcon(service.name)}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `
  }

  private renderFeatured(style: DesignStyle): string {
    const featuredService = this.data.services[0]
    const otherServices = this.data.services.slice(1)
    
    return `
      <section class="services services-featured" id="services">
        ${this.generateCSS('featured')}
        
        <div class="container">
          <h2 class="section-title">Nos Services</h2>
          
          <div class="featured-service">
            <div class="featured-content">
              <span class="featured-badge">Service Principal</span>
              <h3>${featuredService.name}</h3>
              <p>${featuredService.description}</p>
              ${featuredService.price ? `<div class="service-price">${featuredService.price}</div>` : ''}
              <div class="featured-actions">
                <a href="service-${featuredService.id}.html" class="btn btn-primary">Découvrir</a>
                <a href="tel:${this.data.phone}" class="btn btn-secondary">📞 ${this.data.phone}</a>
              </div>
            </div>
          </div>
          
          ${otherServices.length > 0 ? `
            <div class="other-services">
              <h3>Autres Services</h3>
              <div class="services-grid">
                ${otherServices.map(service => `
                  <div class="service-card">
                    <h4>${service.name}</h4>
                    <p>${service.description}</p>
                    <a href="service-${service.id}.html" class="btn btn-outline">Voir détails</a>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </section>
    `
  }

  protected getVariantCSS(variant: string): string {
    const style = this.getDesignStyle()
    const colors = this.getStyleColors(style)
    
    switch (variant) {
      case 'ultra-pro':
        return this.getUltraProCSS(colors)
      case 'carousel':
        return this.getCarouselCSS(colors)
      case 'list':
        return this.getListCSS(colors)
      case 'featured':
        return this.getFeaturedCSS(colors)
      default:
        return this.getGridCSS(colors)
    }
  }

  private getUltraProCSS(colors: any): string {
    return `
      .services-ultra-pro {
        padding: 8rem 0;
        background: ${colors.backgroundAlt};
        position: relative;
      }
      
      .services-ultra-pro::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(180deg, ${colors.background} 0%, ${colors.backgroundAlt} 100%);
      }
      
      .section-header {
        text-align: center;
        margin-bottom: 5rem;
        position: relative;
        z-index: 2;
      }
      
      .section-badge {
        display: inline-block;
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 15px ${colors.primary}30;
      }
      
      .section-title {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        color: ${colors.text};
        margin-bottom: 1.5rem;
        line-height: 1.2;
      }
      
      .section-description {
        font-size: 1.25rem;
        color: ${colors.textLight};
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.7;
      }
      
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2.5rem;
        position: relative;
        z-index: 2;
      }
      
      .service-card {
        background: ${colors.background};
        border-radius: 1.5rem;
        padding: 3rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        border: 1px solid ${colors.border};
      }
      
      .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
      }
      
      .service-card::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, ${colors.primary}10 0%, transparent 70%);
        transition: all 0.4s ease;
        border-radius: 50%;
      }
      
      .service-card:hover {
        transform: translateY(-12px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        border-color: ${colors.primary};
      }
      
      .service-card:hover::after {
        top: -30%;
        right: -30%;
        width: 300px;
        height: 300px;
      }
      
      .service-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        color: white;
        position: relative;
        z-index: 2;
        box-shadow: 0 8px 25px ${colors.primary}30;
      }
      
      .service-title {
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: ${colors.text};
        margin-bottom: 1.25rem;
        position: relative;
        z-index: 2;
      }
      
      .service-description {
        color: ${colors.textLight};
        margin-bottom: 2rem;
        line-height: 1.7;
        position: relative;
        z-index: 2;
      }
      
      .service-features {
        list-style: none;
        margin-bottom: 2rem;
        position: relative;
        z-index: 2;
      }
      
      .service-features li {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        color: ${colors.textLight};
        font-size: 1rem;
      }
      
      .feature-check {
        color: ${colors.accent || '#16a34a'};
        font-weight: 700;
        font-size: 1.2rem;
        background: ${colors.accent || '#16a34a'}20;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      
      .service-price {
        font-size: 1.375rem;
        font-weight: 700;
        color: ${colors.primary};
        margin-bottom: 2rem;
        position: relative;
        z-index: 2;
      }
      
      .service-actions {
        display: flex;
        gap: 1rem;
        position: relative;
        z-index: 2;
      }
      
      .btn-service {
        flex: 1;
        background: ${colors.primary};
        color: white;
        text-decoration: none;
        padding: 1.125rem 2rem;
        border-radius: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        box-shadow: 0 4px 15px ${colors.primary}30;
      }
      
      .btn-service:hover {
        background: ${colors.secondary};
        transform: translateY(-2px);
        box-shadow: 0 8px 25px ${colors.primary}40;
      }
      
      .btn-service-phone {
        background: transparent;
        border: 2px solid ${colors.border};
        color: ${colors.text};
        text-decoration: none;
        padding: 1rem;
        border-radius: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 120px;
      }
      
      .btn-service-phone:hover {
        border-color: ${colors.primary};
        color: ${colors.primary};
        background: ${colors.primary}10;
      }
      
      @media (max-width: 768px) {
        .services-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .service-card {
          padding: 2rem;
        }
        
        .service-actions {
          flex-direction: column;
        }
      }
    `
  }

  private getGridCSS(colors: any): string {
    return `
      .services-grid {
        padding: 4rem 0;
        background: ${colors.background};
      }
      
      .section-title {
        text-align: center;
        font-size: 2.5rem;
        color: ${colors.primary};
        margin-bottom: 3rem;
      }
      
      .services-grid .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .service-card {
        background: ${colors.background};
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        text-align: center;
        transition: transform 0.3s;
        border: 1px solid ${colors.border};
      }
      
      .service-card:hover {
        transform: translateY(-5px);
      }
      
      .service-card h3 {
        color: ${colors.primary};
        margin-bottom: 1rem;
        font-size: 1.3rem;
      }
      
      .service-card p {
        color: ${colors.textLight};
        margin-bottom: 1rem;
      }
      
      .service-price {
        font-weight: 600;
        color: ${colors.secondary};
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
    `
  }

  private getCarouselCSS(colors: any): string {
    return `
      .services-carousel {
        padding: 4rem 0;
        background: ${colors.backgroundAlt};
      }
      
      .services-carousel-container {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
      }
      
      .services-carousel-track {
        display: flex;
        transition: transform 0.5s ease;
      }
      
      .service-slide {
        min-width: 350px;
        margin-right: 2rem;
      }
      
      .carousel-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        pointer-events: none;
      }
      
      .carousel-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: ${colors.primary};
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.3s ease;
      }
      
      .carousel-btn:hover {
        background: ${colors.secondary};
        transform: scale(1.1);
      }
    `
  }

  private getListCSS(colors: any): string {
    return `
      .services-list {
        padding: 4rem 0;
        background: ${colors.background};
      }
      
      .services-list .services-list {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
      
      .service-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        padding: 2rem 0;
      }
      
      .service-item.item-right {
        direction: rtl;
      }
      
      .service-item.item-right * {
        direction: ltr;
      }
      
      .service-content h3 {
        font-size: 1.75rem;
        color: ${colors.primary};
        margin-bottom: 1rem;
      }
      
      .service-visual {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .service-placeholder {
        width: 200px;
        height: 200px;
        background: ${colors.backgroundAlt};
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: ${colors.primary};
      }
      
      @media (max-width: 768px) {
        .service-item {
          grid-template-columns: 1fr;
          text-align: center;
        }
        
        .service-item.item-right {
          direction: ltr;
        }
      }
    `
  }

  private getFeaturedCSS(colors: any): string {
    return `
      .services-featured {
        padding: 4rem 0;
        background: ${colors.background};
      }
      
      .featured-service {
        background: linear-gradient(135deg, ${colors.primary}15, ${colors.backgroundAlt});
        padding: 4rem;
        border-radius: 2rem;
        margin-bottom: 4rem;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .featured-badge {
        background: ${colors.primary};
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1rem;
        display: inline-block;
      }
      
      .featured-service h3 {
        font-size: 2.5rem;
        color: ${colors.text};
        margin-bottom: 1.5rem;
      }
      
      .featured-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
      }
      
      .other-services {
        margin-top: 4rem;
      }
      
      .other-services h3 {
        text-align: center;
        color: ${colors.primary};
        margin-bottom: 2rem;
        font-size: 2rem;
      }
      
      .other-services .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }
    `
  }

  private getSectionBadge(style: DesignStyle): string {
    const badges = {
      electricien: '⚡ Nos Expertises',
      plombier: '💧 Nos Services',
      chauffagiste: '🔥 Nos Expertises Premium',
      multi: '🏠 Nos Services',
      universal: '🔧 Nos Services'
    }
    
    return badges[style]
  }

  private getSectionTitle(style: DesignStyle): string {
    const titles = {
      electricien: 'Services Électriques Professionnels',
      plombier: 'Solutions Plomberie & Sanitaire',
      chauffagiste: 'Solutions Chauffage & Énergétique',
      multi: 'Services Multi-Métiers',
      universal: 'Nos Services Professionnels'
    }
    
    return titles[style]
  }

  private getSectionDescription(style: DesignStyle): string {
    const descriptions = {
      electricien: 'Solutions complètes en électricité pour particuliers et professionnels. Devis gratuit, intervention rapide, garantie qualité.',
      plombier: 'Expert en plomberie et sanitaire. Installation, dépannage, rénovation. Service d\'urgence 24h/7j.',
      chauffagiste: 'Spécialistes des solutions énergétiques durables et performantes. Installation, maintenance, rénovation. Bénéficiez des aides de l\'État.',
      multi: 'Tous vos travaux par un seul professionnel. Électricité, plomberie, chauffage, rénovation.',
      universal: `Solutions professionnelles pour tous vos besoins en ${this.data.trade.toLowerCase()}. Devis gratuit, intervention rapide.`
    }
    
    return descriptions[style]
  }

  private getServiceIcons(style: DesignStyle): string[] {
    const icons = {
      electricien: ['⚡', '🔧', '🏠', '💡', '🔌', '⚙️'],
      plombier: ['💧', '🚿', '🛁', '🔧', '🚽', '⚙️'],
      chauffagiste: ['🔥', '❄️', '⚡', '🌡️', '🏠', '♻️'],
      multi: ['🏠', '🔧', '⚡', '💧', '🔥', '🛠️'],
      universal: ['🔧', '⚙️', '🏠', '💼', '✨', '🛠️']
    }
    
    return icons[style]
  }

  private generateServiceFeatures(style: DesignStyle, service: any): string[] {
    const baseFeatures = [
      'Devis gratuit et sans engagement',
      'Intervention rapide',
      'Garantie qualité',
      'Professionnel certifié'
    ]
    
    const styleFeatures = {
      electricien: [
        'Certifié RGE',
        'Mise aux normes NF C 15-100',
        'Dépannage 24h/7j',
        'Garantie 10 ans'
      ],
      plombier: [
        'Service d\'urgence 24h/7j',
        'Garantie décennale',
        'Produits de qualité',
        'Intervention sous 30min'
      ],
      chauffagiste: [
        'Certifié RGE QualiPAC',
        'Aides financières incluses',
        'Garantie 15 ans constructeur',
        'Maintenance préventive'
      ],
      multi: [
        'Multi-services',
        'Un seul interlocuteur',
        'Coordination des travaux',
        'Devis global'
      ],
      universal: baseFeatures
    }
    
    return styleFeatures[style] || baseFeatures
  }

  private getServiceCTA(style: DesignStyle): string {
    const ctas = {
      electricien: 'En savoir plus',
      plombier: 'Découvrir',
      chauffagiste: 'Découvrir',
      multi: 'Voir détails',
      universal: 'En savoir plus'
    }
    
    return ctas[style]
  }

  private generateServiceFooter(style: DesignStyle): string {
    return `
      <div class="services-footer">
        <div class="footer-cta">
          <h3>Besoin d'un devis personnalisé ?</h3>
          <p>Contactez-nous pour une étude gratuite de vos besoins</p>
          <div class="footer-actions">
            <a href="tel:${this.data.phone}" class="btn btn-primary">
              📞 ${this.data.phone}
            </a>
            <a href="contact.html" class="btn btn-secondary">
              📝 Devis en ligne
            </a>
          </div>
        </div>
      </div>
    `
  }

  private getServiceIcon(serviceName: string): string {
    const iconMap: Record<string, string> = {
      'installation': '🔧',
      'dépannage': '⚡',
      'rénovation': '🏠',
      'maintenance': '⚙️',
      'urgence': '🚨',
      'électrique': '⚡',
      'plomberie': '💧',
      'chauffage': '🔥',
      'climatisation': '❄️',
      'pompe': '♻️'
    }
    
    const name = serviceName.toLowerCase()
    for (const [key, icon] of Object.entries(iconMap)) {
      if (name.includes(key)) return icon
    }
    
    return '🔧'
  }

  private getStyleColors(style: DesignStyle) {
    const styleColors = {
      electricien: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#fbbf24',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f9fafb',
        border: '#e5e7eb'
      },
      plombier: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#f97316',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f8fafc',
        border: '#e2e8f0'
      },
      chauffagiste: {
        primary: '#ea580c',
        secondary: '#dc2626',
        accent: '#fbbf24',
        text: '#0c0a09',
        textLight: '#57534e',
        background: '#fefefe',
        backgroundAlt: '#fafaf9',
        border: '#e7e5e4'
      },
      multi: {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f9fafb',
        border: '#e5e7eb'
      },
      universal: {
        primary: '#1f2937',
        secondary: '#374151',
        accent: '#f59e0b',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f9fafb',
        border: '#e5e7eb'
      }
    }
    
    return styleColors[style]
  }
}