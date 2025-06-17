const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createTestSite() {
  try {
    // Créer ou récupérer un utilisateur test
    let user = await prisma.user.findFirst({
      where: { email: 'test@awema.fr' }
    })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'test@awema.fr',
          name: 'Test Admin',
          password: 'test123'
        }
      })
    }

    // Créer ou récupérer un client test
    let client = await prisma.client.findFirst({
      where: { email: 'pierre.dubois@plomberie-test.fr' }
    })
    
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: 'Pierre Dubois',
          email: 'pierre.dubois@plomberie-test.fr',
          phone: '01 23 45 67 89',
          company: 'Plomberie Dubois',
          domain: 'plomberie-dubois.fr',
          trade: 'Plomberie',
          status: 'NOUVEAU',
          userId: user.id
        }
      })
    }

    // Créer un projet avec des données complètes pour le test
    const testFormData = {
      step1: {
        companyName: 'Plomberie Dubois',
        trade: 'Plomberie',
        description: 'Plomberie professionnelle et dépannage urgent à Paris et région parisienne. Intervention rapide 24h/7j.',
        ownerName: 'Pierre Dubois',
        email: 'pierre.dubois@plomberie-test.fr',
        phone: '01 23 45 67 89',
        address: '123 Rue de la République',
        city: 'Paris'
      },
      step2: {
        primaryColor: '#2563eb',
        secondaryColor: '#1d4ed8',
        logoUrl: 'https://via.placeholder.com/200x80/2563eb/ffffff?text=Plomberie+Dubois',
        services: [
          {
            id: 'service-depannage',
            name: 'Dépannage urgence',
            description: 'Intervention rapide 24h/7j pour tous vos problèmes de plomberie',
            detailedDescription: 'Notre service de dépannage d\'urgence est disponible 24 heures sur 24 et 7 jours sur 7. Nous intervenons rapidement pour résoudre tous vos problèmes de plomberie : fuites, canalisations bouchées, problèmes de chauffage, etc. Notre équipe expérimentée dispose de tout l\'équipement nécessaire pour diagnostiquer et réparer efficacement.',
            price: 'À partir de 80€',
            images: [
              'https://via.placeholder.com/400x300/2563eb/ffffff?text=Dépannage+1',
              'https://via.placeholder.com/400x300/1d4ed8/ffffff?text=Dépannage+2'
            ]
          },
          {
            id: 'service-installation',
            name: 'Installation sanitaire',
            description: 'Installation complète de salles de bains, cuisines et équipements sanitaires',
            detailedDescription: 'Nous réalisons l\'installation complète de vos équipements sanitaires : salles de bains, cuisines, WC, douches, baignoires, etc. De la conception à la finition, nous vous accompagnons dans votre projet avec des matériaux de qualité et un savoir-faire artisanal.',
            price: 'Devis gratuit',
            images: [
              'https://via.placeholder.com/400x300/2563eb/ffffff?text=Installation+1'
            ]
          },
          {
            id: 'service-renovation',
            name: 'Rénovation plomberie',
            description: 'Rénovation complète de vos installations de plomberie',
            detailedDescription: 'Rénovation complète de vos installations de plomberie ancienne. Nous remplaçons les canalisations vétustes, modernisons vos équipements et mettons aux normes votre installation. Travail soigné avec garantie décennale.',
            price: 'Sur devis',
            images: []
          }
        ]
      },
      step3: {
        serviceCities: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Courbevoie', 'Nanterre'],
        legalInfo: {
          siret: '12345678901234',
          vatNumber: 'FR12345678901',
          legalForm: 'SARL',
          capital: '10 000€',
          rcs: 'RCS Paris 123 456 789',
          address: '123 Rue de la République',
          city: 'Paris',
          postalCode: '75011'
        },
        openingHours: 'Lun-Ven 8h-18h, Sam 9h-12h',
        emergencyAvailable: true,
        domain: 'plomberie-dubois.fr',
        keywords: ['plomberie', 'dépannage', 'installation', 'rénovation', 'Paris', 'urgence']
      }
    }

    const project = await prisma.project.create({
      data: {
        name: 'Site Plomberie Dubois',
        status: 'COLLECTE',
        formData: JSON.stringify(testFormData),
        clientId: client.id,
        userId: user.id
      }
    })

    console.log('✅ Projet de test créé avec succès !')
    console.log(`📝 ID du projet: ${project.id}`)
    console.log(`👤 Client: ${client.company}`)
    console.log(`🔗 URL de test pour génération: http://localhost:3002/api/projects/${project.id}/generate`)
    
    return { project, client, user }
    
  } catch (error) {
    console.error('❌ Erreur lors de la création du projet de test:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestSite()