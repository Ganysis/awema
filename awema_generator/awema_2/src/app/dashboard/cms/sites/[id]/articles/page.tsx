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
  authorName: string
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

export default function ArticlesManager() {
  const params = useParams()
  const siteId = params.id as string
  
  const [site, setSite] = useState<SiteInstance | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    loadSite()
    loadArticles()
  }, [siteId])

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

  const loadArticles = async () => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/articles`)
      if (response.ok) {
        const articlesData = await response.json()
        setArticles(articlesData)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const response = await fetch(`/api/cms/sites/${siteId}/articles/${articleId}`, {
        method: 'DELETE'
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

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true
    if (filter === 'published') return article.status === 'PUBLISHED'
    if (filter === 'draft') return article.status === 'DRAFT'
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Site non trouvé</h1>
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
              <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
              <p className="mt-2 text-gray-600">
                {site.project.name} - {site.domain}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href={`/dashboard/cms/sites/${siteId}/articles/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                📝 Nouvel article
              </Link>
              <Link 
                href={`/dashboard/cms/sites/${siteId}/editor`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                🎨 Éditeur
              </Link>
              <Link 
                href="/dashboard/cms"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Retour CMS
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">Ce mois</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {articles.filter(a => {
                        const articleDate = new Date(a.createdAt)
                        const now = new Date()
                        return articleDate.getMonth() === now.getMonth() && 
                               articleDate.getFullYear() === now.getFullYear()
                      }).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtrer par :</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous ({articles.length})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Publiés ({articles.filter(a => a.status === 'PUBLISHED').length})
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === 'draft' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Brouillons ({articles.filter(a => a.status === 'DRAFT').length})
              </button>
            </div>
          </div>
        </div>

        {/* Liste des articles */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article</h3>
              <p className="text-gray-500 mb-4">Commencez par créer votre premier article</p>
              <Link 
                href={`/dashboard/cms/sites/${siteId}/articles/new`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                📝 Créer un article
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredArticles.map((article) => (
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
                          <span>Par {article.authorName}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
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
                          href={`/dashboard/cms/sites/${siteId}/articles/${article.id}/edit`}
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