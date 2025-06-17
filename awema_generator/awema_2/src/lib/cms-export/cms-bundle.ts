// Bundle CMS exportable pour les sites clients
export const CMS_BUNDLE_FILES = {
  // Interface CMS client simplifiée (articles seulement)
  'cms/index.html': `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion de contenu</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        [x-cloak] { display: none !important; }
    </style>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="bg-gray-50" x-data="cmsApp()">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-6">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Gestion de contenu</h1>
                        <p class="text-gray-600">Gérez vos articles et actualités</p>
                    </div>
                    <div class="flex space-x-4">
                        <button @click="showCreateModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            📝 Nouvel article
                        </button>
                        <a href="../index.html" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                            🔗 Voir le site
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Articles List -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white shadow rounded-lg">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-medium text-gray-900">Mes Articles</h2>
                </div>
                
                <div x-show="articles.length === 0" class="p-12 text-center">
                    <div class="text-gray-400 text-6xl mb-4">📝</div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun article</h3>
                    <p class="text-gray-500 mb-4">Créez votre premier article</p>
                    <button @click="showCreateModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Créer un article
                    </button>
                </div>

                <div x-show="articles.length > 0" class="divide-y divide-gray-200">
                    <template x-for="article in articles" :key="article.id">
                        <div class="p-6 hover:bg-gray-50">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <h3 class="text-lg font-medium text-gray-900" x-text="article.title"></h3>
                                    <p class="mt-1 text-sm text-gray-600" x-text="article.excerpt"></p>
                                    <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                        <span x-text="'Publié le ' + new Date(article.publishedAt).toLocaleDateString('fr-FR')"></span>
                                        <span :class="article.status === 'PUBLISHED' ? 'text-green-600' : 'text-yellow-600'" x-text="article.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'"></span>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button @click="editArticle(article)" class="text-blue-600 hover:text-blue-800">
                                        ✏️ Éditer
                                    </button>
                                    <button @click="deleteArticle(article.id)" class="text-red-600 hover:text-red-800">
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </main>

        <!-- Modal Create/Edit Article -->
        <div x-show="showCreateModal || editingArticle" x-cloak class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4" x-text="editingArticle ? 'Modifier l\\'article' : 'Nouvel article'"></h3>
                    
                    <form @submit.prevent="saveArticle">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Titre *</label>
                                <input type="text" x-model="currentArticle.title" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Résumé</label>
                                <textarea x-model="currentArticle.excerpt" rows="2" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Contenu *</label>
                                <textarea x-model="currentArticle.content" rows="10" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Statut</label>
                                <select x-model="currentArticle.status" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                                    <option value="DRAFT">Brouillon</option>
                                    <option value="PUBLISHED">Publié</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-3 mt-6">
                            <button type="button" @click="closeModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                                Annuler
                            </button>
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                <span x-text="editingArticle ? 'Mettre à jour' : 'Créer'"></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function cmsApp() {
            return {
                articles: [],
                showCreateModal: false,
                editingArticle: null,
                currentArticle: {
                    title: '',
                    excerpt: '',
                    content: '',
                    status: 'DRAFT'
                },
                
                init() {
                    this.loadArticles();
                },
                
                loadArticles() {
                    // Charger depuis localStorage pour la démo
                    const stored = localStorage.getItem('cms_articles');
                    this.articles = stored ? JSON.parse(stored) : [];
                },
                
                saveArticles() {
                    localStorage.setItem('cms_articles', JSON.stringify(this.articles));
                },
                
                editArticle(article) {
                    this.editingArticle = article;
                    this.currentArticle = { ...article };
                },
                
                saveArticle() {
                    if (this.editingArticle) {
                        // Mise à jour
                        const index = this.articles.findIndex(a => a.id === this.editingArticle.id);
                        this.articles[index] = { ...this.currentArticle };
                    } else {
                        // Création
                        const newArticle = {
                            ...this.currentArticle,
                            id: Date.now().toString(),
                            publishedAt: new Date().toISOString(),
                            slug: this.generateSlug(this.currentArticle.title)
                        };
                        this.articles.push(newArticle);
                    }
                    
                    this.saveArticles();
                    this.closeModal();
                },
                
                deleteArticle(id) {
                    if (confirm('Supprimer cet article ?')) {
                        this.articles = this.articles.filter(a => a.id !== id);
                        this.saveArticles();
                    }
                },
                
                closeModal() {
                    this.showCreateModal = false;
                    this.editingArticle = null;
                    this.currentArticle = {
                        title: '',
                        excerpt: '',
                        content: '',
                        status: 'DRAFT'
                    };
                },
                
                generateSlug(title) {
                    return title.toLowerCase()
                        .replace(/[^a-z0-9\\s-]/g, '')
                        .replace(/\\s+/g, '-')
                        .replace(/-+/g, '-')
                        .trim();
                }
            }
        }
    </script>
</body>
</html>`,

  // Configuration CMS
  'cms/config.json': JSON.stringify({
    version: '1.0.0',
    features: {
      articles: true,
      pages: false, // Clients ne peuvent que créer des articles
      media: true,
      seo: false
    },
    permissions: {
      canEditTemplate: false,
      canCreatePages: false,
      canEditSEO: false,
      canEditDesign: false
    },
    ui: {
      language: 'fr',
      theme: 'light',
      simplified: true
    }
  }, null, 2),

  // Style CSS du CMS
  'cms/styles.css': `/* CMS Client Styles */
.cms-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.article-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 20px;
    transition: transform 0.2s ease;
}

.article-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.btn-primary {
    background: #3b82f6;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;
}

.btn-primary:hover {
    background: #2563eb;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media (max-width: 768px) {
    .cms-container {
        padding: 10px;
    }
    
    .article-card {
        padding: 15px;
    }
}`
}

