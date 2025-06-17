import { NextRequest, NextResponse } from 'next/server'
import { saveFormData } from '@/lib/forms'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const body = await request.json()
    const { step, data } = body

    if (!step || !data) {
      return NextResponse.json(
        { error: 'Étape et données requises' },
        { status: 400 }
      )
    }

    await saveFormData(token, step, data)

    return NextResponse.json({ 
      success: true,
      message: 'Données sauvegardées'
    })
  } catch (error: any) {
    console.error('Erreur lors de la sauvegarde:', error)
    
    if (error.message === 'Formulaire non trouvé ou expiré') {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    )
  }
}