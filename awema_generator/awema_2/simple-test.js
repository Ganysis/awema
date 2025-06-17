const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createSimpleTest() {
  try {
    // Récupérer ou créer l'utilisateur
    let user = await prisma.user.findFirst({
      where: { email: 'admin@awema.fr' }
    })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@awema.fr',
          name: 'Admin AWEMA',
          password: 'admin123'
        }
      })
    }

    // Créer un nouveau client unique
    const timestamp = Date.now()
    const client = await prisma.client.create({
      data: {
        name: 'Jean Électricien',
        email: `jean.electricien.${timestamp}@test.fr`,
        phone: '01 45 67 89 12',
        company: 'Électricité Jean Pro',
        domain: 'electricite-jean-pro.fr',
        trade: 'Électricité',
        status: 'NOUVEAU',
        userId: user.id
      }
    })

    // Données de test avec IDs simples
    const testFormData = {
      step1: {
        companyName: 'Électricité Jean Pro',
        trade: 'Électricité',
        description: 'Électricien professionnel à Paris. Installation, dépannage et rénovation électrique.',
        ownerName: 'Jean Électricien',
        email: `jean.electricien.${timestamp}@test.fr`,
        phone: '01 45 67 89 12',
        address: '789 Rue de l\'Électricité',
        city: 'Paris'
      },
      step2: {
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        logoUrl: '',
        services: [
          {
            id: 'depannage',
            name: 'Dépannage Électrique',
            description: 'Intervention rapide pour tous vos problèmes électriques',
            detailedDescription: 'Service de dépannage électrique 24h/7j. Panne de courant, court-circuit, disjoncteur qui saute... Nous intervenons rapidement.',
            price: 'À partir de 60€',
            images: []
          },
          {
            id: 'installation',
            name: 'Installation Électrique',
            description: 'Installation complète de vos équipements électriques',
            detailedDescription: 'Installation complète : tableaux électriques, prises, éclairage, chauffage électrique. Travaux aux normes avec garantie.',
            price: 'Devis gratuit',
            images: []
          }
        ]
      },
      step3: {
        serviceCities: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine'],
        legalInfo: {
          siret: '11223344556677',
          vatNumber: 'FR11223344556',
          legalForm: 'Auto-entrepreneur',
          capital: '',
          rcs: '',
          address: '789 Rue de l\'Électricité',
          city: 'Paris',
          postalCode: '75015'
        },
        openingHours: 'Lun-Ven 8h-18h',
        emergencyAvailable: true,
        domain: 'electricite-jean-pro.fr',
        keywords: ['électricité', 'électricien', 'dépannage', 'installation', 'Paris']
      }
    }

    const project = await prisma.project.create({
      data: {
        name: `Électricité Jean Pro - ${timestamp}`,
        status: 'COLLECTE',
        formData: JSON.stringify(testFormData),
        clientId: client.id,
        userId: user.id
      }
    })

    console.log('✅ Projet de test créé !')
    console.log(`📝 ID: ${project.id}`)
    console.log(`🏢 Entreprise: ${client.company}`)
    
    // Générer immédiatement le site
    console.log('🚀 Génération du site...')
    
    const http = require('http')
    const data = JSON.stringify({})
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/projects/${project.id}/generate`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    const req = http.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => body += chunk)
      res.on('end', () => {
        try {
          const result = JSON.parse(body)
          if (result.success) {
            console.log('🎉 Site généré avec succès !')
            console.log(`📂 Dossier: public/generated-sites/${result.siteId}`)
            console.log('')
            console.log('📄 Pages générées:')
            console.log(`   🏠 http://localhost:3000/generated-sites/${result.siteId}/index.html`)
            console.log(`   📞 http://localhost:3000/generated-sites/${result.siteId}/contact.html`)
            console.log(`   ⚖️ http://localhost:3000/generated-sites/${result.siteId}/mentions-legales.html`)
            console.log(`   ⚡ http://localhost:3000/generated-sites/${result.siteId}/service-depannage.html`)
            console.log(`   🔧 http://localhost:3000/generated-sites/${result.siteId}/service-installation.html`)
            console.log('')
            console.log('🏙️ Pages SEO locales:')
            console.log(`   📍 http://localhost:3000/generated-sites/${result.siteId}/depannage-paris.html`)
            console.log(`   📍 http://localhost:3000/generated-sites/${result.siteId}/installation-paris.html`)
            console.log('   ... et toutes les autres villes')
          } else {
            console.log('❌ Erreur:', result.error)
          }
        } catch (e) {
          console.log('❌ Erreur de parsing:', e.message)
          console.log('Raw response:', body)
        }
      })
    })

    req.on('error', (e) => {
      console.error(`❌ Erreur de requête: ${e.message}`)
    })

    req.write(data)
    req.end()
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSimpleTest()