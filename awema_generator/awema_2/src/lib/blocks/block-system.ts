// Système de blocs modulaires ultra-pro 2025
import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'

// Types de base pour le système de blocs
export interface BlockComponent {
  id: string
  type: BlockType
  variant: string
  style: DesignStyle
  data: any
  options: BlockOptions
}

export type BlockType = 
  | 'hero' 
  | 'services' 
  | 'testimonials' 
  | 'stats' 
  | 'cta' 
  | 'gallery' 
  | 'features' 
  | 'pricing'
  | 'about'
  | 'contact-form'
  | 'local-seo'
  | 'navigation'
  | 'footer'

export type DesignStyle = 
  | 'electricien' 
  | 'plombier' 
  | 'chauffagiste' 
  | 'multi' 
  | 'universal'

export interface BlockOptions {
  colors?: ColorPalette
  layout?: 'grid' | 'list' | 'carousel' | 'masonry' | 'split'
  animation?: AnimationType
  spacing?: SpacingLevel
  background?: BackgroundType
  responsive?: ResponsiveOptions
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  text: string
  textLight: string
  background: string
  backgroundAlt: string
}

export type AnimationType = 'none' | 'fade' | 'slide' | 'scale' | 'parallax' | 'hover3d'
export type SpacingLevel = 'compact' | 'normal' | 'relaxed' | 'spacious'
export type BackgroundType = 'solid' | 'gradient' | 'pattern' | 'image' | 'video'

export interface ResponsiveOptions {
  mobile: Partial<BlockOptions>
  tablet: Partial<BlockOptions>
  desktop: Partial<BlockOptions>
}

// Configuration de page complète
export interface PageComposition {
  type: 'home' | 'services' | 'service-detail' | 'contact' | 'about' | 'legal' | 'local-seo'
  style: DesignStyle
  blocks: BlockComponent[]
  navigation: NavigationItem[]
  seo: SEOConfiguration
  linking: LinkingConfiguration
}

export interface SEOConfiguration {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  schema?: any
  breadcrumbs?: BreadcrumbItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface LinkingConfiguration {
  internal: InternalLink[]
  contextual: ContextualLink[]
  recommendations: RecommendationLink[]
}

export interface InternalLink {
  anchor: string
  href: string
  context: string
  priority: 'high' | 'medium' | 'low'
}

export interface ContextualLink {
  keywords: string[]
  href: string
  anchor: string
  placement: 'content' | 'sidebar' | 'footer'
}

export interface RecommendationLink {
  title: string
  href: string
  description: string
  type: 'service' | 'city' | 'related'
}

// Interface principale du système de blocs
export abstract class BaseBlock {
  abstract type: BlockType
  abstract variants: string[]
  
  constructor(
    protected data: TemplateData,
    protected options: BlockOptions = {}
  ) {}
  
  abstract render(variant: string): string
  
  // Méthodes communes
  protected generateCSS(variant: string): string {
    return this.getBaseCSS() + this.getVariantCSS(variant) + this.getResponsiveCSS()
  }
  
  protected getBaseCSS(): string {
    return `
      .block-${this.type} {
        position: relative;
        overflow: hidden;
      }
    `
  }
  
  protected abstract getVariantCSS(variant: string): string
  
  protected getResponsiveCSS(): string {
    if (!this.options.responsive) return ''
    
    return `
      @media (max-width: 768px) {
        .block-${this.type} {
          /* Mobile styles */
        }
      }
      
      @media (min-width: 769px) and (max-width: 1024px) {
        .block-${this.type} {
          /* Tablet styles */
        }
      }
      
      @media (min-width: 1025px) {
        .block-${this.type} {
          /* Desktop styles */
        }
      }
    `
  }
  
  protected getAnimationCSS(): string {
    if (!this.options.animation || this.options.animation === 'none') return ''
    
    const animations = {
      fade: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade { animation: fadeInUp 0.6s ease forwards; }
      `,
      slide: `
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide { animation: slideInRight 0.6s ease forwards; }
      `,
      scale: `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale { animation: scaleIn 0.6s ease forwards; }
      `,
      parallax: `
        .parallax-element {
          transform: translateY(var(--parallax-offset, 0px));
          transition: transform 0.1s ease-out;
        }
      `,
      hover3d: `
        .hover-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .hover-3d:hover {
          transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(10px);
        }
      `
    }
    
    return animations[this.options.animation] || ''
  }
  
  protected getSpacingCSS(): string {
    const spacing = this.options.spacing || 'normal'
    const spacingValues = {
      compact: { padding: '2rem 0', margin: '1rem 0' },
      normal: { padding: '4rem 0', margin: '2rem 0' },
      relaxed: { padding: '6rem 0', margin: '3rem 0' },
      spacious: { padding: '8rem 0', margin: '4rem 0' }
    }
    
    const values = spacingValues[spacing]
    return `
      .block-${this.type} {
        padding: ${values.padding};
        margin: ${values.margin};
      }
    `
  }
  
  protected getColorVariables(): string {
    const colors = this.options.colors || this.getDefaultColors()
    return `
      .block-${this.type} {
        --block-primary: ${colors.primary};
        --block-secondary: ${colors.secondary};
        --block-accent: ${colors.accent};
        --block-text: ${colors.text};
        --block-text-light: ${colors.textLight};
        --block-bg: ${colors.background};
        --block-bg-alt: ${colors.backgroundAlt};
      }
    `
  }
  
  private getDefaultColors(): ColorPalette {
    // Couleurs par défaut selon le style
    const styleColors = {
      electricien: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#fbbf24',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f9fafb'
      },
      plombier: {
        primary: '#0ea5e9',
        secondary: '#06b6d4',
        accent: '#f97316',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f8fafc'
      },
      chauffagiste: {
        primary: '#ea580c',
        secondary: '#dc2626',
        accent: '#fbbf24',
        text: '#0c0a09',
        textLight: '#57534e',
        background: '#fefefe',
        backgroundAlt: '#fafaf9'
      },
      multi: {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f9fafb'
      },
      universal: {
        primary: '#1f2937',
        secondary: '#374151',
        accent: '#f59e0b',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#ffffff',
        backgroundAlt: '#f9fafb'
      }
    }
    
    return styleColors[this.options.colors?.primary ? 'universal' : 'universal']
  }
}

// Registry des blocs disponibles
export class BlockRegistry {
  private static blocks = new Map<BlockType, typeof BaseBlock>()
  
  static register(type: BlockType, blockClass: typeof BaseBlock) {
    this.blocks.set(type, blockClass)
  }
  
  static create(
    type: BlockType, 
    data: TemplateData, 
    options: BlockOptions = {}
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
    const tempInstance = new BlockClass({} as TemplateData, {})
    return tempInstance.variants
  }
}