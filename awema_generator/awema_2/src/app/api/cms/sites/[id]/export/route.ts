import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateCMSBundle, createSiteExport } from '@/lib/cms-export/cms-bundle'
import JSZip from 'jszip'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siteId = params.id
    const body = await request.json()
    const { includeSourceCode = false, exportType = 'full' } = body

    // Récupérer les données du site
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId },
      include: {
        project: {
          include: {
            client: true
          }
        },
        pages: {
          include: {
            blocks: {
              orderBy: { order: 'asc' }
            }
          }
        },
        articles: {
          where: { status: 'PUBLISHED' }
        }
      }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    const templateData = JSON.parse(site.templateData || '{}')
    
    // Créer le ZIP d'export
    const zip = new JSZip()
    
    // 1. Ajouter les fichiers HTML du site
    await addSiteFiles(zip, site, templateData)
    
    // 2. Ajouter le CMS intégré
    if (exportType === 'full' || exportType === 'cms-only') {
      await addCMSFiles(zip, site, templateData)
    }
    
    // 3. Ajouter les assets et médias
    if (exportType === 'full') {
      await addAssetFiles(zip, site)
    }
    
    // 4. Ajouter le code source si demandé
    if (includeSourceCode) {
      await addSourceCode(zip, site)
    }
    
    // 5. Ajouter les fichiers de configuration
    await addConfigFiles(zip, site, templateData)

    // Générer le ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })
    
    // Créer un nom de fichier unique
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const filename = `${site.domain}-export-${timestamp}.zip`

    // Retourner le fichier ZIP
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': zipBuffer.length.toString()
      }
    })

  } catch (error) {
    console.error('Erreur lors de l\'export du site:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'export du site' },
      { status: 500 }
    )
  }
}

async function addSiteFiles(zip: JSZip, site: any, templateData: any) {
  const siteFolder = zip.folder('site')!
  
  // Générer la page d'accueil
  const homeHtml = await generatePageHTML(site, 'home', templateData)
  siteFolder.file('index.html', homeHtml)
  
  // Générer la page de contact
  const contactHtml = await generatePageHTML(site, 'contact', templateData)
  siteFolder.file('contact.html', contactHtml)
  
  // Générer les pages de services
  const services = templateData.services || []
  for (const service of services) {
    const serviceHtml = await generatePageHTML(site, 'service', templateData, service)
    siteFolder.file(`service-${service.id}.html`, serviceHtml)
  }
  
  // Générer les pages personnalisées
  for (const page of site.pages || []) {
    if (page.blocks && page.blocks.length > 0) {
      const pageHtml = await generateCustomPageHTML(site, page, templateData)
      siteFolder.file(`${page.pageSlug || page.id}.html`, pageHtml)
    }
  }
  
  // Générer les mentions légales
  const legalHtml = generateLegalPage(templateData)
  siteFolder.file('mentions-legales.html', legalHtml)
  
  // Ajouter le CSS global
  const globalCSS = generateGlobalCSS(templateData)
  siteFolder.file('styles.css', globalCSS)
}

async function addCMSFiles(zip: JSZip, site: any, templateData: any) {
  const cmsFolder = zip.folder('cms')!
  
  // Générer le bundle CMS
  const cmsBundle = generateCMSBundle({
    companyName: templateData.companyName,
    domain: site.domain,
    email: templateData.email,
    phone: templateData.phone
  })
  
  // Ajouter tous les fichiers du CMS
  Object.entries(cmsBundle).forEach(([path, content]) => {
    const filePath = path.replace('cms/', '')
    cmsFolder.file(filePath, content)
  })
  
  // Ajouter les articles existants
  const articlesData = site.articles.map((article: any) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    status: article.status,
    publishedAt: article.publishedAt,
    createdAt: article.createdAt
  }))
  
  cmsFolder.file('data/articles.json', JSON.stringify(articlesData, null, 2))
}

async function addAssetFiles(zip: JSZip, site: any) {
  const assetsFolder = zip.folder('assets')!
  
  // Ajouter des images par défaut
  assetsFolder.folder('images')
  assetsFolder.folder('css')
  assetsFolder.folder('js')
  
  // Pour une vraie implémentation, on ajouterait ici les vrais fichiers média
  assetsFolder.file('README.md', `# Assets
  
Placez ici vos images, fichiers CSS et JavaScript personnalisés.

## Structure recommandée :
- \`images/\` : Photos, logos, icônes
- \`css/\` : Feuilles de style personnalisées  
- \`js/\` : Scripts JavaScript personnalisés
`)
}

