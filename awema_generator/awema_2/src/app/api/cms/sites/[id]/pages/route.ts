import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siteId = params.id

    // Récupérer toutes les pages du site avec leurs blocs
    const pages = await prisma.pageContent.findMany({
      where: { siteId },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        },
        versions: {
          orderBy: { version: 'desc' },
          take: 5 // Dernières 5 versions
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    // Aussi récupérer les pages statiques du template
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId },
      include: {
        project: {
          include: {
            client: true
          }
        }
      }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    // Pages par défaut du template
    const defaultPages = [
      {
        id: 'home',
        pageType: 'home',
        title: 'Accueil',
        slug: '',
        isTemplate: true,
        canDelete: false
      },
      {
        id: 'contact',
        pageType: 'contact',
        title: 'Contact',
        slug: 'contact',
        isTemplate: true,
        canDelete: false
      },
      {
        id: 'mentions-legales',
        pageType: 'legal',
        title: 'Mentions légales',
        slug: 'mentions-legales',
        isTemplate: true,
        canDelete: false
      }
    ]

    // Ajouter les services comme pages
    const templateData = JSON.parse(site.templateData || '{}')
    const servicePages = (templateData.services || []).map((service: any) => ({
      id: `service-${service.id}`,
      pageType: 'service',
      title: service.name,
      slug: `service-${service.id}`,
      isTemplate: true,
      canDelete: false,
      serviceData: service
    }))

    return NextResponse.json({
      pages: pages.map(page => ({
        ...page,
        isTemplate: false,
        canDelete: true
      })),
      templatePages: [...defaultPages, ...servicePages],
      site: {
        id: site.id,
        domain: site.domain,
        project: site.project
      }
    })

  } catch (error) {
    console.error('Erreur lors du chargement des pages:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des pages' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const siteId = params.id
    const body = await request.json()
    const { pageType, pageSlug, title, sections, blocks, editorEmail = 'admin@system.com' } = body

    // Vérifier que le site existe
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    // Créer ou mettre à jour la page
    const existingPage = await prisma.pageContent.findUnique({
      where: {
        siteId_pageType_pageSlug: {
          siteId,
          pageType,
          pageSlug: pageSlug || null
        }
      },
      include: {
        blocks: true,
        versions: {
          orderBy: { version: 'desc' },
          take: 1
        }
      }
    })

    let pageContent
    let nextVersion = 1

    if (existingPage) {
      // Mise à jour
      nextVersion = (existingPage.versions[0]?.version || 0) + 1
      
      pageContent = await prisma.pageContent.update({
        where: { id: existingPage.id },
        data: {
          title,
          sections: JSON.stringify(sections || {}),
          version: nextVersion,
          updatedAt: new Date()
        }
      })

      // Supprimer les anciens blocs
      await prisma.pageBlock.deleteMany({
        where: { pageContentId: existingPage.id }
      })
    } else {
      // Création
      pageContent = await prisma.pageContent.create({
        data: {
          siteId,
          pageType,
          pageSlug,
          title,
          sections: JSON.stringify(sections || {}),
          version: 1
        }
      })
    }

    // Créer les nouveaux blocs
    if (blocks && blocks.length > 0) {
      const blockData = blocks.map((block: any, index: number) => ({
        pageContentId: pageContent.id,
        blockType: block.blockType,
        order: index,
        config: JSON.stringify(block.config || {}),
        content: JSON.stringify(block.content || {}),
        styles: block.styles || null,
        isVisible: block.isVisible !== false
      }))

      await prisma.pageBlock.createMany({
        data: blockData
      })
    }

    // Créer un snapshot de version
    await prisma.pageVersion.create({
      data: {
        pageContentId: pageContent.id,
        version: nextVersion,
        title,
        blocksData: JSON.stringify(blocks || []),
        sectionsData: JSON.stringify(sections || {}),
        changes: existingPage ? 'Page mise à jour' : 'Page créée',
        editorEmail,
        editorType: 'ADMIN'
      }
    })

    // Récupérer la page complète
    const updatedPage = await prisma.pageContent.findUnique({
      where: { id: pageContent.id },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        },
        versions: {
          orderBy: { version: 'desc' },
          take: 5
        }
      }
    })

    return NextResponse.json({
      success: true,
      page: updatedPage,
      message: existingPage ? 'Page mise à jour avec succès' : 'Page créée avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la page:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde de la page' },
      { status: 500 }
    )
  }
}