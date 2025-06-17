'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface SiteInstance {
  id: string
  domain: string
  isLive: boolean
  templateData: any
  customCSS?: string
  customJS?: string
  project: {
    name: string
    client: {
      company: string
    }
  }
}

interface TemplateSection {
  id: string
  name: string
  type: 'text' | 'color' | 'image' | 'textarea'
  value: any
  category: 'company' | 'design' | 'services' | 'content'
}

export default function SiteEditor() {
  const params = useParams()
  const siteId = params.id as string
  
  const [site, setSite] = useState<SiteInstance | null>(null)
  const [sections, setSections] = useState<TemplateSection[]>([])
  const [activeTab, setActiveTab] = useState<'template' | 'css' | 'preview'>('template')
  const [customCSS, setCustomCSS] = useState('')
  const [saving, setSaving] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    loadSite()
  }, [siteId])

  const loadSite = async () => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}`)
      if (response.ok) {
        const siteData = await response.json()
        setSite(siteData)
        setCustomCSS(siteData.customCSS || '')
        
        // Convertir les données template en sections éditables
        const templateData = JSON.parse(siteData.templateData)
        const editableSections: TemplateSection[] = [
          // Informations entreprise
          { id: 'companyName', name: 'Nom de l\'entreprise', type: 'text', value: templateData.companyName, category: 'company' },
          { id: 'trade', name: 'Secteur d\'activité', type: 'text', value: templateData.trade, category: 'company' },
          { id: 'description', name: 'Description', type: 'textarea', value: templateData.description, category: 'company' },
          { id: 'phone', name: 'Téléphone', type: 'text', value: templateData.phone, category: 'company' },
          { id: 'email', name: 'Email', type: 'text', value: templateData.email, category: 'company' },
          { id: 'address', name: 'Adresse', type: 'text', value: templateData.address, category: 'company' },
          
          // Design
          { id: 'primaryColor', name: 'Couleur principale', type: 'color', value: templateData.primaryColor, category: 'design' },
          { id: 'secondaryColor', name: 'Couleur secondaire', type: 'color', value: templateData.secondaryColor, category: 'design' },
          { id: 'logoUrl', name: 'URL du logo', type: 'text', value: templateData.logoUrl, category: 'design' },
          
          // Contenu
          { id: 'openingHours', name: 'Horaires d\'ouverture', type: 'text', value: templateData.openingHours, category: 'content' },
          { id: 'emergencyAvailable', name: 'Service d\'urgence', type: 'text', value: templateData.emergencyAvailable ? 'Oui' : 'Non', category: 'content' },
        ]
        
        setSections(editableSections)
        setPreviewUrl(`/api/cms/sites/${siteId}/preview`)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du site:', error)
    }
  }

  const updateSection = (sectionId: string, newValue: any) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, value: newValue } : section
    ))
  }

  const saveSite = async () => {
    setSaving(true)
    try {
      // Reconstruire les données template
      const updatedTemplateData = { ...JSON.parse(site?.templateData || '{}') }
      sections.forEach(section => {
        if (section.type === 'color' || section.type === 'text' || section.type === 'textarea') {
          updatedTemplateData[section.id] = section.value
        }
      })

      const response = await fetch(`/api/cms/sites/${siteId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateData: updatedTemplateData,
          customCSS
        })
      })

      if (response.ok) {
        alert('Site mis à jour avec succès !')
        // Recharger l'aperçu
        window.location.reload()
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const regenerateSite = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/regenerate`, {
        method: 'POST'
      })

      if (response.ok) {
        alert('Site régénéré avec succès !')
        window.location.reload()
      } else {
        alert('Erreur lors de la régénération')
      }
    } catch (error) {
      console.error('Erreur lors de la régénération:', error)
      alert('Erreur lors de la régénération')
    } finally {
      setSaving(false)
    }
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'éditeur...</p>
        </div>
      </div>
    )
  }

  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.category]) acc[section.category] = []
    acc[section.category].push(section)
    return acc
  }, {} as Record<string, TemplateSection[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Éditeur de site</h1>
              <p className="text-gray-600">{site.project.name} - {site.domain}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={saveSite}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
              </button>
              <button
                onClick={regenerateSite}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                🔄 Régénérer le site
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel d'édition */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    onClick={() => setActiveTab('template')}
                    className={`w-1/3 py-2 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'template'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    📝 Contenu
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`w-1/3 py-2 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'css'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🎨 CSS
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`w-1/3 py-2 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'preview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    👁️ Aperçu
                  </button>
                </nav>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto">
                {activeTab === 'template' && (
                  <div className="space-y-6">
                    {Object.entries(groupedSections).map(([category, categoryLSections]) => (
                      <div key={category}>
                        <h3 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                          {category === 'company' && '🏢 Entreprise'}
                          {category === 'design' && '🎨 Design'}
                          {category === 'services' && '⚙️ Services'}
                          {category === 'content' && '📄 Contenu'}
                        </h3>
                        <div className="space-y-3">
                          {categoryLSections.map((section) => (
                            <div key={section.id}>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {section.name}
                              </label>
                              {section.type === 'text' && (
                                <input
                                  type="text"
                                  value={section.value || ''}
                                  onChange={(e) => updateSection(section.id, e.target.value)}
                                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                              {section.type === 'textarea' && (
                                <textarea
                                  rows={3}
                                  value={section.value || ''}
                                  onChange={(e) => updateSection(section.id, e.target.value)}
                                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              )}
                              {section.type === 'color' && (
                                <input
                                  type="color"
                                  value={section.value || '#000000'}
                                  onChange={(e) => updateSection(section.id, e.target.value)}
                                  className="w-full h-10 border-gray-300 rounded-md shadow-sm"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'css' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CSS personnalisé
                    </label>
                    <textarea
                      rows={20}
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      placeholder="/* Ajoutez votre CSS personnalisé ici */&#10;.custom-style {&#10;  color: red;&#10;}"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                    />
                  </div>
                )}

                {activeTab === 'preview' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">L'aperçu s'affiche dans le panel de droite</p>
                    <button
                      onClick={() => window.open(previewUrl, '_blank')}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                      🔗 Ouvrir dans un nouvel onglet
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Aperçu */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Aperçu en temps réel</h3>
              </div>
              <div className="p-4">
                <iframe
                  src={previewUrl}
                  className="w-full h-96 border border-gray-300 rounded-md"
                  title="Aperçu du site"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}