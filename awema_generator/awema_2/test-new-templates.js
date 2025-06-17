const http = require('http');

// Test des nouveaux templates
const testData = {
  templateId: "plombier-corporate-elite",
  testData: {
    companyName: "PlombPro Elite",
    category: "plombier",
    description: "Plombier professionnel de confiance",
    ownerName: "Jean Dupont",
    email: "contact@plombpro.fr",
    phone: "01 42 00 00 00",
    address: "123 Rue de la Plomberie",
    services: [
      {
        id: "depannage",
        name: "Dépannage Urgence",
        description: "Intervention 24h/7j"
      },
      {
        id: "installation",
        name: "Installation Sanitaire", 
        description: "Salle de bain complète"
      },
      {
        id: "renovation",
        name: "Rénovation Plomberie",
        description: "Rénovation complète"
      }
    ],
    zones: ["Paris", "Boulogne-Billancourt", "Neuilly-sur-Seine"]
  }
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/templates/preview-ultra-pro',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🔧 Test du template Plombier Corporate Elite...');

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('✅ Template généré avec succès !');
        console.log('📄 URL de preview:', `http://localhost:3000${response.previewUrl}`);
        console.log('🎯 Template ID:', response.templateId);
        
        // Test du template chauffagiste maintenant
        setTimeout(() => {
          testChauffagiste();
        }, 1000);
      } else {
        console.error('❌ Erreur:', response.error);
      }
    } catch (e) {
      console.error('❌ Erreur parsing JSON:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Erreur requête:', e.message);
});

req.write(postData);
req.end();

function testChauffagiste() {
  const chauffagisteData = {
    templateId: "chauffagiste-premium-pro",
    testData: {
      companyName: "ThermoExpert Pro",
      category: "chauffagiste", 
      description: "Spécialiste pompe à chaleur et rénovation énergétique",
      ownerName: "Pierre Martin",
      email: "contact@thermoexpert.fr",
      phone: "01 45 00 00 00",
      address: "456 Avenue du Chauffage",
      services: [
        {
          id: "pompe-chaleur",
          name: "Pompe à Chaleur",
          description: "Installation PAC air/eau"
        },
        {
          id: "chaudiere",
          name: "Chaudière Gaz",
          description: "Installation chaudière haute performance"
        },
        {
          id: "climatisation",
          name: "Climatisation",
          description: "Clim réversible multisplit"
        }
      ],
      zones: ["Paris", "Versailles", "Saint-Cloud", "Boulogne"]
    }
  };

  const postData2 = JSON.stringify(chauffagisteData);
  
  const options2 = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/templates/preview-ultra-pro',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData2)
    }
  };

  console.log('\n🔥 Test du template Chauffagiste Premium Pro...');

  const req2 = http.request(options2, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.success) {
          console.log('✅ Template chauffagiste généré avec succès !');
          console.log('📄 URL de preview:', `http://localhost:3000${response.previewUrl}`);
          console.log('🎯 Template ID:', response.templateId);
          console.log('\n🎉 Tous les templates testés avec succès !');
        } else {
          console.error('❌ Erreur chauffagiste:', response.error);
        }
      } catch (e) {
        console.error('❌ Erreur parsing JSON chauffagiste:', e);
        console.log('Raw response:', data);
      }
    });
  });

  req2.on('error', (e) => {
    console.error('❌ Erreur requête chauffagiste:', e.message);
  });

  req2.write(postData2);
  req2.end();
}