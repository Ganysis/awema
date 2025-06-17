import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params

    // Vérifier que le projet existe et est prêt
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    if (project.status !== 'PRET') {
      return NextResponse.json(
        { error: 'Ce projet n\'est pas prêt pour la livraison' },
        { status: 400 }
      )
    }

    // Marquer comme livré
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'LIVRE',
        deliveredAt: new Date()
      }
    })

    // Mettre à jour le statut du client
    await prisma.client.update({
      where: { id: project.clientId },
      data: {
        status: 'LIVRE'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Projet marqué comme livré'
    })
  } catch (error) {
    console.error('Erreur lors de la livraison:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la livraison' },
      { status: 500 }
    )
  }
}