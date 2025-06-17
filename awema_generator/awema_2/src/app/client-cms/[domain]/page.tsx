'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

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

export default function ClientCMSLogin() {
  const params = useParams()
  const domain = params.domain as string
  
  const [site, setSite] = useState<SiteInstance | null>(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSite()
  }, [domain])

  const loadSite = async () => {
    try {
      const response = await fetch(`/api/client-cms/sites/${domain}`)
      if (response.ok) {
        const siteData = await response.json()
        setSite(siteData)
      } else {
        setError('Site non trouvé')
      }
    } catch (error) {
      console.error('Erreur lors du chargement du site:', error)
      setError('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthenticating(true)
    setError('')

    try {
      const response = await fetch(`/api/client-cms/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          username: credentials.username,
          password: credentials.password
        })
      })

      if (response.ok) {
        const result = await response.json()
        // Stocker le token d'authentification
        localStorage.setItem('clientCMSToken', result.token)
        // Rediriger vers le dashboard client
        window.location.href = `/client-cms/${domain}/dashboard`
      } else {
        const error = await response.json()
        setError(error.error || 'Identifiants incorrects')
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error)
      setError('Erreur lors de la connexion')
    } finally {
      setAuthenticating(false)
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

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Site non trouvé</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">🏢</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Gestion de contenu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {site.project.client.company}
          </p>
          <p className="text-center text-sm text-gray-500">
            {site.domain}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Votre nom d'utilisateur"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Votre mot de passe"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={authenticating}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {authenticating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Accès réservé aux propriétaires du site
            </p>
            <a 
              href={`https://${site.domain}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              🔗 Voir le site public
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}