import { TemplateData } from '../template'
import { NavigationItem } from '../multi-page-generator'
import { ULTRA_PRO_TEMPLATES, UltraProTemplate } from './ultra-pro-templates'

// Import all ultra-professional templates
import { generateElectricienEliteProTemplate } from './electricien-elite-pro'
import { generateElectricienCorporateDeluxeTemplate } from './electricien-corporate-deluxe'
import { generateElectricienArtisanModerneTemplate } from './electricien-artisan-moderne'
import { generatePlombierAquaPremiumTemplate } from './plombier-aqua-premium'
import { generatePlombierCorporateEliteTemplate } from './plombier-corporate-elite'
import { generateChauffagistePremiumProTemplate } from './chauffagiste-premium-pro'

// Template generator function type
export type UltraProTemplateGenerator = (data: TemplateData, navigation: NavigationItem[]) => string

// Map of template generators - TOUS LES TEMPLATES QUALITÉ AGENCE WEB
export const ULTRA_PRO_GENERATORS: Record<string, UltraProTemplateGenerator> = {
  // ÉLECTRICIENS - 3 templates réellement implémentés
  'electricien-elite-pro': generateElectricienEliteProTemplate,
  'electricien-corporate-deluxe': generateElectricienCorporateDeluxeTemplate,
  'electricien-artisan-moderne': generateElectricienArtisanModerneTemplate,
  
  // PLOMBIERS - 2 templates réellement implémentés
  'plombier-aqua-premium': generatePlombierAquaPremiumTemplate,
  'plombier-corporate-elite': generatePlombierCorporateEliteTemplate,

  // CHAUFFAGISTES - 1 template réellement implémenté
  'chauffagiste-premium-pro': generateChauffagistePremiumProTemplate,
}

/**
 * Generate an ultra-professional template
 */
export function generateUltraProTemplate(
  templateId: string, 
  data: TemplateData, 
  navigation: NavigationItem[]
): string {
  const generator = ULTRA_PRO_GENERATORS[templateId]
  
  if (!generator) {
    // Fallback to the elite pro template if template not found
    console.warn(`Ultra-pro template '${templateId}' not found, using fallback`)
    return generateElectricienEliteProTemplate(data, navigation)
  }
  
  return generator(data, navigation)
}

/**
 * Get a random ultra-professional template ID by category
 */
export function getRandomUltraProTemplate(category?: string): string {
  let availableTemplates = ULTRA_PRO_TEMPLATES
  
  if (category) {
    availableTemplates = ULTRA_PRO_TEMPLATES.filter(t => t.category === category)
  }
  
  if (availableTemplates.length === 0) {
    return 'electricien-elite-pro' // fallback
  }
  
  const randomIndex = Math.floor(Math.random() * availableTemplates.length)
  return availableTemplates[randomIndex].id
}

/**
 * Get template info by ID
 */
export function getUltraProTemplateInfo(templateId: string): UltraProTemplate | null {
  return ULTRA_PRO_TEMPLATES.find(t => t.id === templateId) || null
}

/**
 * Get all templates by category
 */
export function getUltraProTemplatesByCategory(category: string): UltraProTemplate[] {
  return ULTRA_PRO_TEMPLATES.filter(t => t.category === category)
}

/**
 * Check if a template is implemented
 */
export function isUltraProTemplateImplemented(templateId: string): boolean {
  // Tous les templates dans ULTRA_PRO_GENERATORS sont disponibles (avec fallbacks)
  return templateId in ULTRA_PRO_GENERATORS
}

// Export everything for easy access
export {
  ULTRA_PRO_TEMPLATES,
  type UltraProTemplate
} from './ultra-pro-templates'

export default {
  generate: generateUltraProTemplate,
  getRandom: getRandomUltraProTemplate,
  getInfo: getUltraProTemplateInfo,
  getByCategory: getUltraProTemplatesByCategory,
  isImplemented: isUltraProTemplateImplemented,
  templates: ULTRA_PRO_TEMPLATES,
  generators: ULTRA_PRO_GENERATORS
}