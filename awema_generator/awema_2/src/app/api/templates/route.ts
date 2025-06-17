import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BTP_TEMPLATES } from '@/lib/btp-templates'
import { ULTRA_PRO_TEMPLATES } from '@/lib/templates/ultra-pro-templates'

export async function GET() {
  try {
    const templates = await prisma.templateSource.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Erreur lors de la récupération des templates:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des templates' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'sync-btp-templates') {
      // Synchroniser les templates BTP
      const syncedTemplates = []
      
      for (const template of BTP_TEMPLATES) {
        const existing = await prisma.templateSource.findUnique({
          where: { templateId: template.id }
        })

        if (!existing) {
          const newTemplate = await prisma.templateSource.create({
            data: {
              templateId: template.id,
              category: template.category,
              name: template.name,
              description: template.description,
              htmlStructure: 'Generated content',
              cssStyles: 'Standard BTP styles',
              jsScripts: '',
              editableFields: JSON.stringify({
                name: true,
                description: true,
                colors: true,
                content: true
              }),
              defaultData: JSON.stringify({
                sectors: template.sectors,
                style: template.style,
                features: []
              }),
              sectors: JSON.stringify(template.sectors),
              style: template.style,
              isActive: true
            }
          })
          syncedTemplates.push(newTemplate)
        }
      }

      return NextResponse.json({
        success: true,
        message: `${syncedTemplates.length} templates BTP synchronisés`,
        synced: syncedTemplates.length
      })
    }

    if (action === 'sync-ultra-pro-templates') {
      // Synchroniser les templates Ultra Pro
      const syncedTemplates = []
      
      for (const template of ULTRA_PRO_TEMPLATES) {
        const existing = await prisma.templateSource.findUnique({
          where: { templateId: template.id }
        })

        if (!existing) {
          const newTemplate = await prisma.templateSource.create({
            data: {
              templateId: template.id,
              category: template.category,
              name: template.name,
              description: template.description,
              htmlStructure: 'Ultra Pro template structure',
              cssStyles: 'Ultra Pro premium styles',
              jsScripts: 'Ultra Pro animations and interactions',
              editableFields: JSON.stringify({
                name: true,
                description: true,
                colors: true,
                content: true,
                features: true,
                animations: true
              }),
              defaultData: JSON.stringify({
                style: template.style,
                features: template.features,
                colors: template.colors,
                animations: []
              }),
              sectors: JSON.stringify([template.category]),
              style: template.style,
              isActive: true
            }
          })
          syncedTemplates.push(newTemplate)
        }
      }

      return NextResponse.json({
        success: true,
        message: `${syncedTemplates.length} templates Ultra Pro synchronisés`,
        synced: syncedTemplates.length
      })
    }

    if (action === 'sync-all') {
      // Synchroniser tous les templates
      let totalSynced = 0

      // BTP Templates
      for (const template of BTP_TEMPLATES) {
        const existing = await prisma.templateSource.findUnique({
          where: { templateId: template.id }
        })

        if (!existing) {
          await prisma.templateSource.create({
            data: {
              templateId: template.id,
              category: template.category,
              name: template.name,
              description: template.description,
              htmlStructure: 'Generated content',
              cssStyles: 'Standard BTP styles',
              jsScripts: '',
              editableFields: JSON.stringify({
                name: true,
                description: true,
                colors: true,
                content: true
              }),
              defaultData: JSON.stringify({
                sectors: template.sectors,
                style: template.style,
                features: []
              }),
              sectors: JSON.stringify(template.sectors),
              style: template.style,
              isActive: true
            }
          })
          totalSynced++
        }
      }

      // Ultra Pro Templates
      for (const template of ULTRA_PRO_TEMPLATES) {
        const existing = await prisma.templateSource.findUnique({
          where: { templateId: template.id }
        })

        if (!existing) {
          await prisma.templateSource.create({
            data: {
              templateId: template.id,
              category: template.category,
              name: template.name,
              description: template.description,
              htmlStructure: 'Ultra Pro template structure',
              cssStyles: 'Ultra Pro premium styles',
              jsScripts: 'Ultra Pro animations and interactions',
              editableFields: JSON.stringify({
                name: true,
                description: true,
                colors: true,
                content: true,
                features: true,
                animations: true
              }),
              defaultData: JSON.stringify({
                style: template.style,
                features: template.features,
                colors: template.colors,
                animations: []
              }),
              sectors: JSON.stringify([template.category]),
              style: template.style,
              isActive: true
            }
          })
          totalSynced++
        }
      }

      return NextResponse.json({
        success: true,
        message: `${totalSynced} templates synchronisés en base de données`,
        synced: totalSynced,
        total: BTP_TEMPLATES.length + ULTRA_PRO_TEMPLATES.length
      })
    }

    return NextResponse.json(
      { error: 'Action non reconnue' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Erreur lors de la synchronisation des templates:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la synchronisation des templates' },
      { status: 500 }
    )
  }
}