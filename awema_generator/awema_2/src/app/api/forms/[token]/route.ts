import { NextRequest, NextResponse } from 'next/server'
import { getFormData } from '@/lib/forms'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const formData = await getFormData(token)

    if (!formData) {
      return NextResponse.json(
        { error: 'Formulaire non trouvé ou expiré' },
        { status: 404 }
      )
    }

    return NextResponse.json(formData)
  } catch (error) {
    console.error('Erreur lors de la récupération du formulaire:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du formulaire' },
      { status: 500 }
    )
  }
}