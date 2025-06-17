'use client'

import { useState, useEffect } from 'react'
import { BTP_TEMPLATES, getTemplatesByCategory, type BTPTemplate } from '@/lib/btp-templates'
import { ULTRA_PRO_TEMPLATES, getUltraProTemplatesByCategory, type UltraProTemplate } from '@/lib/templates/ultra-pro-templates'

interface Template {
  id: string
  name: string
  description: string
  isActive: boolean
  isDefault: boolean
  createdAt: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<'home' | 'service' | 'contact' | 'ultra-pro'>('home')
  const [loading, setLoading] = useState(true)
  const [homeTemplates] = useState(getTemplatesByCategory('home'))
  const [serviceTemplates] = useState(getTemplatesByCategory('service'))
  const [contactTemplates] = useState(getTemplatesByCategory('contact'))
  const [ultraProTemplates] = useState(ULTRA_PRO_TEMPLATES)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTemplateStatus = async (templateId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      })
      
      if (response.ok) {
        loadTemplates()
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du template:', error)
    }
  }

  const setDefaultTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`/api/templates/${templateId}/set-default`, {
        method: 'POST'
      })
      
      if (response.ok) {
        loadTemplates()
        alert('Template défini comme défaut')
      }
    } catch (error) {
      console.error('Erreur lors de la définition du template par défaut:', error)
    }
  }

  const syncAllTemplates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync-all' })
      })
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ ${data.synced} templates synchronisés sur un total de ${data.total}`)
        loadTemplates()
      } else {
        alert('Erreur lors de la synchronisation')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la synchronisation')
    } finally {
      setLoading(false)
    }
  }

  const previewUltraProTemplate = async (templateId: string) => {
    try {
      const template = ultraProTemplates.find(t => t.id === templateId)
      if (!template) {
        alert('Template non trouvé')
        return
      }

      // Générer une prévisualisation unique pour ce template
      console.log('Génération de la prévisualisation pour:', templateId)
      
      // Données de test spécifiques au template
      const testData = {
        category: template.category,
        companyName: `${template.category === 'electricien' ? 'Électricité' : 
                        template.category === 'plombier' ? 'Plomberie' : 
                        template.category === 'chauffagiste' ? 'Chauffage' : 'Artisan'} ${template.style === 'premium' ? 'Premium' : 'Pro'}`,
        ownerName: 'Jean Martin',
        phone: '01 23 45 67 89',
        email: 'contact@example.fr',
        address: '123 Rue de la République, 75001 Paris',
        description: `Spécialiste ${template.category} depuis 15 ans. ${template.description}`,
        services: [
          { id: 'service1', name: `${template.category === 'electricien' ? 'Installation électrique' : 
                                    template.category === 'plombier' ? 'Réparation plomberie' : 
                                    template.category === 'chauffagiste' ? 'Installation chauffage' : 'Service principal'}` },
          { id: 'service2', name: `${template.category === 'electricien' ? 'Dépannage urgence' : 
                                    template.category === 'plombier' ? 'Débouchage canalisations' : 
                                    template.category === 'chauffagiste' ? 'Maintenance chauffage' : 'Service secondaire'}` }
        ],
        zones: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine']
      }

      const response = await fetch('/api/templates/preview-ultra-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          templateId,
          testData 
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.previewUrl) {
          // Ouvrir la prévisualisation générée
          window.open(data.previewUrl, '_blank')
        } else {
          alert('Erreur lors de la génération de la prévisualisation')
        }
      } else {
        const error = await response.json()
        alert(`Erreur: ${error.error || 'Erreur lors de la génération'}`)
      }
    } catch (error) {
      console.error('Erreur lors de la prévisualisation:', error)
      alert('Erreur lors de la prévisualisation')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des templates...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des templates</h1>
          <p className="mt-2 text-gray-600">Gérez les templates de sites web disponibles</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex space-x-3">
          <button
            onClick={() => window.location.href = '/dashboard/templates/source-editor'}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            🛠️ Éditer Sources
          </button>
          <button 
            onClick={syncAllTemplates}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mr-3"
          >
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            🔄 Synchroniser
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            ➕ Nouveau template
          </button>
        </div>
      </div>

      {/* Navigation onglets */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[{id: 'home', name: 'Accueil', count: homeTemplates.length}, 
              {id: 'service', name: 'Services', count: serviceTemplates.length}, 
              {id: 'contact', name: 'Contact', count: contactTemplates.length},
              {id: 'ultra-pro', name: '⚡ Ultra Pro', count: ultraProTemplates.length}].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as 'home' | 'service' | 'contact' | 'ultra-pro')}
                className={`${
                  selectedCategory === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                {tab.name}
                <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${
                  selectedCategory === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCategory === 'ultra-pro' ? (
          // Affichage spécial pour les templates Ultra Pro
          ultraProTemplates.map((template) => (
            <div key={template.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg border-2 border-purple-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">
                        {template.category === 'electricien' ? '⚡' : 
                         template.category === 'plombier' ? '💧' :
                         template.category === 'chauffagiste' ? '🔥' : '🏗️'}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        template.style === 'premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                        template.style === 'corporate' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                        template.style === 'artisanal' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
                        template.style === 'moderne' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                        'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
                      }`}>
                        {template.style}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Fonctionnalités premium:</h4>
                      <div className="space-y-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                            {feature}
                          </div>
                        ))}
                        {template.features.length > 3 && (
                          <div className="text-xs text-purple-600 font-medium">
                            +{template.features.length - 3} autres fonctionnalités
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-white/60 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">Couleurs du thème:</span>
                        <div className="flex space-x-1">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: template.colors.primary }}
                            title="Couleur primaire"
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: template.colors.secondary }}
                            title="Couleur secondaire"
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: template.colors.accent }}
                            title="Couleur d'accent"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                  <button 
                    onClick={() => previewUltraProTemplate(template.id)}
                    className="flex-1 mr-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Prévisualiser</span>
                  </button>
                  <button className="px-3 py-2 text-purple-600 hover:text-purple-800 font-medium text-sm">
                    Utiliser
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Affichage normal pour les autres templates
          (selectedCategory === 'home' ? homeTemplates : 
          selectedCategory === 'service' ? serviceTemplates : contactTemplates).map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      template.style === 'modern' ? 'bg-blue-100 text-blue-800' :
                      template.style === 'classic' ? 'bg-amber-100 text-amber-800' :
                      template.style === 'bold' ? 'bg-red-100 text-red-800' :
                      template.style === 'minimal' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {template.style}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {template.category}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Secteurs recommandés:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.sectors.slice(0, 3).map((sector) => (
                        <span key={sector} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                          {sector}
                        </span>
                      ))}
                      {template.sectors.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                          +{template.sectors.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Prévisualiser
                </button>
                <button 
                  onClick={() => window.location.href = `/dashboard/templates/source-editor?template=${template.id}`}
                  className="text-sm text-green-600 hover:text-green-800 font-medium"
                >
                  🛠️ Modifier le Code
                </button>
              </div>
            </div>
          </div>
        )))
        }
      </div>

      {/* Stats */}
      {selectedCategory === 'ultra-pro' ? (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-purple-900">
                ⚡ {ultraProTemplates.length} Templates Ultra-Professionnels
              </h3>
              <p className="text-sm text-purple-700 mt-1">
                Niveau Elementor Pro • 100% Responsive • SEO Optimisé • Animations Premium
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-white/50 rounded p-2">
                  <strong>⚡ {getUltraProTemplatesByCategory('electricien').length} Électriciens:</strong> Elite, Corporate, Artisan...
                </div>
                <div className="bg-white/50 rounded p-2">
                  <strong>💧 {getUltraProTemplatesByCategory('plombier').length} Plombiers:</strong> Aqua Premium, Corporate...
                </div>
                <div className="bg-white/50 rounded p-2">
                  <strong>🔥 {getUltraProTemplatesByCategory('chauffagiste').length} Chauffagistes:</strong> Énergie Plus, Smart...
                </div>
                <div className="bg-white/50 rounded p-2">
                  <strong>🏗️ {getUltraProTemplatesByCategory('multi-metiers').length} Multi-métiers:</strong> Bâtiment Expert...
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{ultraProTemplates.length}</div>
              <div className="text-xs text-purple-500">Templates Ultra Pro</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900">
                🎨 {BTP_TEMPLATES.length} Templates BTP Disponibles
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                {homeTemplates.length} pages d'accueil • {serviceTemplates.length} pages services • {contactTemplates.length} pages contact
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{BTP_TEMPLATES.length}</div>
              <div className="text-xs text-blue-500">Templates actifs</div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              🚀 Système de Templates Ultra-Avancé
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                AWEMA 2 dispose désormais de <strong>{BTP_TEMPLATES.length + ultraProTemplates.length} templates spécialisés</strong> : 
                {BTP_TEMPLATES.length} templates BTP classiques + <strong>{ultraProTemplates.length} templates Ultra-Professionnels</strong> niveau Elementor Pro.
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white/50 rounded p-2">
                  <strong>⚡ Templates Ultra Pro:</strong> Animations avancées, design premium, SEO poussé
                </div>
                <div className="bg-white/50 rounded p-2">
                  <strong>🎨 Prévisualisation Live:</strong> Testez vos templates avant utilisation
                </div>
                <div className="bg-white/50 rounded p-2">
                  <strong>🔧 Personnalisation:</strong> Couleurs, fonctionnalités et style adaptés par métier
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}