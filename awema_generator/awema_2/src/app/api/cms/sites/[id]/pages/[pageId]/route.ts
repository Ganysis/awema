import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const siteId = params.id
    const pageId = params.pageId

    // Si pageId commence par "template-", c'est une page template
    if (pageId.startsWith('template-')) {
      const pageType = pageId.replace('template-', '')
      
      // Récupérer les données du site pour les pages template
      const site = await prisma.siteInstance.findUnique({
        where: { id: siteId },
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

      const templateData = JSON.parse(site.templateData || '{}')

      // Générer la page template selon le type
      let templatePage
      switch (pageType) {
        case 'home':
          templatePage = {
            id: 'template-home',
            pageType: 'home',
            title: 'Accueil',
            slug: '',
            isTemplate: true,
            blocks: generateHomeBlocks(templateData),
            templateData
          }
          break
        case 'contact':
          templatePage = {
            id: 'template-contact',
            pageType: 'contact',
            title: 'Contact',
            slug: 'contact',
            isTemplate: true,
            blocks: generateContactBlocks(templateData),
            templateData
          }
          break
        default:
          if (pageType.startsWith('service-')) {
            const serviceId = pageType.replace('service-', '')
            const service = templateData.services?.find((s: any) => s.id === serviceId)
            if (service) {
              templatePage = {
                id: `template-service-${serviceId}`,
                pageType: 'service',
                title: service.name,
                slug: `service-${serviceId}`,
                isTemplate: true,
                blocks: generateServiceBlocks(templateData, service),
                templateData,
                serviceData: service
              }
            }
          }
      }

      if (!templatePage) {
        return NextResponse.json(
          { error: 'Page template non trouvée' },
          { status: 404 }
        )
      }

      return NextResponse.json(templatePage)
    }

    // Page CMS normale
    const page = await prisma.pageContent.findUnique({
      where: { id: pageId },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        },
        versions: {
          orderBy: { version: 'desc' },
          take: 10
        },
        site: {
          include: {
            project: {
              include: {
                client: true
              }
            }
          }
        }
      }
    })

    if (!page || page.siteId !== siteId) {
      return NextResponse.json(
        { error: 'Page non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json(page)

  } catch (error) {
    console.error('Erreur lors du chargement de la page:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement de la page' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const siteId = params.id
    const pageId = params.pageId
    const body = await request.json()
    const { blocks, title, sections, editorEmail = 'admin@system.com' } = body

    const page = await prisma.pageContent.findUnique({
      where: { id: pageId },
      include: {
        blocks: true,
        versions: {
          orderBy: { version: 'desc' },
          take: 1
        }
      }
    })

    if (!page || page.siteId !== siteId) {
      return NextResponse.json(
        { error: 'Page non trouvée' },
        { status: 404 }
      )
    }

    const nextVersion = (page.versions[0]?.version || 0) + 1

    // Mettre à jour la page
    const updatedPage = await prisma.pageContent.update({
      where: { id: pageId },
      data: {
        title: title || page.title,
        sections: JSON.stringify(sections || {}),
        version: nextVersion,
        updatedAt: new Date()
      }
    })

    // Supprimer les anciens blocs
    await prisma.pageBlock.deleteMany({
      where: { pageContentId: pageId }
    })

    // Créer les nouveaux blocs
    if (blocks && blocks.length > 0) {
      const blockData = blocks.map((block: any, index: number) => ({
        pageContentId: pageId,
        blockType: block.blockType,
        order: index,
        config: JSON.stringify(block.config || {}),
        content: JSON.stringify(block.content || {}),
        styles: block.styles || null,
        isVisible: block.isVisible !== false
      }))

      await prisma.pageBlock.createMany({
        data: blockData
      })
    }

    // Créer un snapshot de version
    await prisma.pageVersion.create({
      data: {
        pageContentId: pageId,
        version: nextVersion,
        title: title || page.title,
        blocksData: JSON.stringify(blocks || []),
        sectionsData: JSON.stringify(sections || {}),
        changes: 'Page mise à jour via éditeur',
        editorEmail,
        editorType: 'ADMIN'
      }
    })

    // Récupérer la page mise à jour
    const finalPage = await prisma.pageContent.findUnique({
      where: { id: pageId },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        },
        versions: {
          orderBy: { version: 'desc' },
          take: 5
        }
      }
    })

    return NextResponse.json({
      success: true,
      page: finalPage,
      message: 'Page mise à jour avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la page:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la page' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; pageId: string } }
) {
  try {
    const siteId = params.id
    const pageId = params.pageId

    const page = await prisma.pageContent.findUnique({
      where: { id: pageId }
    })

    if (!page || page.siteId !== siteId) {
      return NextResponse.json(
        { error: 'Page non trouvée' },
        { status: 404 }
      )
    }

    // Supprimer la page et toutes ses relations (cascade)
    await prisma.pageContent.delete({
      where: { id: pageId }
    })

    return NextResponse.json({
      success: true,
      message: 'Page supprimée avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la suppression de la page:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la page' },
      { status: 500 }
    )
  }
}

// Fonctions helper pour générer les blocs des pages template
function generateHomeBlocks(templateData: any) {
  return [
    {
      id: 'hero-1',
      blockType: 'hero-standard',
      order: 0,
      config: {
        title: `${templateData.trade || 'Professionnel'} ${templateData.city || ''}`,
        subtitle: templateData.description || 'Service professionnel de qualité',
        backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080',
        buttonPrimary: {
          text: 'Devis Gratuit',
          href: 'contact.html'
        },
        buttonSecondary: {
          text: 'Nos Services',
          href: '#services'
        }
      },
      isVisible: true
    },
    {
      id: 'services-1',
      blockType: 'services-grid-3',
      order: 1,
      config: {
        title: 'Nos Services',
        subtitle: 'Des solutions professionnelles adaptées à vos besoins',
        services: (templateData.services || []).slice(0, 3).map((service: any) => ({
          icon: '⚙️',
          title: service.name,
          description: service.description || `Service de ${service.name.toLowerCase()}`,
          href: `service-${service.id}.html`
        }))
      },
      isVisible: true
    }
  ]
}

function generateContactBlocks(templateData: any) {
  return [
    {
      id: 'contact-1',
      blockType: 'contact-form',
      order: 0,
      config: {
        title: 'Contactez-nous',
        subtitle: 'Demandez votre devis gratuit',
        phone: templateData.phone || '01 23 45 67 89',
        email: templateData.email || 'contact@entreprise.fr',
        address: templateData.address || 'Adresse non renseignée'
      },
      isVisible: true
    }
  ]
}

function generateServiceBlocks(templateData: any, service: any) {
  return [
    {
      id: 'service-hero-1',
      blockType: 'hero-standard',
      order: 0,
      config: {
        title: service.name,
        subtitle: service.description || `Service professionnel de ${service.name.toLowerCase()}`,
        backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080',
        buttonPrimary: {
          text: 'Demander un devis',
          href: 'contact.html'
        },
        buttonSecondary: {
          text: 'Retour',
          href: 'index.html'
        }
      },
      isVisible: true
    },
    {
      id: 'service-content-1',
      blockType: 'text-content',
      order: 1,
      config: {
        title: `Pourquoi choisir notre service ${service.name} ?`,
        content: `<p>Notre équipe experte vous accompagne pour tous vos besoins en ${service.name.toLowerCase()}.</p>
                  <ul>
                    <li>✅ Intervention rapide</li>
                    <li>✅ Devis gratuit</li>
                    <li>✅ Garantie travaux</li>
                    <li>✅ Matériel professionnel</li>
                  </ul>`
      },
      isVisible: true
    }
  ]
}