import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Créer un nouveau client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, email, phone, company, domain, trade } = body

    // Vérifier les champs obligatoires
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Nom, email et entreprise sont obligatoires' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur admin (ou le premier utilisateur disponible)
    const adminUser = await prisma.user.findFirst({
      orderBy: { createdAt: 'asc' }
    })
    
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Aucun utilisateur administrateur trouvé' },
        { status: 500 }
      )
    }

    // Créer le client
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone: phone || null,
        company,
        domain: domain || null,
        trade: trade || null,
        status: 'NOUVEAU',
        userId: adminUser.id
      }
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error: any) {
    console.error('Erreur lors de la création du client:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Un client avec cet email existe déjà' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la création du client' },
      { status: 500 }
    )
  }
}

// Récupérer tous les clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        forms: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        projects: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })

    return NextResponse.json(clients)
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des clients' },
      { status: 500 }
    )
  }
}