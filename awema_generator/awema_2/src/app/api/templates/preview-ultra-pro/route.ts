import { NextRequest, NextResponse } from 'next/server'
import { generateUltraProTemplate, isUltraProTemplateImplemented } from '@/lib/templates/ultra-pro-index'
import { TemplateData } from '@/lib/template'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    console.log('API Preview Ultra Pro called')
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
    console.log('Checking if template is implemented...')

    // Vérifier si le template est implémenté
    if (!isUltraProTemplateImplemented(templateId)) {
      return NextResponse.json(
        { error: `Template ${templateId} pas encore implémenté` },
        { status: 400 }
      )
    }

    console.log('Template is implemented, generating...')

    // Convertir les données de test au format TemplateData
    const templateData: TemplateData = {
      companyName: testData.companyName,
      trade: testData.category || 'Artisan',
      description: testData.description,
      ownerName: testData.ownerName,
      email: testData.email,
      phone: testData.phone,
      address: testData.address,
      city: 'Paris',
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      services: testData.services.map((service: any) => ({
        id: service.id,
        name: service.name,
        description: service.description || `Service de ${service.name.toLowerCase()}`,
        detailedDescription: service.detailedDescription || `Description détaillée de ${service.name.toLowerCase()}`,
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

    // Générer la navigation de test
    const navigation = [
      { label: 'Accueil', href: 'index.html' },
      {
        label: 'Services',
        href: '#',
        children: testData.services.map((service: any) => ({
          label: service.name,
          href: `service-${service.id}.html`
        }))
      },
      { label: 'Contact', href: 'contact.html' }
    ]

    // Générer le contenu HTML avec le template ultra-pro
    console.log('Generating HTML with data:', templateData)
    const htmlContent = generateUltraProTemplate(templateId, templateData, navigation)
    console.log('HTML generated, length:', htmlContent.length)

    // Créer un dossier de prévisualisation temporaire
    const previewId = `preview-${templateId}-${Date.now()}`
    const previewDir = join(process.cwd(), 'public', 'template-previews', previewId)
    
    try {
      mkdirSync(previewDir, { recursive: true })
    } catch (error) {
      console.log('Directory already exists or created')
    }

    // Sauvegarder le fichier HTML
    const htmlPath = join(previewDir, 'index.html')
    writeFileSync(htmlPath, htmlContent, 'utf-8')

    // Retourner l'URL de prévisualisation
    const previewUrl = `/template-previews/${previewId}/index.html`

    return NextResponse.json({
      success: true,
      previewUrl,
      templateId,
      message: `Prévisualisation du template ${templateId} générée avec succès`
    })

  } catch (error) {
    console.error('Erreur lors de la génération de la prévisualisation:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { error: `Erreur lors de la génération de la prévisualisation: ${error.message}` },
      { status: 500 }
    )
  }
}