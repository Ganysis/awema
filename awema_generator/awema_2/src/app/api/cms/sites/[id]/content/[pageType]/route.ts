import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; pageType: string }> }
) {
  try {
    const { id: siteId, pageType } = await params

    // Vérifier que le site existe
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return NextResponse.json({ error: 'Site non trouvé' }, { status: 404 })
    }

    // Récupérer le contenu de la page
    const pageContent = await prisma.pageContent.findUnique({
      where: {
        siteId_pageType_pageSlug: {
          siteId,
          pageType,
          pageSlug: null
        }
      }
    })

    if (!pageContent) {
      // Retourner un contenu par défaut
      return NextResponse.json({
        pageType,
        title: pageType === 'home' ? 'Accueil' : pageType === 'service' ? 'Nos Services' : 'Contact',
        metaTitle: '',
        metaDescription: '',
        sections: []
      })
    }

    // Retourner le contenu avec les sections parsées
    return NextResponse.json({
      id: pageContent.id,
      pageType: pageContent.pageType,
      pageSlug: pageContent.pageSlug,
      title: pageContent.title,
      metaTitle: pageContent.metaTitle,
      metaDescription: pageContent.metaDescription,
      sections: JSON.parse(pageContent.sections)
    })
  } catch (error) {
    console.error('Erreur lors du chargement du contenu:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}