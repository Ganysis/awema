import { TemplateData } from './template'
import { generateUltraProSiteStructure } from './templates/ultra-pro-multi-page'
import { ULTRA_PRO_TEMPLATES } from './templates/ultra-pro-templates'
import { SiteStructure } from './multi-page-generator'

export interface UltraProTemplateSelection {
  templateId: string
  name: string
  category: 'electricien' | 'plombier' | 'chauffagiste' | 'multi-metiers'
  style: 'moderne' | 'elegant' | 'corporate' | 'artisanal' | 'premium'
  reason: string
  isUltraPro: true
}

/**
 * Sélectionne automatiquement le meilleur template Ultra Pro selon le métier
 */
export function selectUltraProTemplate(trade: string, sector?: string): UltraProTemplateSelection {
  console.log(`⚡ Sélection template Ultra Pro pour: ${trade}`)
  
  // Normaliser le métier pour la détection
  const normalizedTrade = (trade || sector || '').toLowerCase()
  
  // Détection du métier
  const isElectricien = /électric|élec|installation électrique|dépannage électrique/i.test(normalizedTrade)
  const isPlombier = /plomb|plomberie|sanitaire|chauffage plomberie|eau/i.test(normalizedTrade)
  const isChauffagiste = /chauffage|chaudière|radiateur|pompe à chaleur|climatisation/i.test(normalizedTrade)
  
  // Détection du style selon le contexte
  const isLuxury = /luxury|prestige|haut de gamme|premium|villa|château/i.test(normalizedTrade)
  const isCorporate = /entreprise|corporate|société|groupe|bureau/i.test(normalizedTrade)
  const isArtisan = /artisan|traditionnel|familial|savoir.faire|artisanal/i.test(normalizedTrade)
  
  let selectedTemplate: any
  let reason: string
  
  if (isElectricien) {
    if (isLuxury) {
      selectedTemplate = ULTRA_PRO_TEMPLATES.find(t => t.id === 'electricien-elite-pro')
      reason = "⚡ Template premium pour électricien haut de gamme avec animations avancées"
    } else if (isCorporate) {
      selectedTemplate = ULTRA_PRO_TEMPLATES.find(t => t.id === 'electricien-corporate-deluxe')
      reason = "⚡ Template corporate pour entreprise d'électricité professionnelle"
    } else {
      selectedTemplate = ULTRA_PRO_TEMPLATES.find(t => t.id === 'electricien-artisan-moderne')
      reason = "⚡ Template moderne pour électricien artisan avec tradition familiale"
    }
  } else if (isPlombier) {
    selectedTemplate = ULTRA_PRO_TEMPLATES.find(t => t.id === 'plombier-aqua-premium')
    reason = "💧 Template premium pour plombier avec thématique aquatique et design fluide"
  } else {
    // Fallback sur électricien Elite Pro pour autres métiers
    selectedTemplate = ULTRA_PRO_TEMPLATES.find(t => t.id === 'electricien-elite-pro')
    reason = "🏗️ Template universel adapté pour artisan multi-services"
  }
  
  if (!selectedTemplate) {
    selectedTemplate = ULTRA_PRO_TEMPLATES[0] // Fallback absolu
    reason = "🔧 Template par défaut sélectionné"
  }
  
  return {
    templateId: selectedTemplate.id,
    name: selectedTemplate.name,
    category: selectedTemplate.category,
    style: selectedTemplate.style,
    reason,
    isUltraPro: true
  }
}

/**
 * Génère un site complet avec template Ultra Pro
 */
export function generateUltraProSite(data: TemplateData, templateSelection: UltraProTemplateSelection): SiteStructure {
  console.log(`🏗️ Génération site Ultra Pro avec template: ${templateSelection.templateId}`)
  
  // Générer la structure complète avec le template Ultra Pro
  const siteStructure = generateUltraProSiteStructure(templateSelection.templateId, data)
  
  // Adapter au format SiteStructure standard
  return {
    pages: siteStructure.pages,
    navigation: siteStructure.navigation
  }
}

/**
 * Détermine si on doit utiliser Ultra Pro ou templates BTP classiques
 */
export function shouldUseUltraPro(trade: string, sector?: string, preference?: string): boolean {
  // Utiliser Ultra Pro pour certains métiers ou sur demande explicite
  const normalizedTrade = (trade || sector || '').toLowerCase()
  
  // Métiers prioritaires pour Ultra Pro
  const ultraProTrades = /électric|plomb|chauffage|climatisation|domotique/i.test(normalizedTrade)
  
  // Demande explicite
  const explicitRequest = /ultra.pro|premium|moderne|professionnel/i.test(preference || '')
  
  return ultraProTrades || explicitRequest
}

/**
 * Interface unifiée pour la sélection de templates
 */
export interface UnifiedTemplateSelection {
  isUltraPro: boolean
  selection: UltraProTemplateSelection | any // TemplateSelection des BTP
  reason: string
}

/**
 * Fonction principale de sélection intelligente
 */
export function selectOptimalTemplate(trade: string, sector?: string, preference?: string): UnifiedTemplateSelection {
  if (shouldUseUltraPro(trade, sector, preference)) {
    const ultraProSelection = selectUltraProTemplate(trade, sector)
    return {
      isUltraPro: true,
      selection: ultraProSelection,
      reason: `🚀 Ultra Pro sélectionné: ${ultraProSelection.reason}`
    }
  } else {
    // Utiliser l'ancien système BTP
    const { selectRandomTemplates } = require('./template-randomizer')
    const btpSelection = selectRandomTemplates(sector || trade, trade)
    return {
      isUltraPro: false,
      selection: btpSelection,
      reason: `🎨 Templates BTP classiques: ${btpSelection.reason}`
    }
  }
}

export default {
  selectUltraProTemplate,
  generateUltraProSite,
  shouldUseUltraPro,
  selectOptimalTemplate
}