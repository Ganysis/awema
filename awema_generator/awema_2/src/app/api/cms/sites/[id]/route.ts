import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params

    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId },
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
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(site)
  } catch (error) {
    console.error('Erreur lors du chargement du site:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement du site' },
      { status: 500 }
    )
  }
}