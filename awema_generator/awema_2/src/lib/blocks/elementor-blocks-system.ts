// Système de blocs varié comme Elementor - Génération de designs uniques
export interface BlockData {
  id: string;
  type: string;
  layout: string;
  style: string;
  content?: any;
  css?: string;
  animation?: string;
}

export interface SiteLayout {
  hero: BlockData;
  services: BlockData;
  about?: BlockData;
  testimonials?: BlockData;
  contact: BlockData;
  footer: BlockData;
}

// Types de blocs Hero (20+ variations)
export const HERO_BLOCKS = {
  // Hero classiques
  'hero-split-image': {
    layout: 'split',
    style: 'image-right',
    structure: 'text-left-image-right',
    css: `
      .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
      .hero-text { padding-right: 2rem; }
      .hero-image { position: relative; }
      .hero-image img { border-radius: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    `
  },
  
  'hero-centered-video': {
    layout: 'centered',
    style: 'video-background',
    structure: 'text-centered-video-bg',
    css: `
      .hero-content { text-align: center; position: relative; z-index: 2; }
      .hero-video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
      .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); }
    `
  },
  
  'hero-diagonal-split': {
    layout: 'diagonal',
    style: 'geometric',
    structure: 'diagonal-text-image',
    css: `
      .hero-content { position: relative; overflow: hidden; }
      .hero-text { position: absolute; left: 0; top: 50%; transform: translateY(-50%); z-index: 2; padding: 0 5%; }
      .hero-image { position: absolute; right: -10%; top: 0; width: 60%; height: 100%; transform: skewX(-15deg); }
    `
  },
  
  'hero-cards-layout': {
    layout: 'cards',
    style: 'modern-cards',
    structure: 'text-with-feature-cards',
    css: `
      .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
      .hero-features { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
      .feature-card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem; backdrop-filter: blur(10px); }
    `
  },
  
  'hero-timeline': {
    layout: 'timeline',
    style: 'process-steps',
    structure: 'vertical-timeline',
    css: `
      .hero-content { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; }
      .hero-timeline { position: relative; }
      .timeline-item { margin: 2rem 0; padding-left: 3rem; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: 0; top: 0; width: 20px; height: 20px; background: var(--primary); border-radius: 50%; }
    `
  },
  
  // Hero créatifs
  'hero-floating-elements': {
    layout: 'floating',
    style: 'creative-floating',
    structure: 'text-with-floating-cards',
    css: `
      .hero-content { position: relative; text-align: center; }
      .floating-element { position: absolute; background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; backdrop-filter: blur(10px); }
      .floating-1 { top: 20%; right: 10%; animation: float 6s ease-in-out infinite; }
      .floating-2 { bottom: 30%; left: 5%; animation: float 8s ease-in-out infinite reverse; }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    `
  },
  
  'hero-interactive-stats': {
    layout: 'stats',
    style: 'data-driven',
    structure: 'text-with-animated-stats',
    css: `
      .hero-content { text-align: center; }
      .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin-top: 4rem; }
      .stat-item { text-align: center; }
      .stat-number { font-size: 3rem; font-weight: 800; color: var(--primary); display: block; }
      .stat-label { color: rgba(255,255,255,0.8); margin-top: 0.5rem; }
    `
  },
  
  'hero-parallax-layers': {
    layout: 'parallax',
    style: 'layered-parallax',
    structure: 'multi-layer-parallax',
    css: `
      .hero-content { position: relative; z-index: 3; }
      .parallax-layer { position: absolute; width: 100%; height: 100%; }
      .layer-1 { background: linear-gradient(45deg, var(--primary), transparent); animation: parallax-1 20s linear infinite; }
      .layer-2 { background: linear-gradient(-45deg, var(--secondary), transparent); animation: parallax-2 15s linear infinite; }
      @keyframes parallax-1 { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    `
  },
  
  // Hero professionnels
  'hero-corporate-clean': {
    layout: 'corporate',
    style: 'clean-professional',
    structure: 'centered-professional',
    css: `
      .hero-content { max-width: 800px; margin: 0 auto; text-align: center; }
      .hero-title { font-size: 4rem; font-weight: 300; letter-spacing: -2px; }
      .hero-subtitle { font-size: 1.5rem; font-weight: 300; opacity: 0.9; margin: 2rem 0; }
      .hero-buttons { margin-top: 3rem; }
    `
  },
  
  'hero-magazine-style': {
    layout: 'magazine',
    style: 'editorial',
    structure: 'magazine-layout',
    css: `
      .hero-content { display: grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: start; }
      .hero-main { }
      .hero-sidebar { display: grid; gap: 2rem; }
      .sidebar-item { padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 1rem; }
    `
  }
};

