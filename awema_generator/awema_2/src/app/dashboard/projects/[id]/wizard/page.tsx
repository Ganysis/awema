'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { generatePagesToCreate, calculateSEOScore, PageToGenerate, SEOScore } from '@/lib/seo/seo-analyzer'
import { btpTemplates } from '@/lib/btp-templates'

interface Project {
  id: string
  name: string
  formData: string
  siteData: string
  status: string
  client: {
    name: string
    company: string
    trade: string
  }
}

interface TemplateOption {
  id: string
  name: string
  description: string
  category: string
  previewUrl: string
  features: string[]
  bestFor: string[]
}

interface WizardStep {
  id: number
  title: string
  description: string
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: 'Sélection du Template',
    description: 'Choisissez le design qui correspond le mieux au métier et au style souhaité'
  },
  {
    id: 2,
    title: 'Aperçu des Pages',
    description: 'Visualisez toutes les pages qui seront créées pour ce site'
  },
  {
    id: 3,
    title: 'Analyse SEO',
    description: 'Consultez les scores SEO prévisionnels de chaque page'
  },
  {
    id: 4,
    title: 'Confirmation',
    description: 'Validez la configuration et lancez la génération du site'
  }
]

export default function SiteGenerationWizard() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const [currentStep, setCurrentStep] = useState(1)
  const [project, setProject] = useState<Project | null>(null)
  const [templateData, setTemplateData] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [pagesToGenerate, setPagesToGenerate] = useState<PageToGenerate[]>([])
  const [seoScores, setSeoScores] = useState<Map<string, SEOScore>>(new Map())
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [availableTemplates, setAvailableTemplates] = useState<TemplateOption[]>([])

  useEffect(() => {
    loadProject()
    loadAvailableTemplates()
  }, [projectId])

  useEffect(() => {
    if (templateData && selectedTemplate) {
      generatePages()
    }
  }, [templateData, selectedTemplate])

  const loadProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (response.ok) {
        const projectData = await response.json()
        setProject(projectData)
        
        const rawFormData = JSON.parse(projectData.formData || '{}')
        
        // Normaliser les données selon le format (ancien ou nouveau)
        const normalizedData = normalizeFormData(rawFormData)
        setTemplateData(normalizedData)
        
        // Pré-sélectionner un template basé sur le métier
        const suggestedTemplate = suggestTemplate(normalizedData.trade)
        setSelectedTemplate(suggestedTemplate)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du projet:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour normaliser les données selon les différents formats
  const normalizeFormData = (formData: any) => {
    // Si c'est l'ancien format direct
    if (formData.companyName && !formData.step1) {
      return formData
    }
    
    // Si c'est le nouveau format avec steps
    if (formData.step1) {
      return {
        companyName: formData.step1.companyName,
        trade: formData.step1.trade,
        description: formData.step1.description,
        ownerName: formData.step1.ownerName,
        email: formData.step1.email,
        phone: formData.step1.phone,
        address: formData.step1.address,
        city: formData.step1.city,
        primaryColor: formData.step2?.primaryColor || '#2563eb',
        secondaryColor: formData.step2?.secondaryColor || '#1d4ed8',
        logoUrl: formData.step2?.logoUrl,
        services: formData.step2?.services || [],
        serviceCities: formData.step3?.serviceCities || [formData.step1.city],
        legalInfo: formData.step3?.legalInfo || {
          address: formData.step1.address,
          city: formData.step1.city,
          postalCode: ''
        },
        openingHours: formData.step3?.openingHours || 'Lun-Ven 8h-18h',
        emergencyAvailable: formData.step3?.emergencyAvailable || false,
        domain: formData.step3?.domain || 'monsite.fr',
        keywords: formData.step3?.keywords || []
      }
    }
    
    // Fallback - données par défaut
    return {
      companyName: 'Mon Entreprise',
      trade: 'electricien',
      description: 'Services professionnels',
      ownerName: 'Propriétaire',
      email: 'contact@monentreprise.fr',
      phone: '01 23 45 67 89',
      address: 'Adresse',
      city: 'Paris',
      primaryColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      services: [
        {
          id: 'service-1',
          name: 'Service Principal',
          description: 'Description du service'
        }
      ],
      serviceCities: ['Paris'],
      legalInfo: { address: 'Adresse', city: 'Paris', postalCode: '' },
      openingHours: 'Lun-Ven 8h-18h',
      emergencyAvailable: false,
      domain: 'monsite.fr',
      keywords: []
    }
  }

  const loadAvailableTemplates = () => {
    // Charger les templates depuis la configuration BTP
    const templates: TemplateOption[] = [
      {
        id: 'electricien-elite-pro',
        name: 'Électricien Elite Pro',
        description: 'Template premium pour électriciens avec design moderne et professionnel',
        category: 'electricien',
        previewUrl: '/template-previews/preview-electricien-elite-pro-1749159960688/index.html',
        features: ['Design moderne', 'Responsive', 'Formulaire de contact', 'Galerie services', 'Témoignages'],
        bestFor: ['Électriciens', 'Artisans électricité', 'Entreprises électriques']
      },
      {
        id: 'electricien-corporate-deluxe',
        name: 'Électricien Corporate Deluxe',
        description: 'Template corporate élégant pour grandes entreprises électriques',
        category: 'electricien',
        previewUrl: '/template-previews/preview-electricien-corporate-deluxe-1749159917268/index.html',
        features: ['Design corporate', 'Sections avancées', 'Call-to-action', 'Zone intervention', 'Références'],
        bestFor: ['Grandes entreprises', 'Entreprises électriques', 'Bureaux d\'études']
      },
      {
        id: 'electricien-artisan-moderne',
        name: 'Électricien Artisan Moderne',
        description: 'Template convivial et accessible pour artisans électriciens',
        category: 'electricien',
        previewUrl: '/template-previews/preview-electricien-artisan-moderne-1749159937634/index.html',
        features: ['Design convivial', 'Approche artisanale', 'Contact facile', 'Présentation services', 'Simplicité'],
        bestFor: ['Artisans indépendants', 'Petites entreprises', 'Auto-entrepreneurs']
      },
      {
        id: 'plombier-aqua-premium',
        name: 'Plombier Aqua Premium',
        description: 'Template spécialisé pour plombiers avec thématique eau et qualité',
        category: 'plombier',
        previewUrl: '/template-previews/preview-plombier-aqua-premium-1749159945202/index.html',
        features: ['Thématique eau', 'Services plomberie', 'Urgences 24h/7j', 'Devis en ligne', 'Certifications'],
        bestFor: ['Plombiers', 'Chauffagistes-plombiers', 'Dépannage urgence']
      },
      {
        id: 'chauffagiste-smart-heating',
        name: 'Chauffagiste Smart Heating',
        description: 'Template moderne pour chauffagistes avec focus éco-énergétique',
        category: 'chauffagiste',
        previewUrl: '/template-previews/preview-chauffagiste-smart-heating-1749152721384/index.html',
        features: ['Eco-responsable', 'Technologies modernes', 'Économies énergie', 'Pompes à chaleur', 'Subventions'],
        bestFor: ['Chauffagistes', 'Installateurs PAC', 'Éco-rénovation']
      },
      {
        id: 'multi-renovation-premium',
        name: 'Multi Rénovation Premium',
        description: 'Template polyvalent pour entreprises multi-services',
        category: 'multi',
        previewUrl: '/template-previews/preview-multi-renovation-premium-1749152706579/index.html',
        features: ['Multi-services', 'Rénovation complète', 'Coordination travaux', 'Devis global', 'Suivi chantier'],
        bestFor: ['Entreprises générales', 'Multi-services', 'Rénovation globale']
      }
    ]
    
    setAvailableTemplates(templates)
  }

  const suggestTemplate = (trade: string): string => {
    const tradeMap: { [key: string]: string } = {
      'electricien': 'electricien-elite-pro',
      'plombier': 'plombier-aqua-premium',
      'chauffagiste': 'chauffagiste-smart-heating',
      'multi': 'multi-renovation-premium'
    }
    
    return tradeMap[trade.toLowerCase()] || 'electricien-elite-pro'
  }

  const generatePages = () => {
    if (!templateData || !selectedTemplate) return
    
    // Générer la liste des pages
    const pages = generatePagesToCreate(templateData, selectedTemplate)
    setPagesToGenerate(pages)
    
    // Calculer les scores SEO pour chaque page
    const scores = new Map<string, SEOScore>()
    pages.forEach(page => {
      const score = calculateSEOScore(page, templateData)
      scores.set(page.id, score)
    })
    setSeoScores(scores)
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const generateSite = async () => {
    if (!confirm('Êtes-vous sûr de vouloir générer le site avec cette configuration ?')) return
    
    setGenerating(true)
    try {
      const response = await fetch(`/api/projects/${projectId}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedTemplate,
          pagesToGenerate,
          wizardConfiguration: {
            templateId: selectedTemplate,
            totalPages: pagesToGenerate.length,
            averageSeoScore: Array.from(seoScores.values()).reduce((acc, score) => acc + score.overall, 0) / seoScores.size
          }
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert('Site généré avec succès !')
        router.push(`/dashboard/cms/sites/${result.siteId}/pages`)
      } else {
        alert('Erreur lors de la génération du site')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la génération du site')
    } finally {
      setGenerating(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <TemplateSelector />
      case 2:
        return <PagesPreview />
      case 3:
        return <SEOAnalysis />
      case 4:
        return <GenerationConfirmation />
      default:
        return null
    }
  }

  const TemplateSelector = () => (
    <div className="space-y-6">
      {/* Info sur le projet */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Informations du Projet</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Entreprise:</strong> {templateData?.companyName}</div>
          <div><strong>Métier:</strong> {templateData?.trade}</div>
          <div><strong>Ville:</strong> {templateData?.city}</div>
          <div><strong>Services:</strong> {templateData?.services?.length || 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {availableTemplates.map(template => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`relative bg-white rounded-lg shadow-md border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="p-4">
                <div className="mb-4">
                  <iframe
                    src={template.previewUrl}
                    className="w-full h-32 border rounded"
                    style={{ transform: 'scale(0.3)', transformOrigin: 'top left', height: '400px' }}
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Fonctionnalités :</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.features.slice(0, 3).map(feature => (
                        <span key={feature} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium text-gray-500">Idéal pour :</span>
                    <p className="text-xs text-gray-600 mt-1">{template.bestFor.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  const PagesPreview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📄 Pages à générer ({pagesToGenerate.length})
        </h3>
        <p className="text-gray-600 mb-6">
          Voici toutes les pages qui seront créées pour le site de <strong>{templateData?.companyName}</strong>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pagesToGenerate.map(page => (
            <div key={page.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{page.title}</h4>
                  <p className="text-sm text-gray-500 font-mono">/{page.slug || ''}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  page.type === 'home' ? 'bg-green-100 text-green-800' :
                  page.type === 'contact' ? 'bg-blue-100 text-blue-800' :
                  page.type === 'service' ? 'bg-purple-100 text-purple-800' :
                  page.type === 'service-city' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {page.type === 'home' ? 'Accueil' :
                   page.type === 'contact' ? 'Contact' :
                   page.type === 'service' ? 'Service' :
                   page.type === 'service-city' ? 'Service + Ville' :
                   'Autre'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{page.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <span className="mr-2">📝</span>
                  <span>~{page.estimatedContent.wordCount} mots</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🧩</span>
                  <span>{page.estimatedContent.sections.length} sections</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🎯</span>
                  <span>{page.targetKeywords.length} mots-clés</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {page.targetKeywords.slice(0, 3).map(keyword => (
                    <span key={keyword} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                      {keyword}
                    </span>
                  ))}
                  {page.targetKeywords.length > 3 && (
                    <span className="text-xs text-gray-500">+{page.targetKeywords.length - 3} autres</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const SEOAnalysis = () => {
    const averageScore = Array.from(seoScores.values()).reduce((acc, score) => acc + score.overall, 0) / seoScores.size
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">📊 Analyse SEO Globale</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{Math.round(averageScore)}</span>
              <span className="text-sm text-gray-500">/100</span>
              <div className={`w-3 h-3 rounded-full ${
                averageScore >= 80 ? 'bg-green-500' :
                averageScore >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pagesToGenerate.map(page => {
              const score = seoScores.get(page.id)
              if (!score) return null
              
              return (
                <div key={page.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{page.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{score.overall}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        score.overall >= 80 ? 'bg-green-500' :
                        score.overall >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(score.details).map(([key, detail]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 capitalize">
                          {key === 'title' ? 'Titre' :
                           key === 'description' ? 'Description' :
                           key === 'keywords' ? 'Mots-clés' :
                           key === 'content' ? 'Contenu' :
                           key === 'structure' ? 'Structure' :
                           key === 'local' ? 'SEO Local' : key}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{detail.score}</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            detail.status === 'excellent' ? 'bg-green-500' :
                            detail.status === 'good' ? 'bg-blue-500' :
                            detail.status === 'warning' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {score.recommendations.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <span className="text-xs font-medium text-gray-500">Recommandations :</span>
                      <ul className="mt-1 space-y-1">
                        {score.recommendations.slice(0, 2).map((rec, idx) => (
                          <li key={idx} className="text-xs text-gray-600">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const GenerationConfirmation = () => {
    const averageScore = Array.from(seoScores.values()).reduce((acc, score) => acc + score.overall, 0) / seoScores.size
    const selectedTemplateInfo = availableTemplates.find(t => t.id === selectedTemplate)
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">🎯 Récapitulatif de Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Projet</label>
                <p className="text-gray-900">{project?.name}</p>
                <p className="text-sm text-gray-600">{project?.client.company}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Template Sélectionné</label>
                <p className="text-gray-900">{selectedTemplateInfo?.name}</p>
                <p className="text-sm text-gray-600">{selectedTemplateInfo?.description}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Pages à Générer</label>
                <p className="text-gray-900">{pagesToGenerate.length} pages</p>
                <p className="text-sm text-gray-600">
                  {pagesToGenerate.filter(p => p.type === 'home').length} accueil, {' '}
                  {pagesToGenerate.filter(p => p.type === 'contact').length} contact, {' '}
                  {pagesToGenerate.filter(p => p.type === 'service').length} services, {' '}
                  {pagesToGenerate.filter(p => p.type === 'service-city').length} service+ville, {' '}
                  {pagesToGenerate.filter(p => p.type === 'legal').length} légales
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Score SEO Moyen</label>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-900">{Math.round(averageScore)}/100</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    averageScore >= 80 ? 'bg-green-100 text-green-800' :
                    averageScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {averageScore >= 80 ? 'Excellent' :
                     averageScore >= 60 ? 'Bon' : 'À améliorer'}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Mots-clés Totaux</label>
                <p className="text-gray-900">
                  {pagesToGenerate.reduce((acc, page) => acc + page.targetKeywords.length, 0)} mots-clés
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Contenu Estimé</label>
                <p className="text-gray-900">
                  ~{pagesToGenerate.reduce((acc, page) => acc + page.estimatedContent.wordCount, 0)} mots
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={generateSite}
              disabled={generating}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Génération en cours...
                </>
              ) : (
                <>
                  🚀 Générer le Site Complet
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du wizard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🧙‍♂️ Wizard de Génération</h1>
              <p className="mt-2 text-gray-600">
                {project?.name} - {project?.client.company}
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard/production')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Retour Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps Navigation */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {WIZARD_STEPS.map((step, stepIdx) => (
                <li key={step.id} className={`relative ${stepIdx !== WIZARD_STEPS.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    {stepIdx !== WIZARD_STEPS.length - 1 && (
                      <div className={`h-0.5 w-full ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer ${
                      currentStep === step.id 
                        ? 'bg-blue-600 text-white' 
                        : currentStep > step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {currentStep > step.id ? (
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Précédent
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Étape {currentStep} sur {WIZARD_STEPS.length}
            </span>
          </div>
          
          <button
            onClick={() => setCurrentStep(Math.min(WIZARD_STEPS.length, currentStep + 1))}
            disabled={currentStep === WIZARD_STEPS.length || !selectedTemplate}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  )
}