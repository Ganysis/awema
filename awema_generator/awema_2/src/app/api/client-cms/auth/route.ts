import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { domain, username, password } = await request.json()

    // Trouver le site par domaine
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

    // Vérifier les identifiants
    const storedPassword = Buffer.from(site.clientPassword, 'base64').toString()
    
    if (site.clientUsername !== username || storedPassword !== password) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    // Générer un token simple (en production, utiliser JWT)
    const token = Buffer.from(`${site.id}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      success: true,
      token,
      site: {
        id: site.id,
        domain: site.domain,
        project: {
          name: site.project.name,
          client: {
            company: site.project.client.company
          }
        }
      }
    })
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'authentification' },
      { status: 500 }
    )
  }
}