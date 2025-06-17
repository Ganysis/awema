import { TemplateData } from './template'

// Interface pour un template BTP
export interface BTPTemplate {
  id: string
  name: string
  category: 'home' | 'service' | 'contact'
  description: string
  preview: string
  sectors: string[] // Secteurs BTP recommandés
  style: 'modern' | 'classic' | 'bold' | 'minimal' | 'professional'
}

// Registry de tous les templates BTP
export const BTP_TEMPLATES: BTPTemplate[] = [
  // ===== TEMPLATES ACCUEIL =====
  {
    id: 'home-modern-pro',
    name: 'Pro Moderne',
    category: 'home',
    description: 'Design moderne et épuré, parfait pour tous métiers BTP',
    preview: '/templates/home-modern-pro.jpg',
    sectors: ['plomberie', 'électricité', 'chauffage', 'climatisation'],
    style: 'modern'
  },
  {
    id: 'home-classic-artisan',
    name: 'Artisan Classique',
    category: 'home',
    description: 'Style traditionnel rassurant pour artisans expérimentés',
    preview: '/templates/home-classic-artisan.jpg',
    sectors: ['maçonnerie', 'menuiserie', 'couverture', 'charpente'],
    style: 'classic'
  },
  {
    id: 'home-bold-impact',
    name: 'Impact Dynamique',
    category: 'home',
    description: 'Design percutant pour se démarquer de la concurrence',
    preview: '/templates/home-bold-impact.jpg',
    sectors: ['peinture', 'carrelage', 'décoration', 'rénovation'],
    style: 'bold'
  },
  {
    id: 'home-minimal-clean',
    name: 'Épuré Minimal',
    category: 'home',
    description: 'Design minimaliste et professionnel',
    preview: '/templates/home-minimal-clean.jpg',
    sectors: ['électricité', 'domotique', 'alarme', 'télécom'],
    style: 'minimal'
  },
  {
    id: 'home-premium-luxury',
    name: 'Premium Luxe',
    category: 'home',
    description: 'Haut de gamme pour prestations luxueuses',
    preview: '/templates/home-premium-luxury.jpg',
    sectors: ['architecture', 'design', 'aménagement', 'piscine'],
    style: 'professional'
  },
  {
    id: 'home-urgence-24h',
    name: 'Urgence 24h/7j',
    category: 'home',
    description: 'Optimisé pour services d\'urgence et dépannage',
    preview: '/templates/home-urgence-24h.jpg',
    sectors: ['plomberie', 'électricité', 'chauffage', 'serrurerie'],
    style: 'bold'
  },
  {
    id: 'home-local-proximity',
    name: 'Proximité Locale',
    category: 'home',
    description: 'Met l\'accent sur le service de proximité',
    preview: '/templates/home-local-proximity.jpg',
    sectors: ['jardinage', 'paysagisme', 'nettoyage', 'entretien'],
    style: 'classic'
  },
  {
    id: 'home-eco-green',
    name: 'Éco-Responsable',
    category: 'home',
    description: 'Pour artisans éco-responsables et durables',
    preview: '/templates/home-eco-green.jpg',
    sectors: ['isolation', 'photovoltaïque', 'pompe à chaleur', 'bois'],
    style: 'modern'
  },
  {
    id: 'home-family-trust',
    name: 'Confiance Familiale',
    category: 'home',
    description: 'Chaleureux et rassurant pour entreprises familiales',
    preview: '/templates/home-family-trust.jpg',
    sectors: ['menuiserie', 'maçonnerie', 'couverture', 'générale'],
    style: 'classic'
  },
  {
    id: 'home-tech-innovation',
    name: 'Tech Innovation',
    category: 'home',
    description: 'Technologique pour métiers innovants',
    preview: '/templates/home-tech-innovation.jpg',
    sectors: ['domotique', 'photovoltaïque', 'climatisation', 'automatisme'],
    style: 'modern'
  },

  // ===== TEMPLATES SERVICES =====
  {
    id: 'service-detail-pro',
    name: 'Détail Professionnel',
    category: 'service',
    description: 'Présentation détaillée des services avec photos',
    preview: '/templates/service-detail-pro.jpg',
    sectors: ['plomberie', 'électricité', 'chauffage'],
    style: 'professional'
  },
  {
    id: 'service-before-after',
    name: 'Avant/Après',
    category: 'service',
    description: 'Met en valeur les réalisations avec avant/après',
    preview: '/templates/service-before-after.jpg',
    sectors: ['rénovation', 'peinture', 'carrelage', 'aménagement'],
    style: 'bold'
  },
  {
    id: 'service-process-steps',
    name: 'Étapes Processus',
    category: 'service',
    description: 'Explique le processus de réalisation étape par étape',
    preview: '/templates/service-process-steps.jpg',
    sectors: ['maçonnerie', 'construction', 'architecture'],
    style: 'professional'
  },
  {
    id: 'service-urgence-rapid',
    name: 'Urgence Rapide',
    category: 'service',
    description: 'Optimisé pour services d\'urgence et dépannage',
    preview: '/templates/service-urgence-rapid.jpg',
    sectors: ['plomberie', 'électricité', 'serrurerie', 'vitrerie'],
    style: 'bold'
  },
  {
    id: 'service-catalog-grid',
    name: 'Catalogue Grille',
    category: 'service',
    description: 'Présentation en grille pour multiples services',
    preview: '/templates/service-catalog-grid.jpg',
    sectors: ['menuiserie', 'métallerie', 'stores', 'fermetures'],
    style: 'modern'
  },
  {
    id: 'service-price-transparent',
    name: 'Prix Transparent',
    category: 'service',
    description: 'Met l\'accent sur la transparence des prix',
    preview: '/templates/service-price-transparent.jpg',
    sectors: ['nettoyage', 'jardinage', 'entretien', 'maintenance'],
    style: 'minimal'
  },
  {
    id: 'service-guarantee-trust',
    name: 'Garantie Confiance',
    category: 'service',
    description: 'Met en avant les garanties et certifications',
    preview: '/templates/service-guarantee-trust.jpg',
    sectors: ['isolation', 'photovoltaïque', 'pompe à chaleur'],
    style: 'professional'
  },
  {
    id: 'service-local-zones',
    name: 'Zones Locales',
    category: 'service',
    description: 'Optimisé pour mettre en avant les zones d\'intervention',
    preview: '/templates/service-local-zones.jpg',
    sectors: ['déménagement', 'livraison', 'transport'],
    style: 'classic'
  },
  {
    id: 'service-seasonal-offers',
    name: 'Offres Saisonnières',
    category: 'service',
    description: 'Parfait pour services avec offres saisonnières',
    preview: '/templates/service-seasonal-offers.jpg',
    sectors: ['climatisation', 'chauffage', 'piscine', 'jardinage'],
    style: 'modern'
  },
  {
    id: 'service-custom-solutions',
    name: 'Solutions Sur-Mesure',
    category: 'service',
    description: 'Pour prestations personnalisées et sur-mesure',
    preview: '/templates/service-custom-solutions.jpg',
    sectors: ['menuiserie', 'métallerie', 'agencement', 'design'],
    style: 'minimal'
  },

  // ===== TEMPLATES CONTACT =====
  {
    id: 'contact-simple-direct',
    name: 'Simple Direct',
    category: 'contact',
    description: 'Contact direct et efficace',
    preview: '/templates/contact-simple-direct.jpg',
    sectors: ['plomberie', 'électricité', 'urgence'],
    style: 'minimal'
  },
  {
    id: 'contact-map-location',
    name: 'Carte Localisation',
    category: 'contact',
    description: 'Met l\'accent sur la localisation géographique',
    preview: '/templates/contact-map-location.jpg',
    sectors: ['services locaux', 'proximité', 'déplacement'],
    style: 'modern'
  },
  {
    id: 'contact-multi-channel',
    name: 'Multi-Canaux',
    category: 'contact',
    description: 'Plusieurs moyens de contact (tel, mail, formulaire)',
    preview: '/templates/contact-multi-channel.jpg',
    sectors: ['tous secteurs'],
    style: 'professional'
  },
  {
    id: 'contact-quote-form',
    name: 'Formulaire Devis',
    category: 'contact',
    description: 'Formulaire détaillé pour demande de devis',
    preview: '/templates/contact-quote-form.jpg',
    sectors: ['construction', 'rénovation', 'aménagement'],
    style: 'professional'
  },
  {
    id: 'contact-urgence-hotline',
    name: 'Urgence Hotline',
    category: 'contact',
    description: 'Numéro d\'urgence mis en avant',
    preview: '/templates/contact-urgence-hotline.jpg',
    sectors: ['dépannage', 'urgence', 'intervention'],
    style: 'bold'
  },
  {
    id: 'contact-schedule-appointment',
    name: 'Prise Rendez-vous',
    category: 'contact',
    description: 'Optimisé pour la prise de rendez-vous',
    preview: '/templates/contact-schedule-appointment.jpg',
    sectors: ['diagnostic', 'conseil', 'étude'],
    style: 'modern'
  },
  {
    id: 'contact-team-human',
    name: 'Équipe Humaine',
    category: 'contact',
    description: 'Met en avant l\'équipe et l\'aspect humain',
    preview: '/templates/contact-team-human.jpg',
    sectors: ['entreprise familiale', 'artisanat'],
    style: 'classic'
  },
  {
    id: 'contact-opening-hours',
    name: 'Horaires Détaillés',
    category: 'contact',
    description: 'Met l\'accent sur les horaires d\'ouverture',
    preview: '/templates/contact-opening-hours.jpg',
    sectors: ['magasins', 'showroom', 'accueil public'],
    style: 'classic'
  },
  {
    id: 'contact-social-reviews',
    name: 'Avis Sociaux',
    category: 'contact',
    description: 'Intègre les avis clients et réseaux sociaux',
    preview: '/templates/contact-social-reviews.jpg',
    sectors: ['service client', 'réputation'],
    style: 'modern'
  },
  {
    id: 'contact-certification-trust',
    name: 'Certifications',
    category: 'contact',
    description: 'Met en avant les certifications et assurances',
    preview: '/templates/contact-certification-trust.jpg',
    sectors: ['qualifications', 'certifications', 'assurances'],
    style: 'professional'
  }
]

// Fonction pour obtenir les templates par catégorie
export function getTemplatesByCategory(category: 'home' | 'service' | 'contact'): BTPTemplate[] {
  return BTP_TEMPLATES.filter(template => template.category === category)
}

// Fonction pour obtenir les templates recommandés pour un secteur
export function getTemplatesForSector(sector: string, category?: 'home' | 'service' | 'contact'): BTPTemplate[] {
  let templates = BTP_TEMPLATES.filter(template => 
    template.sectors.includes(sector) || template.sectors.includes('tous secteurs')
  )
  
  if (category) {
    templates = templates.filter(template => template.category === category)
  }
  
  return templates
}

// Fonction pour obtenir un template par ID
export function getTemplateById(id: string): BTPTemplate | undefined {
  return BTP_TEMPLATES.find(template => template.id === id)
}