import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    const domain = request.headers.get('X-Domain')

    if (!token || !domain) {
      return NextResponse.json(
        { error: 'Token ou domaine manquant' },
        { status: 401 }
      )
    }

    // Décoder le token simple (en production, utiliser JWT)
    const [siteId] = Buffer.from(token, 'base64').toString().split(':')

    // Vérifier que le site existe et correspond au domaine
    const site = await prisma.siteInstance.findFirst({
      where: {
        id: siteId,
        domain: domain
      },
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
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    // Récupérer les articles du site
    const articles = await prisma.article.findMany({
      where: { siteId: site.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      site: {
        id: site.id,
        domain: site.domain,
        project: {
          name: site.project.name,
          client: {
            company: site.project.client.company
          }
        }
      },
      articles
    })
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement du dashboard' },
      { status: 500 }
    )
  }
}