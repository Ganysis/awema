import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params
    const contentData = await request.json()

    // Vérifier que le site existe
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return NextResponse.json({ error: 'Site non trouvé' }, { status: 404 })
    }

    // Chercher le contenu existant
    const existingContent = await prisma.pageContent.findUnique({
      where: {
        siteId_pageType_pageSlug: {
          siteId,
          pageType: contentData.pageType,
          pageSlug: contentData.pageSlug || null
        }
      }
    })

    let result
    if (existingContent) {
      // Mettre à jour
      result = await prisma.pageContent.update({
        where: { id: existingContent.id },
        data: {
          title: contentData.title,
          metaTitle: contentData.metaTitle,
          metaDescription: contentData.metaDescription,
          sections: JSON.stringify(contentData.sections),
          version: existingContent.version + 1
        }
      })
    } else {
      // Créer
      result = await prisma.pageContent.create({
        data: {
          siteId,
          pageType: contentData.pageType,
          pageSlug: contentData.pageSlug,
          title: contentData.title,
          metaTitle: contentData.metaTitle,
          metaDescription: contentData.metaDescription,
          sections: JSON.stringify(contentData.sections)
        }
      })
    }

    // Enregistrer dans l'historique
    await prisma.editHistory.create({
      data: {
        siteId,
        entityType: 'content',
        entityId: result.id,
        action: existingContent ? 'update' : 'create',
        changes: JSON.stringify({ pageType: contentData.pageType, sections: contentData.sections }),
        editorEmail: 'admin@awema.com', // TODO: récupérer depuis la session
        editorType: 'admin'
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du contenu:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}