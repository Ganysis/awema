import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateHTML, TemplateData } from '@/lib/template'
import { promises as fs } from 'fs'
import path from 'path'
import archiver from 'archiver'
import { Readable } from 'stream'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params

    // Récupérer le projet avec les données
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        client: true
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    if (!project.siteFolder) {
      return NextResponse.json(
        { error: 'Aucun site généré pour ce projet' },
        { status: 400 }
      )
    }

    // Parser les données du formulaire
    const formData = project.formData ? JSON.parse(project.formData) : {}
    
    // Construire les données pour le template avec le bon domaine
    const templateData: TemplateData = {
      // Données de base
      companyName: formData.step1?.companyName || project.client.company,
      trade: formData.step1?.trade || project.client.trade || 'Services',
      description: formData.step1?.description || `${project.client.company} - Services professionnels`,
      
      // Contact
      ownerName: formData.step1?.ownerName || project.client.name,
      email: formData.step1?.email || project.client.email,
      phone: formData.step1?.phone || project.client.phone || '01 23 45 67 89',
      address: formData.step1?.address || '',
      city: formData.step1?.city || '',
      
      // Design
      primaryColor: formData.step2?.primaryColor || '#2563eb',
      secondaryColor: formData.step2?.secondaryColor || '#1d4ed8',
      logoUrl: formData.step2?.logoUrl,
      
      // Services
      services: formData.step2?.services || [
        {
          name: 'Service principal',
          description: 'Description de votre service principal',
          price: 'Sur devis'
        }
      ],
      
      // Informations supplémentaires
      openingHours: formData.step3?.openingHours || 'Lun-Ven 9h-18h',
      emergencyAvailable: formData.step3?.emergencyAvailable || false,
      
      // SEO avec le vrai domaine
      domain: formData.step3?.domain || project.client.domain || 'exemple.fr',
      keywords: formData.step3?.keywords || [
        formData.step1?.trade || 'service',
        formData.step1?.city || 'France',
        'professionnel',
        'qualité'
      ].filter(Boolean)
    }

    // Générer le HTML avec les bonnes URLs
    const siteHTML = generateHTML(templateData)
    
    // Générer le guide de déploiement O2Switch
    const deploymentGuide = generateO2SwitchGuide(templateData.domain, project.client.company)
    
    // Créer un ZIP en mémoire
    const archive = archiver('zip', { zlib: { level: 9 } })
    const chunks: Buffer[] = []

    // Collecter les chunks du stream
    archive.on('data', (chunk) => chunks.push(chunk))
    
    return new Promise((resolve, reject) => {
      archive.on('end', () => {
        const buffer = Buffer.concat(chunks)
        
        resolve(new NextResponse(buffer, {
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${project.siteFolder}-export.zip"`,
            'Content-Length': buffer.length.toString()
          }
        }))
      })

      archive.on('error', (err) => {
        console.error('Erreur lors de la création du ZIP:', err)
        reject(new NextResponse(
          JSON.stringify({ error: 'Erreur lors de la création de l\'export' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        ))
      })

      // Ajouter les fichiers au ZIP
      archive.append(siteHTML, { name: 'index.html' })
      archive.append(deploymentGuide, { name: 'DEPLOYMENT_O2SWITCH.md' })
      archive.append(generateHtaccess(templateData.domain), { name: '.htaccess' })
      
      // Finaliser l'archive
      archive.finalize()
    })

  } catch (error) {
    console.error('Erreur lors de l\'export:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'export' },
      { status: 500 }
    )
  }
}

function generateO2SwitchGuide(domain: string, companyName: string): string {
  return `# Guide de déploiement O2Switch - ${companyName}

## 📁 Fichiers inclus dans cet export

- **index.html** : Page principale du site
- **.htaccess** : Configuration Apache pour ${domain}
- **DEPLOYMENT_O2SWITCH.md** : Ce guide

## 🚀 Étapes de déploiement sur O2Switch

### 1. Connexion à votre espace client O2Switch
- Connectez-vous à votre espace client : https://www.o2switch.fr/client/
- Accédez au cPanel de votre hébergement

### 2. Configuration du domaine ${domain}
- Dans cPanel, allez dans "Domaines" > "Sous-domaines" ou "Domaines supplémentaires"
- Ajoutez le domaine ${domain} s'il n'est pas déjà configuré
- Pointez-le vers le dossier public_html/${domain} (ou public_html si c'est le domaine principal)

### 3. Upload des fichiers
Via le gestionnaire de fichiers cPanel :
1. Naviguez vers le dossier public_html/${domain}/ (ou public_html/ pour le domaine principal)
2. Uploadez tous les fichiers de cet export :
   - \`index.html\` : à la racine
   - \`.htaccess\` : à la racine (fichier de configuration Apache)

Via FTP (alternative) :
1. Utilisez les identifiants FTP fournis par O2Switch
2. Connectez-vous au serveur
3. Naviguez vers /public_html/${domain}/
4. Uploadez les fichiers

### 4. Vérification
- Visitez https://${domain} dans votre navigateur
- Le site devrait s'afficher correctement
- Vérifiez que toutes les sections fonctionnent

### 5. Configuration SSL (HTTPS)
- Dans cPanel, allez dans "Sécurité" > "SSL/TLS"
- Activez le certificat SSL gratuit Let's Encrypt pour ${domain}
- Forcez la redirection HTTPS (incluse dans le fichier .htaccess)

## ⚙️ Fichier .htaccess inclus

Le fichier .htaccess configure automatiquement :
- Redirection HTTPS forcée
- Compression Gzip
- Cache des ressources statiques
- Sécurité renforcée

## 📧 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs d'erreur dans cPanel
2. Contactez le support O2Switch : https://www.o2switch.fr/support/
3. Contactez AWEMA pour l'assistance technique

## ✅ Checklist de déploiement

- [ ] Domaine ${domain} configuré dans O2Switch
- [ ] Fichiers uploadés dans le bon dossier
- [ ] Site accessible via https://${domain}
- [ ] SSL/HTTPS activé et fonctionnel
- [ ] Formulaire de contact testé
- [ ] Affichage mobile vérifié

---

🎉 **Félicitations !** Votre site ${companyName} est maintenant en ligne !

*Site généré par AWEMA - Générateur de sites web professionnel*
`
}

function generateHtaccess(domain: string): string {
  return `# Configuration Apache pour ${domain}
# Généré par AWEMA

# Redirection HTTPS forcée
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Sécurité
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Compression Gzip
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
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/ico "access plus 1 month"
    ExpiresByType image/icon "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Page d'erreur personnalisée
ErrorDocument 404 /index.html

# Indexation
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Redirection www (décommentez si nécessaire)
    # RewriteCond %{HTTP_HOST} ^www\\.${domain}$
    # RewriteRule ^(.*)$ https://${domain}/$1 [R=301,L]
    
    # Gestion des URLs propres (si extension future)
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^([^.]+)$ $1.html [NC,L]
</IfModule>`
}