import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params

    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        forms: {
          orderBy: { createdAt: 'desc' },
          include: {
            client: true
          }
        },
        projects: {
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

    return NextResponse.json(client)
  } catch (error) {
    console.error('Erreur lors de la récupération du client:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du client' },
      { status: 500 }
    )
  }
}