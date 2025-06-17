'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface FormData {
  step1?: {
    companyName: string
    trade: string
    description: string
    ownerName: string
    email: string
    phone: string
    address: string
    city: string
  }
  step2?: {
    primaryColor: string
    secondaryColor: string
    logoUrl?: string
    services: Array<{
      id: string
      name: string
      description: string
      detailedDescription: string
      price?: string
      images?: string[]
    }>
  }
  step3?: {
    serviceCities: string[]
    legalInfo: {
      siret?: string
      vatNumber?: string
      legalForm?: string
      capital?: string
      rcs?: string
      address: string
      city: string
      postalCode: string
    }
    openingHours?: string
    emergencyAvailable: boolean
    domain: string
    keywords: string[]
  }
}

interface Client {
  id: string
  name: string
  email: string
  company: string
  domain?: string
  trade?: string
}

interface FormInfo {
  id: string
  token: string
  client: Client
  currentStep: number
  formData: FormData
  completedAt?: string
  expiresAt: string
}

export default function ClientFormPage() {
  const params = useParams()
  const token = params.token as string
  
  const [formInfo, setFormInfo] = useState<FormInfo | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token) {
      loadFormData()
    }
  }, [token])

  const loadFormData = async () => {
    try {
      const response = await fetch(`/api/forms/${token}`)
      if (response.ok) {
        const data = await response.json()
        setFormInfo(data)
        setCurrentStep(data.currentStep)
        setFormData(data.formData || {})
      } else {
        setError('Formulaire non trouvé ou expiré')
      }
    } catch (error) {
      setError('Erreur lors du chargement du formulaire')
    } finally {
      setLoading(false)
    }
  }

  const saveStep = async (step: number, data: any) => {
    setSaving(true)
    try {
      const response = await fetch(`/api/forms/${token}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, data })
      })
      
      if (response.ok) {
        setFormData(prev => ({ ...prev, [`step${step}`]: data }))
        return true
      }
      return false
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleNextStep = async (stepData: any) => {
    const saved = await saveStep(currentStep, stepData)
    if (saved && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else if (saved && currentStep === 3) {
      // Compléter le formulaire
      try {
        const response = await fetch(`/api/forms/${token}/complete`, {
          method: 'POST'
        })
        if (response.ok) {
          alert('Formulaire complété avec succès ! Merci pour vos informations.')
        }
      } catch (error) {
        console.error('Erreur lors de la finalisation:', error)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du formulaire...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!formInfo) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">AWEMA</h1>
            <p className="text-gray-600">Création de votre site web professionnel</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Bonjour {formInfo.client.name} !
            </h2>
            <p className="text-gray-600 mb-4">
              Nous allons créer le site web pour <strong>{formInfo.client.company}</strong>
            </p>
            
            {/* Progress bar */}
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Étape {currentStep} sur 3
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-lg shadow">
          {currentStep === 1 && (
            <Step1 
              data={formData.step1} 
              onNext={handleNextStep}
              saving={saving}
            />
          )}
          {currentStep === 2 && (
            <Step2 
              data={formData.step2} 
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              saving={saving}
            />
          )}
          {currentStep === 3 && (
            <Step3 
              data={formData.step3}
              clientData={formInfo.client}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Composant Step 1 - Informations de base
function Step1({ data, onNext, saving }: any) {
  const [formData, setFormData] = useState({
    companyName: data?.companyName || '',
    trade: data?.trade || '',
    description: data?.description || '',
    ownerName: data?.ownerName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    address: data?.address || '',
    city: data?.city || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Informations sur votre entreprise
      </h3>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de l'entreprise *
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Secteur d'activité *
          </label>
          <input
            type="text"
            required
            value={formData.trade}
            onChange={(e) => setFormData({...formData, trade: e.target.value})}
            placeholder="Ex: Plomberie, Boulangerie, Consulting..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Description de votre activité *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Décrivez brièvement votre activité et vos services..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom du responsable *
          </label>
          <input
            type="text"
            required
            value={formData.ownerName}
            onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email de contact *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Téléphone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Adresse *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ville *
          </label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {saving ? 'Sauvegarde...' : 'Suivant'}
        </button>
      </div>
    </form>
  )
}

// Composant Step 2 - Design et services détaillés
function Step2({ data, onNext, onPrev, saving }: any) {
  const [formData, setFormData] = useState({
    primaryColor: data?.primaryColor || '#2563eb',
    secondaryColor: data?.secondaryColor || '#1d4ed8',
    logoUrl: data?.logoUrl || '',
    services: data?.services || [{ 
      id: generateServiceId(),
      name: '', 
      description: '', 
      detailedDescription: '',
      price: '',
      images: []
    }]
  })

  function generateServiceId() {
    return 'service-' + Math.random().toString(36).substr(2, 9)
  }

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { 
        id: generateServiceId(),
        name: '', 
        description: '', 
        detailedDescription: '',
        price: '',
        images: []
      }]
    })
  }

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    })
  }

  const updateService = (index: number, field: string, value: any) => {
    const updatedServices = formData.services.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    )
    setFormData({ ...formData, services: updatedServices })
  }

  const addImageToService = (serviceIndex: number) => {
    const imageUrl = prompt('URL de l\'image :')
    if (imageUrl) {
      const service = formData.services[serviceIndex]
      const updatedImages = [...(service.images || []), imageUrl]
      updateService(serviceIndex, 'images', updatedImages)
    }
  }

  const removeImageFromService = (serviceIndex: number, imageIndex: number) => {
    const service = formData.services[serviceIndex]
    const updatedImages = service.images?.filter((_, i) => i !== imageIndex) || []
    updateService(serviceIndex, 'images', updatedImages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validServices = formData.services.filter(service => service.name && service.description)
    onNext({ ...formData, services: validServices })
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Design et services détaillés
      </h3>

      <div className="space-y-6">
        {/* Couleurs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Couleur principale
            </label>
            <input
              type="color"
              value={formData.primaryColor}
              onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Couleur secondaire
            </label>
            <input
              type="color"
              value={formData.secondaryColor}
              onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL du logo (optionnel)
          </label>
          <input
            type="url"
            value={formData.logoUrl}
            onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
            placeholder="https://..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        {/* Services détaillés */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vos services (nombre illimité)
            </label>
            <button
              type="button"
              onClick={addService}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200"
            >
              + Ajouter un service
            </button>
          </div>

          <div className="space-y-6">
            {formData.services.map((service, index) => (
              <div key={service.id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-md font-medium text-gray-900">Service {index + 1}</h4>
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      ✕ Supprimer
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {/* Nom et description courte */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du service *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Plomberie d'urgence"
                        value={service.name}
                        onChange={(e) => updateService(index, 'name', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prix (optionnel)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: À partir de 80€"
                        value={service.price}
                        onChange={(e) => updateService(index, 'price', e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>
                  </div>

                  {/* Description courte */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description courte *
                    </label>
                    <input
                      type="text"
                      placeholder="Description brève pour la page d'accueil"
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>

                  {/* Description détaillée */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description détaillée *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Description complète pour la page du service"
                      value={service.detailedDescription}
                      onChange={(e) => updateService(index, 'detailedDescription', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Images du service (optionnel)
                      </label>
                      <button
                        type="button"
                        onClick={() => addImageToService(index)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Ajouter une image
                      </button>
                    </div>
                    
                    {service.images && service.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {service.images.map((image, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <img
                              src={image}
                              alt={`${service.name} ${imgIndex + 1}`}
                              className="w-full h-20 object-cover rounded border"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImageFromService(index, imgIndex)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                            <div className="text-xs text-gray-500 mt-1 truncate">
                              {image}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
        >
          Précédent
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Sauvegarde...' : 'Suivant'}
        </button>
      </div>
    </form>
  )
}

// Composant Step 3 - Zones d'intervention et informations légales
function Step3({ data, clientData, onNext, onPrev, saving }: any) {
  const [formData, setFormData] = useState({
    serviceCities: data?.serviceCities || [],
    legalInfo: data?.legalInfo || {
      siret: '',
      vatNumber: '',
      legalForm: '',
      capital: '',
      rcs: '',
      address: clientData?.address || '',
      city: clientData?.city || '',
      postalCode: ''
    },
    openingHours: data?.openingHours || '',
    emergencyAvailable: data?.emergencyAvailable || false,
    domain: data?.domain || clientData?.domain || '',
    keywords: data?.keywords || []
  })

  const [cityInput, setCityInput] = useState('')
  const [keywordInput, setKeywordInput] = useState('')

  const addCity = () => {
    if (cityInput.trim() && !formData.serviceCities.includes(cityInput.trim())) {
      setFormData({
        ...formData,
        serviceCities: [...formData.serviceCities, cityInput.trim()]
      })
      setCityInput('')
    }
  }

  const removeCity = (city: string) => {
    setFormData({
      ...formData,
      serviceCities: formData.serviceCities.filter(c => c !== city)
    })
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()]
      })
      setKeywordInput('')
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== keyword)
    })
  }

  const updateLegalInfo = (field: string, value: string) => {
    setFormData({
      ...formData,
      legalInfo: { ...formData.legalInfo, [field]: value }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Zones d'intervention et informations légales
      </h3>

      <div className="space-y-8">
        {/* Zones d'intervention */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Zones d'intervention</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Villes où vous intervenez *
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Ces villes serviront à créer des pages SEO locales pour chaque service.
            </p>
            
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCity())}
                placeholder="Nom de la ville"
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
              <button
                type="button"
                onClick={addCity}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
            
            {formData.serviceCities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.serviceCities.map((city, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-200 text-blue-800"
                  >
                    {city}
                    <button
                      type="button"
                      onClick={() => removeCity(city)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Informations légales */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Informations légales</h4>
          <p className="text-sm text-gray-600 mb-4">
            Ces informations apparaîtront sur la page "Mentions légales" de votre site.
          </p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Forme juridique
              </label>
              <select
                value={formData.legalInfo.legalForm}
                onChange={(e) => updateLegalInfo('legalForm', e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              >
                <option value="">Choisir</option>
                <option value="SARL">SARL</option>
                <option value="SAS">SAS</option>
                <option value="EURL">EURL</option>
                <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                <option value="Entreprise individuelle">Entreprise individuelle</option>
                <option value="Association">Association</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SIRET
              </label>
              <input
                type="text"
                value={formData.legalInfo.siret}
                onChange={(e) => updateLegalInfo('siret', e.target.value)}
                placeholder="12345678901234"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                N° TVA intracommunautaire
              </label>
              <input
                type="text"
                value={formData.legalInfo.vatNumber}
                onChange={(e) => updateLegalInfo('vatNumber', e.target.value)}
                placeholder="FR12345678901"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capital social
              </label>
              <input
                type="text"
                value={formData.legalInfo.capital}
                onChange={(e) => updateLegalInfo('capital', e.target.value)}
                placeholder="10 000€"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                RCS
              </label>
              <input
                type="text"
                value={formData.legalInfo.rcs}
                onChange={(e) => updateLegalInfo('rcs', e.target.value)}
                placeholder="RCS Paris 123 456 789"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Code postal
              </label>
              <input
                type="text"
                value={formData.legalInfo.postalCode}
                onChange={(e) => updateLegalInfo('postalCode', e.target.value)}
                placeholder="75001"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Adresse du siège social *
              </label>
              <input
                type="text"
                required
                value={formData.legalInfo.address}
                onChange={(e) => updateLegalInfo('address', e.target.value)}
                placeholder="123 Rue de la République"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ville du siège *
              </label>
              <input
                type="text"
                required
                value={formData.legalInfo.city}
                onChange={(e) => updateLegalInfo('city', e.target.value)}
                placeholder="Paris"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>
        </div>

        {/* Autres informations */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horaires d'ouverture
            </label>
            <input
              type="text"
              value={formData.openingHours}
              onChange={(e) => setFormData({...formData, openingHours: e.target.value})}
              placeholder="Ex: Lun-Ven 9h-18h, Sam 9h-12h"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.emergencyAvailable}
                onChange={(e) => setFormData({...formData, emergencyAvailable: e.target.checked})}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">
                Service d'urgence 24h/7j disponible
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de domaine souhaité
            </label>
            <input
              type="text"
              value={formData.domain}
              onChange={(e) => setFormData({...formData, domain: e.target.value})}
              placeholder="monentreprise.fr"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mots-clés pour le référencement
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Ajouter un mot-clé"
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
            
            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
        >
          Précédent
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? 'Finalisation...' : 'Terminer'}
        </button>
      </div>
    </form>
  )
}