const fetch = require('node-fetch');

async function testPreview() {
  try {
    console.log('🔍 Test de la prévisualisation...');
    
    // Test des différents sites
    const sites = ['site-a3pdavnb', 'site-1d6ehvvd'];
    
    for (const siteId of sites) {
      console.log(`\n📱 Test du site: ${siteId}`);
      
      // Test de l'API de prévisualisation
      const apiUrl = `http://localhost:3003/api/preview/${siteId}?file=index.html`;
      console.log(`🔗 URL API: ${apiUrl}`);
      
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const content = await response.text();
          console.log(`✅ API OK - Taille: ${content.length} chars`);
          console.log(`📄 Contient menu hamburger: ${content.includes('mobile-menu-btn') ? 'OUI' : 'NON'}`);
          console.log(`🎨 Contient police Poppins: ${content.includes('Poppins') ? 'OUI' : 'NON'}`);
          console.log(`🏗️ Contient bandeau construction: ${content.includes('construction-banner') ? 'OUI' : 'NON'}`);
        } else {
          console.log(`❌ API Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.log(`❌ Erreur API: ${error.message}`);
      }
      
      // Test de la route page
      const pageUrl = `http://localhost:3003/preview/${siteId}`;
      console.log(`🔗 URL Page: ${pageUrl}`);
      
      try {
        const response = await fetch(pageUrl, { redirect: 'manual' });
        if (response.status === 307 || response.status === 302) {
          console.log(`✅ Redirection OK vers: ${response.headers.get('location')}`);
        } else {
          console.log(`⚠️ Status: ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ Erreur Page: ${error.message}`);
      }
    }
    
    console.log('\n🎯 URLs de test:');
    console.log('📱 http://localhost:3003/preview/site-a3pdavnb');
    console.log('📱 http://localhost:3003/api/preview/site-a3pdavnb?file=index.html');
    console.log('📱 http://localhost:3003/api/preview/site-a3pdavnb?file=contact.html');
    console.log('📱 http://localhost:3003/api/preview/site-a3pdavnb?file=service-service-depannage.html');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

testPreview();