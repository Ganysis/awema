'use client'

import { useState, useEffect } from 'react'
import { BTP_TEMPLATES, type BTPTemplate } from '@/lib/btp-templates'

interface TemplateSource {
  id: string
  templateId: string
  name: string
  description: string
  category: string
  htmlStructure: string
  cssStyles: string
  jsScripts?: string
  editableFields: string
  defaultData: string
  sectors: string[]
  style: string
  isActive: boolean
}

export default function TemplateSourceEditorPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [templates, setTemplates] = useState<TemplateSource[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateSource | null>(null)
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'config'>('html')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | 'home' | 'service' | 'contact'>('all')

  useEffect(() => {
    loadTemplateSources()
  }, [])

  const loadTemplateSources = async () => {
    try {
      // Simuler le chargement des templates depuis la base
      // En production, cela viendrait de /api/templates/sources
      const mockSources: TemplateSource[] = BTP_TEMPLATES.map(template => ({
        id: template.id,
        templateId: template.id,
        name: template.name,
        description: template.description,
        category: template.category,
        htmlStructure: generateMockHTML(template),
        cssStyles: generateMockCSS(template),
        jsScripts: generateMockJS(template),
        editableFields: JSON.stringify({
          title: { type: 'text', label: 'Titre principal' },
          description: { type: 'textarea', label: 'Description' },
          primaryColor: { type: 'color', label: 'Couleur primaire' },
          services: { type: 'array', label: 'Services', itemType: 'service' }
        }),
        defaultData: JSON.stringify({
          title: template.name,
          description: template.description,
          primaryColor: '#2563eb'
        }),
        sectors: template.sectors,
        style: template.style,
        isActive: true
      }))
      
      setTemplates(mockSources)
      if (mockSources.length > 0) {
        setSelectedTemplate(mockSources[0])
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockHTML = (template: BTPTemplate): string => {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - {{companyName}}</title>
    <style>{css}</style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="logo">{{companyName}}</h1>
            <nav class="nav">
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>
    
    <main class="main">
        <section class="hero hero-${template.style}">
            <div class="container">
                <h1>{{title}}</h1>
                <p>{{description}}</p>
                <a href="tel:{{phone}}" class="btn btn-primary">{{phone}}</a>
            </div>
        </section>
        
        <section class="services">
            <div class="container">
                <h2>Nos Services</h2>
                <div class="services-grid">
                    {{#each services}}
                    <div class="service-card">
                        <h3>{{name}}</h3>
                        <p>{{description}}</p>
                        {{#if price}}<span class="price">{{price}}</span>{{/if}}
                    </div>
                    {{/each}}
                </div>
            </div>
        </section>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; {{year}} {{companyName}}. Tous droits réservés.</p>
        </div>
    </footer>
    
    <script>{js}</script>
</body>
</html>`
  }

  const generateMockCSS = (template: BTPTemplate): string => {
    const colors = {
      modern: { primary: '#2563eb', secondary: '#1d4ed8' },
      classic: { primary: '#8b5a3c', secondary: '#6b4423' },
      bold: { primary: '#ef4444', secondary: '#dc2626' },
      minimal: { primary: '#374151', secondary: '#1f2937' },
      professional: { primary: '#1e40af', secondary: '#1e3a8a' }
    }
    
    const styleColors = colors[template.style as keyof typeof colors] || colors.modern
    
    return `/* Template ${template.name} - Style ${template.style} */
:root {
  --primary-color: ${styleColors.primary};
  --secondary-color: ${styleColors.secondary};
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --bg-light: #f9fafb;
  --white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.header {
  background: var(--white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  padding: 8rem 0 4rem;
  text-align: center;
}

.hero-modern {
  background: linear-gradient(135deg, var(--primary-color)15 0%, var(--bg-light) 100%);
}

.hero-classic {
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), var(--primary-color);
  color: var(--white);
}

.hero-bold {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white);
}

.hero-minimal {
  background: var(--white);
  border-bottom: 1px solid #e5e7eb;
}

.hero-professional {
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  color: var(--white);
}

.hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--text-light);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  min-height: 44px;
}

.btn-primary {
  background: var(--primary-color);
  color: var(--white);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

/* Services */
.services {
  padding: 4rem 0;
  background: var(--bg-light);
}

.services h2 {
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.service-card {
  background: var(--white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.service-card p {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.price {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.125rem;
}

/* Footer */
.footer {
  background: var(--text-dark);
  color: var(--white);
  padding: 2rem 0;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 { font-size: 2rem; }
  .hero p { font-size: 1rem; }
  .services-grid { grid-template-columns: 1fr; }
  .nav { display: none; } /* Mobile menu needed */
}`
  }

  const generateMockJS = (template: BTPTemplate): string => {
    return `// Template ${template.name} JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe 'animate'
    document.querySelectorAll('.animate').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // Tracking des clics sur boutons d'appel
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Call button clicked - Template: ${template.id}');
            // Analytics tracking ici
        });
    });
    
    // Menu mobile (si nécessaire)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
});`
  }

  const saveTemplate = async () => {
    if (!selectedTemplate) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/templates/sources', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedTemplate)
      })
      
      if (response.ok) {
        alert('Template sauvegardé avec succès!')
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    if (!selectedTemplate) return
    
    setSelectedTemplate(prev => prev ? {
      ...prev,
      [field]: value
    } : null)
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des templates sources...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Liste des templates */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Éditeur de Templates Sources</h1>
          <p className="text-sm text-gray-600 mt-1">Modifiez le code source des templates</p>
          
          {/* Recherche et filtres */}
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Rechercher un template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as 'all' | 'home' | 'service' | 'contact')}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="all">Toutes les catégories</option>
              <option value="home">Accueil</option>
              <option value="service">Services</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedTemplate?.id === template.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      template.category === 'home' ? 'bg-blue-100 text-blue-800' :
                      template.category === 'service' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {template.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                      {template.style}
                    </span>
                  </div>
                </div>
                {!template.isActive && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                    Inactif
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Éditeur principal */}
      <div className="flex-1 flex flex-col">
        {selectedTemplate ? (
          <>
            {/* Header de l'éditeur */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedTemplate.name}</h2>
                  <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                    🔄 Réinitialiser
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                    👁️ Prévisualiser
                  </button>
                  <button
                    onClick={saveTemplate}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? '💾 Sauvegarde...' : '💾 Sauvegarder'}
                  </button>
                </div>
              </div>
              
              {/* Onglets */}
              <div className="flex space-x-1 mt-4">
                {[
                  { id: 'html', label: 'HTML', icon: '📄' },
                  { id: 'css', label: 'CSS', icon: '🎨' },
                  { id: 'js', label: 'JavaScript', icon: '⚡' },
                  { id: 'config', label: 'Configuration', icon: '⚙️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-3 py-2 text-sm font-medium rounded-t border-b-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu de l'éditeur */}
            <div className="flex-1 p-4">
              {activeTab === 'html' && (
                <div className="h-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Structure HTML du template
                  </label>
                  <textarea
                    value={selectedTemplate.htmlStructure}
                    onChange={(e) => handleFieldChange('htmlStructure', e.target.value)}
                    className="w-full h-full p-4 border border-gray-300 rounded font-mono text-sm resize-none"
                    placeholder="Code HTML..."
                    style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                  />
                </div>
              )}

              {activeTab === 'css' && (
                <div className="h-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Styles CSS du template
                  </label>
                  <textarea
                    value={selectedTemplate.cssStyles}
                    onChange={(e) => handleFieldChange('cssStyles', e.target.value)}
                    className="w-full h-full p-4 border border-gray-300 rounded font-mono text-sm resize-none"
                    placeholder="Code CSS..."
                    style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                  />
                </div>
              )}

              {activeTab === 'js' && (
                <div className="h-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    JavaScript du template
                  </label>
                  <textarea
                    value={selectedTemplate.jsScripts || ''}
                    onChange={(e) => handleFieldChange('jsScripts', e.target.value)}
                    className="w-full h-full p-4 border border-gray-300 rounded font-mono text-sm resize-none"
                    placeholder="Code JavaScript..."
                    style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                  />
                </div>
              )}

              {activeTab === 'config' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du template
                      </label>
                      <input
                        type="text"
                        value={selectedTemplate.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Style
                      </label>
                      <select
                        value={selectedTemplate.style}
                        onChange={(e) => handleFieldChange('style', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                      >
                        <option value="modern">Moderne</option>
                        <option value="classic">Classique</option>
                        <option value="bold">Audacieux</option>
                        <option value="minimal">Minimal</option>
                        <option value="professional">Professionnel</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={selectedTemplate.description}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded h-24"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secteurs recommandés (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      value={selectedTemplate.sectors.join(', ')}
                      onChange={(e) => handleFieldChange('sectors', JSON.stringify(e.target.value.split(', ').filter(s => s.trim())))}
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="plomberie, électricité, chauffage"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Champs éditables (JSON)
                    </label>
                    <textarea
                      value={selectedTemplate.editableFields}
                      onChange={(e) => handleFieldChange('editableFields', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded h-32 font-mono text-sm"
                      placeholder='{"title": {"type": "text", "label": "Titre"}}'
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={selectedTemplate.isActive}
                      onChange={(e) => handleFieldChange('isActive', e.target.checked.toString())}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Template actif (disponible pour les nouveaux sites)
                    </label>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun template sélectionné</h3>
              <p className="mt-1 text-sm text-gray-500">
                Sélectionnez un template dans la liste pour commencer l'édition
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}