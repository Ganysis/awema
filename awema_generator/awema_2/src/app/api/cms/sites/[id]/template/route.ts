import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { pageType, templateId } = await request.json()
    const { id: siteId } = await params

    // Vérifier que le site existe
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return NextResponse.json({ error: 'Site non trouvé' }, { status: 404 })
    }

    // Mettre à jour le template approprié
    const updateData: any = {}
    if (pageType === 'homeTemplate') {
      updateData.homeTemplate = templateId
    } else if (pageType === 'serviceTemplate') {
      updateData.serviceTemplate = templateId
    } else if (pageType === 'contactTemplate') {
      updateData.contactTemplate = templateId
    }

    const updatedSite = await prisma.siteInstance.update({
      where: { id: siteId },
      data: updateData
    })

    // Enregistrer dans l'historique
    await prisma.editHistory.create({
      data: {
        siteId,
        entityType: 'template',
        entityId: templateId,
        action: 'template_change',
        changes: JSON.stringify({ pageType, oldTemplate: site[pageType as keyof typeof site], newTemplate: templateId }),
        editorEmail: 'admin@awema.com', // TODO: récupérer depuis la session
        editorType: 'admin'
      }
    })

    return NextResponse.json(updatedSite)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du template:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}