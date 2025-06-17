import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params
    const { templateData, customCSS, customJS } = await request.json()

    // Vérifier que le site existe
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    // Mettre à jour le site
    const updatedSite = await prisma.siteInstance.update({
      where: { id: siteId },
      data: {
        templateData: JSON.stringify(templateData),
        customCSS: customCSS || null,
        customJS: customJS || null,
        updatedAt: new Date()
      }
    })

    // Enregistrer l'historique des modifications
    await prisma.editHistory.create({
      data: {
        siteId,
        entityType: 'template',
        entityId: siteId,
        action: 'update',
        changes: JSON.stringify({
          templateData: templateData,
          customCSS: customCSS,
          customJS: customJS
        }),
        editorEmail: 'admin@awema.fr', // TODO: récupérer l'utilisateur connecté
        editorType: 'admin'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Site mis à jour avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du site:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du site' },
      { status: 500 }
    )
  }
}