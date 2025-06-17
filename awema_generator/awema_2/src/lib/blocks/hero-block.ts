// Bloc Hero ultra-professionnel modulaire
import { BaseBlock, BlockType, DesignStyle } from './block-system'
import { TemplateData } from '../template'

export class HeroBlock extends BaseBlock {
  type: BlockType = 'hero'
  variants = ['standard', 'video', 'split', 'minimal', 'ultra-pro']

  render(variant: string): string {
    const style = this.getDesignStyle()
    
    switch (variant) {
      case 'ultra-pro':
        return this.renderUltraPro(style)
      case 'video':
        return this.renderVideo(style)
      case 'split':
        return this.renderSplit(style)
      case 'minimal':
        return this.renderMinimal(style)
      default:
        return this.renderStandard(style)
    }
  }

  private getDesignStyle(): DesignStyle {
    // Déterminer le style basé sur le métier
    if (this.data.trade.toLowerCase().includes('électricien')) return 'electricien'
    if (this.data.trade.toLowerCase().includes('plombier')) return 'plombier'
    if (this.data.trade.toLowerCase().includes('chauffagiste')) return 'chauffagiste'
    if (this.data.trade.toLowerCase().includes('artisan')) return 'multi'
    return 'universal'
  }

  private renderUltraPro(style: DesignStyle): string {
    const heroImage = this.getHeroImage(style)
    const colors = this.getStyleColors(style)
    const badge = this.generateBadge(style)
    const cta = this.generateCTA(style)
    
    return `
      <section class="hero hero-ultra-pro">
        ${this.generateCSS('ultra-pro')}
        
        <div class="hero-background">
          <div class="hero-image" style="background-image: url('${heroImage}');"></div>
          <div class="hero-overlay"></div>
          <div class="hero-particles"></div>
        </div>
        
        <div class="container">
          <div class="hero-content">
            ${badge}
            
            <h1 class="hero-title">
              ${this.data.trade} <span class="hero-highlight">${this.getHighlightText(style)}</span><br>
              ${this.data.city} et Région
            </h1>
            
            <p class="hero-description">
              ${this.generateDescription(style)}
            </p>
            
            <div class="hero-actions">
              ${cta.primary}
              ${cta.secondary}
            </div>
            
            ${this.data.emergencyAvailable ? this.generateEmergencyBadge() : ''}
          </div>
        </div>
        
        <div class="hero-scroll-indicator">
          <div class="scroll-arrow"></div>
        </div>
      </section>
    `
  }

  private renderStandard(style: DesignStyle): string {
    return `
      <section class="hero hero-standard">
        ${this.generateCSS('standard')}
        
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">${this.data.companyName}</h1>
            <p class="hero-description">${this.data.description}</p>
            
            <div class="hero-actions">
              <a href="tel:${this.data.phone}" class="btn btn-primary">
                📞 Appeler maintenant
              </a>
              <a href="contact.html" class="btn btn-secondary">
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </section>
    `
  }

  private renderVideo(style: DesignStyle): string {
    return `
      <section class="hero hero-video">
        ${this.generateCSS('video')}
        
        <div class="hero-video-container">
          <video autoplay muted loop playsinline>
            <source src="${this.getVideoSource(style)}" type="video/mp4">
          </video>
          <div class="hero-overlay"></div>
        </div>
        
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">${this.data.companyName}</h1>
            <p class="hero-description">${this.data.description}</p>
            
            <div class="hero-actions">
              <a href="tel:${this.data.phone}" class="btn btn-primary">
                📞 ${this.data.phone}
              </a>
              <a href="contact.html" class="btn btn-secondary">
                Devis Gratuit
              </a>
            </div>
          </div>
        </div>
      </section>
    `
  }

  private renderSplit(style: DesignStyle): string {
    return `
      <section class="hero hero-split">
        ${this.generateCSS('split')}
        
        <div class="container">
          <div class="hero-grid">
            <div class="hero-content">
              <div class="hero-badge">${this.generateBadge(style)}</div>
              <h1 class="hero-title">${this.data.companyName}</h1>
              <p class="hero-description">${this.data.description}</p>
              
              <div class="hero-features">
                <div class="feature">✓ Professionnel certifié</div>
                <div class="feature">✓ Devis gratuit</div>
                <div class="feature">✓ Intervention rapide</div>
              </div>
              
              <div class="hero-actions">
                <a href="tel:${this.data.phone}" class="btn btn-primary">
                  📞 ${this.data.phone}
                </a>
                <a href="contact.html" class="btn btn-secondary">
                  Devis Gratuit
                </a>
              </div>
            </div>
            
            <div class="hero-visual">
              <div class="hero-image-container">
                <img src="${this.getHeroImage(style)}" alt="${this.data.trade} ${this.data.city}" class="hero-image">
                <div class="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  private renderMinimal(style: DesignStyle): string {
    return `
      <section class="hero hero-minimal">
        ${this.generateCSS('minimal')}
        
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">${this.data.companyName}</h1>
            <p class="hero-subtitle">${this.data.trade} professionnel à ${this.data.city}</p>
            
            <div class="hero-contact">
              <a href="tel:${this.data.phone}" class="contact-phone">
                📞 ${this.data.phone}
              </a>
              <a href="contact.html" class="contact-email">
                ✉️ Devis gratuit
              </a>
            </div>
          </div>
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
      case 'video':
        return this.getVideoCSS(colors)
      case 'split':
        return this.getSplitCSS(colors)
      case 'minimal':
        return this.getMinimalCSS(colors)
      default:
        return this.getStandardCSS(colors)
    }
  }

  private getUltraProCSS(colors: any): string {
    return `
      .hero-ultra-pro {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        color: white;
      }
      
      .hero-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
      
      .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      }
      
      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          ${colors.primary}CC 0%, 
          ${colors.secondary}AA 50%, 
          ${colors.primary}CC 100%
        );
        z-index: 2;
      }
      
      .hero-particles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%);
        z-index: 3;
        animation: heroGlow 8s ease-in-out infinite alternate;
      }
      
      @keyframes heroGlow {
        0% { opacity: 0.8; }
        100% { opacity: 1; }
      }
      
      .hero-content {
        position: relative;
        z-index: 4;
        text-align: center;
        animation: heroEnter 1.2s ease-out;
      }
      
      @keyframes heroEnter {
        from { opacity: 0; transform: translateY(60px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        padding: 1rem 2rem;
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 2.5rem;
        font-weight: 600;
        font-size: 1.05rem;
        animation: fadeInUp 1s ease-out 0.3s both;
      }
      
      .hero-title {
        font-family: 'Poppins', sans-serif;
        font-size: clamp(3.5rem, 10vw, 6rem);
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 2rem;
        text-shadow: 0 4px 30px rgba(0,0,0,0.4);
        animation: fadeInUp 1s ease-out 0.5s both;
      }
      
      .hero-highlight {
        background: linear-gradient(135deg, ${colors.accent}, ${colors.accentDark || colors.accent});
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
      }
      
      .hero-description {
        font-size: 1.375rem;
        margin-bottom: 3.5rem;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        opacity: 0.95;
        animation: fadeInUp 1s ease-out 0.7s both;
        text-shadow: 0 2px 10px rgba(0,0,0,0.2);
      }
      
      .hero-actions {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        animation: fadeInUp 1s ease-out 0.9s both;
      }
      
      .hero-scroll-indicator {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 4;
        animation: bounce 2s infinite;
      }
      
      .scroll-arrow {
        width: 24px;
        height: 24px;
        border: 2px solid white;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
        40% { transform: translateX(-50%) translateY(-10px); }
        60% { transform: translateX(-50%) translateY(-5px); }
      }
      
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
  }

  private getStandardCSS(colors: any): string {
    return `
      .hero-standard {
        background: linear-gradient(135deg, ${colors.primary}15, ${colors.backgroundAlt});
        padding: 8rem 0 4rem;
        text-align: center;
      }
      
      .hero-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        color: ${colors.primary};
        margin-bottom: 1rem;
      }
      
      .hero-description {
        font-size: 1.2rem;
        color: ${colors.textLight};
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
    `
  }

  private getVideoCSS(colors: any): string {
    return `
      .hero-video {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        color: white;
      }
      
      .hero-video-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
      
      .hero-video-container video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, ${colors.primary}AA, ${colors.secondary}AA);
        z-index: 2;
      }
      
      .hero-content {
        position: relative;
        z-index: 3;
        text-align: center;
      }
    `
  }

  private getSplitCSS(colors: any): string {
    return `
      .hero-split {
        padding: 6rem 0;
        background: ${colors.background};
      }
      
      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
      }
      
      .hero-features {
        margin: 2rem 0;
      }
      
      .feature {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        color: ${colors.text};
      }
      
      .hero-visual {
        position: relative;
      }
      
      .hero-image-container {
        position: relative;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      
      .hero-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
      
      @media (max-width: 768px) {
        .hero-grid {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
    `
  }

  private getMinimalCSS(colors: any): string {
    return `
      .hero-minimal {
        padding: 4rem 0;
        background: ${colors.background};
        border-bottom: 1px solid ${colors.border};
      }
      
      .hero-content {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${colors.text};
        margin-bottom: 0.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.2rem;
        color: ${colors.textLight};
        margin-bottom: 2rem;
      }
      
      .hero-contact {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .contact-phone,
      .contact-email {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .contact-phone {
        background: ${colors.primary};
        color: white;
      }
      
      .contact-email {
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
      }
      
      .contact-phone:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${colors.primary}30;
      }
      
      .contact-email:hover {
        background: ${colors.primary};
        color: white;
      }
    `
  }

  private generateBadge(style: DesignStyle): string {
    const badges = {
      electricien: '🏆 Certifié RGE • +XX villes d\'intervention',
      plombier: '🏆 Expert Agréé • Service 24h/7j • +XX villes',
      chauffagiste: '🏆 Certifié RGE QualiPAC • Aides jusqu\'à 11 000€ • +XX villes',
      multi: '🏆 Artisan Certifié • Multi-services • +XX villes',
      universal: '🏆 Professionnel Certifié • +XX villes d\'intervention'
    }
    
    return `<div class="hero-badge">${badges[style].replace('XX', this.data.serviceCities.length.toString())}</div>`
  }

  private getHighlightText(style: DesignStyle): string {
    const highlights = {
      electricien: 'Expert',
      plombier: 'Pro',
      chauffagiste: 'Premium',
      multi: 'Plus',
      universal: 'Pro'
    }
    
    return highlights[style]
  }

  private generateDescription(style: DesignStyle): string {
    const descriptions = {
      electricien: 'Installation électrique, dépannage 24h/7j, mise aux normes NF C 15-100. Intervention rapide, devis gratuit, garantie 10 ans.',
      plombier: 'Installation sanitaire, dépannage urgence, rénovation salle de bain. Intervention rapide, devis gratuit, garantie décennale.',
      chauffagiste: 'Installation pompe à chaleur, chaudière haute performance, climatisation. Rénovation énergétique avec aides financières. Économisez jusqu\'à 75% sur vos factures.',
      multi: 'Services multi-métiers pour tous vos travaux. Électricité, plomberie, chauffage. Devis gratuit, intervention rapide.',
      universal: `${this.data.description}. Professionnel qualifié à ${this.data.city}. Devis gratuit, intervention rapide.`
    }
    
    return descriptions[style]
  }

  private generateCTA(style: DesignStyle) {
    const ctas = {
      electricien: {
        primary: `<a href="tel:${this.data.phone}" class="btn btn-hero">📞 Appel Gratuit</a>`,
        secondary: `<a href="contact.html" class="btn btn-secondary">💬 Devis en Ligne</a>`
      },
      plombier: {
        primary: `<a href="tel:${this.data.phone}" class="btn btn-hero">📞 Intervention Rapide</a>`,
        secondary: `<a href="contact.html" class="btn btn-secondary">💧 Devis Gratuit</a>`
      },
      chauffagiste: {
        primary: `<a href="tel:${this.data.phone}" class="btn btn-hero">📞 Étude Gratuite</a>`,
        secondary: `<a href="contact.html" class="btn btn-secondary">💰 Calculer mes Aides</a>`
      },
      multi: {
        primary: `<a href="tel:${this.data.phone}" class="btn btn-hero">📞 ${this.data.phone}</a>`,
        secondary: `<a href="contact.html" class="btn btn-secondary">🏠 Devis Multi-services</a>`
      },
      universal: {
        primary: `<a href="tel:${this.data.phone}" class="btn btn-hero">📞 Appeler maintenant</a>`,
        secondary: `<a href="contact.html" class="btn btn-secondary">📝 Demander un devis</a>`
      }
    }
    
    return ctas[style]
  }

  private generateEmergencyBadge(): string {
    return `
      <div class="emergency-badge">
        🚨 Urgence 24h/7j
      </div>
    `
  }

  private getHeroImage(style: DesignStyle): string {
    const images = {
      electricien: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      plombier: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      chauffagiste: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      multi: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      universal: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    }
    
    return images[style]
  }

  private getVideoSource(style: DesignStyle): string {
    // Retourner des sources vidéo appropriées selon le style
    return 'https://player.vimeo.com/external/123456789.hd.mp4'
  }

  private getStyleColors(style: DesignStyle) {
    const styleColors = {
      electricien: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#fbbf24',
        accentDark: '#f59e0b',
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
        accentDark: '#ea580c',
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
        accentDark: '#f59e0b',
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
        accentDark: '#d97706',
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
        accentDark: '#d97706',
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