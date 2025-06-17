'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Block {
  id: string
  blockType: string
  order: number
  config: Record<string, any>
  content: Record<string, any>
  styles?: string
  isVisible: boolean
}

interface Page {
  id: string
  title: string
  pageType: string
  slug: string
  blocks: Block[]
  isTemplate?: boolean
}

interface BlockTemplate {
  id: string
  name: string
  category: string
  description: string
  icon: string
  config: Record<string, any>
  template: string
  styles: string
  editableFields: string[]
}

export default function VisualEditor() {
  const params = useParams()
  const searchParams = useSearchParams()
  const siteId = params.id as string
  const pageParam = searchParams.get('page')
  
  const [page, setPage] = useState<Page | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [blockTemplates, setBlockTemplates] = useState<BlockTemplate[]>([])
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showBlockSelector, setShowBlockSelector] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadPage()
    loadBlockTemplates()
  }, [siteId, pageParam])

  const loadPage = async () => {
    if (!pageParam) return

    try {
      const response = await fetch(`/api/cms/sites/${siteId}/pages/${pageParam}`)
      if (response.ok) {
        const pageData = await response.json()
        setPage(pageData)
        setBlocks(pageData.blocks || [])
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la page:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadBlockTemplates = async () => {
    try {
      const response = await fetch('/api/cms/blocks/templates')
      if (response.ok) {
        const data = await response.json()
        setBlockTemplates(data.templates || [])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des templates:', error)
    }
  }

  const savePage = async () => {
    if (!page) return

    setSaving(true)
    try {
      const endpoint = page.isTemplate 
        ? `/api/cms/sites/${siteId}/pages`
        : `/api/cms/sites/${siteId}/pages/${page.id}`
      
      const method = page.isTemplate ? 'POST' : 'PUT'
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: page.title,
          pageType: page.pageType,
          pageSlug: page.slug,
          blocks: blocks.map(block => ({
            blockType: block.blockType,
            config: block.config,
            content: block.content,
            styles: block.styles,
            isVisible: block.isVisible
          })),
          sections: {} // Pour compatibilité
        })
      })

      if (response.ok) {
        alert('Page sauvegardée avec succès !')
        if (page.isTemplate) {
          // Recharger après création d'une page template
          await loadPage()
        }
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const addBlock = (templateId: string) => {
    const template = blockTemplates.find(t => t.id === templateId)
    if (!template) return

    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      blockType: template.id,
      order: blocks.length,
      config: { ...template.config },
      content: {},
      styles: template.styles,
      isVisible: true
    }

    setBlocks([...blocks, newBlock])
    setShowBlockSelector(false)
  }

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ))
  }

  const deleteBlock = (blockId: string) => {
    if (confirm('Supprimer ce bloc ?')) {
      setBlocks(blocks.filter(block => block.id !== blockId))
      setSelectedBlock(null)
    }
  }

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = blocks.findIndex(b => b.id === blockId)
    if (blockIndex === -1) return

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1

    if (targetIndex >= 0 && targetIndex < blocks.length) {
      // Swap blocks
      [newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]]
      
      // Update orders
      newBlocks.forEach((block, index) => {
        block.order = index
      })
      
      setBlocks(newBlocks)
    }
  }

  const renderBlock = (block: Block) => {
    const template = blockTemplates.find(t => t.id === block.blockType)
    if (!template) return <div>Template non trouvé: {block.blockType}</div>

    // Remplacer les variables dans le template
    let html = template.template
    const allConfig = { ...template.config, ...block.config }

    // Remplacer les variables simples {{variable}}
    html = html.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
      const value = getNestedValue(allConfig, key.trim())
      return value !== undefined ? String(value) : match
    })

    // Remplacer les variables triple {{{variable}}} pour HTML
    html = html.replace(/\{\{\{([^}]+)\}\}\}/g, (match, key) => {
      const value = getNestedValue(allConfig, key.trim())
      return value !== undefined ? String(value) : match
    })

    return (
      <div
        className={`block-wrapper relative group ${selectedBlock?.id === block.id ? 'ring-2 ring-blue-500' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedBlock(block)
        }}
      >
        {/* Block Controls */}
        {!previewMode && (
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-1 bg-white shadow-lg rounded-md p-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  moveBlock(block.id, 'up')
                }}
                className="p-1 text-gray-600 hover:text-blue-600"
                title="Monter"
              >
                ↑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  moveBlock(block.id, 'down')
                }}
                className="p-1 text-gray-600 hover:text-blue-600"
                title="Descendre"
              >
                ↓
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedBlock(block)
                }}
                className="p-1 text-gray-600 hover:text-blue-600"
                title="Éditer"
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteBlock(block.id)
                }}
                className="p-1 text-gray-600 hover:text-red-600"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={`${!block.isVisible ? 'opacity-50' : ''}`}
        />
        
        {/* Inline styles */}
        {(template.styles || block.styles) && (
          <style dangerouslySetInnerHTML={{ 
            __html: `${template.styles || ''} ${block.styles || ''}` 
          }} />
        )}
      </div>
    )
  }

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => {
      return current?.[key]
    }, obj)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'éditeur...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Éditeur Visuel</h2>
            <Link 
              href={`/dashboard/cms/sites/${siteId}/pages`}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-1">{page?.title}</p>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex-1 px-3 py-2 text-sm rounded-md ${
                previewMode 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {previewMode ? '📝 Édition' : '👁️ Preview'}
            </button>
            <button
              onClick={savePage}
              disabled={saving}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Sauvegarde...' : '💾 Sauver'}
            </button>
          </div>
        </div>

        {/* Block Selector */}
        {!previewMode && (
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setShowBlockSelector(!showBlockSelector)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              ➕ Ajouter un bloc
            </button>
            
            {showBlockSelector && (
              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {blockTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => addBlock(template.id)}
                    className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{template.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500">{template.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Block Editor */}
        {selectedBlock && !previewMode && (
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="font-medium mb-3">Édition du bloc</h3>
            <div className="space-y-4">
              {/* Visibilité */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBlock.isVisible}
                    onChange={(e) => updateBlock(selectedBlock.id, { isVisible: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Bloc visible</span>
                </label>
              </div>

              {/* Configuration */}
              {Object.entries(selectedBlock.config || {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key}
                  </label>
                  {typeof value === 'string' && value.includes('<') ? (
                    <textarea
                      value={value}
                      onChange={(e) => updateBlock(selectedBlock.id, {
                        config: { ...selectedBlock.config, [key]: e.target.value }
                      })}
                      rows={4}
                      className="w-full border-gray-300 rounded-md text-sm"
                    />
                  ) : typeof value === 'boolean' ? (
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateBlock(selectedBlock.id, {
                        config: { ...selectedBlock.config, [key]: e.target.checked }
                      })}
                      className="border-gray-300 rounded"
                    />
                  ) : typeof value === 'object' ? (
                    <textarea
                      value={JSON.stringify(value, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value)
                          updateBlock(selectedBlock.id, {
                            config: { ...selectedBlock.config, [key]: parsed }
                          })
                        } catch (err) {
                          // Invalid JSON, ignore
                        }
                      }}
                      rows={4}
                      className="w-full border-gray-300 rounded-md text-sm font-mono"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(value)}
                      onChange={(e) => updateBlock(selectedBlock.id, {
                        config: { ...selectedBlock.config, [key]: e.target.value }
                      })}
                      className="w-full border-gray-300 rounded-md text-sm"
                    />
                  )}
                </div>
              ))}

              {/* CSS personnalisé */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CSS personnalisé
                </label>
                <textarea
                  value={selectedBlock.styles || ''}
                  onChange={(e) => updateBlock(selectedBlock.id, { styles: e.target.value })}
                  rows={4}
                  className="w-full border-gray-300 rounded-md text-sm font-mono"
                  placeholder="/* CSS personnalisé pour ce bloc */"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Editor */}
      <div className="flex-1">
        <div 
          ref={editorRef}
          className="h-full overflow-y-auto bg-white"
          onClick={() => setSelectedBlock(null)}
        >
          {blocks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Page vide</h3>
                <p className="text-gray-500">Ajoutez votre premier bloc pour commencer</p>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {blocks
                .sort((a, b) => a.order - b.order)
                .map((block) => (
                  <div key={block.id}>
                    {renderBlock(block)}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}