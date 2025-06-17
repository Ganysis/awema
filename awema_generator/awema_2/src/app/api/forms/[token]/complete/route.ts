import { NextRequest, NextResponse } from 'next/server'
import { completeForm } from '@/lib/forms'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    
    // Compléter le formulaire et mettre à jour le statut du client
    const form = await completeForm(token)
    
    // Créer un projet pour ce client
    const project = await prisma.project.create({
      data: {
        name: `Site web - ${form.client.company}`,
        clientId: form.clientId,
        userId: form.client.userId,
        status: 'COLLECTE',
        formData: form.formData
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Formulaire complété avec succès',
      projectId: project.id
    })
  } catch (error: any) {
    console.error('Erreur lors de la finalisation:', error)
    
    if (error.message === 'Formulaire non trouvé') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la finalisation' },
      { status: 500 }
    )
  }
}