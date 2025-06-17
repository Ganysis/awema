import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSiteStructure } from '@/lib/multi-page-generator'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: siteId } = await params
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 'index'

    // Récupérer le site
    const site = await prisma.siteInstance.findUnique({
      where: { id: siteId }
    })

    if (!site) {
      return new NextResponse('Site non trouvé', { status: 404 })
    }

    // Parser les données template
    const templateData = JSON.parse(site.templateData)
    
    // Générer la structure du site
    const siteStructure = generateSiteStructure(templateData)
    
    // Trouver la page demandée
    let targetPage = siteStructure.pages.find(p => p.filename === `${page}.html`)
    
    // Si pas trouvé, prendre la première page (index)
    if (!targetPage) {
      targetPage = siteStructure.pages.find(p => p.filename === 'index.html') || siteStructure.pages[0]
    }

    if (!targetPage) {
      return new NextResponse('Aucune page trouvée', { status: 404 })
    }

    let pageContent = targetPage.content

    // Injecter le CSS personnalisé si présent
    if (site.customCSS) {
      const customStyleTag = `<style>/* CSS Personnalisé */\n${site.customCSS}</style>`
      pageContent = pageContent.replace('</head>', `${customStyleTag}\n</head>`)
    }

    // Injecter le JS personnalisé si présent
    if (site.customJS) {
      const customScriptTag = `<script>/* JS Personnalisé */\n${site.customJS}</script>`
      pageContent = pageContent.replace('</body>', `${customScriptTag}\n</body>`)
    }

    // Ajouter un indicateur d'aperçu
    const previewIndicator = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 8px 16px;
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        z-index: 9999;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      ">
        🔍 Mode Aperçu - ${targetPage.title} | 
        <a href="?page=index" style="color: white; margin: 0 8px;">Accueil</a>
        <a href="?page=contact" style="color: white; margin: 0 8px;">Contact</a>
        <a href="?page=mentions-legales" style="color: white; margin: 0 8px;">Mentions</a>
      </div>
      <div style="height: 40px;"></div>
    `
    
    pageContent = pageContent.replace('<body>', `<body>${previewIndicator}`)

    return new NextResponse(pageContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('Erreur lors de la génération de l\'aperçu:', error)
    return new NextResponse('Erreur lors de la génération de l\'aperçu', { status: 500 })
  }
}