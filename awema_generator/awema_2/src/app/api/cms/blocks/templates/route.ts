import { NextRequest, NextResponse } from 'next/server'
import { BLOCK_TEMPLATES, BLOCK_CATEGORIES, getBlockTemplatesByCategory, getBlockTemplate } from '@/lib/blocks/block-templates'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    if (category) {
      const templates = getBlockTemplatesByCategory(category)
      return NextResponse.json({
        templates,
        category,
        total: templates.length
      })
    }

    return NextResponse.json({
      templates: BLOCK_TEMPLATES,
      categories: BLOCK_CATEGORIES,
      total: BLOCK_TEMPLATES.length
    })

  } catch (error) {
    console.error('Erreur lors du chargement des templates de blocs:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des templates de blocs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { templateId, config } = body

    const template = getBlockTemplate(templateId)
    if (!template) {
      return NextResponse.json(
        { error: 'Template de bloc non trouvé' },
        { status: 404 }
      )
    }

    // Créer un nouvel instance de bloc basé sur le template
    const blockInstance = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      blockType: template.id,
      template: template.template,
      styles: template.styles,
      config: { ...template.config, ...config },
      content: {},
      isVisible: true,
      order: 0,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      block: blockInstance,
      message: 'Bloc créé avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la création du bloc:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du bloc' },
      { status: 500 }
    )
  }
}