async function addSourceCode(zip: JSZip, site: any) {
  const sourceFolder = zip.folder('source')!
  
  sourceFolder.file('README.md', `# Code Source
  
Ce dossier contient le code source du site pour les développeurs.

## Technologies utilisées :
- HTML5 / CSS3
- JavaScript ES6+
- Framework CSS : Tailwind CSS
- CMS : Système intégré basé sur Alpine.js

## Modification du design :
Les modifications de design doivent être effectuées dans les templates et recompilées.
Contactez votre développeur pour les modifications avancées.
`)
  
  // Ajouter les templates sources (version simplifiée)
  sourceFolder.file('template-config.json', JSON.stringify({
    templateId: site.homeTemplate,
    generatedAt: new Date().toISOString(),
    customCSS: site.customCSS || '',
    customJS: site.customJS || ''
  }, null, 2))
}

async function addConfigFiles(zip: JSZip, site: any, templateData: any) {
  // Fichier de configuration principal
  zip.file('config.json', JSON.stringify({
    site: {
      name: templateData.companyName,
      domain: site.domain,
      generatedAt: new Date().toISOString(),
      version: '1.0.0'
    },
    cms: {
      enabled: true,
      version: '1.0.0',
      features: ['articles'],
      access: {
        username: site.clientUsername,
        // Ne pas exposer le mot de passe en clair
        passwordHash: '***'
      }
    },
    contact: {
      email: templateData.email,
      phone: templateData.phone,
      address: templateData.address
    },
    seo: {
      title: `${templateData.companyName} - ${templateData.trade || 'Professionnel'}`,
      description: templateData.description,
      keywords: templateData.keywords || []
    }
  }, null, 2))
  
  // Instructions d'installation
  zip.file('README.md', `# ${templateData.companyName} - Site Web

## Installation

1. **Déploiement simple :**
   - Décompressez ce fichier ZIP
   - Uploadez le contenu du dossier \`site/\` sur votre serveur web
   - Votre site est en ligne !

2. **Avec CMS :**
   - Uploadez également le dossier \`cms/\`
   - Accédez à \`votresite.com/cms/\` pour gérer vos contenus

## Accès CMS

- **URL :** \`https://${site.domain}/cms/\`
- **Identifiants :** Fournis séparément par votre webmaster

## Structure des fichiers

\`\`\`
site/                 # Votre site web
├── index.html        # Page d'accueil
├── contact.html      # Page de contact
├── service-*.html    # Pages de services
└── styles.css        # Styles

cms/                  # Interface de gestion
├── index.html        # Interface CMS
├── config.json       # Configuration
└── data/            # Données des articles

assets/              # Médias (images, etc.)
source/              # Code source (développeurs)
\`\`\`

## Support

Pour toute question, contactez votre webmaster.

---
*Site généré avec Awema Generator - ${new Date().toLocaleDateString('fr-FR')}*
`)
  
  // Fichier .htaccess pour Apache
  zip.file('.htaccess', `# Configuration Apache pour ${site.domain}

# Redirection vers HTTPS (recommandé)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Pages d'erreur personnalisées
ErrorDocument 404 /404.html

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache des ressources statiques
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>`)
}

// Fonctions helper pour générer le HTML
async function generatePageHTML(site: any, pageType: string, templateData: any, serviceData?: any): Promise<string> {
  // Ici on utiliserait les vrais générateurs de templates
  // Pour la démo, on retourne du HTML basique
  
  const title = pageType === 'home' 
    ? `${templateData.companyName} - Accueil`
    : pageType === 'contact'
    ? `Contact - ${templateData.companyName}`
    : `${serviceData?.name} - ${templateData.companyName}`
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>${templateData.companyName}</h1>
        <nav>
            <a href="index.html">Accueil</a>
            <a href="contact.html">Contact</a>
        </nav>
    </header>
    
    <main>
        ${pageType === 'home' ? generateHomeContent(templateData) : 
          pageType === 'contact' ? generateContactContent(templateData) :
          generateServiceContent(serviceData, templateData)}
    </main>
    
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${templateData.companyName}</p>
    </footer>
</body>
</html>`
}

async function generateCustomPageHTML(site: any, page: any, templateData: any): Promise<string> {
  // Générer le HTML à partir des blocs de la page
  let blocksHTML = ''
  
  for (const block of page.blocks) {
    const config = JSON.parse(block.config || '{}')
    
    // Générer le HTML selon le type de bloc
    switch (block.blockType) {
      case 'hero-standard':
        blocksHTML += `
          <section class="hero">
            <h1>${config.title || 'Titre'}</h1>
            <p>${config.subtitle || 'Sous-titre'}</p>
            <a href="${config.buttonPrimary?.href || '#'}" class="btn-primary">
              ${config.buttonPrimary?.text || 'Bouton'}
            </a>
          </section>
        `
        break
      case 'text-content':
        blocksHTML += `
          <section class="content">
            <h2>${config.title || 'Titre'}</h2>
            <div>${config.content || 'Contenu'}</div>
          </section>
        `
        break
      // Ajouter d'autres types de blocs...
    }
  }
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} - ${templateData.companyName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>${templateData.companyName}</h1>
        <nav>
            <a href="index.html">Accueil</a>
            <a href="contact.html">Contact</a>
        </nav>
    </header>
    
    <main>
        ${blocksHTML}
    </main>
    
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${templateData.companyName}</p>
    </footer>
</body>
</html>`
}

