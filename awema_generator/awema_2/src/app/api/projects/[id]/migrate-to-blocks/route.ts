// API Route pour migrer un site existant vers le système de blocs
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { migrateLegacySiteToBlocks } from '@/lib/blocks/form-integration'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    const { 
      createBackup = true,
      style = 'standard',
      preserveCustomizations = true 
    } = await request.json()

    // Récupérer le projet et ses instances de site
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        siteInstances: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        client: true
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    const latestSite = project.siteInstances[0]
    if (!latestSite) {
      return NextResponse.json(
        { error: 'Aucune instance de site trouvée pour ce projet' },
        { status: 400 }
      )
    }

    // Vérifier si le site n'est pas déjà migré
    const metadata = latestSite.metadata ? JSON.parse(latestSite.metadata) : {}
    if (metadata.generationMethod === 'BLOCKS_SYSTEM') {
      return NextResponse.json(
        { error: 'Ce site utilise déjà le système de blocs' },
        { status: 400 }
      )
    }

    // Parser les données template existantes
    const templateData = JSON.parse(latestSite.templateData)

    // Créer une sauvegarde si demandé
    let backupSiteId = null
    if (createBackup) {
      const backupSite = await prisma.siteInstance.create({
        data: {
          projectId: project.id,
          templateName: `${latestSite.templateName}-backup`,
          templateData: latestSite.templateData,
          generatedContent: latestSite.generatedContent,
          status: 'ARCHIVE',
          metadata: JSON.stringify({
            ...metadata,
            isBackup: true,
            originalSiteId: latestSite.id,
            backupDate: new Date().toISOString()
          })
        }
      })
      backupSiteId = backupSite.id
    }

    // Effectuer la migration
    const migrationResult = await migrateLegacySiteToBlocks(
      latestSite.id,
      templateData
    )

    if (!migrationResult.success) {
      return NextResponse.json(
        { 
          error: 'Échec de la migration',
          warnings: migrationResult.migrationReport.warnings,
          backupSiteId
        },
        { status: 500 }
      )
    }

    // Créer la nouvelle instance de site avec blocs
    const newSiteInstance = await prisma.siteInstance.create({
      data: {
        projectId: project.id,
        templateName: `${style}-blocks-migrated`,
        templateData: latestSite.templateData,
        generatedContent: JSON.stringify({
          pages: [], // Sera rempli par les blocs
          migration: migrationResult.migrationReport
        }),
        status: 'GENERE',
        metadata: JSON.stringify({
          generationMethod: 'BLOCKS_SYSTEM',
          migratedFrom: latestSite.id,
          migrationDate: new Date().toISOString(),
          style,
          preserveCustomizations,
          backupSiteId
        })
      }
    })

    // Créer la page d'accueil avec les nouveaux blocs
    const homePageContent = await prisma.pageContent.create({
      data: {
        siteId: newSiteInstance.id,
        pageType: 'home',
        pageSlug: 'index',
        title: `${templateData.companyName} - ${templateData.trade}`,
        sections: JSON.stringify([]), // Legacy vide
        metadata: JSON.stringify({
          migratedBlocks: true,
          originalTemplate: latestSite.templateName
        })
      }
    })

    // Créer les blocs individuels
    for (let i = 0; i < migrationResult.newBlocks.length; i++) {
      const block = migrationResult.newBlocks[i]
      await prisma.pageBlock.create({
        data: {
          pageContentId: homePageContent.id,
          blockType: block.type,
          blockVariant: block.variant,
          order: i + 1,
          config: JSON.stringify(block.options),
          content: JSON.stringify(block.data),
          styles: JSON.stringify({ style: block.style }),
          isVisible: true
        }
      })
    }

    // Marquer l'ancien site comme obsolète
    await prisma.siteInstance.update({
      where: { id: latestSite.id },
      data: {
        status: 'OBSOLETE',
        metadata: JSON.stringify({
          ...metadata,
          migratedTo: newSiteInstance.id,
          migrationDate: new Date().toISOString()
        })
      }
    })

    // Mettre à jour le projet
    await prisma.project.update({
      where: { id: projectId },
      data: {
        templateData: JSON.stringify({
          ...templateData,
          generationMethod: 'BLOCKS_SYSTEM',
          lastMigration: new Date().toISOString()
        })
      }
    })

    return NextResponse.json({
      success: true,
      newSiteInstanceId: newSiteInstance.id,
      backupSiteId,
      migrationReport: migrationResult.migrationReport,
      newBlocks: migrationResult.newBlocks.map(block => ({
        type: block.type,
        variant: block.variant,
        id: block.id
      })),
      stats: {
        convertedBlocks: migrationResult.newBlocks.length,
        convertedElements: migrationResult.migrationReport.convertedElements.length,
        warnings: migrationResult.migrationReport.warnings.length,
        recommendations: migrationResult.migrationReport.recommendations.length
      },
      previewUrl: `/preview/${newSiteInstance.id}`,
      message: 'Migration vers le système de blocs réussie'
    })

  } catch (error) {
    console.error('Erreur migration vers blocs:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la migration',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET - Analyse de faisabilité de migration
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id

    // Récupérer le projet et ses données
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        siteInstances: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    const latestSite = project.siteInstances[0]
    if (!latestSite) {
      return NextResponse.json(
        { error: 'Aucune instance de site trouvée' },
        { status: 400 }
      )
    }

    // Analyser les données existantes
    const templateData = JSON.parse(latestSite.templateData)
    const metadata = latestSite.metadata ? JSON.parse(latestSite.metadata) : {}

    // Vérifier si déjà migré
    if (metadata.generationMethod === 'BLOCKS_SYSTEM') {
      return NextResponse.json({
        canMigrate: false,
        reason: 'Site déjà migré vers le système de blocs',
        currentSystem: 'BLOCKS_SYSTEM',
        migrationDate: metadata.migrationDate
      })
    }

    // Analyser la complexité de migration
    const analysisResult = {
      canMigrate: true,
      complexity: 'SIMPLE', // SIMPLE, MODERATE, COMPLEX
      estimatedTime: '2-5 minutes',
      preservableElements: [],
      potentialIssues: [],
      recommendations: [],
      benefits: []
    }

    // Analyser les éléments conservables
    if (templateData.companyName) analysisResult.preservableElements.push('Nom de l\'entreprise')
    if (templateData.services?.length > 0) analysisResult.preservableElements.push(`${templateData.services.length} services`)
    if (templateData.primaryColor) analysisResult.preservableElements.push('Couleurs personnalisées')
    if (templateData.logoUrl) analysisResult.preservableElements.push('Logo')
    if (templateData.serviceCities?.length > 0) analysisResult.preservableElements.push(`${templateData.serviceCities.length} villes de service`)

    // Détecter les problèmes potentiels
    if (!templateData.services || templateData.services.length === 0) {
      analysisResult.potentialIssues.push('Aucun service défini - sera générés automatiquement')
      analysisResult.complexity = 'MODERATE'
    }

    if (!templateData.primaryColor || !templateData.secondaryColor) {
      analysisResult.potentialIssues.push('Couleurs manquantes - couleurs par défaut utilisées')
    }

    // Templates complexes
    const complexTemplates = ['custom', 'advanced', 'enterprise']
    if (complexTemplates.some(t => latestSite.templateName.includes(t))) {
      analysisResult.complexity = 'COMPLEX'
      analysisResult.estimatedTime = '5-15 minutes'
      analysisResult.potentialIssues.push('Template complexe - vérification manuelle recommandée')
    }

    // Recommandations
    analysisResult.recommendations = [
      'Créer une sauvegarde avant migration',
      'Vérifier les couleurs et styles après migration',
      'Tester la responsivité sur mobile',
      'Optimiser le SEO avec plus de pages locales'
    ]

    // Bénéfices de la migration
    analysisResult.benefits = [
      'Design moderne et professionnel 2025',
      'Système modulaire flexible',
      'Meilleur SEO et performance',
      'Animations et effets visuels avancés',
      'Responsive design optimisé',
      'Facilité de maintenance et mise à jour'
    ]

    // Calculer le score de bénéfice
    let benefitScore = 70 // Score de base
    if (templateData.services?.length > 3) benefitScore += 10
    if (templateData.serviceCities?.length > 5) benefitScore += 10
    if (templateData.logoUrl) benefitScore += 5
    if (templateData.keywords?.length > 5) benefitScore += 5

    return NextResponse.json({
      canMigrate: analysisResult.canMigrate,
      analysis: analysisResult,
      currentData: {
        templateName: latestSite.templateName,
        servicesCount: templateData.services?.length || 0,
        citiesCount: templateData.serviceCities?.length || 0,
        hasLogo: !!templateData.logoUrl,
        hasCustomColors: !!(templateData.primaryColor && templateData.secondaryColor)
      },
      benefitScore,
      recommendation: benefitScore > 80 ? 'HIGHLY_RECOMMENDED' : 
                     benefitScore > 60 ? 'RECOMMENDED' : 'OPTIONAL'
    })

  } catch (error) {
    console.error('Erreur analyse migration:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'analyse',
        details: error.message 
      },
      { status: 500 }
    )
  }
}