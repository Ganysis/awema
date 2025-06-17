// API Route pour générer un site avec le système de blocs à partir des données formulaire
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSiteFromFormData, AWEMAFormData } from '@/lib/blocks/form-integration'

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params
    const { 
      style = 'ultra-pro',
      includeLocalSeo = true,
      customBlocks = []
    } = await request.json()

    // Récupérer les données du formulaire
    const form = await prisma.clientForm.findUnique({
      where: { token },
      include: { client: true }
    })

    if (!form) {
      return NextResponse.json(
        { error: 'Formulaire non trouvé' },
        { status: 404 }
      )
    }

    if (form.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Formulaire expiré' },
        { status: 410 }
      )
    }

    if (!form.formData) {
      return NextResponse.json(
        { error: 'Données du formulaire manquantes' },
        { status: 400 }
      )
    }

    // Parser les données du formulaire
    const formData: AWEMAFormData = JSON.parse(form.formData)

    // Valider que toutes les étapes sont complètes
    if (!formData.step1 || !formData.step2 || !formData.step3) {
      return NextResponse.json(
        { error: 'Formulaire incomplet. Toutes les étapes doivent être remplies.' },
        { status: 400 }
      )
    }

    // Générer le site avec le système de blocs
    const siteResult = generateSiteFromFormData(formData, {
      style,
      includeLocalSeo,
      customBlocks
    })

    // Créer ou mettre à jour le projet
    let project = await prisma.project.findFirst({
      where: { clientId: form.clientId }
    })

    if (!project) {
      project = await prisma.project.create({
        data: {
          clientId: form.clientId,
          name: `Projet ${formData.step1.companyName}`,
          description: formData.step1.description,
          trade: formData.step1.trade,
          status: 'EN_COURS',
          templateData: JSON.stringify(formData),
          generationMethod: 'BLOCKS_SYSTEM'
        }
      })
    }

    // Créer l'instance de site avec les blocs
    const siteInstance = await prisma.siteInstance.create({
      data: {
        projectId: project.id,
        templateName: `${style}-blocks`,
        templateData: JSON.stringify(formData),
        generatedContent: JSON.stringify(siteResult.pages),
        status: 'GENERE',
        metadata: JSON.stringify({
          analytics: siteResult.analytics,
          navigation: siteResult.navigation,
          linking: siteResult.linking,
          generationMethod: 'BLOCKS_SYSTEM',
          style,
          includeLocalSeo,
          customBlocks
        })
      }
    })

    // Créer les pages avec leurs blocs dans la base
    for (const page of siteResult.pages) {
      const pageContent = await prisma.pageContent.create({
        data: {
          siteId: siteInstance.id,
          pageType: page.type,
          pageSlug: page.filename.replace('.html', ''),
          title: page.title,
          sections: JSON.stringify([]), // Legacy - vide pour les nouveaux sites
          metadata: JSON.stringify({
            filename: page.filename,
            generatedWith: 'BLOCKS_SYSTEM'
          })
        }
      })

      // Créer les blocs individuels
      for (let i = 0; i < page.blocks.length; i++) {
        const block = page.blocks[i]
        await prisma.pageBlock.create({
          data: {
            pageContentId: pageContent.id,
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
    }

    // Marquer le formulaire comme complété
    await prisma.clientForm.update({
      where: { token },
      data: {
        completedAt: new Date(),
        currentStep: 4 // Étape "Généré avec blocs"
      }
    })

    // Mettre à jour le statut du client
    await prisma.client.update({
      where: { id: form.clientId },
      data: {
        status: 'SITE_GENERE'
      }
    })

    return NextResponse.json({
      success: true,
      projectId: project.id,
      siteInstanceId: siteInstance.id,
      analytics: siteResult.analytics,
      pages: siteResult.pages.map(p => ({
        filename: p.filename,
        title: p.title,
        type: p.type,
        blocksCount: p.blocks.length
      })),
      recommendations: siteResult.analytics.recommendations,
      previewUrl: `/preview/${siteInstance.id}`,
      message: 'Site généré avec succès avec le système de blocs modulaire'
    })

  } catch (error) {
    console.error('Erreur génération site avec blocs:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération du site',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

// GET - Prévisualisation de la génération
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params
    const { searchParams } = new URL(request.url)
    const style = searchParams.get('style') || 'ultra-pro'
    const includeLocalSeo = searchParams.get('includeLocalSeo') !== 'false'

    // Récupérer les données du formulaire
    const form = await prisma.clientForm.findUnique({
      where: { token },
      include: { client: true }
    })

    if (!form) {
      return NextResponse.json(
        { error: 'Formulaire non trouvé' },
        { status: 404 }
      )
    }

    if (!form.formData) {
      return NextResponse.json(
        { error: 'Données du formulaire manquantes' },
        { status: 400 }
      )
    }

    // Parser les données du formulaire
    const formData: AWEMAFormData = JSON.parse(form.formData)

    // Générer une prévisualisation (sans sauvegarder)
    const preview = generateSiteFromFormData(formData, {
      style: style as any,
      includeLocalSeo,
      customBlocks: []
    })

    return NextResponse.json({
      success: true,
      preview: {
        totalPages: preview.pages.length,
        pageTypes: preview.pages.reduce((acc, page) => {
          acc[page.type] = (acc[page.type] || 0) + 1
          return acc
        }, {}),
        blockTypes: preview.analytics.blockTypes,
        seoScore: preview.analytics.seoScore,
        recommendations: preview.analytics.recommendations
      },
      analytics: preview.analytics,
      estimatedTime: '30-60 secondes'
    })

  } catch (error) {
    console.error('Erreur prévisualisation génération:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la prévisualisation',
        details: error.message 
      },
      { status: 500 }
    )
  }
}