function generateHomeContent(templateData: any): string {
  return `
    <section class="hero">
      <h1>Bienvenue chez ${templateData.companyName}</h1>
      <p>${templateData.description}</p>
    </section>
    
    <section class="services">
      <h2>Nos Services</h2>
      <div class="services-grid">
        ${(templateData.services || []).map((service: any) => `
          <div class="service-card">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <a href="service-${service.id}.html">En savoir plus</a>
          </div>
        `).join('')}
      </div>
    </section>
  `
}

function generateContactContent(templateData: any): string {
  return `
    <section class="contact">
      <h1>Contactez-nous</h1>
      <div class="contact-info">
        <p><strong>Téléphone :</strong> ${templateData.phone}</p>
        <p><strong>Email :</strong> ${templateData.email}</p>
        <p><strong>Adresse :</strong> ${templateData.address}</p>
      </div>
      
      <form class="contact-form">
        <input type="text" placeholder="Votre nom" required>
        <input type="email" placeholder="Votre email" required>
        <textarea placeholder="Votre message" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  `
}

function generateServiceContent(serviceData: any, templateData: any): string {
  return `
    <section class="service">
      <h1>${serviceData.name}</h1>
      <p>${serviceData.description}</p>
      
      <div class="service-details">
        <h2>Détails du service</h2>
        <p>Service professionnel de ${serviceData.name.toLowerCase()} proposé par ${templateData.companyName}.</p>
        
        <h3>Pourquoi nous choisir ?</h3>
        <ul>
          <li>Expertise professionnelle</li>
          <li>Devis gratuit</li>
          <li>Intervention rapide</li>
          <li>Garantie travaux</li>
        </ul>
      </div>
      
      <a href="contact.html" class="btn-primary">Demander un devis</a>
    </section>
  `
}

function generateLegalPage(templateData: any): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mentions légales - ${templateData.companyName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>${templateData.companyName}</h1>
        <nav>
            <a href="index.html">Accueil</a>
            <a href="contact.html">Contact</a>
        </nav>
    </header>
    
    <main>
        <h1>Mentions légales</h1>
        
        <h2>Éditeur du site</h2>
        <p><strong>${templateData.companyName}</strong><br>
        ${templateData.address}<br>
        Téléphone : ${templateData.phone}<br>
        Email : ${templateData.email}</p>
        
        <h2>Hébergement</h2>
        <p>Site hébergé par l'hébergeur choisi par le client.</p>
        
        <h2>Propriété intellectuelle</h2>
        <p>Le contenu de ce site est la propriété de ${templateData.companyName}.</p>
        
        <h2>Données personnelles</h2>
        <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
    </main>
    
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${templateData.companyName}</p>
    </footer>
</body>
</html>`
}

function generateGlobalCSS(templateData: any): string {
  return `/* Styles globaux pour ${templateData.companyName} */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: ${templateData.primaryColor || '#3b82f6'};
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

header h1 {
    font-size: 1.8rem;
    font-weight: 700;
}

nav {
    margin-top: 0.5rem;
}

nav a {
    color: white;
    text-decoration: none;
    margin-right: 2rem;
    font-weight: 500;
}

nav a:hover {
    text-decoration: underline;
}

main {
    min-height: 80vh;
    padding: 2rem 0;
}

.hero {
    text-align: center;
    padding: 4rem 0;
    background: linear-gradient(135deg, ${templateData.primaryColor || '#3b82f6'}, ${templateData.secondaryColor || '#1e40af'});
    color: white;
    margin-bottom: 3rem;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 900;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.btn-primary {
    background: ${templateData.secondaryColor || '#1e40af'};
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: ${templateData.primaryColor || '#3b82f6'};
    transform: translateY(-2px);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
}

.contact-form {
    max-width: 600px;
    margin: 2rem 0;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
}

.contact-form button {
    background: ${templateData.primaryColor || '#3b82f6'};
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.contact-form button:hover {
    background: ${templateData.secondaryColor || '#1e40af'};
}

footer {
    background: #f8f9fa;
    padding: 2rem 0;
    text-align: center;
    border-top: 1px solid #dee2e6;
    margin-top: 4rem;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
    }
    
    nav a {
        display: block;
        margin: 0.5rem 0;
    }
}`
}