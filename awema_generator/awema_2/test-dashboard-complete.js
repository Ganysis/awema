const fs = require('fs');
const path = require('path');

console.log('🧪 Test complet du système AWEMA 2 Dashboard\n');

const baseUrl = 'http://localhost:3000';

// Test des endpoints API
async function testAPIs() {
  console.log('📡 Test des APIs...\n');
  
  try {
    // Test API templates
    console.log('Testing /api/templates...');
    const templatesResponse = await fetch(`${baseUrl}/api/templates`);
    console.log(`✅ API Templates: ${templatesResponse.status} ${templatesResponse.statusText}`);
    
    // Test synchronisation
    console.log('Testing template sync...');
    const syncResponse = await fetch(`${baseUrl}/api/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sync-all' })
    });
    const syncData = await syncResponse.json();
    console.log(`✅ Sync Templates: ${syncResponse.status} - ${syncData.message || 'OK'}`);
    
    // Test preview Ultra Pro
    console.log('Testing Ultra Pro preview...');
    const previewResponse = await fetch(`${baseUrl}/api/templates/preview-ultra-pro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: 'electricien-elite-pro',
        testData: {
          category: 'electricien',
          companyName: 'Électricité Pro Test',
          ownerName: 'Jean Martin',
          phone: '01 23 45 67 89',
          email: 'test@example.fr',
          address: '123 Rue Test, 75001 Paris',
          description: 'Électricien professionnel test',
          services: [
            { id: 'service1', name: 'Installation électrique' },
            { id: 'service2', name: 'Dépannage urgence' }
          ],
          zones: ['Paris', 'Boulogne-Billancourt']
        }
      })
    });
    
    if (previewResponse.ok) {
      const previewData = await previewResponse.json();
      console.log(`✅ Ultra Pro Preview: ${previewResponse.status} - ${previewData.message || 'OK'}`);
      console.log(`📄 Preview URL: ${baseUrl}${previewData.previewUrl}`);
    } else {
      const error = await previewResponse.json();
      console.log(`❌ Ultra Pro Preview: ${previewResponse.status} - ${error.error}`);
    }
    
  } catch (error) {
    console.log(`❌ Erreur API: ${error.message}`);
  }
}

// Test des pages Dashboard
async function testDashboardPages() {
  console.log('\n🖥️  Test des pages Dashboard...\n');
  
  const pages = [
    '/dashboard',
    '/dashboard/templates',
    '/dashboard/clients',
    '/dashboard/production'
  ];
  
  for (const page of pages) {
    try {
      const response = await fetch(`${baseUrl}${page}`);
      console.log(`${response.ok ? '✅' : '❌'} ${page}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`❌ ${page}: Erreur - ${error.message}`);
    }
  }
}

// Test des fichiers générés
async function testGeneratedFiles() {
  console.log('\n📁 Test des fichiers générés...\n');
  
  const publicDir = path.join(__dirname, 'public');
  const generatedSitesDir = path.join(publicDir, 'generated-sites');
  const templatePreviewsDir = path.join(publicDir, 'template-previews');
  
  // Vérifier les dossiers
  console.log(`Generated sites: ${fs.existsSync(generatedSitesDir) ? '✅' : '❌'} ${generatedSitesDir}`);
  console.log(`Template previews: ${fs.existsSync(templatePreviewsDir) ? '✅' : '❌'} ${templatePreviewsDir}`);
  
  // Compter les sites générés
  if (fs.existsSync(generatedSitesDir)) {
    const sites = fs.readdirSync(generatedSitesDir);
    console.log(`📊 ${sites.length} sites générés trouvés`);
    if (sites.length > 0) {
      console.log(`   Exemple: ${sites[0]}`);
    }
  }
  
  // Compter les previews
  if (fs.existsSync(templatePreviewsDir)) {
    const previews = fs.readdirSync(templatePreviewsDir);
    console.log(`📊 ${previews.length} previews trouvées`);
  }
}

// Fonction principale
async function runCompleteTest() {
  console.log('⏳ Attente que le serveur soit prêt...\n');
  
  // Attendre que le serveur soit prêt
  let serverReady = false;
  for (let i = 0; i < 10; i++) {
    try {
      const response = await fetch(`${baseUrl}/dashboard`);
      if (response.status === 200) {
        serverReady = true;
        break;
      }
    } catch (error) {
      // Serveur pas encore prêt
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  if (!serverReady) {
    console.log('❌ Serveur non accessible. Assurez-vous que `npm run dev` est en cours d\'exécution.');
    return;
  }
  
  console.log('✅ Serveur accessible!\n');
  
  // Lancer tous les tests
  await testDashboardPages();
  await testAPIs();
  await testGeneratedFiles();
  
  console.log('\n🎉 Tests terminés!');
  console.log(`\n🌐 Dashboard disponible: ${baseUrl}/dashboard`);
  console.log(`🎨 Templates: ${baseUrl}/dashboard/templates`);
}

// Exporter pour utilisation
if (require.main === module) {
  runCompleteTest().catch(console.error);
}

module.exports = { runCompleteTest, testAPIs, testDashboardPages };