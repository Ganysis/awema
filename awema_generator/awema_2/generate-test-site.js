const { PrismaClient } = require('@prisma/client')
const { generateSiteStructure } = require('./src/lib/multi-page-generator.ts')
const fs = require('fs').promises
const path = require('path')

const prisma = new PrismaClient()

async function generateTestSite() {
  try {
    // Récupérer le projet test
    const project = await prisma.project.findFirst({
      where: { name: 'Site Plomberie Dubois' },
      include: { client: true }
    })

    if (!project) {
      console.log('❌ Projet de test non trouvé. Exécutez d\'abord test-site-generation.js')
      return
    }

    console.log('📝 Génération du site pour:', project.client.company)

    // Parser les données du formulaire
    const formData = JSON.parse(project.formData)
    
    // Construire les données pour le template
    const templateData = {
      // Données de base
      companyName: formData.step1.companyName,
      trade: formData.step1.trade,
      description: formData.step1.description,
      
      // Contact
      ownerName: formData.step1.ownerName,
      email: formData.step1.email,
      phone: formData.step1.phone,
      address: formData.step1.address,
      city: formData.step1.city,
      
      // Design
      primaryColor: formData.step2.primaryColor,
      secondaryColor: formData.step2.secondaryColor,
      logoUrl: formData.step2.logoUrl,
      
      // Services détaillés
      services: formData.step2.services,
      
      // Zones d'intervention
      serviceCities: formData.step3.serviceCities,
      
      // Informations légales
      legalInfo: formData.step3.legalInfo,
      
      // Informations supplémentaires
      openingHours: formData.step3.openingHours,
      emergencyAvailable: formData.step3.emergencyAvailable,
      
      // SEO
      domain: formData.step3.domain,
      keywords: formData.step3.keywords
    }

    console.log('🔨 Génération de la structure du site...')

    // Importer dynamiquement le générateur
    const { generateSiteStructure } = await import('./src/lib/multi-page-generator.ts')
    
    // Générer la structure complète du site multi-pages
    const siteStructure = generateSiteStructure(templateData)
    
    console.log(`📄 ${siteStructure.pages.length} pages générées:`)
    siteStructure.pages.forEach(page => {
      console.log(`   - ${page.filename} (${page.type})`)
    })

    // Créer le dossier du site
    const siteId = `site-${project.id.slice(-8)}`
    const sitesDir = path.join(process.cwd(), 'public', 'generated-sites')
    const siteDir = path.join(sitesDir, siteId)
    
    // Créer les dossiers si nécessaire
    await fs.mkdir(sitesDir, { recursive: true })
    await fs.mkdir(siteDir, { recursive: true })
    
    console.log('📁 Écriture des fichiers...')
    
    // Écrire tous les fichiers de la structure du site
    for (const page of siteStructure.pages) {
      await fs.writeFile(path.join(siteDir, page.filename), page.content)
      console.log(`   ✅ ${page.filename}`)
    }
    
    // Mettre à jour le projet
    await prisma.project.update({
      where: { id: project.id },
      data: {
        status: 'PRET',
        siteData: JSON.stringify(templateData),
        siteFolder: siteId,
        previewUrl: `http://localhost:3002/generated-sites/${siteId}/index.html`,
        domain: templateData.domain
      }
    })

    console.log('')
    console.log('🎉 Site généré avec succès !')
    console.log(`📂 Dossier: ${siteDir}`)
    console.log(`🔗 URL d'accès: http://localhost:3002/generated-sites/${siteId}/index.html`)
    console.log('')
    console.log('📋 Pages disponibles:')
    siteStructure.pages.forEach(page => {
      console.log(`   🔗 http://localhost:3002/generated-sites/${siteId}/${page.filename}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error)
  } finally {
    await prisma.$disconnect()
  }
}

generateTestSite()