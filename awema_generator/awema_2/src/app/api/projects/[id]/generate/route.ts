import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TemplateData } from '@/lib/template'
import { generateSiteStructure } from '@/lib/multi-page-generator'
import { selectRandomTemplates, getTemplateSelectionRationale } from '@/lib/template-randomizer'
import { selectOptimalTemplate, generateUltraProSite } from '@/lib/ultra-pro-integration'
import { PageToGenerate } from '@/lib/seo/seo-analyzer'
import { promises as fs } from 'fs'
import path from 'path'

interface GenerationRequest {
  selectedTemplate?: string
  pagesToGenerate?: PageToGenerate[]
  wizardConfiguration?: {
    templateId: string
    totalPages: number
    averageSeoScore: number
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params
    
    // Lire le body pour voir si c'est une génération par wizard
    const body: GenerationRequest = await request.json().catch(() => ({}))
    const isWizardGeneration = !!(body.selectedTemplate && body.wizardConfiguration)

    // Récupérer le projet avec les données du formulaire
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        client: true
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    // Pour le wizard, on accepte tous les statuts
    if (!isWizardGeneration && project.status !== 'COLLECTE') {
      return NextResponse.json(
        { error: 'Ce projet n\'est pas prêt pour la génération' },
        { status: 400 }
      )
    }

    // Si c'est une génération par wizard, traiter différemment
    if (isWizardGeneration) {
      return await handleWizardGeneration(projectId, project, body)
    }

    // Parser les données du formulaire
    const formData = project.formData ? JSON.parse(project.formData) : {}
    
    // Construire les données pour le template (éviter les références circulaires)
    const baseAddress = formData.step1?.address || ''
    const baseCity = formData.step1?.city || ''
    
    const templateData: TemplateData = {
      // Données de base
      companyName: formData.step1?.companyName || project.client.company,
      trade: formData.step1?.trade || project.client.trade || 'Services',
      description: formData.step1?.description || `${project.client.company} - Services professionnels`,
      
      // Contact
      ownerName: formData.step1?.ownerName || project.client.name,
      email: formData.step1?.email || project.client.email,
      phone: formData.step1?.phone || project.client.phone || '01 23 45 67 89',
      address: baseAddress,
      city: baseCity,
      
      // Design
      primaryColor: formData.step2?.primaryColor || '#2563eb',
      secondaryColor: formData.step2?.secondaryColor || '#1d4ed8',
      logoUrl: formData.step2?.logoUrl,
      
      // Services détaillés avec fallback pour Ultra Pro
      services: formData.step2?.services || [
        {
          id: 'installation-electrique',
          name: 'Installation électrique',
          description: 'Installation complète de systèmes électriques neufs ou rénovation',
          detailedDescription: 'Description détaillée de installation électrique. Nous proposons des solutions complètes et professionnelles adaptées à vos besoins.',
          price: 'Sur devis',
          images: []
        },
        {
          id: 'depannage-urgence',
          name: 'Dépannage urgence',
          description: 'Intervention rapide 24h/7j pour tous vos problèmes électriques',
          detailedDescription: 'Description détaillée de dépannage urgence. Nous proposons des solutions complètes et professionnelles adaptées à vos besoins.',
          price: 'Sur devis',
          images: []
        }
      ],
      
      // Zones d'intervention
      serviceCities: formData.step3?.serviceCities || [baseCity || 'Paris 8ème', 'Neuilly-sur-Seine', 'Levallois-Perret', 'Boulogne-Billancourt'],
      
      // Informations légales
      legalInfo: formData.step3?.legalInfo || {
        address: baseAddress,
        city: baseCity,
        postalCode: '00000'
      },
      
      // Informations supplémentaires
      openingHours: formData.step3?.openingHours || 'Lun-Ven 8h-18h, Sam 9h-12h',
      emergencyAvailable: formData.step3?.emergencyAvailable || true,
      
      // SEO
      domain: formData.step3?.domain || project.client.domain || 'exemple.fr',
      keywords: formData.step3?.keywords || [
        formData.step1?.trade || 'service',
        formData.step1?.city || 'France',
        'professionnel',
        'qualité'
      ].filter(Boolean)
    }

    // 🚀 NOUVELLE GÉNÉRATION ULTRA-PROFESSIONNELLE ELEMENTOR PRO
    console.log('🚀 Génération avec le système ultra-professionnel Elementor Pro')
    
    // Toujours utiliser le système ultra-professionnel maintenant
    const enhancedTemplateData = {
      ...templateData,
      isElementorPro: true,
      generationType: 'ultra-professional'
    }
    
    // Générer avec le nouveau système multi-page intégré Elementor Pro
    const siteStructure = generateSiteStructure(enhancedTemplateData)
    
    // Créer le dossier du site
    const siteId = `site-${project.id.slice(-8)}`
    const sitesDir = path.join(process.cwd(), 'public', 'generated-sites')
    const siteDir = path.join(sitesDir, siteId)
    
    // Créer les dossiers si nécessaire
    await fs.mkdir(sitesDir, { recursive: true })
    await fs.mkdir(siteDir, { recursive: true })
    
    // Écrire tous les fichiers de la structure du site
    for (const page of siteStructure.pages) {
      await fs.writeFile(path.join(siteDir, page.filename), page.content)
    }
    
    // URL de prévisualisation
    const previewUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/preview/${siteId}`
    
    // Créer ou récupérer une instance CMS du site avec système ultra-professionnel
    let siteInstance = await prisma.siteInstance.findFirst({
      where: { projectId: project.id }
    })

    if (!siteInstance) {
      // Générer un domaine unique si nécessaire
      let uniqueDomain = templateData.domain
      let counter = 1
      
      while (await prisma.siteInstance.findFirst({ where: { domain: uniqueDomain } })) {
        uniqueDomain = `${templateData.domain.replace(/\.[^.]+$/, '')}-${counter}${templateData.domain.match(/\.[^.]+$/)?.[0] || ''}`
        counter++
      }

      siteInstance = await prisma.siteInstance.create({
        data: {
          projectId: project.id,
          domain: uniqueDomain,
          homeTemplate: 'elementor-pro-ultra',
          serviceTemplate: 'elementor-pro-ultra-service',
          contactTemplate: 'elementor-pro-ultra-contact',
          templateData: JSON.stringify(enhancedTemplateData),
          cmsSettings: JSON.stringify({
            allowTemplateChange: true,
            allowContentEdit: true,
            modules: ['articles', 'pages', 'media', 'performance', 'seo'],
            isUltraPro: true,
            templateStyle: 'elementor-pro',
            generationType: 'ultra-professional',
            features: ['mega-navigation', 'advanced-animations', 'performance-optimization', 'ultra-seo']
          }),
          clientUsername: uniqueDomain.replace(/[^a-zA-Z0-9]/g, ''),
          clientPassword: 'temp_password_' + Math.random().toString(36).slice(-8)
        }
      })
    }
    
    // Mettre à jour le projet
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'PRET',
        siteData: JSON.stringify(enhancedTemplateData),
        siteFolder: siteId,
        previewUrl: previewUrl,
        domain: templateData.domain
      }
    })

    // Message de génération ultra-professionnelle
    const selectionRationale = `Système ultra-professionnel Elementor Pro activé ! Votre site bénéficie maintenant de 15+ sections ultra-riches, animations GSAP avancées, SEO complet avec Schema.org, optimisations 95+ PageSpeed, et architecture moderne niveau Elementor Pro/Divi Pro.`
    
    return NextResponse.json({
      success: true,
      siteId,
      previewUrl,
      cmsUrl: `/dashboard/cms/sites/${siteInstance.id}`,
      templateSelection: {
        templateId: 'elementor-pro-ultra',
        name: 'Elementor Pro Ultra-Professional',
        style: 'ultra-modern',
        features: ['15+ sections', 'GSAP animations', 'Ultra SEO', '95+ PageSpeed']
      },
      isUltraPro: true,
      isElementorPro: true,
      selectionRationale,
      sectionsGenerated: siteStructure.pages.length,
      features: ['mega-navigation', 'advanced-hero', 'premium-services', 'animated-stats', 'testimonials-carousel'],
      message: `🚀 Site ultra-professionnel généré avec succès! Architecture moderne niveau Elementor Pro avec ${siteStructure.pages.length} pages optimisées.`
    })
  } catch (error) {
    console.error('Erreur lors de la génération du site:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du site' },
      { status: 500 }
    )
  }
}

async function handleWizardGeneration(projectId: string, project: any, body: GenerationRequest) {
  try {
    const { selectedTemplate, pagesToGenerate, wizardConfiguration } = body
    
    if (!selectedTemplate || !pagesToGenerate || !wizardConfiguration) {
      return NextResponse.json(
        { error: 'Données du wizard incomplètes' },
        { status: 400 }
      )
    }

    const rawFormData = JSON.parse(project.formData || '{}')
    
    // Normaliser les données selon le format
    const templateData = normalizeFormData(rawFormData)

    // Créer ou mettre à jour l'instance de site
    let siteInstance = await prisma.siteInstance.findUnique({
      where: { projectId: project.id }
    })

    if (siteInstance) {
      // Mettre à jour l'instance existante
      siteInstance = await prisma.siteInstance.update({
        where: { id: siteInstance.id },
        data: {
          homeTemplate: selectedTemplate,
          serviceTemplate: `${selectedTemplate}-service`,
          contactTemplate: `${selectedTemplate}-contact`,
          templateData: JSON.stringify(templateData),
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
            },
            wizardGenerated: true,
            generationDate: new Date().toISOString(),
            configuration: wizardConfiguration
          })
        }
      })
    } else {
      // Créer une nouvelle instance
      siteInstance = await prisma.siteInstance.create({
        data: {
          projectId: project.id,
          domain: templateData.domain || `${project.client.company.toLowerCase().replace(/\s+/g, '-')}.fr`,
          isLive: false,
          homeTemplate: selectedTemplate,
          serviceTemplate: `${selectedTemplate}-service`,
          contactTemplate: `${selectedTemplate}-contact`,
          templateData: JSON.stringify(templateData),
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
            },
            wizardGenerated: true,
            generationDate: new Date().toISOString(),
            configuration: wizardConfiguration
          }),
          clientUsername: templateData.companyName?.toLowerCase().replace(/\s+/g, '') || 'client',
          clientPassword: Buffer.from('cms123').toString('base64')
        }
      })
    }

    // Créer les pages de contenu basées sur le wizard
    await createPagesFromWizard(siteInstance.id, pagesToGenerate, templateData, selectedTemplate)

    // Mettre à jour le statut du projet
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'PRET',
        siteData: JSON.stringify({
          ...templateData,
          wizardConfiguration,
          generatedPages: pagesToGenerate.length,
          templateUsed: selectedTemplate
        })
      }
    })

    // Créer quelques articles par défaut basés sur les services
    await createDefaultArticles(siteInstance.id, templateData)

    return NextResponse.json({
      success: true,
      siteId: siteInstance.id,
      domain: siteInstance.domain,
      pagesGenerated: pagesToGenerate.length,
      templateUsed: selectedTemplate,
      averageSeoScore: wizardConfiguration.averageSeoScore
    })

  } catch (error) {
    console.error('Erreur lors de la génération par wizard:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération par wizard' },
      { status: 500 }
    )
  }
}

async function createPagesFromWizard(
  siteId: string, 
  pagesToGenerate: PageToGenerate[], 
  templateData: any,
  selectedTemplate: string
) {
  // Supprimer les pages existantes du wizard précédent
  await prisma.pageContent.deleteMany({
    where: { 
      siteId,
      pageType: { in: ['home', 'contact', 'service', 'service-city', 'legal'] }
    }
  })

  // Créer les nouvelles pages
  for (const page of pagesToGenerate) {
    // Générer les blocs selon le type de page
    const blocks = await generatePageBlocks(page, templateData, selectedTemplate)
    
    const pageContent = await prisma.pageContent.create({
      data: {
        siteId,
        pageType: page.type,
        pageSlug: page.slug,
        title: page.title,
        sections: JSON.stringify({}),
        version: 1,
        isPublished: true,
        metaTitle: page.seoPreview.title,
        metaDescription: page.seoPreview.description,
        metaKeywords: page.targetKeywords.join(', '),
        customData: JSON.stringify({
          wizardGenerated: true,
          serviceData: page.serviceData,
          cityData: page.cityData,
          estimatedContent: page.estimatedContent,
          targetKeywords: page.targetKeywords
        })
      }
    })

    // Créer les blocs
    for (let i = 0; i < blocks.length; i++) {
      await prisma.pageBlock.create({
        data: {
          pageContentId: pageContent.id,
          blockType: blocks[i].blockType,
          order: i,
          config: JSON.stringify(blocks[i].config),
          content: JSON.stringify(blocks[i].content || {}),
          styles: blocks[i].styles,
          isVisible: true
        }
      })
    }

    // Créer une version initiale
    await prisma.pageVersion.create({
      data: {
        pageContentId: pageContent.id,
        version: 1,
        title: page.title,
        blocksData: JSON.stringify(blocks),
        sectionsData: JSON.stringify({}),
        changes: 'Génération initiale par wizard',
        editorEmail: 'wizard@system',
        editorType: 'SYSTEM'
      }
    })
  }
}

async function generatePageBlocks(page: PageToGenerate, templateData: any, selectedTemplate: string) {
  const blocks: any[] = []

  switch (page.type) {
    case 'home':
      blocks.push(
        {
          blockType: 'hero-standard',
          config: {
            title: `${templateData.companyName}`,
            subtitle: `${templateData.trade} professionnel à ${templateData.city}`,
            description: templateData.description,
            backgroundImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080',
            buttonPrimary: {
              text: 'Nos Services',
              href: '#services'
            },
            buttonSecondary: {
              text: 'Devis Gratuit',
              href: 'contact.html'
            }
          }
        },
        {
          blockType: 'services-grid',
          config: {
            title: 'Nos Services',
            subtitle: `Découvrez tous nos services de ${templateData.trade.toLowerCase()}`,
            services: templateData.services || [],
            showPrices: true,
            ctaText: 'En savoir plus'
          }
        },
        {
          blockType: 'contact-cta',
          config: {
            title: 'Besoin d\'un devis ?',
            subtitle: 'Contactez-nous pour une intervention rapide',
            phone: templateData.phone,
            email: templateData.email,
            buttonText: 'Nous contacter',
            features: ['Devis gratuit', 'Intervention rapide', 'Garantie travaux']
          }
        }
      )
      break

    case 'contact':
      blocks.push(
        {
          blockType: 'hero-contact',
          config: {
            title: 'Contactez-nous',
            subtitle: `Besoin d'un ${templateData.trade.toLowerCase()} ? Nous sommes là pour vous aider`,
            phone: templateData.phone,
            email: templateData.email,
            address: templateData.address,
            hours: templateData.openingHours || 'Lun-Ven 8h-18h'
          }
        },
        {
          blockType: 'contact-form',
          config: {
            title: 'Demande de devis gratuit',
            fields: ['name', 'email', 'phone', 'service', 'message'],
            services: templateData.services?.map((s: any) => s.name) || [],
            submitText: 'Envoyer ma demande'
          }
        }
      )
      break

    case 'service':
      const service = page.serviceData
      blocks.push(
        {
          blockType: 'hero-service',
          config: {
            title: service.name,
            subtitle: service.description,
            price: service.price || 'Devis gratuit',
            features: service.features || [
              'Intervention rapide',
              'Matériel de qualité',
              'Garantie travaux'
            ]
          }
        },
        {
          blockType: 'text-content',
          config: {
            title: `Pourquoi choisir ${templateData.companyName} pour ${service.name} ?`,
            content: `<p>Avec plus de 10 ans d'expérience dans le domaine, <strong>${templateData.companyName}</strong> vous garantit un service de qualité pour tous vos besoins en ${service.name.toLowerCase()}.</p>
                     <h3>Nos avantages :</h3>
                     <ul>
                       <li>✅ Intervention sous 2h en urgence</li>
                       <li>✅ Devis gratuit et transparent</li>
                       <li>✅ Matériel professionnel</li>
                       <li>✅ Garantie sur tous nos travaux</li>
                       <li>✅ ${templateData.serviceCities?.length || 0} villes d'intervention</li>
                     </ul>`
          }
        }
      )
      break

    case 'service-city':
      const serviceCity = page.serviceData
      const city = page.cityData
      blocks.push(
        {
          blockType: 'hero-service',
          config: {
            title: `${serviceCity.name} ${city}`,
            subtitle: `${templateData.trade} spécialisé en ${serviceCity.name.toLowerCase()} à ${city}`,
            localFocus: true,
            city: city,
            phone: templateData.phone
          }
        },
        {
          blockType: 'text-content',
          config: {
            title: `${serviceCity.name} à ${city} : Intervention locale`,
            content: `<p><strong>${templateData.companyName}</strong> intervient à ${city} pour tous vos besoins en ${serviceCity.name.toLowerCase()}.</p>
                     <p>Notre équipe se déplace rapidement dans tout ${city} et ses environs pour vous proposer un service de proximité et de qualité.</p>
                     <h3>Zone d'intervention autour de ${city} :</h3>
                     <ul>
                       ${templateData.serviceCities?.slice(0, 5).map((c: string) => `<li>📍 ${c}</li>`).join('') || ''}
                     </ul>`
          }
        }
      )
      break

    case 'legal':
      blocks.push(
        {
          blockType: 'text-content',
          config: {
            title: 'Mentions légales',
            content: `<h2>Éditeur du site</h2>
                     <p><strong>${templateData.companyName}</strong><br>
                     ${templateData.address || 'Adresse à compléter'}<br>
                     Téléphone : ${templateData.phone}<br>
                     Email : ${templateData.email}</p>
                     
                     <h2>Hébergement</h2>
                     <p>Site hébergé par l'hébergeur choisi par le client.</p>
                     
                     <h2>Propriété intellectuelle</h2>
                     <p>Le contenu de ce site est la propriété de ${templateData.companyName}.</p>
                     
                     <h2>Données personnelles</h2>
                     <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à ${templateData.email}.</p>`
          }
        }
      )
      break
  }

  return blocks
}

