'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface SiteInstance {
  id: string
  domain: string
  project: {
    name: string
    client: {
      company: string
    }
  }
}

export default function NewArticle() {
  const params = useParams()
  const router = useRouter()
  const siteId = params.id as string
  
  const [site, setSite] = useState<SiteInstance | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED',
    authorName: 'Admin AWEMA',
    authorEmail: 'admin@awema.fr'
  })
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    loadSite()
  }, [siteId])

  useEffect(() => {
    // Auto-générer le slug basé sur le titre
    if (formData.title && !formData.slug) {
      const autoSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug: autoSlug }))
    }
  }, [formData.title])

  const loadSite = async () => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}`)
      if (response.ok) {
        const siteData = await response.json()
        setSite(siteData)
      }
    } catch (error) {
      console.error('Erreur lors du chargement du site:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/cms/sites/${siteId}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        alert('Article créé avec succès !')
        router.push(`/dashboard/cms/sites/${siteId}/articles`)
      } else {
        const error = await response.json()
        alert(`Erreur: ${error.error}`)
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Erreur lors de la création de l\'article')
    } finally {
      setSaving(false)
    }
  }

  const saveDraft = async () => {
    await handleSubmit(new Event('submit') as any)
  }

  const publishArticle = async () => {
    setFormData(prev => ({ ...prev, status: 'PUBLISHED' }))
    setTimeout(() => {
      handleSubmit(new Event('submit') as any)
    }, 100)
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nouvel article</h1>
              <p className="text-gray-600">{site.project.name} - {site.domain}</p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                {previewMode ? '✏️ Édition' : '👁️ Aperçu'}
              </button>
              <Link 
                href={`/dashboard/cms/sites/${siteId}/articles`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Retour
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {previewMode ? (
          /* Mode Aperçu */
          <div className="bg-white shadow rounded-lg p-6">
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.title || 'Titre de l\'article'}</h1>
              {formData.excerpt && (
                <p className="text-lg text-gray-600 mb-6 italic">{formData.excerpt}</p>
              )}
              {formData.featuredImage && (
                <img 
                  src={formData.featuredImage} 
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formData.content || '<p>Contenu de l\'article...</p>' }}
              />
            </div>
          </div>
        ) : (
          /* Mode Édition */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contenu principal */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contenu de l'article</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
                        placeholder="Titre de votre article"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                        placeholder="url-de-votre-article"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        URL finale: {site.domain}/articles/{formData.slug || 'url-de-votre-article'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Extrait (résumé)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Résumé de votre article qui apparaîtra dans les listes..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contenu *
                      </label>
                      <textarea
                        rows={15}
                        required
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
                        placeholder="<p>Contenu de votre article en HTML...</p>&#10;<h2>Sous-titre</h2>&#10;<p>Paragraphe avec du <strong>texte en gras</strong>.</p>"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Vous pouvez utiliser du HTML pour le formatage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publication */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Publication</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'DRAFT' | 'PUBLISHED' }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="DRAFT">📄 Brouillon</option>
                        <option value="PUBLISHED">✅ Publié</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Auteur
                      </label>
                      <input
                        type="text"
                        value={formData.authorName}
                        onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={saveDraft}
                        disabled={saving}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        💾 Sauvegarder
                      </button>
                      <button
                        type="button"
                        onClick={publishArticle}
                        disabled={saving}
                        className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                      >
                        🚀 Publier
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image à la une */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Image à la une</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL de l'image
                    </label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://exemple.com/image.jpg"
                    />
                    {formData.featuredImage && (
                      <img 
                        src={formData.featuredImage} 
                        alt="Aperçu"
                        className="mt-2 w-full h-32 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">SEO</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre SEO
                      </label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Titre optimisé pour les moteurs de recherche"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description SEO
                      </label>
                      <textarea
                        rows={3}
                        value={formData.metaDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description qui apparaîtra dans les résultats de recherche"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mots-clés
                      </label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="mot-clé1, mot-clé2, mot-clé3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}