const fs = require('fs');
const path = require('path');

// Import direct du module TypeScript compilé
async function testGeneration() {
  try {
    // Charger le module
    const { generateSiteStructure } = await import('./src/lib/multi-page-generator.ts');
    
    // Données de test
    const testData = {
      companyName: 'Plomberie Moderne',
      trade: 'Plomberie',
      description: 'Plomberie professionnelle et dépannage urgent à Paris et région parisienne. Intervention rapide 24h/7j.',
      ownerName: 'Jean Martin',
      email: 'contact@plomberie-moderne.fr',
      phone: '01 23 45 67 89',
      address: '123 Rue de la République',
      city: 'Paris',
      primaryColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      services: [
        {
          id: 'depannage-urgence',
          name: 'Dépannage Urgence',
          description: 'Intervention rapide 24h/7j pour tous vos problèmes de plomberie',
          detailedDescription: 'Service de dépannage disponible 24 heures sur 24, 7 jours sur 7. Nous intervenons rapidement pour résoudre tous vos problèmes de plomberie.',
          price: 'À partir de 80€'
        },
        {
          id: 'installation-sanitaire',
          name: 'Installation Sanitaire',
          description: 'Installation complète de salles de bains, cuisines et équipements sanitaires',
          detailedDescription: 'Installation complète de vos équipements sanitaires avec garantie qualité.',
          price: 'Devis gratuit'
        }
      ],
      serviceCities: ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine', 'Levallois-Perret'],
      legalInfo: {
        siret: '12345678901234',
        legalForm: 'SARL',
        capital: '10 000€',
        rcs: 'RCS Paris 123 456 789',
        address: '123 Rue de la République',
        city: 'Paris',
        postalCode: '75011'
      },
      openingHours: 'Lun-Ven 8h-18h',
      emergencyAvailable: true,
      domain: 'plomberie-moderne.fr',
      keywords: ['plomberie', 'dépannage', 'installation', 'Paris']
    };

    console.log('🔧 Génération du site...');
    const siteStructure = generateSiteStructure(testData);
    
    console.log(`✅ Génération réussie !`);
    console.log(`📄 Nombre de pages générées: ${siteStructure.pages.length}`);
    console.log(`🏠 Pages: ${siteStructure.pages.map(p => p.filename).join(', ')}`);
    
    // Créer le dossier de sortie
    const outputDir = './public/generated-sites/test-complet';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Écrire toutes les pages
    siteStructure.pages.forEach(page => {
      const filePath = path.join(outputDir, page.filename);
      fs.writeFileSync(filePath, page.content);
      console.log(`💾 ${page.filename} généré`);
    });

    console.log('🎉 TOUTES LES PAGES GÉNÉRÉES AVEC SUCCÈS !');
    console.log(`🔗 Accédez au site: http://localhost:3002/generated-sites/test-complet/`);
    
    return siteStructure;
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error);
  }
}

testGeneration();