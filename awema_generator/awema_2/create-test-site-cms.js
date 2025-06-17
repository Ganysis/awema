const http = require('http');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Créer un site de test complet pour tester le CMS
async function createTestSiteForCMS() {
  console.log('🚀 Création d\'un site de test pour le CMS avancé...\n');

  try {
    // 1. Créer un utilisateur admin si n'existe pas
    console.log('👤 1. Création utilisateur admin...');
    let user = await prisma.user.findUnique({
      where: { email: 'admin@awema.test' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@awema.test',
          name: 'Admin Awema',
          password: 'admin123' // En prod, hasher le mot de passe
        }
      });
      console.log('   ✅ Utilisateur admin créé');
    } else {
      console.log('   ✅ Utilisateur admin existe déjà');
    }

    // 2. Créer un client de test
    console.log('\n👥 2. Création client de test...');
    let client = await prisma.client.findUnique({
      where: { email: 'electricien@test.fr' }
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: 'Jean Électricien',
          email: 'electricien@test.fr',
          phone: '01 42 00 00 00',
          company: 'ÉlectriPro Paris',
          domain: 'electripro-paris.fr',
          trade: 'electricien',
          status: 'ACTIF',
          userId: user.id
        }
      });
      console.log('   ✅ Client électricien créé');
    } else {
      console.log('   ✅ Client électricien existe déjà');
    }

    // 3. Créer un projet de test
    console.log('\n📋 3. Création projet de test...');
    let project = await prisma.project.findFirst({
      where: { 
        clientId: client.id,
        name: 'Site ÉlectriPro - Test CMS'
      }
    });

    if (!project) {
      // Données template Ultra Pro
      const templateData = {
        companyName: 'ÉlectriPro Paris',
        trade: 'Électricien',
        description: 'Électricien professionnel à Paris et région parisienne. Installation, dépannage 24h/7j, mise aux normes.',
        ownerName: 'Jean Électricien',
        email: 'contact@electripro-paris.fr',
        phone: '01 42 00 00 00',
        address: '123 Rue de la République, 75011 Paris',
        city: 'Paris',
        primaryColor: '#1e40af',
        secondaryColor: '#3b82f6',
        domain: 'electripro-paris.fr',
        services: [
          {
            id: 'depannage-urgence',
            name: 'Dépannage Urgence',
            description: 'Intervention rapide 24h/7j pour tous vos problèmes électriques urgents',
            price: 'À partir de 80€'
          },
          {
            id: 'installation-electrique',
            name: 'Installation Électrique',
            description: 'Installation complète de vos équipements électriques avec garantie',
            price: 'Devis gratuit'
          },
          {
            id: 'mise-aux-normes',
            name: 'Mise aux Normes',
            description: 'Mise en conformité de votre installation électrique selon les normes NF C 15-100',
            price: 'Sur devis'
          }
        ],
        serviceCities: [
          'Paris',
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Levallois-Perret',
          'Courbevoie',
          'Nanterre'
        ],
        legalInfo: {
          address: '123 Rue de la République, 75011 Paris',
          city: 'Paris',
          postalCode: '75011'
        },
        openingHours: 'Lun-Ven 8h-18h, Sam 9h-12h, Urgences 24h/7j',
        emergencyAvailable: true,
        keywords: ['électricien paris', 'dépannage électrique', 'installation électrique', 'urgence électricien']
      };

      project = await prisma.project.create({
        data: {
          name: 'Site ÉlectriPro - Test CMS',
          clientId: client.id,
          userId: user.id,
          status: 'PRET',
          formData: JSON.stringify(templateData),
          siteData: JSON.stringify(templateData),
          domain: 'electripro-paris-test.local',
          previewUrl: '/preview/electripro-test',
          siteFolder: 'electripro-test'
        }
      });
      console.log('   ✅ Projet créé avec template Ultra Pro');
    } else {
      console.log('   ✅ Projet existe déjà');
    }

    // 4. Créer l'instance de site avec CMS
    console.log('\n🌐 4. Création instance site CMS...');
    let siteInstance = await prisma.siteInstance.findUnique({
      where: { projectId: project.id }
    });

    if (!siteInstance) {
      siteInstance = await prisma.siteInstance.create({
        data: {
          projectId: project.id,
          domain: 'electripro-test.local',
          isLive: false,
          homeTemplate: 'electricien-elite-pro',
          serviceTemplate: 'electricien-elite-pro-service',
          contactTemplate: 'electricien-elite-pro-contact',
          templateData: project.siteData || '{}',
          customCSS: '',
          customJS: '',
          cmsEnabled: true,
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
          clientUsername: 'electripro',
          clientPassword: Buffer.from('cms123').toString('base64') // Simple encoding pour la démo
        }
      });
      console.log('   ✅ Instance site CMS créée');
    } else {
      console.log('   ✅ Instance site CMS existe déjà');
    }

    // 5. Créer quelques articles de test
    console.log('\n📝 5. Création articles de test...');
    const articlesCount = await prisma.article.count({
      where: { siteId: siteInstance.id }
    });

    if (articlesCount === 0) {
      await prisma.article.createMany({
        data: [
          {
            siteId: siteInstance.id,
            title: 'Nouvelle réglementation électrique 2024',
            slug: 'nouvelle-reglementation-electrique-2024',
            excerpt: 'Découvrez les nouvelles normes électriques en vigueur depuis janvier 2024 et leur impact sur vos installations.',
            content: `<p>La réglementation électrique évolue constamment pour garantir la sécurité des installations. En 2024, plusieurs changements importants sont entrés en vigueur.</p>
                     <h2>Les principales nouveautés</h2>
                     <ul>
                       <li>Renforcement des exigences pour les prises de terre</li>
                       <li>Nouvelles normes pour les installations photovoltaïques</li>
                       <li>Obligation de disjoncteurs différentiels haute sensibilité</li>
                     </ul>
                     <p>Notre équipe ÉlectriPro reste à jour sur toutes ces évolutions pour vous garantir des installations conformes.</p>`,
            metaTitle: 'Réglementation électrique 2024 - Nouvelles normes',
            metaDescription: 'Découvrez les nouvelles normes électriques 2024. ÉlectriPro vous accompagne pour la mise en conformité.',
            keywords: 'réglementation électrique, normes 2024, NF C 15-100',
            status: 'PUBLISHED',
            publishedAt: new Date(),
            authorName: 'Jean Électricien',
            authorEmail: 'jean@electripro-paris.fr'
          },
          {
            siteId: siteInstance.id,
            title: 'Comment économiser sur sa facture électrique',
            slug: 'economiser-facture-electrique',
            excerpt: 'Nos conseils d\'expert pour réduire votre consommation électrique et faire des économies durables.',
            content: `<p>Avec l'augmentation du prix de l'électricité, il devient crucial d'optimiser sa consommation. Voici nos conseils d'électricien professionnel.</p>
                     <h2>Les gestes simples</h2>
                     <ul>
                       <li>Éteindre les appareils en veille</li>
                       <li>Utiliser des ampoules LED</li>
                       <li>Optimiser le chauffage électrique</li>
                     </ul>
                     <h2>Les solutions techniques</h2>
                     <p>Notre équipe peut vous installer des solutions domotiques pour automatiser vos économies d'énergie.</p>`,
            metaTitle: 'Économiser sur sa facture électrique - Conseils pro',
            metaDescription: 'Conseils d\'électricien pour réduire votre facture électrique. Contactez ÉlectriPro pour un audit énergétique.',
            keywords: 'économie énergie, facture électrique, conseils électricien',
            status: 'PUBLISHED',
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 7 jours
            authorName: 'Jean Électricien',
            authorEmail: 'jean@electripro-paris.fr'
          },
          {
            siteId: siteInstance.id,
            title: 'Installation de bornes de recharge électrique',
            slug: 'installation-bornes-recharge-electrique',
            excerpt: 'Guide complet pour l\'installation de bornes de recharge pour véhicules électriques à domicile.',
            content: `<p>L'installation d'une borne de recharge à domicile est la solution idéale pour les propriétaires de véhicules électriques.</p>
                     <h2>Types de bornes disponibles</h2>
                     <ul>
                       <li>Borne 3,7 kW (prise renforcée)</li>
                       <li>Borne 7,4 kW (Wallbox standard)</li>
                       <li>Borne 22 kW (charge rapide)</li>
                     </ul>
                     <h2>Aides financières</h2>
                     <p>Profitez du crédit d'impôt de 300€ pour l'installation de votre borne de recharge.</p>
                     <p>ÉlectriPro est certifié IRVE pour toutes vos installations de bornes électriques.</p>`,
            metaTitle: 'Installation borne recharge électrique Paris - IRVE',
            metaDescription: 'Installation de bornes de recharge électrique par électricien certifié IRVE. Crédit d\'impôt 300€.',
            keywords: 'borne recharge électrique, installation IRVE, véhicule électrique',
            status: 'DRAFT',
            authorName: 'Jean Électricien',
            authorEmail: 'jean@electripro-paris.fr'
          }
        ]
      });
      console.log('   ✅ 3 articles de test créés');
    } else {
      console.log(`   ✅ ${articlesCount} articles existent déjà`);
    }

    // 6. Créer des pages personnalisées avec blocs
    console.log('\n📄 6. Création pages personnalisées avec blocs...');
    const pagesCount = await prisma.pageContent.count({
      where: { siteId: siteInstance.id }
    });

    if (pagesCount === 0) {
      // Page "À propos"
      const aboutPage = await prisma.pageContent.create({
        data: {
          siteId: siteInstance.id,
          pageType: 'custom',
          pageSlug: 'a-propos',
          title: 'À propos de ÉlectriPro',
          sections: JSON.stringify({}),
          version: 1,
          isPublished: true
        }
      });

      // Blocs pour la page "À propos"
      await prisma.pageBlock.createMany({
        data: [
          {
            pageContentId: aboutPage.id,
            blockType: 'hero-standard',
            order: 0,
            config: JSON.stringify({
              title: 'À propos de ÉlectriPro',
              subtitle: 'Plus de 15 ans d\'expérience au service de votre sécurité électrique',
              backgroundImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080',
              buttonPrimary: {
                text: 'Nos Services',
                href: 'index.html#services'
              },
              buttonSecondary: {
                text: 'Nous Contacter',
                href: 'contact.html'
              }
            }),
            content: JSON.stringify({}),
            isVisible: true
          },
          {
            pageContentId: aboutPage.id,
            blockType: 'text-content',
            order: 1,
            config: JSON.stringify({
              title: 'Notre Histoire',
              content: `<p><strong>ÉlectriPro Paris</strong> est une entreprise familiale créée en 2008 par Jean Électricien, passionné par les métiers de l'électricité.</p>
                       <p>Depuis notre création, nous avons accompagné plus de <strong>2000 clients</strong> dans leurs projets électriques, des plus simples aux plus complexes.</p>
                       <h3>Nos Valeurs</h3>
                       <ul>
                         <li>✅ <strong>Sécurité</strong> : Respect strict des normes NF C 15-100</li>
                         <li>✅ <strong>Qualité</strong> : Matériel professionnel et garantie 10 ans</li>
                         <li>✅ <strong>Réactivité</strong> : Intervention sous 2h en urgence</li>
                         <li>✅ <strong>Transparence</strong> : Devis détaillé et prix fixes</li>
                       </ul>
                       <p>Notre équipe de <strong>5 électriciens qualifiés</strong> intervient quotidiennement sur Paris et la région parisienne.</p>`,
              backgroundColor: '#ffffff',
              textColor: '#374151'
            }),
            content: JSON.stringify({}),
            isVisible: true
          },
          {
            pageContentId: aboutPage.id,
            blockType: 'testimonials-grid',
            order: 2,
            config: JSON.stringify({
              title: 'Ils nous font confiance',
              subtitle: 'Découvrez les avis de nos clients satisfaits',
              testimonials: [
                {
                  name: 'Marie Dupont',
                  company: 'Particulier - 16ème',
                  content: 'Intervention rapide pour un dépannage électrique. Jean est très professionnel et explique bien son travail. Je recommande !',
                  rating: 5,
                  avatar: 'MD'
                },
                {
                  name: 'Pierre Martin',
                  company: 'Restaurant Le Gourmet',
                  content: 'Rénovation électrique complète de notre restaurant. Travail impeccable, dans les délais et le budget. Parfait !',
                  rating: 5,
                  avatar: 'PM'
                },
                {
                  name: 'Sophie Laurent',
                  company: 'Copropriété Haussmann',
                  content: 'Installation de bornes électriques pour notre copropriété. Service professionnel et suivi excellent.',
                  rating: 5,
                  avatar: 'SL'
                }
              ]
            }),
            content: JSON.stringify({}),
            isVisible: true
          }
        ]
      });

      // Créer une version initiale
      await prisma.pageVersion.create({
        data: {
          pageContentId: aboutPage.id,
          version: 1,
          title: 'À propos de ÉlectriPro',
          blocksData: JSON.stringify([/* les blocs ci-dessus */]),
          sectionsData: JSON.stringify({}),
          changes: 'Création de la page',
          editorEmail: 'admin@awema.test',
          editorType: 'ADMIN'
        }
      });

      console.log('   ✅ Page "À propos" créée avec 3 blocs');
    } else {
      console.log(`   ✅ ${pagesCount} pages personnalisées existent déjà`);
    }

    // 7. Résumé final
    console.log('\n🎉 SITE DE TEST CMS CRÉÉ AVEC SUCCÈS !\n');
    
    console.log('📊 RÉSUMÉ:');
    console.log(`   👤 Utilisateur: ${user.email}`);
    console.log(`   👥 Client: ${client.company} (${client.email})`);
    console.log(`   📋 Projet: ${project.name}`);
    console.log(`   🌐 Site: ${siteInstance.domain}`);
    console.log(`   📝 Articles: ${await prisma.article.count({ where: { siteId: siteInstance.id } })}`);
    console.log(`   📄 Pages: ${await prisma.pageContent.count({ where: { siteId: siteInstance.id } })}`);

    console.log('\n🚀 COMMENT TESTER LE CMS:');
    console.log('   1. Démarrer le serveur: npm run dev');
    console.log('   2. Aller sur: http://localhost:3000/dashboard/cms');
    console.log(`   3. Cliquer sur "📄 Pages" pour le site ${siteInstance.domain}`);
    console.log('   4. Tester l\'éditeur visuel sur les pages');
    console.log('   5. Tester l\'export du site complet');

    console.log('\n🔑 IDENTIFIANTS CMS CLIENT:');
    console.log(`   URL: http://localhost:3000/client-cms/${siteInstance.domain}`);
    console.log(`   Username: electripro`);
    console.log(`   Password: cms123`);

    console.log('\n✨ Le site est prêt pour tester toutes les fonctionnalités du CMS !');

  } catch (error) {
    console.error('❌ Erreur lors de la création du site de test:', error);
    console.error(error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

// Lancer la création
createTestSiteForCMS().catch(console.error);