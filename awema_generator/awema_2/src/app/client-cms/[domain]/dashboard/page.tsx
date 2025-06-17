'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

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

export default function ClientDashboard() {
  const params = useParams()
  const domain = params.domain as string
  
  const [site, setSite] = useState<SiteInstance | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [domain])

  const checkAuth = async () => {
    const token = localStorage.getItem('clientCMSToken')
    if (!token) {
      window.location.href = `/client-cms/${domain}`
      return
    }

    try {
      const response = await fetch(`/api/client-cms/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Domain': domain
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSite(data.site)
        setArticles(data.articles)
        setAuthenticated(true)
      } else {
        localStorage.removeItem('clientCMSToken')
        window.location.href = `/client-cms/${domain}`
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
      window.location.href = `/client-cms/${domain}`
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('clientCMSToken')
    window.location.href = `/client-cms/${domain}`
  }

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const token = localStorage.getItem('clientCMSToken')
      const response = await fetch(`/api/client-cms/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Domain': domain
        }
      })

      if (response.ok) {
        setArticles(prev => prev.filter(a => a.id !== articleId))
        alert('Article supprimé avec succès')
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !site) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion de contenu</h1>
              <p className="mt-2 text-gray-600">
                {site.project.client.company} - {site.domain}
              </p>
            </div>
            <div className="flex space-x-4">
              <a 
                href={`https://${site.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                🔗 Voir le site
              </a>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                👋 Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Total articles</dt>
                    <dd className="text-lg font-medium text-gray-900">{articles.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Publiés</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {articles.filter(a => a.status === 'PUBLISHED').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Brouillons</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {articles.filter(a => a.status === 'DRAFT').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href={`/client-cms/${domain}/articles/new`}
                className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <span className="text-3xl">➕</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Nouvel article</h4>
                  <p className="text-sm text-gray-500">Créer un nouvel article ou actualité</p>
                </div>
              </Link>

              <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <span className="text-3xl">📊</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Statistiques</h4>
                  <p className="text-sm text-gray-500">Voir les performances de vos articles</p>
                </div>
              </div>

              <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <span className="text-3xl">🎨</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Personnalisation</h4>
                  <p className="text-sm text-gray-500">Modifier l'apparence de votre site</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des articles */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Vos articles</h3>
              <Link 
                href={`/client-cms/${domain}/articles/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                📝 Nouvel article
              </Link>
            </div>
          </div>
          
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article</h3>
              <p className="text-gray-500 mb-4">Commencez par créer votre premier article</p>
              <Link 
                href={`/client-cms/${domain}/articles/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                📝 Créer un article
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {articles.map((article) => (
                <li key={article.id}>
                  <div className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <h2 className="text-lg font-medium text-gray-900 truncate">
                            {article.title}
                          </h2>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.status === 'PUBLISHED' 
                              ? 'bg-green-100 text-green-800'
                              : article.status === 'DRAFT'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {article.status === 'PUBLISHED' ? '✅ Publié' : 
                             article.status === 'DRAFT' ? '📄 Brouillon' : 'Archivé'}
                          </span>
                        </div>
                        {article.excerpt && (
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>Créé le {new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
                          {article.publishedAt && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Publié le {new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/client-cms/${domain}/articles/${article.id}/edit`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          ✏️ Modifier
                        </Link>
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}