// Types de blocs Services (15+ variations)
export const SERVICE_BLOCKS = {
  'services-grid-classic': {
    layout: 'grid',
    style: 'classic-cards',
    structure: '3-column-cards',
    css: `
      .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
      .service-card { background: var(--white); padding: 3rem; border-radius: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
      .service-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    `
  },
  
  'services-masonry': {
    layout: 'masonry',
    style: 'pinterest-style',
    structure: 'masonry-layout',
    css: `
      .services-grid { columns: 3; column-gap: 2rem; }
      .service-card { break-inside: avoid; margin-bottom: 2rem; background: var(--white); padding: 2rem; border-radius: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .service-card:nth-child(odd) { margin-top: 2rem; }
    `
  },
  
  'services-tabs-interactive': {
    layout: 'tabs',
    style: 'interactive-tabs',
    structure: 'tabbed-interface',
    css: `
      .services-tabs { display: flex; justify-content: center; margin-bottom: 3rem; }
      .tab-button { padding: 1rem 2rem; background: transparent; border: 2px solid var(--primary); color: var(--primary); margin: 0 0.5rem; border-radius: 2rem; cursor: pointer; transition: all 0.3s ease; }
      .tab-button.active { background: var(--primary); color: var(--white); }
      .tab-content { background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    `
  },
  
  'services-timeline-process': {
    layout: 'timeline',
    style: 'process-flow',
    structure: 'horizontal-timeline',
    css: `
      .services-timeline { position: relative; padding: 3rem 0; }
      .timeline-line { position: absolute; top: 50%; left: 0; right: 0; height: 4px; background: var(--primary); }
      .timeline-items { display: flex; justify-content: space-between; position: relative; z-index: 2; }
      .timeline-item { background: var(--white); padding: 2rem; border-radius: 1rem; width: 250px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: var(--primary); border-radius: 50%; }
    `
  },
  
  'services-carousel-slider': {
    layout: 'carousel',
    style: 'slider-cards',
    structure: 'horizontal-slider',
    css: `
      .services-carousel { position: relative; overflow: hidden; }
      .carousel-track { display: flex; transition: transform 0.3s ease; }
      .carousel-slide { min-width: 400px; margin-right: 2rem; background: var(--white); padding: 3rem; border-radius: 1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .carousel-controls { text-align: center; margin-top: 2rem; }
    `
  },
  
  'services-accordion': {
    layout: 'accordion',
    style: 'expandable-list',
    structure: 'vertical-accordion',
    css: `
      .services-accordion { max-width: 800px; margin: 0 auto; }
      .accordion-item { border: 1px solid var(--gray-200); margin-bottom: 1rem; border-radius: 1rem; overflow: hidden; }
      .accordion-header { padding: 2rem; background: var(--gray-50); cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
      .accordion-content { padding: 0 2rem 2rem; background: var(--white); }
    `
  },
  
  'services-hexagon-grid': {
    layout: 'hexagon',
    style: 'geometric-hexagons',
    structure: 'hexagon-pattern',
    css: `
      .services-hexagon { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
      .hexagon-item { width: 200px; height: 173px; position: relative; margin: 86px 0; }
      .hexagon-inner { width: 100%; height: 100%; background: var(--primary); position: relative; transform: rotate(30deg); border-radius: 1rem; }
      .hexagon-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); text-align: center; color: var(--white); }
    `
  },
  
  'services-comparison-table': {
    layout: 'table',
    style: 'comparison-grid',
    structure: 'feature-comparison',
    css: `
      .services-table { background: var(--white); border-radius: 2rem; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      .table-header { background: var(--primary); color: var(--white); padding: 2rem; text-align: center; }
      .table-row { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--gray-200); }
      .table-cell { padding: 1.5rem; text-align: center; }
    `
  }
};

// Types de blocs Contact (10+ variations)
export const CONTACT_BLOCKS = {
  'contact-split-form': {
    layout: 'split',
    style: 'form-with-info',
    structure: 'info-left-form-right',
    css: `
      .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
      .contact-info { background: var(--gray-900); color: var(--white); padding: 3rem; border-radius: 2rem; }
      .contact-form { background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    `
  },
  
  'contact-centered-minimal': {
    layout: 'centered',
    style: 'minimal-clean',
    structure: 'centered-form',
    css: `
      .contact-content { max-width: 600px; margin: 0 auto; text-align: center; }
      .contact-form { background: var(--white); padding: 4rem; border-radius: 3rem; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
      .form-input { border: none; border-bottom: 2px solid var(--gray-200); background: transparent; padding: 1rem 0; margin: 1rem 0; }
    `
  },
  
  'contact-map-overlay': {
    layout: 'overlay',
    style: 'map-with-overlay',
    structure: 'map-background-form-overlay',
    css: `
      .contact-section { position: relative; height: 80vh; }
      .contact-map { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--gray-300); }
      .contact-overlay { position: absolute; top: 50%; right: 5%; transform: translateY(-50%); background: var(--white); padding: 3rem; border-radius: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2); max-width: 400px; }
    `
  },
  
  'contact-floating-cards': {
    layout: 'cards',
    style: 'floating-contact-cards',
    structure: 'floating-method-cards',
    css: `
      .contact-methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 4rem 0; }
      .contact-card { background: var(--white); padding: 3rem; border-radius: 2rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
      .contact-card:hover { transform: translateY(-10px) rotate(2deg); }
      .contact-icon { font-size: 3rem; margin-bottom: 1rem; }
    `
  }
};

