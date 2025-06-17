import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClientForm } from '@/lib/forms'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params

    // Vérifier que le client existe
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client non trouvé' },
        { status: 404 }
      )
    }

    // Créer le formulaire
    const token = await createClientForm(clientId)
    
    // Mettre à jour le statut du client
    await prisma.client.update({
      where: { id: clientId },
      data: { status: 'FORMULAIRE_ENVOYE' }
    })

    // Générer l'URL du formulaire
    const formUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/form/${token}`

    return NextResponse.json({
      success: true,
      token,
      formUrl,
      message: 'Formulaire créé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la création du formulaire:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du formulaire' },
      { status: 500 }
    )
  }
}