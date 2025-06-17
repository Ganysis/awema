import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSiteStructure } from '@/lib/multi-page-generator'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params

    // Récupérer le site et ses données
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId },
      include: {
        project: true
      }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Site non trouvé' },
        { status: 404 }
      )
    }

    // Parser les données template actuelles
    const templateData = JSON.parse(site.templateData)
    
    // Générer la nouvelle structure du site
    const siteStructure = generateSiteStructure(templateData)
    
    // Créer le dossier du site s'il n'existe pas
    const sitesDir = path.join(process.cwd(), 'public', 'generated-sites')
    const siteDir = path.join(sitesDir, site.project.siteFolder || `site-${siteId.slice(-8)}`)
    
    await fs.mkdir(sitesDir, { recursive: true })
    await fs.mkdir(siteDir, { recursive: true })
    
    // Écrire toutes les pages
    for (const page of siteStructure.pages) {
      let pageContent = page.content
      
      // Injecter le CSS personnalisé si présent
      if (site.customCSS) {
        const customStyleTag = `<style>${site.customCSS}</style>`
        pageContent = pageContent.replace('</head>', `${customStyleTag}\n</head>`)
      }
      
      // Injecter le JS personnalisé si présent
      if (site.customJS) {
        const customScriptTag = `<script>${site.customJS}</script>`
        pageContent = pageContent.replace('</body>', `${customScriptTag}\n</body>`)
      }
      
      await fs.writeFile(path.join(siteDir, page.filename), pageContent)
    }

    // Enregistrer l'historique
    await prisma.editHistory.create({
      data: {
        siteId,
        entityType: 'template',
        entityId: siteId,
        action: 'regenerate',
        changes: JSON.stringify({
          pagesGenerated: siteStructure.pages.length,
          timestamp: new Date().toISOString()
        }),
        editorEmail: 'admin@awema.fr', // TODO: récupérer l'utilisateur connecté
        editorType: 'admin'
      }
    })

    return NextResponse.json({
      success: true,
      message: `Site régénéré avec succès - ${siteStructure.pages.length} pages créées`,
      pagesGenerated: siteStructure.pages.length
    })
  } catch (error) {
    console.error('Erreur lors de la régénération du site:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la régénération du site' },
      { status: 500 }
    )
  }
}