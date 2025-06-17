'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SiteInstance {
  id: string
  domain: string
  isLive: boolean
  project: {
    id: string
    name: string
    client: {
      company: string
      email: string
    }
  }
  cmsEnabled: boolean
  createdAt: string
  _count: {
    articles: number
    pages: number
  }
}

export default function CMSDashboard() {
  const [sites, setSites] = useState<SiteInstance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSites()
  }, [])

  const loadSites = async () => {
    try {
      const response = await fetch('/api/cms/sites')
      if (response.ok) {
        const data = await response.json()
        setSites(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des sites:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des sites CMS...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">CMS Manager</h1>
              <p className="mt-2 text-gray-600">Gérez tous vos sites avec CMS intégré</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="btn-secondary">
                ← Retour Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">🌐</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sites avec CMS</dt>
                    <dd className="text-lg font-medium text-gray-900">{sites.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sites en ligne</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {sites.filter(s => s.isLive).length}
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
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📝</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total articles</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {sites.reduce((sum, s) => sum + s._count.articles, 0)}
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
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📄</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total pages</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {sites.reduce((sum, s) => sum + s._count.pages, 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sites List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sites avec CMS</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Gérez les contenus et templates de vos sites déployés
            </p>
          </div>
          
          {sites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🌐</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun site avec CMS</h3>
              <p className="text-gray-500 mb-4">Déployez un site pour activer le CMS</p>
              <Link href="/dashboard" className="btn-primary">
                Voir les projets
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sites.map((site) => (
                <li key={site.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            site.isLive ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <span className={`text-sm font-medium ${
                              site.isLive ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {site.isLive ? '🟢' : '⚪'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-blue-600 truncate">
                              {site.domain}
                            </p>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              site.isLive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {site.isLive ? 'En ligne' : 'Hors ligne'}
                            </span>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-gray-900">{site.project.name}</p>
                            <p className="text-sm text-gray-500">{site.project.client.company}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm text-gray-500">
                          <p>{site._count.articles} articles</p>
                          <p>{site._count.pages} pages</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link 
                            href={`/dashboard/cms/sites/${site.id}/pages`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          >
                            📄 Pages
                          </Link>
                          
                          <Link 
                            href={`/dashboard/cms/sites/${site.id}/editor`}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            🎨 Éditeur Legacy
                          </Link>
                          
                          <Link 
                            href={`/dashboard/cms/sites/${site.id}/articles`}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            📝 Articles
                          </Link>
                          
                          {site.isLive && (
                            <a 
                              href={`https://${site.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              🔗 Voir le site
                            </a>
                          )}
                        </div>
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