import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params

    // Vérifier que le client existe
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        forms: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client non trouvé' },
        { status: 404 }
      )
    }

    // Générer les URLs pour tous les formulaires
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001'
    const formLinks = client.forms.map(form => ({
      id: form.id,
      token: form.token,
      url: `${baseUrl}/form/${form.token}`,
      currentStep: form.currentStep,
      completedAt: form.completedAt,
      expiresAt: form.expiresAt,
      createdAt: form.createdAt,
      isExpired: new Date(form.expiresAt) < new Date(),
      isCompleted: !!form.completedAt
    }))

    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        name: client.name,
        company: client.company,
        status: client.status
      },
      forms: formLinks
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des liens:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des liens' },
      { status: 500 }
    )
  }
}