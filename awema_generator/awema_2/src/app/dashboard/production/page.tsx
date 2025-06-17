'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  client: {
    id: string
    name: string
    company: string
    email: string
  }
  status: string
  formData?: string
  siteData?: string
  domain?: string
  previewUrl?: string
  siteFolder?: string
  createdAt: string
  updatedAt: string
}

export default function ProductionPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [generatingId, setGeneratingId] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSite = async (projectId: string) => {
    setGeneratingId(projectId)
    try {
      const response = await fetch(`/api/projects/${projectId}/generate`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Site généré avec succès ! URL de prévisualisation: ${result.previewUrl}`)
        
        // Recharger les projets pour mettre à jour le statut
        loadProjects()
      } else {
        const error = await response.json()
        alert(`Erreur lors de la génération: ${error.error}`)
      }
    } catch (error) {
      console.error('Erreur lors de la génération:', error)
      alert('Erreur lors de la génération du site')
    } finally {
      setGeneratingId(null)
    }
  }

  const markAsDelivered = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/deliver`, {
        method: 'POST'
      })
      
      if (response.ok) {
        loadProjects()
        alert('Projet marqué comme livré')
      }
    } catch (error) {
      console.error('Erreur lors de la livraison:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      'COLLECTE': 'bg-blue-100 text-blue-800',
      'PRODUCTION': 'bg-yellow-100 text-yellow-800', 
      'PRET': 'bg-green-100 text-green-800',
      'LIVRE': 'bg-gray-100 text-gray-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {status === 'COLLECTE' ? 'Collecte' : status === 'PRODUCTION' ? 'Production' : status === 'PRET' ? 'Prêt' : 'Livré'}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des projets...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pipeline de production</h1>
        <p className="mt-2 text-gray-600">Gérez la production et la livraison des sites web</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {projects.filter(p => p.status === 'COLLECTE').length}
                  </span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">En collecte</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold text-sm">
                    {projects.filter(p => p.status === 'PRODUCTION').length}
                  </span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">En production</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">
                    {projects.filter(p => p.status === 'PRET').length}
                  </span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Prêts</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">
                    {projects.filter(p => p.status === 'LIVRE').length}
                  </span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Livrés</dt>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun projet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Les projets apparaîtront ici une fois que les clients auront complété leurs formulaires.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/clients"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Gérer les clients
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domaine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">
                          Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.client.company}</div>
                        <div className="text-sm text-gray-500">{project.client.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.domain || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {project.status === 'COLLECTE' && (
                        <>
                          <Link
                            href={`/dashboard/projects/${project.id}/wizard`}
                            className="text-purple-600 hover:text-purple-900 mr-3"
                          >
                            🧙‍♂️ Wizard
                          </Link>
                          <button
                            onClick={() => generateSite(project.id)}
                            disabled={generatingId === project.id}
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                          >
                            {generatingId === project.id ? 'Génération...' : 'Auto'}
                          </button>
                        </>
                      )}
                      
                      {project.status === 'PRODUCTION' && (
                        <span className="text-yellow-600">En cours...</span>
                      )}
                      
                      {project.status === 'PRET' && (
                        <>
                          {project.previewUrl && (
                            <a
                              href={project.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Prévisualiser
                            </a>
                          )}
                          <button
                            onClick={() => markAsDelivered(project.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Marquer livré
                          </button>
                        </>
                      )}
                      
                      {project.status === 'LIVRE' && (
                        <span className="text-gray-500">Livré</span>
                      )}
                      
                      <button className="text-gray-600 hover:text-gray-900 ml-3">
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}