// Bloc CTA (Call-to-Action) ultra-professionnel avec variants optimisés conversion
import { BaseBlock, BlockType, DesignStyle, BlockOptions, TemplateData } from './block-system'

export class CTABlock extends BaseBlock {
  type: BlockType = 'cta'
  variants = ['standard', 'split', 'banner', 'floating', 'ultra-pro']

  render(variant: string): string {
    const style = this.getDesignStyle()
    
    switch (variant) {
      case 'ultra-pro':
        return this.renderUltraPro(style)
      case 'split':
        return this.renderSplit(style)
      case 'banner':
        return this.renderBanner(style)
      case 'floating':
        return this.renderFloating(style)
      default:
        return this.renderStandard(style)
    }
  }

  // CTA Ultra-Pro avec animations et design premium
  private renderUltraPro(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const { companyName, phone, trade, city, services } = this.data
    const mainService = services[0]
    
    return `
      <section class="cta-ultra-pro" style="
        background: linear-gradient(135deg, ${colors.primary}ee, ${colors.secondary}cc);
        padding: 4rem 2rem;
        margin: 4rem 0;
        border-radius: 2rem;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0,0,0,0.2);
      ">
        <!-- Background pattern -->
        <div class="pattern-overlay" style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(circle at 20% 50%, ${colors.accent}20 2px, transparent 2px),
                            radial-gradient(circle at 80% 20%, ${colors.primary}15 2px, transparent 2px);
          background-size: 60px 60px, 80px 80px;
          animation: ctaFloat 20s ease-in-out infinite;
        "></div>
        
        <!-- Glass morphism overlay -->
        <div class="glass-overlay" style="
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 2rem;
        "></div>
        
        <div class="container" style="
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        ">
          <!-- Badge de confiance -->
          <div class="trust-badge" style="
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 2rem;
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(255,255,255,0.3);
            animation: ctaPulse 2s ease-in-out infinite;
          ">
            ⭐ ${trade} certifié • Devis gratuit • Intervention rapide
          </div>
          
          <h2 style="
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            margin-bottom: 1rem;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            line-height: 1.2;
          ">
            Prêt pour votre projet ${mainService?.name?.toLowerCase()} ?
          </h2>
          
          <p style="
            font-size: 1.2rem;
            color: rgba(255,255,255,0.9);
            margin-bottom: 2.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          ">
            Obtenez un devis personnalisé en moins de 24h. 
            <strong>Intervention garantie à ${city}</strong> et environs.
          </p>
          
          <div class="cta-buttons" style="
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
          ">
            <a href="tel:${phone}" class="btn-primary" style="
              background: ${colors.accent};
              color: ${style === 'chauffagiste' ? '#000' : '#fff'};
              padding: 1rem 2.5rem;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 700;
              font-size: 1.1rem;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.3)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.2)'">
              📞 Appeler maintenant
            </a>
            
            <a href="contact.html" class="btn-secondary" style="
              background: rgba(255,255,255,0.2);
              color: white;
              border: 2px solid rgba(255,255,255,0.3);
              padding: 1rem 2.5rem;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 600;
              font-size: 1.1rem;
              transition: all 0.3s ease;
              backdrop-filter: blur(10px);
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.borderColor='rgba(255,255,255,0.5)'"
               onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.borderColor='rgba(255,255,255,0.3)'">
              📧 Devis gratuit
            </a>
          </div>
          
          <!-- Garanties visuelles -->
          <div class="guarantees" style="
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.8);
          ">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              🛡️ Garantie décennale
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              ⚡ Intervention 24h
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              💯 Satisfaction client
            </div>
          </div>
        </div>
        
        <style>
          @keyframes ctaFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-0.5deg); }
          }
          
          @keyframes ctaPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          
          @media (max-width: 768px) {
            .cta-ultra-pro {
              padding: 2rem 1rem !important;
              margin: 2rem 0 !important;
              border-radius: 1rem !important;
            }
            
            .cta-ultra-pro h2 {
              font-size: 1.8rem !important;
            }
            
            .cta-buttons {
              flex-direction: column !important;
              align-items: center !important;
            }
            
            .guarantees {
              flex-direction: column !important;
              gap: 1rem !important;
            }
          }
        </style>
      </section>
    `
  }

  // CTA Split avec image et contenu
  private renderSplit(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const { companyName, phone, trade, city } = this.data
    
    return `
      <section class="cta-split" style="
        background: ${colors.background};
        padding: 4rem 0;
        margin: 3rem 0;
      ">
        <div class="container" style="
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        ">
          <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
          ">
            <div class="cta-content">
              <h2 style="
                font-size: 2.2rem;
                font-weight: 700;
                color: ${colors.primary};
                margin-bottom: 1rem;
              ">
                Une urgence ${trade.toLowerCase()} ?
              </h2>
              
              <p style="
                font-size: 1.1rem;
                color: ${colors.text};
                margin-bottom: 2rem;
                line-height: 1.6;
              ">
                Notre équipe d'experts est disponible 24h/7j pour toutes vos urgences. 
                Intervention rapide garantie à ${city} et dans toute la région.
              </p>
              
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="tel:${phone}" style="
                  background: ${colors.primary};
                  color: white;
                  padding: 1rem 2rem;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: 600;
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  transition: transform 0.3s ease;
                " onmouseover="this.style.transform='translateY(-2px)'"
                   onmouseout="this.style.transform='translateY(0)'">
                  📞 ${phone}
                </a>
                
                <a href="contact.html" style="
                  background: transparent;
                  color: ${colors.primary};
                  border: 2px solid ${colors.primary};
                  padding: 1rem 2rem;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: 600;
                  transition: all 0.3s ease;
                " onmouseover="this.style.background='${colors.primary}'; this.style.color='white'"
                   onmouseout="this.style.background='transparent'; this.style.color='${colors.primary}'">
                  Devis gratuit
                </a>
              </div>
            </div>
            
            <div class="cta-visual" style="
              background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
              border-radius: 1rem;
              padding: 3rem;
              text-align: center;
              position: relative;
              overflow: hidden;
            ">
              <!-- Icône métier grande taille -->
              <div style="
                font-size: 4rem;
                margin-bottom: 1.5rem;
                opacity: 0.8;
              ">
                ${this.getTradeIcon(style)}
              </div>
              
              <h3 style="
                font-size: 1.5rem;
                font-weight: 600;
                color: ${colors.primary};
                margin-bottom: 1rem;
              ">
                Expertise ${companyName}
              </h3>
              
              <p style="
                color: ${colors.text};
                line-height: 1.5;
              ">
                Plus de 10 ans d'expérience au service des particuliers et professionnels
              </p>
            </div>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            .cta-split .container > div {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            
            .cta-split h2 {
              font-size: 1.8rem !important;
            }
            
            .cta-split .cta-content > div {
              flex-direction: column !important;
            }
          }
        </style>
      </section>
    `
  }

  // CTA Banner horizontal compact
  private renderBanner(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const { phone, trade, city } = this.data
    
    return `
      <div class="cta-banner" style="
        background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
        color: white;
        padding: 1.5rem 2rem;
        margin: 2rem 0;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      ">
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        ">
          <div>
            <h3 style="
              font-size: 1.3rem;
              font-weight: 600;
              margin: 0 0 0.5rem 0;
            ">
              Besoin d'un ${trade.toLowerCase()} à ${city} ?
            </h3>
            <p style="
              margin: 0;
              opacity: 0.9;
              font-size: 0.95rem;
            ">
              Devis gratuit et intervention rapide
            </p>
          </div>
          
          <div style="display: flex; gap: 1rem;">
            <a href="tel:${phone}" style="
              background: ${colors.accent};
              color: ${style === 'chauffagiste' ? '#000' : '#fff'};
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              white-space: nowrap;
              transition: transform 0.3s ease;
            " onmouseover="this.style.transform='scale(1.05)'"
               onmouseout="this.style.transform='scale(1)'">
              📞 Appeler
            </a>
            
            <a href="contact.html" style="
              background: rgba(255,255,255,0.2);
              color: white;
              border: 1px solid rgba(255,255,255,0.3);
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 500;
              white-space: nowrap;
              transition: background 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'"
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">
              Devis
            </a>
          </div>
        </div>
        
        <style>
          @media (max-width: 768px) {
            .cta-banner > div {
              flex-direction: column !important;
              gap: 1rem !important;
              text-align: center !important;
            }
            
            .cta-banner > div > div:last-child {
              width: 100% !important;
              justify-content: center !important;
            }
          }
        </style>
      </div>
    `
  }

