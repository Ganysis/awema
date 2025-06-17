'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  domain?: string
  trade?: string
  status: string
  createdAt: string
}

interface ClientDetails extends Client {
  forms: Array<{
    id: string
    token: string
    currentStep: number
    formData: string | null
    completedAt: string | null
    expiresAt: string
    createdAt: string
  }>
  projects: Array<{
    id: string
    name: string
    status: string
    formData: string | null
    siteData: string | null
    domain: string | null
    previewUrl: string | null
    siteFolder: string | null
    createdAt: string
  }>
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFormLinksModal, setShowFormLinksModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientDetails | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [formLinks, setFormLinks] = useState<any[]>([])
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    domain: '',
    trade: ''
  })

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const response = await fetch('/api/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadClientDetails = async (clientId: string) => {
    setLoadingDetails(true)
    try {
      const response = await fetch(`/api/clients/${clientId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedClient(data)
        setShowDetailsModal(true)
      } else {
        alert('Erreur lors du chargement des détails')
      }
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error)
      alert('Erreur lors du chargement des détails')
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      })
      
      if (response.ok) {
        const client = await response.json()
        setClients([client, ...clients])
        setNewClient({ name: '', email: '', phone: '', company: '', domain: '', trade: '' })
        setShowNewClientModal(false)
        alert('Client créé avec succès !')
      } else {
        const error = await response.json()
        alert(`Erreur: ${error.error}`)
      }
    } catch (error) {
      console.error('Erreur lors de la création du client:', error)
      alert('Erreur lors de la création du client')
    }
  }

  const handleSendForm = async (clientId: string) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/send-form`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const { formUrl } = await response.json()
        
        // Copier l'URL dans le presse-papier
        await navigator.clipboard.writeText(formUrl)
        alert(`Formulaire créé ! URL copiée dans le presse-papier:\n${formUrl}`)
        
        // Mettre à jour le statut du client
        setClients(clients.map(client => 
          client.id === clientId 
            ? { ...client, status: 'FORMULAIRE_ENVOYE' }
            : client
        ))
        
        // Rafraîchir les clients pour avoir les dernières données
        loadClients()
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      alert('Erreur lors de la création du formulaire')
    }
  }

  const handleCopyFormLink = async (token: string) => {
    const formUrl = `${window.location.origin}/form/${token}`
    try {
      await navigator.clipboard.writeText(formUrl)
      alert(`Lien du formulaire copié dans le presse-papier:\n${formUrl}`)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
      alert(`Lien du formulaire:\n${formUrl}`)
    }
  }

  const handleGetFormLinks = async (clientId: string) => {
    try {
      const response = await fetch(`/api/clients/${clientId}/form-links`)
      
      if (response.ok) {
        const { forms, client } = await response.json()
        
        if (forms.length === 0) {
          alert('Aucun formulaire trouvé pour ce client.')
          return
        }
        
        setFormLinks(forms)
        setSelectedClient(client)
        setShowFormLinksModal(true)
      } else {
        alert('Erreur lors de la récupération des liens')
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des liens:', error)
      alert('Erreur lors de la récupération des liens')
    }
  }

  const handleRegenerateFormLink = async (clientId: string) => {
    if (!confirm('Voulez-vous générer un nouveau lien de formulaire ? L\'ancien lien deviendra invalide.')) {
      return
    }
    
    try {
      const response = await fetch(`/api/clients/${clientId}/send-form`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const { formUrl } = await response.json()
        await navigator.clipboard.writeText(formUrl)
        alert(`Nouveau lien généré et copié dans le presse-papier:\n${formUrl}`)
        
        // Rafraîchir les détails du client
        if (selectedClient?.id === clientId) {
          loadClientDetails(clientId)
        }
        loadClients()
      }
    } catch (error) {
      console.error('Erreur lors de la régénération du lien:', error)
      alert('Erreur lors de la génération du nouveau lien')
    }
  }

  const handleExportSite = async (projectId: string, siteFolder: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/export`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${siteFolder}-export.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        alert('Export téléchargé avec succès !')
      } else {
        alert('Erreur lors de l\'export')
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
      alert('Erreur lors de l\'export')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      'NOUVEAU': 'bg-blue-100 text-blue-800',
      'FORMULAIRE_ENVOYE': 'bg-yellow-100 text-yellow-800',
      'DONNEES_COLLECTEES': 'bg-green-100 text-green-800',
      'EN_PRODUCTION': 'bg-purple-100 text-purple-800',
      'LIVRE': 'bg-gray-100 text-gray-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des clients</h1>
          <p className="mt-2 text-gray-600">Gérez vos clients et leurs projets de sites web</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowNewClientModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouveau client
          </button>
        </div>
      </div>

      {/* Table des clients */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun client</h3>
            <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier client.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowNewClientModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nouveau client
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.trade}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.company}</div>
                      <div className="text-sm text-gray-500">{client.domain}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(client.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          {client.status === 'NOUVEAU' && (
                            <button
                              onClick={() => handleSendForm(client.id)}
                              className="text-blue-600 hover:text-blue-900 text-sm"
                            >
                              📧 Envoyer formulaire
                            </button>
                          )}
                          {(client.status === 'FORMULAIRE_ENVOYE' || client.status === 'DONNEES_COLLECTEES') && (
                            <>
                              <button
                                onClick={() => handleGetFormLinks(client.id)}
                                className="text-blue-600 hover:text-blue-900 text-sm"
                              >
                                🔗 Récupérer lien
                              </button>
                              <button
                                onClick={() => handleRegenerateFormLink(client.id)}
                                className="text-orange-600 hover:text-orange-900 text-sm"
                              >
                                🔄 Nouveau lien
                              </button>
                            </>
                          )}
                          {client.status === 'DONNEES_COLLECTEES' && (
                            <Link
                              href={`/dashboard/production?clientId=${client.id}`}
                              className="text-green-600 hover:text-green-900 text-sm"
                            >
                              🚀 Démarrer production
                            </Link>
                          )}
                        </div>
                        <button 
                          onClick={() => loadClientDetails(client.id)}
                          disabled={loadingDetails}
                          className="text-gray-600 hover:text-gray-900 disabled:opacity-50 text-sm text-left"
                        >
                          {loadingDetails ? 'Chargement...' : '👁️ Voir détails'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal nouveau client */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nouveau client</h3>
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom du contact</label>
                  <input
                    type="text"
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                  <input
                    type="text"
                    required
                    value={newClient.company}
                    onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Domaine souhaité</label>
                  <input
                    type="text"
                    value={newClient.domain}
                    onChange={(e) => setNewClient({...newClient, domain: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Métier/Secteur</label>
                  <input
                    type="text"
                    value={newClient.trade}
                    onChange={(e) => setNewClient({...newClient, trade: e.target.value})}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewClientModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Créer le client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails client */}
      {showDetailsModal && selectedClient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Détails - {selectedClient.company}
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations client */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Informations client</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium">Contact:</span> {selectedClient.name}</div>
                    <div><span className="font-medium">Email:</span> {selectedClient.email}</div>
                    <div><span className="font-medium">Téléphone:</span> {selectedClient.phone || 'Non renseigné'}</div>
                    <div><span className="font-medium">Entreprise:</span> {selectedClient.company}</div>
                    <div><span className="font-medium">Domaine:</span> {selectedClient.domain || 'Non renseigné'}</div>
                    <div><span className="font-medium">Secteur:</span> {selectedClient.trade || 'Non renseigné'}</div>
                    <div><span className="font-medium">Statut:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedClient.status === 'NOUVEAU' ? 'bg-blue-100 text-blue-800' :
                        selectedClient.status === 'FORMULAIRE_ENVOYE' ? 'bg-yellow-100 text-yellow-800' :
                        selectedClient.status === 'DONNEES_COLLECTEES' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedClient.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div><span className="font-medium">Créé le:</span> {new Date(selectedClient.createdAt).toLocaleDateString('fr-FR')}</div>
                  </div>
                </div>

                {/* Formulaires */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-md font-semibold text-gray-900">Formulaires</h4>
                    {selectedClient.forms.length > 0 && (
                      <button
                        onClick={() => handleRegenerateFormLink(selectedClient.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        🔄 Nouveau lien
                      </button>
                    )}
                  </div>
                  {selectedClient.forms.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-3">Aucun formulaire envoyé</p>
                      <button
                        onClick={() => handleSendForm(selectedClient.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                      >
                        📧 Envoyer formulaire
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedClient.forms.map((form) => {
                        const isExpired = new Date(form.expiresAt) < new Date()
                        const formUrl = `${window.location.origin}/form/${form.token}`
                        
                        return (
                          <div key={form.id} className="bg-white rounded p-3 border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Formulaire #{form.id.slice(-8)}</span>
                              <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  form.completedAt ? 'bg-green-100 text-green-800' : 
                                  isExpired ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {form.completedAt ? 'Complété' : 
                                   isExpired ? 'Expiré' :
                                   `Étape ${form.currentStep}/3`}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Créé: {new Date(form.createdAt).toLocaleDateString('fr-FR')}</div>
                              {form.completedAt && (
                                <div>Complété: {new Date(form.completedAt).toLocaleDateString('fr-FR')}</div>
                              )}
                              <div className={isExpired ? 'text-red-600 font-medium' : ''}>
                                Expire: {new Date(form.expiresAt).toLocaleDateString('fr-FR')}
                              </div>
                              
                              {!form.completedAt && !isExpired && (
                                <div className="mt-2 p-2 bg-gray-50 rounded">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-gray-700">Lien du formulaire:</span>
                                    <button
                                      onClick={() => handleCopyFormLink(form.token)}
                                      className="text-blue-600 hover:text-blue-800 text-xs"
                                    >
                                      📋 Copier
                                    </button>
                                  </div>
                                  <div className="text-xs text-gray-500 font-mono break-all">
                                    {formUrl}
                                  </div>
                                </div>
                              )}
                              
                              {isExpired && !form.completedAt && (
                                <div className="mt-2">
                                  <button
                                    onClick={() => handleRegenerateFormLink(selectedClient.id)}
                                    className="bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700"
                                  >
                                    🔄 Générer nouveau lien
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Projets */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Projets</h4>
                  {selectedClient.projects.length === 0 ? (
                    <p className="text-gray-600">Aucun projet créé</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedClient.projects.map((project) => (
                        <div key={project.id} className="bg-white rounded p-3 border">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{project.name}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              project.status === 'COLLECTE' ? 'bg-blue-100 text-blue-800' :
                              project.status === 'PRODUCTION' ? 'bg-yellow-100 text-yellow-800' :
                              project.status === 'PRET' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>Créé: {new Date(project.createdAt).toLocaleDateString('fr-FR')}</div>
                            {project.domain && <div>Domaine: {project.domain}</div>}
                            {project.previewUrl && (
                              <div>
                                <a 
                                  href={project.previewUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Voir la prévisualisation
                                </a>
                              </div>
                            )}
                            {project.siteFolder && (
                              <div className="mt-2">
                                <button
                                  onClick={() => handleExportSite(project.id, project.siteFolder!)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                                >
                                  Exporter le site
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Données du formulaire */}
                {selectedClient.forms.length > 0 && selectedClient.forms.some(form => form.formData) && (
                  <div className="bg-purple-50 rounded-lg p-4 lg:col-span-2">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">
                      📋 Données collectées du formulaire
                    </h4>
                    {selectedClient.forms.map((form) => 
                      form.formData ? (
                        <div key={form.id} className="mb-4">
                          {selectedClient.forms.length > 1 && (
                            <div className="text-sm text-gray-600 mb-2">
                              Formulaire #{form.id.slice(-8)} - 
                              {form.completedAt ? ` Complété le ${new Date(form.completedAt).toLocaleDateString('fr-FR')}` : ' En cours'}
                            </div>
                          )}
                          <FormDataDisplay formData={JSON.parse(form.formData)} />
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal liens formulaires */}
      {showFormLinksModal && selectedClient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  🔗 Liens de formulaires - {selectedClient.company}
                </h3>
                <button
                  onClick={() => setShowFormLinksModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {formLinks.map((form) => (
                  <div key={form.id} className={`border rounded-lg p-4 ${
                    form.isCompleted ? 'bg-green-50 border-green-200' :
                    form.isExpired ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Formulaire #{form.id.slice(-8)}
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Créé: {new Date(form.createdAt).toLocaleDateString('fr-FR')} à {new Date(form.createdAt).toLocaleTimeString('fr-FR')}</div>
                          <div>Expire: {new Date(form.expiresAt).toLocaleDateString('fr-FR')} à {new Date(form.expiresAt).toLocaleTimeString('fr-FR')}</div>
                          {form.completedAt && (
                            <div>Complété: {new Date(form.completedAt).toLocaleDateString('fr-FR')} à {new Date(form.completedAt).toLocaleTimeString('fr-FR')}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          form.isCompleted ? 'bg-green-100 text-green-800' :
                          form.isExpired ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {form.isCompleted ? '✅ Complété' :
                           form.isExpired ? '❌ Expiré' :
                           `⏳ Étape ${form.currentStep}/3`}
                        </span>
                        
                        {!form.isExpired && !form.isCompleted && (
                          <button
                            onClick={() => handleCopyFormLink(form.token)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            📋 Copier lien
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {(!form.isExpired && !form.isCompleted) && (
                      <div className="bg-white rounded p-3 border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Lien du formulaire:</span>
                          <span className="text-xs text-gray-500">Clique pour sélectionner</span>
                        </div>
                        <input
                          type="text"
                          value={form.url}
                          readOnly
                          onClick={(e) => {
                            e.currentTarget.select()
                            navigator.clipboard.writeText(form.url)
                            alert('Lien copié dans le presse-papier !')
                          }}
                          className="w-full p-2 text-sm bg-gray-50 border rounded font-mono cursor-pointer hover:bg-gray-100"
                        />
                      </div>
                    )}
                    
                    {form.isExpired && !form.isCompleted && (
                      <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                        <p className="text-red-700 text-sm mb-2">
                          ⚠️ Ce formulaire a expiré. Générez un nouveau lien pour permettre au client de le remplir.
                        </p>
                        <button
                          onClick={() => {
                            setShowFormLinksModal(false)
                            handleRegenerateFormLink(selectedClient.id)
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          🔄 Générer nouveau lien
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {formLinks.filter(f => !f.isExpired && !f.isCompleted).length === 0 && (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">
                      Aucun formulaire actif. Tous les formulaires sont soit expirés soit complétés.
                    </p>
                    <button
                      onClick={() => {
                        setShowFormLinksModal(false)
                        handleRegenerateFormLink(selectedClient.id)
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      📧 Générer nouveau formulaire
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => {
                    setShowFormLinksModal(false)
                    handleRegenerateFormLink(selectedClient.id)
                  }}
                  className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  🔄 Générer nouveau lien
                </button>
                <button
                  onClick={() => setShowFormLinksModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Composant pour afficher les données du formulaire
function FormDataDisplay({ formData }: { formData: any }) {
  if (!formData) return <p className="text-gray-600">Aucune donnée</p>

  return (
    <div className="space-y-6">
      {formData.step1 && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
            🏢 Étape 1 - Informations entreprise
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><span className="font-medium text-gray-600">Entreprise:</span> <span className="text-gray-900">{formData.step1.companyName}</span></div>
            <div><span className="font-medium text-gray-600">Activité:</span> <span className="text-gray-900">{formData.step1.trade}</span></div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-600">Description:</span> 
              <div className="text-gray-900 mt-1 p-2 bg-gray-50 rounded">{formData.step1.description}</div>
            </div>
            <div><span className="font-medium text-gray-600">Responsable:</span> <span className="text-gray-900">{formData.step1.ownerName}</span></div>
            <div><span className="font-medium text-gray-600">Email:</span> <span className="text-gray-900">{formData.step1.email}</span></div>
            <div><span className="font-medium text-gray-600">Téléphone:</span> <span className="text-gray-900">{formData.step1.phone}</span></div>
            <div><span className="font-medium text-gray-600">Ville:</span> <span className="text-gray-900">{formData.step1.city}</span></div>
            <div className="md:col-span-2"><span className="font-medium text-gray-600">Adresse:</span> <span className="text-gray-900">{formData.step1.address}</span></div>
          </div>
        </div>
      )}

      {formData.step2 && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
            🎨 Étape 2 - Design et services
          </h5>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">Couleur principale:</span> 
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: formData.step2.primaryColor }}></div>
                <span className="text-gray-900 font-mono">{formData.step2.primaryColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">Couleur secondaire:</span> 
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: formData.step2.secondaryColor }}></div>
                <span className="text-gray-900 font-mono">{formData.step2.secondaryColor}</span>
              </div>
            </div>
            
            {formData.step2.logoUrl && (
              <div>
                <span className="font-medium text-gray-600">Logo:</span> 
                <div className="mt-1">
                  <a href={formData.step2.logoUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 break-all">
                    {formData.step2.logoUrl}
                  </a>
                </div>
              </div>
            )}
            
            {formData.step2.services && formData.step2.services.length > 0 && (
              <div>
                <span className="font-medium text-gray-600 flex items-center mb-2">
                  🛠️ Services ({formData.step2.services.length})
                </span>
                <div className="space-y-3">
                  {formData.step2.services.map((service: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded p-3 border">
                      <div className="flex justify-between items-start mb-2">
                        <h6 className="font-medium text-gray-900">{service.name}</h6>
                        {service.price && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {service.price}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{service.description}</p>
                      {service.detailedDescription && service.detailedDescription !== service.description && (
                        <div className="text-xs text-gray-600 italic">
                          <strong>Détails:</strong> {service.detailedDescription}
                        </div>
                      )}
                      {service.images && service.images.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-600 font-medium">Images ({service.images.length}):</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {service.images.map((image: string, imgIndex: number) => (
                              <a key={imgIndex} href={image} target="_blank" rel="noopener noreferrer"
                                 className="text-blue-600 hover:text-blue-800 text-xs">
                                Image {imgIndex + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {formData.step3 && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
            ⚙️ Étape 3 - Finalisation et paramètres
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {formData.step3.openingHours && (
              <div><span className="font-medium text-gray-600">Horaires:</span> <span className="text-gray-900">{formData.step3.openingHours}</span></div>
            )}
            <div>
              <span className="font-medium text-gray-600">Service d'urgence:</span> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${formData.step3.emergencyAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {formData.step3.emergencyAvailable ? '✅ Oui' : '❌ Non'}
              </span>
            </div>
            {formData.step3.domain && (
              <div><span className="font-medium text-gray-600">Domaine:</span> <span className="text-gray-900 font-mono">{formData.step3.domain}</span></div>
            )}
            
            {formData.step3.serviceCities && formData.step3.serviceCities.length > 0 && (
              <div className="md:col-span-2">
                <span className="font-medium text-gray-600">Zones d'intervention ({formData.step3.serviceCities.length}):</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.step3.serviceCities.map((city: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      📍 {city}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {formData.step3.keywords && formData.step3.keywords.length > 0 && (
              <div className="md:col-span-2">
                <span className="font-medium text-gray-600">Mots-clés SEO ({formData.step3.keywords.length}):</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.step3.keywords.map((keyword: string, index: number) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      🔍 {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {formData.step3.legalInfo && (
              <div className="md:col-span-2">
                <span className="font-medium text-gray-600">Informations légales:</span>
                <div className="mt-1 p-2 bg-gray-50 rounded text-xs space-y-1">
                  {formData.step3.legalInfo.siret && <div><strong>SIRET:</strong> {formData.step3.legalInfo.siret}</div>}
                  {formData.step3.legalInfo.legalForm && <div><strong>Forme juridique:</strong> {formData.step3.legalInfo.legalForm}</div>}
                  {formData.step3.legalInfo.capital && <div><strong>Capital:</strong> {formData.step3.legalInfo.capital}</div>}
                  {formData.step3.legalInfo.rcs && <div><strong>RCS:</strong> {formData.step3.legalInfo.rcs}</div>}
                  {formData.step3.legalInfo.vatNumber && <div><strong>N° TVA:</strong> {formData.step3.legalInfo.vatNumber}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}