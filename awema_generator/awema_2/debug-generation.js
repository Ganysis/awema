const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugGeneration() {
  try {
    console.log('🔍 Checking project in database...');
    
    const project = await prisma.project.findUnique({
      where: { id: 'cmbjtiza40003j1zrb8tx34zz' },
      include: { client: true }
    });
    
    if (!project) {
      console.log('❌ Project not found');
      return;
    }
    
    console.log('✅ Project found:');
    console.log('- Status:', project.status);
    console.log('- Client:', project.client.company);
    console.log('- Trade:', project.client.trade);
    console.log('- Form data available:', !!project.formData);
    
    if (project.formData) {
      const formData = JSON.parse(project.formData);
      console.log('- Form step1 trade:', formData.step1?.trade);
      console.log('- Form step1 city:', formData.step1?.city);
    }
    
    console.log('\n🧪 Testing Ultra Pro selection...');
    
    // Import the ultra pro integration
    const { selectOptimalTemplate } = require('./src/lib/ultra-pro-integration');
    
    const trade = project.client.trade;
    const formData = project.formData ? JSON.parse(project.formData) : {};
    
    const optimalSelection = selectOptimalTemplate(
      trade,
      formData.step1?.trade || trade,
      formData.step1?.templatePreference || formData.step2?.style
    );
    
    console.log('✅ Template selection result:');
    console.log(JSON.stringify(optimalSelection, null, 2));
    
    if (optimalSelection.isUltraPro) {
      console.log('\n⚡ Testing Ultra Pro generation...');
      
      const { TemplateData } = require('./src/lib/template');
      const { generateUltraProSite } = require('./src/lib/ultra-pro-integration');
      
      // Build template data similar to the API
      const templateData = {
        companyName: formData.step1?.companyName || project.client.company,
        trade: formData.step1?.trade || project.client.trade || 'Services',
        description: formData.step1?.description || `${project.client.company} - Services professionnels`,
        ownerName: formData.step1?.ownerName || project.client.name,
        email: formData.step1?.email || project.client.email,
        phone: formData.step1?.phone || project.client.phone || '01 23 45 67 89',
        address: formData.step1?.address || '',
        city: formData.step1?.city || '',
        primaryColor: formData.step2?.primaryColor || '#2563eb',
        secondaryColor: formData.step2?.secondaryColor || '#1d4ed8',
        logoUrl: formData.step2?.logoUrl,
        services: formData.step2?.services || [
          {
            id: 'installation-electrique',
            name: 'Installation électrique',
            description: 'Installation complète de systèmes électriques neufs ou rénovation',
            detailedDescription: 'Installation complète de systèmes électriques neufs ou rénovation',
            price: 'Sur devis',
            images: []
          },
          {
            id: 'depannage-urgence',
            name: 'Dépannage urgence',
            description: 'Intervention rapide 24h/7j pour tous vos problèmes électriques',
            detailedDescription: 'Intervention rapide 24h/7j pour tous vos problèmes électriques',
            price: 'Sur devis',
            images: []
          }
        ],
        serviceCities: formData.step3?.serviceCities || ['Paris 8ème', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Boulogne-Billancourt'],
        legalInfo: formData.step3?.legalInfo || {
          address: '',
          city: '',
          postalCode: '00000'
        },
        openingHours: formData.step3?.openingHours || 'Lun-Ven 8h-18h, Sam 9h-12h',
        emergencyAvailable: formData.step3?.emergencyAvailable || true,
        domain: formData.step3?.domain || project.client.domain || 'elec-elite.fr',
        keywords: formData.step3?.keywords || ['électricien', 'Paris', 'professionnel', 'qualité']
      };
      
      console.log('📋 Template data prepared');
      
      try {
        const siteStructure = generateUltraProSite(templateData, optimalSelection.selection);
        console.log('✅ Ultra Pro site generated successfully!');
        console.log('- Pages generated:', siteStructure.pages.length);
        console.log('- Page types:', siteStructure.pages.map(p => p.filename).join(', '));
      } catch (genError) {
        console.error('❌ Ultra Pro generation error:', genError.message);
        console.error('Stack:', genError.stack);
      }
    }
    
  } catch (error) {
    console.error('💥 Debug error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

debugGeneration();