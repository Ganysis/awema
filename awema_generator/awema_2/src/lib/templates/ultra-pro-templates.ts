import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'

// Interface pour les templates ultra-professionnels
export interface UltraProTemplate {
  id: string
  name: string
  category: 'electricien' | 'plombier' | 'chauffagiste' | 'multi-metiers'
  style: 'moderne' | 'elegant' | 'corporate' | 'artisanal' | 'premium'
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  features: string[]
  description: string
}

// Collections d'images professionnelles par métier
export const PROFESSIONAL_IMAGES = {
  electricien: {
    hero: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618047-7c9c4471ac15?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&h=1080&fit=crop&crop=center'
    ],
    services: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618047-7c9c4471ac15?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop&crop=center'
    ],
    team: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center'
  },
  plombier: {
    hero: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618047-3c6c1e2b1b7f?w=1920&h=1080&fit=crop&crop=center'
    ],
    services: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center'
    ],
    team: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=center'
  },
  chauffagiste: {
    hero: [
      'https://images.unsplash.com/photo-1621905251954-490ece5b2e0f?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1558618047-b1b3c2b3b3f4?w=1920&h=1080&fit=crop&crop=center'
    ],
    services: [
      'https://images.unsplash.com/photo-1621905251954-490ece5b2e0f?w=400&h=300&fit=crop&crop=center'
    ],
    team: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=center'
  }
}

// Templates Ultra Pro - TEMPLATES DE QUALITÉ AGENCE WEB (6 templates implémentés)
export const ULTRA_PRO_TEMPLATES: UltraProTemplate[] = [
  // ÉLECTRICIENS - 3 templates réellement implémentés
  {
    id: 'electricien-elite-pro',
    name: 'Électricien Elite Pro',
    category: 'electricien',
    style: 'premium',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#fbbf24',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Hero animé', 'Slider services', 'Témoignages', 'Galerie projets', 'Formulaire devis intelligent'],
    description: 'Template premium avec animations avancées et design ultra-moderne'
  },
  {
    id: 'electricien-corporate-deluxe',
    name: 'Électricien Corporate Deluxe',
    category: 'electricien',
    style: 'corporate',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#f59e0b',
      text: '#111827',
      background: '#f9fafb'
    },
    features: ['Design corporate', 'Sections certifications', 'Équipe', 'Portfolio', 'Blog intégré'],
    description: 'Design professionnel pour grandes entreprises électriques'
  },
  {
    id: 'electricien-artisan-moderne',
    name: 'Électricien Artisan Moderne',
    category: 'electricien',
    style: 'artisanal',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#fbbf24',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Style artisanal', 'Histoire famille', 'Savoir-faire', 'Localisation', 'Urgences 24h'],
    description: 'Parfait pour électriciens artisans avec tradition familiale'
  },

  // PLOMBIERS - 2 templates implémentés
  {
    id: 'plombier-aqua-premium',
    name: 'Plombier Aqua Premium',
    category: 'plombier',
    style: 'premium',
    colors: {
      primary: '#0ea5e9',
      secondary: '#38bdf8',
      accent: '#06b6d4',
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Thème aquatique', 'Animations fluides', 'Calculateur prix', 'Urgences', 'Géolocalisation'],
    description: 'Template premium avec thématique eau et design fluide'
  },
  {
    id: 'plombier-corporate-elite',
    name: 'Plombier Corporate Elite',
    category: 'plombier',
    style: 'corporate',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#f97316',
      text: '#0f172a',
      background: '#ffffff'
    },
    features: ['Design corporate', 'Stats animées', 'Expertise certifiée', 'Témoignages premium', 'Zones intervention'],
    description: 'Template corporate de qualité agence web avec sections complètes'
  },

  // CHAUFFAGISTES - 1 template implémenté
  {
    id: 'chauffagiste-premium-pro',
    name: 'Chauffagiste Premium Pro',
    category: 'chauffagiste',
    style: 'premium',
    colors: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#fbbf24',
      text: '#0c0a09',
      background: '#fefefe'
    },
    features: ['Design ultra-premium', 'Aides financières', 'Technologies innovantes', 'Animations sophistiquées', 'Rénovation énergétique'],
    description: 'Template premium spécialisé pompe à chaleur et rénovation énergétique'
  }
]

// Fonction helper pour filtrer par catégorie
export function getUltraProTemplatesByCategory(category: string): UltraProTemplate[] {
  return ULTRA_PRO_TEMPLATES.filter(template => template.category === category)
}

export default ULTRA_PRO_TEMPLATES