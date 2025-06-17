const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    
    req.end();
  });
}

async function testCompleteWorkflow() {
  try {
    console.log('🚀 TEST COMPLET : Créer un client électricien avec formulaire + génération Ultra Pro\n');
    
    // 1. Créer un nouveau client
    console.log('📝 Étape 1: Création du client...');
    
    const timestamp = Date.now();
    const clientData = {
      name: 'Jean-Pierre Voltaire',
      company: 'Électricité Voltaire Pro',
      email: `jp.${timestamp}@voltaire-elec.fr`,
      phone: '01 42 85 96 37',
      trade: 'électricien',
      domain: `voltaire-elec-${timestamp}.fr`
    };
    
    const createClientOptions = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/clients',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const clientResponse = await makeRequest(createClientOptions, clientData);
    
    console.log('Debug - Client response:', clientResponse.status, JSON.stringify(clientResponse.data, null, 2));
    
    if (clientResponse.status !== 201 && clientResponse.status !== 200) {
      console.log('❌ Erreur création client:', clientResponse.data);
      return;
    }
    
    const client = clientResponse.data.client || clientResponse.data;
    console.log(`✅ Client créé: ${client.name} (${client.company})`);
    console.log(`   📧 Email: ${client.email}`);
    console.log(`   📞 Téléphone: ${client.phone}`);
    console.log(`   ⚡ Métier: ${client.trade}`);
    console.log(`   🌐 Domaine: ${client.domain}`);
    
    // 2. Créer un formulaire pour ce client  
    console.log('\\n📋 Étape 2: Création du formulaire client...');
    
    const createFormOptions = {
      hostname: 'localhost',
      port: 3001,
      path: `/api/clients/${client.id}/send-form`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const formResponse = await makeRequest(createFormOptions, {});
    
    console.log('Debug - Form response:', formResponse.status, JSON.stringify(formResponse.data, null, 2));
    
    if (formResponse.status !== 200) {
      console.log('❌ Erreur création formulaire:', formResponse.data);
      return;
    }
    
    const formToken = formResponse.data.token;
    console.log(`✅ Formulaire créé avec token: ${formToken}`);
    
    // 3. Simuler le remplissage du formulaire complet
    console.log('\\n📝 Étape 3: Remplissage du formulaire client...');
    
    const formData = {
      step1: {
        companyName: 'Électricité Voltaire Pro',
        ownerName: 'Jean-Pierre Voltaire',
        trade: 'électricien',
        description: 'Électricien professionnel à Paris, spécialisé dans les installations modernes et le dépannage urgent 24h/7j',
        email: 'jp@voltaire-elec.fr',
        phone: '01 42 85 96 37',
        address: '123 Rue de la République',
        city: 'Paris',
        templatePreference: 'moderne'
      },
      step2: {
        primaryColor: '#1e40af', // Bleu professionnel
        secondaryColor: '#3b82f6', // Bleu clair
        logoUrl: '',
        style: 'moderne',
        services: [
          {
            id: 'installation-electrique',
            name: 'Installation électrique',
            description: 'Installation complète de systèmes électriques neufs, rénovation et mise aux normes',
            detailedDescription: 'Nos experts réalisent l\'installation complète de vos systèmes électriques. Que ce soit pour du neuf ou de la rénovation, nous respectons scrupuleusement les normes NF C 15-100. Devis gratuit et intervention rapide.',
            price: 'À partir de 150€',
            images: []
          },
          {
            id: 'depannage-urgence',
            name: 'Dépannage urgence 24h/7j',
            description: 'Intervention rapide pour panne électrique, disjoncteur qui saute, coupure de courant',
            detailedDescription: 'Service d\'urgence disponible 24h/7j pour tous vos problèmes électriques. Panne totale, disjoncteur défaillant, problème de sécurité ? Nous intervenons dans l\'heure sur Paris.',
            price: 'À partir de 80€',
            images: []
          },
          {
            id: 'renovation-electrique',
            name: 'Rénovation électrique',
            description: 'Mise aux normes et modernisation de votre installation électrique',
            detailedDescription: 'Rénovation complète de votre installation électrique. Diagnostic, mise aux normes, remplacement du tableau électrique et modernisation de l\'ensemble de vos circuits.',
            price: 'Sur devis',
            images: []
          }
        ]
      },
      step3: {
        serviceCities: ['Paris', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Boulogne-Billancourt', 'Courbevoie', 'Nanterre'],
        openingHours: 'Lun-Ven 8h-18h, Sam 9h-17h, Dim urgences uniquement',
        emergencyAvailable: true,
        domain: 'voltaire-elec.fr',
        keywords: ['électricien Paris', 'installation électrique', 'dépannage électrique', 'urgence électricien', 'rénovation électrique', 'mise aux normes'],
        legalInfo: {
          address: '123 Rue de la République',
          city: 'Paris',
          postalCode: '75011',
          siret: '12345678901234',
          vatNumber: 'FR12345678901'
        }
      }
    };
    
    // 4. Sauvegarder les données du formulaire (étape par étape)
    console.log('\\n💾 Étape 4: Sauvegarde des données formulaire...');
    
    const saveFormOptions = {
      hostname: 'localhost',
      port: 3001,
      path: `/api/forms/${formToken}/save`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // Sauvegarder Step 1
    console.log('   📝 Sauvegarde Step 1...');
    const saveStep1 = await makeRequest(saveFormOptions, { step: 1, data: formData.step1 });
    if (saveStep1.status !== 200) {
      console.log('❌ Erreur sauvegarde step1:', saveStep1.data);
      return;
    }
    
    // Sauvegarder Step 2  
    console.log('   🎨 Sauvegarde Step 2...');
    const saveStep2 = await makeRequest(saveFormOptions, { step: 2, data: formData.step2 });
    if (saveStep2.status !== 200) {
      console.log('❌ Erreur sauvegarde step2:', saveStep2.data);
      return;
    }
    
    // Sauvegarder Step 3
    console.log('   📍 Sauvegarde Step 3...');
    const saveStep3 = await makeRequest(saveFormOptions, { step: 3, data: formData.step3 });
    if (saveStep3.status !== 200) {
      console.log('❌ Erreur sauvegarde step3:', saveStep3.data);
      return;
    }
    
    console.log('✅ Toutes les données formulaire sauvegardées');
    console.log(`   🏢 Entreprise: ${formData.step1.companyName}`);
    console.log(`   ⚡ Métier: ${formData.step1.trade}`);
    console.log(`   🎨 Style: ${formData.step2.style}`);
    console.log(`   📍 Zones: ${formData.step3.serviceCities.join(', ')}`);
    console.log(`   🛠️ Services: ${formData.step2.services.length} services définis`);
    
    // 5. Compléter le formulaire pour créer le projet
    console.log('\\n📋 Étape 5: Finalisation du formulaire et création du projet...');
    
    const completeFormOptions = {
      hostname: 'localhost',
      port: 3001,
      path: `/api/forms/${formToken}/complete`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const completeResponse = await makeRequest(completeFormOptions, {});
    
    console.log('Debug - Complete response:', completeResponse.status, JSON.stringify(completeResponse.data, null, 2));
    
    if (completeResponse.status !== 200) {
      console.log('❌ Erreur finalisation formulaire:', completeResponse.data);
      return;
    }
    
    const projectId = completeResponse.data.projectId;
    console.log(`✅ Projet créé avec ID: ${projectId}`);
    
    // 6. Générer le site avec Ultra Pro !
    console.log('\\n🚀 Étape 6: GÉNÉRATION DU SITE ULTRA PRO...');
    
    const generateOptions = {
      hostname: 'localhost',
      port: 3001,
      path: `/api/projects/${projectId}/generate`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    console.log('⚡ Génération en cours...');
    const generateResponse = await makeRequest(generateOptions);
    
    if (generateResponse.status !== 200) {
      console.log('❌ Erreur génération:', generateResponse.data);
      return;
    }
    
    const result = generateResponse.data;
    
    console.log('\\n🎉 SUCCÈS ! SITE ULTRA PRO GÉNÉRÉ !');
    console.log('=' .repeat(50));
    console.log(`🆔 Site ID: ${result.siteId}`);
    console.log(`🌐 Preview URL: ${result.previewUrl}`);
    console.log(`⚙️ CMS URL: ${result.cmsUrl}`);
    console.log(`\\n📋 Template sélectionné:`);
    console.log(`   🎨 ${result.templateSelection.name}`);
    console.log(`   📱 Style: ${result.templateSelection.style}`);
    console.log(`   ⚡ Catégorie: ${result.templateSelection.category}`);
    console.log(`   🏆 Ultra Pro: ${result.isUltraPro ? 'OUI' : 'NON'}`);
    console.log(`\\n💡 ${result.selectionRationale}`);
    console.log(`\\n✨ ${result.message}`);
    
    // 7. Vérifier les fichiers générés
    console.log('\\n📁 Étape 7: Vérification des fichiers...');
    
    try {
      const fs = require('fs');
      const siteDir = `./public/generated-sites/${result.siteId}`;
      const files = fs.readdirSync(siteDir);
      
      console.log(`✅ ${files.length} fichiers générés:`);
      files.forEach(file => {
        const stats = fs.statSync(`${siteDir}/${file}`);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`   📄 ${file} (${sizeKB} KB)`);
      });
      
    } catch (err) {
      console.log('⚠️ Impossible de lister les fichiers:', err.message);
    }
    
    console.log('\\n🏁 TEST COMPLET TERMINÉ AVEC SUCCÈS !');
    console.log('\\n🔗 Visitez maintenant:', result.previewUrl);
    console.log('🔧 Administration:', `http://localhost:3001${result.cmsUrl}`);
    
  } catch (error) {
    console.error('💥 Erreur dans le workflow:', error.message);
    console.error('Stack:', error.stack);
  }
}

testCompleteWorkflow();