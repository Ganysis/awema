import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const templateSources = await prisma.templateSource.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    })

    // Parser les champs JSON
    const parsedSources = templateSources.map(source => ({
      ...source,
      sectors: JSON.parse(source.sectors),
      editableFields: JSON.parse(source.editableFields),
      defaultData: JSON.parse(source.defaultData)
    }))

    return NextResponse.json(parsedSources)
  } catch (error) {
    console.error('Erreur lors du chargement des templates sources:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Vérifier si le template existe
    const existingTemplate = await prisma.templateSource.findUnique({
      where: { templateId: data.templateId }
    })

    let result
    if (existingTemplate) {
      // Mettre à jour
      result = await prisma.templateSource.update({
        where: { id: existingTemplate.id },
        data: {
          name: data.name,
          description: data.description,
          htmlStructure: data.htmlStructure,
          cssStyles: data.cssStyles,
          jsScripts: data.jsScripts,
          editableFields: typeof data.editableFields === 'string' ? data.editableFields : JSON.stringify(data.editableFields),
          defaultData: typeof data.defaultData === 'string' ? data.defaultData : JSON.stringify(data.defaultData),
          sectors: typeof data.sectors === 'string' ? data.sectors : JSON.stringify(data.sectors),
          style: data.style,
          isActive: data.isActive
        }
      })
    } else {
      // Créer
      result = await prisma.templateSource.create({
        data: {
          templateId: data.templateId,
          category: data.category,
          name: data.name,
          description: data.description,
          htmlStructure: data.htmlStructure,
          cssStyles: data.cssStyles,
          jsScripts: data.jsScripts,
          editableFields: typeof data.editableFields === 'string' ? data.editableFields : JSON.stringify(data.editableFields),
          defaultData: typeof data.defaultData === 'string' ? data.defaultData : JSON.stringify(data.defaultData),
          sectors: typeof data.sectors === 'string' ? data.sectors : JSON.stringify(data.sectors),
          style: data.style,
          isActive: data.isActive
        }
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du template source:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newTemplate = await prisma.templateSource.create({
      data: {
        templateId: data.templateId,
        category: data.category,
        name: data.name,
        description: data.description,
        htmlStructure: data.htmlStructure,
        cssStyles: data.cssStyles,
        jsScripts: data.jsScripts || '',
        editableFields: JSON.stringify(data.editableFields || {}),
        defaultData: JSON.stringify(data.defaultData || {}),
        sectors: JSON.stringify(data.sectors || []),
        style: data.style,
        isActive: data.isActive !== false
      }
    })

    return NextResponse.json(newTemplate)
  } catch (error) {
    console.error('Erreur lors de la création du template source:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}