async function createDefaultArticles(siteId: string, templateData: any) {
  const existingArticles = await prisma.article.count({
    where: { siteId }
  })

  if (existingArticles > 0) return // Articles déjà créés

  const articles = [
    {
      title: `Pourquoi faire appel à un ${templateData.trade} professionnel ?`,
      slug: `pourquoi-${templateData.trade.toLowerCase()}-professionnel`,
      excerpt: `Découvrez l'importance de faire appel à un ${templateData.trade.toLowerCase()} qualifié pour vos travaux.`,
      content: `<p>Faire appel à un <strong>${templateData.trade.toLowerCase()} professionnel</strong> est essentiel pour garantir la qualité et la sécurité de vos installations.</p>

               <h2>Les avantages d'un professionnel</h2>
               <ul>
                 <li><strong>Expertise technique</strong> : Connaissance des normes et réglementations</li>
                 <li><strong>Matériel professionnel</strong> : Outils adaptés pour un travail de qualité</li>
                 <li><strong>Garantie</strong> : Tous nos travaux sont garantis</li>
                 <li><strong>Assurance</strong> : Couverture en cas de problème</li>
               </ul>

               <p>Chez <strong>${templateData.companyName}</strong>, nous mettons notre expertise à votre service depuis plus de 10 ans.</p>

               <h2>Nos certifications</h2>
               <p>Notre équipe est certifiée et se forme régulièrement aux dernières technologies et normes du métier.</p>`,
      metaTitle: `Pourquoi choisir un ${templateData.trade} professionnel - ${templateData.companyName}`,
      metaDescription: `Les avantages de faire appel à ${templateData.companyName}, ${templateData.trade.toLowerCase()} professionnel. Expertise, garantie, assurance.`,
      keywords: `${templateData.trade.toLowerCase()} professionnel, expertise, garantie, ${templateData.city}`,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorName: templateData.ownerName || 'Équipe',
      authorEmail: templateData.email
    },
    {
      title: `Nos conseils d'entretien pour ${templateData.trade.toLowerCase()}`,
      slug: `conseils-entretien-${templateData.trade.toLowerCase()}`,
      excerpt: `Conseils pratiques pour entretenir vos installations et éviter les problèmes.`,
      content: `<p>Un bon entretien de vos installations est crucial pour leur durabilité et votre sécurité.</p>

               <h2>Conseils d'entretien</h2>
               <ul>
                 <li>Vérification régulière des installations</li>
                 <li>Nettoyage périodique des équipements</li>
                 <li>Contrôle des normes de sécurité</li>
                 <li>Intervention préventive</li>
               </ul>

               <p><strong>${templateData.companyName}</strong> vous accompagne avec des contrats de maintenance adaptés à vos besoins.</p>

               <h2>Quand faire appel à un professionnel ?</h2>
               <p>N'hésitez pas à nous contacter au ${templateData.phone} pour tout conseil ou intervention.</p>`,
      metaTitle: `Conseils entretien ${templateData.trade.toLowerCase()} - ${templateData.companyName}`,
      metaDescription: `Conseils d'expert pour l'entretien de vos installations. ${templateData.companyName}, ${templateData.trade.toLowerCase()} à ${templateData.city}.`,
      keywords: `entretien, maintenance, conseils, ${templateData.trade.toLowerCase()}, ${templateData.city}`,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 7 jours
      authorName: templateData.ownerName || 'Équipe',
      authorEmail: templateData.email
    }
  ]

  await prisma.article.createMany({
    data: articles.map(article => ({
      ...article,
      siteId
    }))
  })
}

