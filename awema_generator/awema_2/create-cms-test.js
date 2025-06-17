const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createCMSTest() {
  try {
    // Trouver un projet existant prêt
    const project = await prisma.project.findFirst({
      where: { 
        status: 'PRET',
        siteInstance: null
      },
      include: { client: true }
    })

    if (!project) {
      console.log('❌ Aucun projet prêt trouvé sans CMS')
      console.log('📝 Projets disponibles:')
      const allProjects = await prisma.project.findMany({
        include: { client: true }
      })
      allProjects.forEach(p => {
        console.log(`   - ${p.name} (${p.status}) - ${p.client.company}`)
      })
      return
    }

    console.log(`✅ Projet trouvé: ${project.name} - ${project.client.company}`)

    // Créer l'instance CMS
    const hashedPassword = Buffer.from('admin123').toString('base64')
    
    const siteInstance = await prisma.siteInstance.create({
      data: {
        projectId: project.id,
        domain: project.domain || 'test-cms.local',
        clientUsername: project.client.email,
        clientPassword: hashedPassword,
        templateData: project.siteData || '{}',
        cmsSettings: JSON.stringify({
          modules: {
            articles: true,
            pages: true,
            media: true,
            seo: true
          },
          permissions: {
            canEditTemplate: false,
            canCreatePages: true,
            canEditSEO: true
          }
        }),
        isLive: true
      }
    })

    // Mettre à jour le projet
    await prisma.project.update({
      where: { id: project.id },
      data: { status: 'LIVRE' }
    })

    console.log('🎉 Instance CMS créée avec succès !')
    console.log(`📂 Site ID: ${siteInstance.id}`)
    console.log(`🌐 Domaine: ${siteInstance.domain}`)
    console.log(`👤 Username: ${siteInstance.clientUsername}`)
    console.log(`🔑 Password: admin123`)
    console.log('')
    console.log('🔗 URLs de test:')
    console.log(`   📊 Dashboard CMS: http://localhost:3000/dashboard/cms`)
    console.log(`   🎨 Éditeur: http://localhost:3000/dashboard/cms/sites/${siteInstance.id}/editor`)
    console.log(`   👁️ Aperçu: http://localhost:3000/api/cms/sites/${siteInstance.id}/preview`)

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createCMSTest()