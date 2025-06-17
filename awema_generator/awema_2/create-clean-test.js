const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createCleanTestSite() {
  try {
    // Supprimer les anciens projets de test
    await prisma.project.deleteMany({
      where: { name: { contains: 'Test' } }
    })
    
    await prisma.client.deleteMany({
      where: { email: { contains: 'test' } }
    })

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

    // Créer un nouveau client
    const client = await prisma.client.create({
      data: {
        name: 'Marie Martin',
        email: 'marie.martin@coiffure-test.fr',
        phone: '06 12 34 56 78',
        company: 'Salon Marie Coiffure',
        domain: 'salon-marie-coiffure.fr',
        trade: 'Coiffure',
        status: 'NOUVEAU',
        userId: user.id
      }
    })

    // Données de test perfectionnées avec IDs simples
    const testFormData = {
      step1: {
        companyName: 'Salon Marie Coiffure',
        trade: 'Coiffure',
        description: 'Salon de coiffure professionnel à Paris. Coupe, coloration, soins capillaires pour femmes, hommes et enfants.',
        ownerName: 'Marie Martin',
        email: 'marie.martin@coiffure-test.fr',
        phone: '06 12 34 56 78',
        address: '456 Avenue des Champs',
        city: 'Paris'
      },
      step2: {
        primaryColor: '#d946ef',
        secondaryColor: '#c026d3',
        logoUrl: 'https://via.placeholder.com/200x80/d946ef/ffffff?text=Marie+Coiffure',
        services: [
          {
            id: 'coupe-femme',
            name: 'Coupe Femme',
            description: 'Coupe et brushing personnalisés selon votre style',
            detailedDescription: 'Notre service de coupe femme allie technique et créativité. Nous analysons votre visage, vos cheveux et votre style de vie pour vous proposer la coupe qui vous correspond. Shampoing, coupe et brushing inclus.',
            price: 'À partir de 45€',
            images: [
              'https://via.placeholder.com/400x300/d946ef/ffffff?text=Coupe+Femme+1',
              'https://via.placeholder.com/400x300/c026d3/ffffff?text=Coupe+Femme+2'
            ]
          },
          {
            id: 'coloration',
            name: 'Coloration',
            description: 'Colorations et mèches sur mesure',
            detailedDescription: 'Transformez votre look avec nos colorations professionnelles. Nous utilisons des produits de qualité pour des couleurs éclatantes et durables. Conseil couleur personnalisé inclus.',
            price: 'À partir de 60€',
            images: [
              'https://via.placeholder.com/400x300/d946ef/ffffff?text=Coloration+1'
            ]
          },
          {
            id: 'soins-cheveux',
            name: 'Soins Cheveux',
            description: 'Soins réparateurs et nutritifs pour tous types de cheveux',
            detailedDescription: 'Redonnez vie à vos cheveux avec nos soins professionnels. Masques, traitements kératine, soins restructurants... Nous avons le soin adapté à vos besoins.',
            price: 'À partir de 25€',
            images: []
          }
        ]
      },
      step3: {
        serviceCities: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret'],
        legalInfo: {
          siret: '98765432109876',
          vatNumber: 'FR98765432109',
          legalForm: 'EURL',
          capital: '5 000€',
          rcs: 'RCS Paris 987 654 321',
          address: '456 Avenue des Champs',
          city: 'Paris',
          postalCode: '75008'
        },
        openingHours: 'Mar-Sam 9h-19h',
        emergencyAvailable: false,
        domain: 'salon-marie-coiffure.fr',
        keywords: ['coiffure', 'coupe', 'coloration', 'soins', 'Paris', 'salon']
      }
    }

    const project = await prisma.project.create({
      data: {
        name: 'Salon Marie Coiffure - Test',
        status: 'COLLECTE',
        formData: JSON.stringify(testFormData),
        clientId: client.id,
        userId: user.id
      }
    })

    console.log('✅ Nouveau projet de test créé !')
    console.log(`📝 ID du projet: ${project.id}`)
    console.log(`👤 Client: ${client.company}`)
    console.log(`🎨 Secteur: ${client.trade}`)
    console.log('')
    console.log('🚀 Pour tester la génération:')
    console.log(`node -e "
const http = require('http');
const data = JSON.stringify({});
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/projects/${project.id}/generate',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
};
const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const result = JSON.parse(body);
    console.log('Result:', result);
    console.log('🔗 Site généré dans: public/generated-sites/' + result.siteId);
  });
});
req.write(data);
req.end();
"`)
    
    return { project, client, user }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createCleanTestSite()