  // CTA Floating fixe en bas d'écran
  private renderFloating(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const { phone, companyName } = this.data
    
    return `
      <div class="cta-floating" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: ${colors.primary};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        animation: ctaFloatBounce 3s ease-in-out infinite;
        max-width: 300px;
      ">
        <div style="
          display: flex;
          align-items: center;
          gap: 1rem;
        ">
          <div style="
            background: ${colors.accent};
            color: ${style === 'chauffagiste' ? '#000' : '#fff'};
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            animation: ctaFloatPulse 2s ease-in-out infinite;
          ">
            📞
          </div>
          
          <div style="flex: 1;">
            <div style="
              font-size: 0.8rem;
              opacity: 0.9;
              margin-bottom: 0.2rem;
            ">
              ${companyName}
            </div>
            <a href="tel:${phone}" style="
              color: white;
              text-decoration: none;
              font-weight: 600;
              font-size: 0.9rem;
            ">
              ${phone}
            </a>
          </div>
          
          <button onclick="this.parentElement.parentElement.style.display='none'" style="
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0.7;
            padding: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            transition: opacity 0.3s ease;
          " onmouseover="this.style.opacity='1'"
             onmouseout="this.style.opacity='0.7'">
            ×
          </button>
        </div>
        
        <style>
          @keyframes ctaFloatBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes ctaFloatPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @media (max-width: 768px) {
            .cta-floating {
              bottom: 10px !important;
              right: 10px !important;
              left: 10px !important;
              max-width: none !important;
              border-radius: 12px !important;
            }
          }
        </style>
      </div>
    `
  }

  // CTA Standard simple et efficace
  private renderStandard(style: DesignStyle): string {
    const colors = this.getColorPalette(style)
    const { companyName, phone, trade, city } = this.data
    
    return `
      <section class="cta-standard" style="
        background: ${colors.background};
        border: 2px solid ${colors.primary}20;
        border-radius: 12px;
        padding: 3rem 2rem;
        margin: 3rem 0;
        text-align: center;
      ">
        <h2 style="
          font-size: 2rem;
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 1rem;
        ">
          Contactez ${companyName}
        </h2>
        
        <p style="
          font-size: 1.1rem;
          color: ${colors.text};
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        ">
          Votre ${trade.toLowerCase()} de confiance à ${city}. 
          Devis gratuit et intervention rapide garantie.
        </p>
        
        <div style="
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        ">
          <a href="tel:${phone}" style="
            background: ${colors.primary};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: background 0.3s ease;
          " onmouseover="this.style.background='${colors.secondary}'"
             onmouseout="this.style.background='${colors.primary}'">
            📞 Appeler maintenant
          </a>
          
          <a href="contact.html" style="
            background: transparent;
            color: ${colors.primary};
            border: 2px solid ${colors.primary};
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          " onmouseover="this.style.background='${colors.primary}'; this.style.color='white'"
             onmouseout="this.style.background='transparent'; this.style.color='${colors.primary}'">
            Demander un devis
          </a>
        </div>
      </section>
    `
  }

  // Méthodes utilitaires
  private getDesignStyle(): DesignStyle {
    const trade = this.data.trade?.toLowerCase()
    if (trade?.includes('électricien') || trade?.includes('electrique')) return 'electricien'
    if (trade?.includes('plombier') || trade?.includes('plomberie')) return 'plombier'
    if (trade?.includes('chauffagiste') || trade?.includes('chauffage')) return 'chauffagiste'
    if (trade?.includes('multi') || trade?.includes('bâtiment')) return 'multi'
    return 'universal'
  }

  private getColorPalette(style: DesignStyle) {
    const palettes = {
      electricien: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#fbbf24',
        background: '#f8fafc',
        text: '#475569'
      },
      plombier: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#f97316',
        background: '#f0f9ff',
        text: '#475569'
      },
      chauffagiste: {
        primary: '#ea580c',
        secondary: '#dc2626',
        accent: '#fbbf24',
        background: '#fef7ec',
        text: '#92400e'
      },
      multi: {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#faf5ff',
        text: '#6b21a8'
      },
      universal: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#3b82f6',
        background: '#f9fafb',
        text: '#4b5563'
      }
    }
    return palettes[style] || palettes.universal
  }

  private getTradeIcon(style: DesignStyle): string {
    const icons = {
      electricien: '⚡',
      plombier: '💧',
      chauffagiste: '🔥',
      multi: '🏠',
      universal: '🔧'
    }
    return icons[style] || icons.universal
  }
}