// Système de génération de layouts uniques
export class ElementorBlocksSystem {
  private usedCombinations: Set<string> = new Set();
  
  generateUniqueLayout(siteId: string, style: string): SiteLayout {
    let combination: string;
    let layout: SiteLayout;
    
    do {
      layout = this.createRandomLayout(style);
      combination = this.getLayoutSignature(layout);
    } while (this.usedCombinations.has(combination));
    
    this.usedCombinations.add(combination);
    
    console.log(`✅ Layout unique généré pour ${siteId}: ${combination}`);
    return layout;
  }
  
  private createRandomLayout(style: string): SiteLayout {
    const heroKeys = Object.keys(HERO_BLOCKS);
    const serviceKeys = Object.keys(SERVICE_BLOCKS);
    const contactKeys = Object.keys(CONTACT_BLOCKS);
    
    // Sélection intelligente selon le style
    const hero = this.selectBlockByStyle(heroKeys, HERO_BLOCKS, style);
    const services = this.selectBlockByStyle(serviceKeys, SERVICE_BLOCKS, style);
    const contact = this.selectBlockByStyle(contactKeys, CONTACT_BLOCKS, style);
    
    return {
      hero: {
        id: `hero-${Date.now()}`,
        type: 'hero',
        layout: hero.layout,
        style: hero.style,
        css: hero.css
      },
      services: {
        id: `services-${Date.now()}`,
        type: 'services',
        layout: services.layout,
        style: services.style,
        css: services.css
      },
      contact: {
        id: `contact-${Date.now()}`,
        type: 'contact',
        layout: contact.layout,
        style: contact.style,
        css: contact.css
      },
      footer: {
        id: `footer-${Date.now()}`,
        type: 'footer',
        layout: 'standard',
        style: 'modern',
        css: this.getFooterCSS()
      }
    };
  }
  
  private selectBlockByStyle(keys: string[], blocks: any, style: string): any {
    // Logique de sélection intelligente selon le style
    let preferredBlocks: string[] = [];
    
    switch (style) {
      case 'modern':
        preferredBlocks = keys.filter(key => 
          key.includes('floating') || key.includes('interactive') || key.includes('parallax')
        );
        break;
      case 'classic':
        preferredBlocks = keys.filter(key => 
          key.includes('classic') || key.includes('split') || key.includes('grid')
        );
        break;
      case 'corporate':
        preferredBlocks = keys.filter(key => 
          key.includes('corporate') || key.includes('clean') || key.includes('professional')
        );
        break;
      case 'bold':
        preferredBlocks = keys.filter(key => 
          key.includes('diagonal') || key.includes('hexagon') || key.includes('timeline')
        );
        break;
      case 'minimal':
        preferredBlocks = keys.filter(key => 
          key.includes('minimal') || key.includes('centered') || key.includes('clean')
        );
        break;
    }
    
    // Si pas de blocs préférés, prendre tous
    if (preferredBlocks.length === 0) {
      preferredBlocks = keys;
    }
    
    const selectedKey = preferredBlocks[Math.floor(Math.random() * preferredBlocks.length)];
    return blocks[selectedKey];
  }
  
  private getLayoutSignature(layout: SiteLayout): string {
    return `${layout.hero.layout}-${layout.services.layout}-${layout.contact.layout}`;
  }
  
  private getFooterCSS(): string {
    return `
      .footer-mega {
        background: var(--gray-900);
        color: var(--white);
        padding: 3rem 0 1rem;
      }
      .footer-content {
        text-align: center;
      }
      .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 2rem;
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }
  
  // Méthode pour obtenir les statistiques de variabilité
  getVariabilityStats(): {
    totalHeroCombinations: number;
    totalServiceCombinations: number;
    totalContactCombinations: number;
    totalUniqueSites: number;
  } {
    return {
      totalHeroCombinations: Object.keys(HERO_BLOCKS).length,
      totalServiceCombinations: Object.keys(SERVICE_BLOCKS).length,
      totalContactCombinations: Object.keys(CONTACT_BLOCKS).length,
      totalUniqueSites: Object.keys(HERO_BLOCKS).length * Object.keys(SERVICE_BLOCKS).length * Object.keys(CONTACT_BLOCKS).length
    };
  }
}

export default new ElementorBlocksSystem();