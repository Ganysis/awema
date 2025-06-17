import { BTP_TEMPLATES, getTemplatesForSector, type BTPTemplate } from './btp-templates'

export interface TemplateSelection {
  homeTemplate: string
  serviceTemplate: string
  contactTemplate: string
  reason: string
}

/**
 * Sélectionne aléatoirement des templates BTP optimaux selon le secteur d'activité
 */
export function selectRandomTemplates(sector: string, trade?: string): TemplateSelection {
  console.log(`🎲 Sélection de templates pour le secteur: ${sector}`)

  // 1. Obtenir les templates recommandés pour ce secteur
  const homeTemplates = getTemplatesForSector(sector, 'home')
  const serviceTemplates = getTemplatesForSector(sector, 'service')  
  const contactTemplates = getTemplatesForSector(sector, 'contact')

  // 2. Si aucun template spécifique, utiliser tous les templates
  const availableHome = homeTemplates.length > 0 ? homeTemplates : BTP_TEMPLATES.filter(t => t.category === 'home')
  const availableService = serviceTemplates.length > 0 ? serviceTemplates : BTP_TEMPLATES.filter(t => t.category === 'service')
  const availableContact = contactTemplates.length > 0 ? contactTemplates : BTP_TEMPLATES.filter(t => t.category === 'contact')

  // 3. Logique de sélection intelligente selon le type d'activité
  let selectedHome: BTPTemplate
  let selectedService: BTPTemplate
  let selectedContact: BTPTemplate
  let reason: string

  // Détection du type de service pour optimiser la sélection
  const isUrgencyService = /urgence|dépannage|plomberie|électricité|serrurerie/i.test(trade || sector)
  const isLuxuryService = /architecture|design|piscine|aménagement/i.test(trade || sector)
  const isTechService = /domotique|photovoltaïque|climatisation|automatisme/i.test(trade || sector)
  const isTraditionalCraft = /menuiserie|maçonnerie|couverture|charpente/i.test(trade || sector)
  const isEcoService = /isolation|pompe à chaleur|bois|écologique/i.test(trade || sector)
  const isPaintingService = /peinture|carrelage|décoration|rénovation/i.test(trade || sector)

  if (isUrgencyService) {
    // Services d'urgence - privilégier templates urgence
    selectedHome = findTemplateByPreference(availableHome, ['home-urgence-24h', 'home-modern-pro']) || randomSelect(availableHome)
    selectedService = findTemplateByPreference(availableService, ['service-urgence-rapid']) || randomSelect(availableService)
    selectedContact = findTemplateByPreference(availableContact, ['contact-urgence-hotline', 'contact-simple-direct']) || randomSelect(availableContact)
    reason = "🚨 Templates optimisés pour services d'urgence et intervention rapide"
    
  } else if (isLuxuryService) {
    // Services haut de gamme - privilégier templates premium
    selectedHome = findTemplateByPreference(availableHome, ['home-premium-luxury', 'home-modern-pro']) || randomSelect(availableHome)
    selectedService = findTemplateByPreference(availableService, ['service-custom-solutions', 'service-before-after']) || randomSelect(availableService)
    selectedContact = findTemplateByPreference(availableContact, ['contact-schedule-appointment', 'contact-multi-channel']) || randomSelect(availableContact)
    reason = "✨ Templates premium pour prestations haut de gamme"
    
  } else if (isTechService) {
    // Services technologiques - privilégier templates modernes/tech
    selectedHome = findTemplateByPreference(availableHome, ['home-tech-innovation', 'home-modern-pro']) || randomSelect(availableHome)
    selectedService = findTemplateByPreference(availableService, ['service-detail-pro', 'service-guarantee-trust']) || randomSelect(availableService)
    selectedContact = findTemplateByPreference(availableContact, ['contact-multi-channel', 'contact-simple-direct']) || randomSelect(availableContact)
    reason = "🔬 Templates technologiques pour métiers innovants"
    
  } else if (isTraditionalCraft) {
    // Artisanat traditionnel - privilégier templates classiques
    selectedHome = findTemplateByPreference(availableHome, ['home-classic-artisan', 'home-family-trust']) || randomSelect(availableHome)
    selectedService = findTemplateByPreference(availableService, ['service-process-steps', 'service-guarantee-trust']) || randomSelect(availableService)
    selectedContact = findTemplateByPreference(availableContact, ['contact-team-human', 'contact-opening-hours']) || randomSelect(availableContact)
    reason = "🏛️ Templates traditionnels pour savoir-faire artisanal"
    
  } else if (isEcoService) {
    // Services écologiques - privilégier templates éco
    selectedHome = findTemplateByPreference(availableHome, ['home-eco-green', 'home-modern-pro']) || randomSelect(availableHome)
    selectedService = findTemplateByPreference(availableService, ['service-guarantee-trust', 'service-detail-pro']) || randomSelect(availableService)
    selectedContact = findTemplateByPreference(availableContact, ['contact-certification-trust', 'contact-multi-channel']) || randomSelect(availableContact)
    reason = "🌱 Templates éco-responsables pour développement durable"
    
  } else if (isPaintingService) {
    // Services peinture/déco - privilégier templates visuels
    selectedHome = findTemplateByPreference(availableHome, ['home-bold-impact', 'home-modern-pro']) || randomSelect(availableHome)
    selectedService = findTemplateByPreference(availableService, ['service-before-after', 'service-catalog-grid']) || randomSelect(availableService)
    selectedContact = findTemplateByPreference(availableContact, ['contact-quote-form', 'contact-multi-channel']) || randomSelect(availableContact)
    reason = "🎨 Templates visuels pour métiers créatifs et décoratifs"
    
  } else {
    // Sélection aléatoire équilibrée pour autres secteurs
    selectedHome = weightedRandomSelect(availableHome, ['home-modern-pro', 'home-local-proximity'])
    selectedService = weightedRandomSelect(availableService, ['service-detail-pro', 'service-catalog-grid'])
    selectedContact = weightedRandomSelect(availableContact, ['contact-multi-channel', 'contact-simple-direct'])
    reason = "⚖️ Sélection équilibrée optimisée pour votre secteur"
  }

  const result = {
    homeTemplate: selectedHome.id,
    serviceTemplate: selectedService.id,
    contactTemplate: selectedContact.id,
    reason
  }

  console.log(`✅ Templates sélectionnés:`, result)
  
  return result
}

