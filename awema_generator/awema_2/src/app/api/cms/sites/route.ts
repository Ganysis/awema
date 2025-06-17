import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const sites = await prisma.siteInstance.findMany({
      include: {
        project: {
          include: {
            client: true
          }
        },
        _count: {
          select: {
            articles: true,
            pages: true,
            mediaFiles: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(sites)
  } catch (error) {
    console.error('Erreur lors du chargement des sites CMS:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des sites CMS' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, domain, clientUsername, clientPassword } = await request.json()

    // Vérifier que le projet existe et est prêt
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: true }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    if (project.status !== 'PRET' && project.status !== 'LIVRE') {
      return NextResponse.json(
        { error: 'Le projet doit être généré avant d\'activer le CMS' },
        { status: 400 }
      )
    }

    // Hasher le mot de passe client (simple pour le dev, utiliser bcrypt en prod)
    const hashedPassword = Buffer.from(clientPassword).toString('base64')

    // Créer l'instance CMS
    const siteInstance = await prisma.siteInstance.create({
      data: {
        projectId,
        domain,
        clientUsername,
        clientPassword: hashedPassword,
        templateData: project.siteData || '{}',
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
        isLive: false
      }
    })

    // Mettre à jour le statut du projet
    await prisma.project.update({
      where: { id: projectId },
      data: { status: 'LIVRE' }
    })

    return NextResponse.json({
      success: true,
      siteId: siteInstance.id,
      message: 'Site CMS créé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la création du site CMS:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du site CMS' },
      { status: 500 }
    )
  }
}