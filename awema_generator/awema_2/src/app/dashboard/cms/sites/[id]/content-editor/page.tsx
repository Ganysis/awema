'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface ContentBlock {
  id: string
  type: 'text' | 'heading' | 'image' | 'button' | 'service' | 'contact'
  content: any
  order: number
}

interface PageContent {
  id?: string
  pageType: string
  pageSlug?: string
  title: string
  metaTitle?: string
  metaDescription?: string
  sections: ContentBlock[]
}

export default function ContentEditorPage() {
  const params = useParams()
  const siteId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [siteData, setSiteData] = useState<any>(null)
  const [selectedPage, setSelectedPage] = useState<string>('home')
  const [pageContent, setPageContent] = useState<PageContent>({
    pageType: 'home',
    title: '',
    sections: []
  })
  const [showBlockPicker, setShowBlockPicker] = useState(false)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)

  useEffect(() => {
    loadSiteData()
  }, [siteId])

  useEffect(() => {
    if (selectedPage) {
      loadPageContent(selectedPage)
    }
  }, [selectedPage])

  const loadSiteData = async () => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}`)
      if (response.ok) {
        const data = await response.json()
        setSiteData(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPageContent = async (pageType: string) => {
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/content/${pageType}`)
      if (response.ok) {
        const data = await response.json()
        setPageContent(data)
      } else {
        // Créer un contenu par défaut
        setPageContent({
          pageType,
          title: pageType === 'home' ? 'Accueil' : pageType === 'service' ? 'Nos Services' : 'Contact',
          sections: []
        })
      }
    } catch (error) {
      console.error('Erreur lors du chargement du contenu:', error)
    }
  }

  const savePageContent = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/cms/sites/${siteId}/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageContent)
      })
      
      if (response.ok) {
        alert('Contenu sauvegardé avec succès!')
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      order: pageContent.sections.length,
      content: getDefaultContent(type)
    }
    
    setPageContent(prev => ({
      ...prev,
      sections: [...prev.sections, newBlock]
    }))
    setShowBlockPicker(false)
    setEditingBlock(newBlock.id)
  }

  const getDefaultContent = (type: ContentBlock['type']) => {
    switch (type) {
      case 'heading':
        return { text: 'Nouveau titre', level: 2 }
      case 'text':
        return { text: 'Nouveau paragraphe...' }
      case 'button':
        return { text: 'Cliquez ici', url: '#', style: 'primary' }
      case 'service':
        return { name: 'Nouveau service', description: 'Description du service...', price: '' }
      case 'contact':
        return { phone: '', email: '', address: '' }
      case 'image':
        return { url: '', alt: '', caption: '' }
      default:
        return {}
    }
  }

  const updateBlock = (blockId: string, newContent: any) => {
    setPageContent(prev => ({
      ...prev,
      sections: prev.sections.map(block => 
        block.id === blockId ? { ...block, content: newContent } : block
      )
    }))
  }

  const deleteBlock = (blockId: string) => {
    setPageContent(prev => ({
      ...prev,
      sections: prev.sections.filter(block => block.id !== blockId)
    }))
  }

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = pageContent.sections.findIndex(block => block.id === blockId)
    if (currentIndex === -1) return
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= pageContent.sections.length) return
    
    const newSections = [...pageContent.sections]
    const [movedBlock] = newSections.splice(currentIndex, 1)
    newSections.splice(newIndex, 0, movedBlock)
    
    setPageContent(prev => ({ ...prev, sections: newSections }))
  }

  const renderBlockEditor = (block: ContentBlock) => {
    const isEditing = editingBlock === block.id

    return (
      <div key={block.id} className="bg-white border rounded-lg p-4 mb-4 group hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 capitalize">
            {block.type === 'text' ? '📝 Texte' :
             block.type === 'heading' ? '🔤 Titre' :
             block.type === 'image' ? '🖼️ Image' :
             block.type === 'button' ? '🔘 Bouton' :
             block.type === 'service' ? '⚙️ Service' :
             '📞 Contact'}
          </span>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => moveBlock(block.id, 'up')}
              className="p-1 text-gray-400 hover:text-gray-600"
              disabled={pageContent.sections.findIndex(b => b.id === block.id) === 0}
            >
              ↑
            </button>
            <button
              onClick={() => moveBlock(block.id, 'down')}
              className="p-1 text-gray-400 hover:text-gray-600"
              disabled={pageContent.sections.findIndex(b => b.id === block.id) === pageContent.sections.length - 1}
            >
              ↓
            </button>
            <button
              onClick={() => setEditingBlock(isEditing ? null : block.id)}
              className="p-1 text-blue-500 hover:text-blue-700"
            >
              {isEditing ? '✓' : '✏️'}
            </button>
            <button
              onClick={() => deleteBlock(block.id)}
              className="p-1 text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            {block.type === 'heading' && (
              <>
                <select
                  value={block.content.level}
                  onChange={(e) => updateBlock(block.id, { ...block.content, level: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value={1}>H1</option>
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>
                <input
                  type="text"
                  value={block.content.text}
                  onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Titre..."
                />
              </>
            )}
            
            {block.type === 'text' && (
              <textarea
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded h-24"
                placeholder="Votre texte..."
              />
            )}
            
            {block.type === 'button' && (
              <>
                <input
                  type="text"
                  value={block.content.text}
                  onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Texte du bouton"
                />
                <input
                  type="text"
                  value={block.content.url}
                  onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="URL ou tel:0123456789"
                />
                <select
                  value={block.content.style}
                  onChange={(e) => updateBlock(block.id, { ...block.content, style: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="primary">Primaire</option>
                  <option value="secondary">Secondaire</option>
                </select>
              </>
            )}
            
            {block.type === 'service' && (
              <>
                <input
                  type="text"
                  value={block.content.name}
                  onChange={(e) => updateBlock(block.id, { ...block.content, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nom du service"
                />
                <textarea
                  value={block.content.description}
                  onChange={(e) => updateBlock(block.id, { ...block.content, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="Description du service"
                />
                <input
                  type="text"
                  value={block.content.price}
                  onChange={(e) => updateBlock(block.id, { ...block.content, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Prix (optionnel)"
                />
              </>
            )}
            
            {block.type === 'contact' && (
              <>
                <input
                  type="tel"
                  value={block.content.phone}
                  onChange={(e) => updateBlock(block.id, { ...block.content, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Téléphone"
                />
                <input
                  type="email"
                  value={block.content.email}
                  onChange={(e) => updateBlock(block.id, { ...block.content, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={block.content.address}
                  onChange={(e) => updateBlock(block.id, { ...block.content, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Adresse"
                />
              </>
            )}
            
            {block.type === 'image' && (
              <>
                <input
                  type="url"
                  value={block.content.url}
                  onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="URL de l'image"
                />
                <input
                  type="text"
                  value={block.content.alt}
                  onChange={(e) => updateBlock(block.id, { ...block.content, alt: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Texte alternatif"
                />
                <input
                  type="text"
                  value={block.content.caption}
                  onChange={(e) => updateBlock(block.id, { ...block.content, caption: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Légende (optionnel)"
                />
              </>
            )}
          </div>
        ) : (
          <div className="preview">
            {block.type === 'heading' && (
              <div className={`font-bold ${
                block.content.level === 1 ? 'text-3xl' :
                block.content.level === 2 ? 'text-2xl' : 'text-xl'
              }`}>
                {block.content.text}
              </div>
            )}
            
            {block.type === 'text' && (
              <p className="text-gray-700">{block.content.text}</p>
            )}
            
            {block.type === 'button' && (
              <button className={`px-6 py-2 rounded font-medium ${
                block.content.style === 'primary' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {block.content.text}
              </button>
            )}
            
            {block.type === 'service' && (
              <div className="border rounded p-4">
                <h3 className="font-semibold">{block.content.name}</h3>
                <p className="text-gray-600 mt-1">{block.content.description}</p>
                {block.content.price && (
                  <p className="font-bold text-blue-600 mt-2">{block.content.price}</p>
                )}
              </div>
            )}
            
            {block.type === 'contact' && (
              <div className="space-y-2">
                {block.content.phone && <p>📞 {block.content.phone}</p>}
                {block.content.email && <p>📧 {block.content.email}</p>}
                {block.content.address && <p>📍 {block.content.address}</p>}
              </div>
            )}
            
            {block.type === 'image' && block.content.url && (
              <div>
                <img src={block.content.url} alt={block.content.alt} className="max-w-full h-auto rounded" />
                {block.content.caption && (
                  <p className="text-sm text-gray-600 mt-1">{block.content.caption}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement de l'éditeur...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white shadow mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Éditeur de Contenu</h1>
              <p className="mt-2 text-gray-600">
                Modifiez le contenu de vos pages avec un éditeur visuel type Gutenberg
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => window.location.href = `/dashboard/cms/sites/${siteId}/template-editor`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                🎨 Changer Template
              </button>
              <button
                onClick={savePageContent}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '💾 Sauvegarde...' : '💾 Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des pages */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {[
              {id: 'home', name: 'Accueil', icon: '🏠'},
              {id: 'service', name: 'Services', icon: '⚙️'},
              {id: 'contact', name: 'Contact', icon: '📞'}
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPage(tab.id)}
                className={`${
                  selectedPage === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Éditeur */}
      <div className="space-y-6">
        {/* Meta données */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Informations de la page</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la page</label>
              <input
                type="text"
                value={pageContent.title}
                onChange={(e) => setPageContent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Titre de la page"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre SEO (optionnel)</label>
              <input
                type="text"
                value={pageContent.metaTitle || ''}
                onChange={(e) => setPageContent(prev => ({ ...prev, metaTitle: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Titre pour les moteurs de recherche"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description SEO (optionnel)</label>
              <textarea
                value={pageContent.metaDescription || ''}
                onChange={(e) => setPageContent(prev => ({ ...prev, metaDescription: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg h-20"
                placeholder="Description pour les moteurs de recherche"
              />
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Contenu de la page</h3>
            <button
              onClick={() => setShowBlockPicker(!showBlockPicker)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              ➕ Ajouter un bloc
            </button>
          </div>

          {/* Sélecteur de blocs */}
          {showBlockPicker && (
            <div className="bg-white border rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Choisir un type de bloc :</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {type: 'heading', label: '🔤 Titre', desc: 'H1, H2, H3'},
                  {type: 'text', label: '📝 Texte', desc: 'Paragraphe'},
                  {type: 'button', label: '🔘 Bouton', desc: 'Call-to-action'},
                  {type: 'service', label: '⚙️ Service', desc: 'Prestation'},
                  {type: 'contact', label: '📞 Contact', desc: 'Infos contact'},
                  {type: 'image', label: '🖼️ Image', desc: 'Photo/illustration'}
                ].map((blockType) => (
                  <button
                    key={blockType.type}
                    onClick={() => addBlock(blockType.type as ContentBlock['type'])}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-center transition-colors"
                  >
                    <div className="font-medium text-sm">{blockType.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{blockType.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Blocs de contenu */}
          <div className="space-y-4">
            {pageContent.sections.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun contenu</h3>
                <p className="mt-1 text-sm text-gray-500">Commencez en ajoutant votre premier bloc de contenu.</p>
              </div>
            ) : (
              pageContent.sections.map(renderBlockEditor)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}