/**
 * Trouve un template selon une liste de préférences
 */
function findTemplateByPreference(templates: BTPTemplate[], preferences: string[]): BTPTemplate | null {
  for (const prefId of preferences) {
    const found = templates.find(t => t.id === prefId)
    if (found) return found
  }
  return null
}

/**
 * Sélection aléatoire simple
 */
function randomSelect<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Sélection aléatoire pondérée (favorise certains templates)
 */
function weightedRandomSelect(templates: BTPTemplate[], preferredIds: string[]): BTPTemplate {
  // Créer une liste pondérée (templates préférés x3)
  const weightedList: BTPTemplate[] = []
  
  templates.forEach(template => {
    // Ajouter une fois le template
    weightedList.push(template)
    
    // Si c'est un template préféré, l'ajouter 2 fois de plus (3x au total)
    if (preferredIds.includes(template.id)) {
      weightedList.push(template, template)
    }
  })
  
  return randomSelect(weightedList)
}

/**
 * Obtient une explication de la sélection des templates
 */
export function getTemplateSelectionRationale(
  homeTemplateId: string, 
  serviceTemplateId: string, 
  contactTemplateId: string
): string {
  const homeTemplate = BTP_TEMPLATES.find(t => t.id === homeTemplateId)
  const serviceTemplate = BTP_TEMPLATES.find(t => t.id === serviceTemplateId)
  const contactTemplate = BTP_TEMPLATES.find(t => t.id === contactTemplateId)

  return `📋 Templates sélectionnés pour optimiser votre présence en ligne:
• 🏠 Accueil: ${homeTemplate?.name} (${homeTemplate?.style})
• ⚙️ Services: ${serviceTemplate?.name} (${serviceTemplate?.style})  
• 📞 Contact: ${contactTemplate?.name} (${contactTemplate?.style})

Cette combinaison est optimisée pour votre secteur d'activité et maximise la conversion client.`
}

/**
 * Sélectionne des templates selon le style souhaité
 */
export function selectTemplatesByStyle(
  style: 'modern' | 'classic' | 'bold' | 'minimal' | 'professional'
): TemplateSelection {
  const homeTemplates = BTP_TEMPLATES.filter(t => t.category === 'home' && t.style === style)
  const serviceTemplates = BTP_TEMPLATES.filter(t => t.category === 'service' && t.style === style)
  const contactTemplates = BTP_TEMPLATES.filter(t => t.category === 'contact' && t.style === style)

  // Fallback si pas assez de templates du style demandé
  const fallbackHome = homeTemplates.length > 0 ? homeTemplates : BTP_TEMPLATES.filter(t => t.category === 'home')
  const fallbackService = serviceTemplates.length > 0 ? serviceTemplates : BTP_TEMPLATES.filter(t => t.category === 'service')
  const fallbackContact = contactTemplates.length > 0 ? contactTemplates : BTP_TEMPLATES.filter(t => t.category === 'contact')

  return {
    homeTemplate: randomSelect(fallbackHome).id,
    serviceTemplate: randomSelect(fallbackService).id,
    contactTemplate: randomSelect(fallbackContact).id,
    reason: `🎨 Templates cohérents avec le style "${style}" sélectionné`
  }
}