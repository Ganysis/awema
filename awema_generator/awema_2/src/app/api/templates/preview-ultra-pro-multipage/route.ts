import { NextRequest, NextResponse } from 'next/server'
import { generateUltraProSiteStructure } from '@/lib/templates/ultra-pro-multi-page'
import { TemplateData } from '@/lib/template'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    console.log('API Preview Ultra Pro Multi-Page called')
    const body = await request.json()
    console.log('Body received:', body)
    
    const { templateId, testData } = body

    if (!templateId || !testData) {
      return NextResponse.json(
        { error: 'Template ID et données de test requis' },
        { status: 400 }
      )
    }

    console.log('Template ID:', templateId)

    // Convertir les données de test au format TemplateData complet
    const templateData: TemplateData = {
      companyName: testData.companyName,
      trade: testData.category || 'Artisan',
      description: testData.description,
      ownerName: testData.ownerName,
      email: testData.email,
      phone: testData.phone,
      address: testData.address,
      city: 'Paris',
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      services: testData.services.map((service: any) => ({
        id: service.id,
        name: service.name,
        description: service.description || `Service de ${service.name.toLowerCase()}`,
        detailedDescription: service.detailedDescription || `Description détaillée de ${service.name.toLowerCase()}. Nous proposons des solutions complètes et professionnelles adaptées à vos besoins.`,
        price: service.price || 'Sur devis'
      })),
      serviceCities: testData.zones || ['Paris', 'Boulogne-Billancourt', 'Neuilly-sur-Seine'],
      legalInfo: {
        address: testData.address,
        city: 'Paris',
        postalCode: '75001'
      },
      openingHours: 'Lun-Ven 8h-18h, Sam 9h-12h',
      emergencyAvailable: true,
      domain: `preview-${templateId}.demo.fr`,
      keywords: ['artisan', 'professionnel', 'paris', testData.category || 'service']
    }

    console.log('Generating multi-page site structure...')

    // Générer la structure complète du site avec toutes les pages
    const siteStructure = generateUltraProSiteStructure(templateId, templateData)

    // Créer un dossier de prévisualisation temporaire
    const previewId = `preview-${templateId}-multipage-${Date.now()}`
    const previewDir = join(process.cwd(), 'public', 'template-previews', previewId)
    
    try {
      mkdirSync(previewDir, { recursive: true })
      console.log('Preview directory created:', previewDir)
    } catch (error) {
      console.log('Directory already exists or created')
    }

    // Sauvegarder toutes les pages
    const savedPages = []
    for (const page of siteStructure.pages) {
      const pagePath = join(previewDir, page.filename)
      writeFileSync(pagePath, page.content, 'utf-8')
      savedPages.push({
        filename: page.filename,
        title: page.title,
        type: page.type,
        url: `/template-previews/${previewId}/${page.filename}`
      })
      console.log('Page saved:', page.filename)
    }

    // URL de base de prévisualisation
    const basePreviewUrl = `/template-previews/${previewId}`

    return NextResponse.json({
      success: true,
      basePreviewUrl,
      templateId,
      pages: savedPages,
      navigation: siteStructure.navigation,
      style: siteStructure.style,
      category: siteStructure.category,
      message: `Site complet ${templateId} généré avec ${savedPages.length} pages`
    })

  } catch (error) {
    console.error('Erreur lors de la génération multi-page:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { error: `Erreur lors de la génération multi-page: ${error.message}` },
      { status: 500 }
    )
  }
}