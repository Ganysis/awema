import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params

    const articles = await prisma.article.findMany({
      where: { siteId },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des articles' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params
    const { 
      title, 
      slug, 
      excerpt, 
      content, 
      featuredImage,
      metaTitle,
      metaDescription,
      keywords,
      status,
      authorName,
      authorEmail
    } = await request.json()

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

    // Générer un slug unique si nécessaire
    let finalSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    // Vérifier l'unicité du slug
    const existingArticle = await prisma.article.findUnique({
      where: {
        siteId_slug: {
          siteId,
          slug: finalSlug
        }
      }
    })

    if (existingArticle) {
      finalSlug = `${finalSlug}-${Date.now()}`
    }

    // Créer l'article
    const article = await prisma.article.create({
      data: {
        siteId,
        title,
        slug: finalSlug,
        excerpt,
        content,
        featuredImage,
        metaTitle,
        metaDescription,
        keywords,
        status: status || 'DRAFT',
        authorName: authorName || 'Admin',
        authorEmail: authorEmail || 'admin@awema.fr',
        publishedAt: status === 'PUBLISHED' ? new Date() : null
      }
    })

    // Enregistrer l'historique
    await prisma.editHistory.create({
      data: {
        siteId,
        entityType: 'article',
        entityId: article.id,
        action: 'create',
        changes: JSON.stringify({ title, status }),
        editorEmail: authorEmail || 'admin@awema.fr',
        editorType: 'admin'
      }
    })

    return NextResponse.json({
      success: true,
      article,
      message: 'Article créé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
}