// Fonction pour normaliser les données selon les différents formats
function normalizeFormData(formData: any) {
  // Si c'est l'ancien format direct
  if (formData.companyName && !formData.step1) {
    return formData
  }
  
  // Si c'est le nouveau format avec steps
  if (formData.step1) {
    return {
      companyName: formData.step1.companyName,
      trade: formData.step1.trade,
      description: formData.step1.description,
      ownerName: formData.step1.ownerName,
      email: formData.step1.email,
      phone: formData.step1.phone,
      address: formData.step1.address,
      city: formData.step1.city,
      primaryColor: formData.step2?.primaryColor || '#2563eb',
      secondaryColor: formData.step2?.secondaryColor || '#1d4ed8',
      logoUrl: formData.step2?.logoUrl,
      services: formData.step2?.services || [],
      serviceCities: formData.step3?.serviceCities || [formData.step1.city],
      legalInfo: formData.step3?.legalInfo || {
        address: formData.step1.address,
        city: formData.step1.city,
        postalCode: ''
      },
      openingHours: formData.step3?.openingHours || 'Lun-Ven 8h-18h',
      emergencyAvailable: formData.step3?.emergencyAvailable || false,
      domain: formData.step3?.domain || 'monsite.fr',
      keywords: formData.step3?.keywords || []
    }
  }
  
  // Fallback - données par défaut
  return {
    companyName: 'Mon Entreprise',
    trade: 'electricien',
    description: 'Services professionnels',
    ownerName: 'Propriétaire',
    email: 'contact@monentreprise.fr',
    phone: '01 23 45 67 89',
    address: 'Adresse',
    city: 'Paris',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    services: [
      {
        id: 'service-1',
        name: 'Service Principal',
        description: 'Description du service'
      }
    ],
    serviceCities: ['Paris'],
    legalInfo: { address: 'Adresse', city: 'Paris', postalCode: '' },
    openingHours: 'Lun-Ven 8h-18h',
    emergencyAvailable: false,
    domain: 'monsite.fr',
    keywords: []
  }
}