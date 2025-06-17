'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { BTP_TEMPLATES, getTemplatesByCategory, type BTPTemplate } from '@/lib/btp-templates'

interface SiteTemplateConfig {
  homeTemplate: string
  serviceTemplate: string
  contactTemplate: string
}

export default function TemplateEditorPage() {
  const params = useParams()
  const siteId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [siteData, setSiteData] = useState<any>(null)
  const [templates, setTemplates] = useState<SiteTemplateConfig>({
    homeTemplate: 'home-modern-pro',
    serviceTemplate: 'service-detail-pro',
    contactTemplate: 'contact-simple-direct'
  })
  const [selectedPage, setSelectedPage] = useState<'home' | 'service' | 'contact'>('home')

  useEffect(() => {
    loadSiteData()
  }, [siteId])

  const loadSiteData = async () => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}`)
      if (response.ok) {
        const data = await response.json()
        setSiteData(data)
        setTemplates({
          homeTemplate: data.homeTemplate || 'home-modern-pro',
          serviceTemplate: data.serviceTemplate || 'service-detail-pro',
          contactTemplate: data.contactTemplate || 'contact-simple-direct'
        })
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateChange = async (pageType: keyof SiteTemplateConfig, templateId: string) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/template`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageType,
          templateId
        })
      })
      
      if (response.ok) {
        setTemplates(prev => ({ ...prev, [pageType]: templateId }))
        alert('Template mis à jour avec succès!')
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const renderTemplateSelector = (
    pageType: keyof SiteTemplateConfig, 
    category: 'home' | 'service' | 'contact',
    label: string
  ) => {
    const availableTemplates = getTemplatesByCategory(category)
    const currentTemplate = templates[pageType]

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{label}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                currentTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
              onClick={() => handleTemplateChange(pageType, template.id)}
            >
              {currentTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="mb-3">
                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  template.style === 'modern' ? 'bg-blue-100 text-blue-800' :
                  template.style === 'classic' ? 'bg-amber-100 text-amber-800' :
                  template.style === 'bold' ? 'bg-red-100 text-red-800' :
                  template.style === 'minimal' ? 'bg-gray-100 text-gray-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {template.style}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {template.sectors.slice(0, 2).map((sector) => (
                  <span key={sector} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                    {sector}
                  </span>
                ))}
                {template.sectors.length > 2 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                    +{template.sectors.length - 2}
                  </span>
                )}
              </div>
              
              {saving && currentTemplate === template.id && (
                <div className="absolute inset-0 bg-white/75 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
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
    <div className="space-y-6">
      <div className="bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Éditeur de Templates</h1>
              <p className="mt-2 text-gray-600">
                Sélectionnez les templates pour chaque type de page de votre site
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => window.location.href = `/dashboard/cms/sites/${siteId}/content-editor`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Éditer le Contenu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des pages */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {[
              {id: 'home', name: 'Page d\'Accueil', icon: '🏠'},
              {id: 'service', name: 'Pages Services', icon: '⚙️'},
              {id: 'contact', name: 'Page Contact', icon: '📞'}
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPage(tab.id as 'home' | 'service' | 'contact')}
                className={`${
                  selectedPage === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Sélecteurs de templates */}
      {selectedPage === 'home' && renderTemplateSelector('homeTemplate', 'home', 'Templates de Page d\'Accueil')}
      {selectedPage === 'service' && renderTemplateSelector('serviceTemplate', 'service', 'Templates de Page Service')}
      {selectedPage === 'contact' && renderTemplateSelector('contactTemplate', 'contact', 'Templates de Page Contact')}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              🎨 Templates BTP Spécialisés
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Chaque template est optimisé pour des secteurs BTP spécifiques et offre une expérience utilisateur adaptée. 
                Les changements sont appliqués immédiatement sur votre site.
              </p>
              <p className="mt-2">
                <strong>💡 Conseil :</strong> Après avoir sélectionné vos templates, utilisez l'éditeur de contenu 
                pour personnaliser les textes et images.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}