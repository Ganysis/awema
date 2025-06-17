'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface PageItem {
  id: string
  pageType: string
  title: string
  slug: string
  isTemplate: boolean
  canDelete: boolean
  updatedAt?: string
  blocks?: any[]
  versions?: any[]
  serviceData?: any
}

interface Site {
  id: string
  domain: string
  project: {
    name: string
    client: {
      company: string
    }
  }
}

export default function PagesManager() {
  const params = useParams()
  const siteId = params.id as string
  
  const [pages, setPages] = useState<PageItem[]>([])
  const [templatePages, setTemplatePages] = useState<PageItem[]>([])
  const [site, setSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'template' | 'custom'>('template')

  useEffect(() => {
    loadPages()
  }, [siteId])

  const loadPages = async () => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/pages`)
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages || [])
        setTemplatePages(data.templatePages || [])
        setSite(data.site)
      } else {
        console.error('Erreur lors du chargement des pages')
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const createCustomPage = async () => {
    const title = prompt('Titre de la nouvelle page :')
    if (!title) return

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    try {
      const response = await fetch(`/api/cms/sites/${siteId}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageType: 'custom',
          pageSlug: slug,
          title,
          sections: {},
          blocks: [
            {
              blockType: 'text-content',
              config: {
                title: title,
                content: '<p>Contenu de votre nouvelle page...</p>'
              },
              content: {},
              styles: null,
              isVisible: true
            }
          ]
        })
      })

      if (response.ok) {
        await loadPages()
        alert('Page créée avec succès !')
      } else {
        alert('Erreur lors de la création de la page')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création de la page')
    }
  }

  const deletePage = async (pageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) return

    try {
      const response = await fetch(`/api/cms/sites/${siteId}/pages/${pageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadPages()
        alert('Page supprimée avec succès !')
      } else {
        alert('Erreur lors de la suppression de la page')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression de la page')
    }
  }

  const exportSite = async () => {
    if (!confirm('Exporter le site complet avec CMS intégré ?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exportType: 'full',
          includeSourceCode: false
        })
      })

      if (response.ok) {
        // Télécharger le fichier ZIP
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${site?.domain || 'site'}-export.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        alert('Export terminé ! Le fichier ZIP a été téléchargé.')
      } else {
        alert('Erreur lors de l\'export du site')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'export du site')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des pages...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Pages</h1>
              <p className="mt-2 text-gray-600">
                {site?.project.name} - {site?.domain}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={exportSite}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                📦 Exporter le Site
              </button>
              <Link 
                href={`/dashboard/cms/sites/${siteId}/editor`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                🎨 Éditeur Legacy
              </Link>
              <Link 
                href="/dashboard/cms"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Retour CMS
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('template')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'template'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎨 Pages Template ({templatePages.length})
              </button>
              <button
                onClick={() => setSelectedTab('custom')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'custom'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📄 Pages Personnalisées ({pages.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Pages Template */}
        {selectedTab === 'template' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Pages du Template</h2>
              <p className="text-gray-600">
                Pages générées automatiquement par votre template. Elles peuvent être éditées avec l'éditeur visuel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templatePages.map((page) => (
                <div key={page.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Template
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">🔗</span>
                        <span className="font-mono">/{page.slug || ''}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📋</span>
                        <span>{page.pageType}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/cms/sites/${siteId}/visual-editor?page=${page.id}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        🎨 Éditer
                      </Link>
                      <Link
                        href={`/${page.slug || ''}`}
                        target="_blank"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        👁️
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pages Personnalisées */}
        {selectedTab === 'custom' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Pages Personnalisées</h2>
                <p className="text-gray-600">
                  Pages créées spécialement pour ce site. Elles peuvent être modifiées et supprimées.
                </p>
              </div>
              <button
                onClick={createCustomPage}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                📄 Nouvelle Page
              </button>
            </div>

            {pages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune page personnalisée</h3>
                <p className="text-gray-500 mb-4">Créez votre première page personnalisée</p>
                <button
                  onClick={createCustomPage}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  📄 Créer une page
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((page) => (
                  <div key={page.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Personnalisée
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🔗</span>
                          <span className="font-mono">/{page.slug}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">🧩</span>
                          <span>{page.blocks?.length || 0} blocs</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">📅</span>
                          <span>{new Date(page.updatedAt || '').toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link
                          href={`/dashboard/cms/sites/${siteId}/visual-editor?page=${page.id}`}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          🎨 Éditer
                        </Link>
                        <Link
                          href={`/${page.slug}`}
                          target="_blank"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          👁️
                        </Link>
                        {page.canDelete && (
                          <button
                            onClick={() => deletePage(page.id)}
                            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}