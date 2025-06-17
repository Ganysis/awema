import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain } = await params

    const site = await prisma.siteInstance.findUnique({
      where: { domain },
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

    // Ne pas exposer les informations sensibles
    const safeSite = {
      id: site.id,
      domain: site.domain,
      project: {
        name: site.project.name,
        client: {
          company: site.project.client.company
        }
      }
    }

    return NextResponse.json(safeSite)
  } catch (error) {
    console.error('Erreur lors du chargement du site:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement du site' },
      { status: 500 }
    )
  }
}