// Fonction pour générer le bundle CMS exportable
export function generateCMSBundle(siteData: any) {
  const files: Record<string, string> = {}
  
  // Copier tous les fichiers du bundle
  Object.entries(CMS_BUNDLE_FILES).forEach(([path, content]) => {
    files[path] = content
  })
  
  // Personnaliser la configuration avec les données du site
  const config = JSON.parse(CMS_BUNDLE_FILES['cms/config.json'])
  config.site = {
    name: siteData.companyName || 'Mon Site',
    domain: siteData.domain || 'monsite.fr',
    contact: {
      email: siteData.email || 'contact@monsite.fr',
      phone: siteData.phone || '01 23 45 67 89'
    }
  }
  
  files['cms/config.json'] = JSON.stringify(config, null, 2)
  
  // Ajouter un fichier README pour les clients
  files['cms/README.md'] = `# Gestion de contenu - ${siteData.companyName || 'Mon Site'}

## Accès au CMS

Ouvrez le fichier \`cms/index.html\` dans votre navigateur pour accéder à l'interface de gestion.

## Fonctionnalités disponibles

✅ **Articles et actualités**
- Créer, modifier et supprimer des articles
- Gestion des brouillons et publications
- Éditeur de texte simple

❌ **Limitations**
- Modification du design : contactez votre webmaster
- Création de nouvelles pages : contactez votre webmaster
- Paramètres SEO avancés : contactez votre webmaster

## Support

Pour toute question ou assistance, contactez votre webmaster.

---
*Générateur de sites Awema - CMS Version 1.0*`

  return files
}

// Fonction pour créer le ZIP d'export
export async function createSiteExport(siteId: string, includeSourceCode = false) {
  // Cette fonction sera utilisée pour créer l'export complet du site
  // avec le CMS intégré, prêt à être déployé
  
  const exportData = {
    siteId,
    exportedAt: new Date().toISOString(),
    includeSourceCode,
    files: {} as Record<string, string>,
    structure: {
      html: [],
      css: [],
      js: [],
      cms: [],
      assets: []
    }
  }
  
  return exportData
}