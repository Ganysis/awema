import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const { siteId } = params
    const url = new URL(request.url)
    const filePath = url.searchParams.get('file') || 'index.html'

    // Chemin vers le fichier demandé
    const sitesDir = path.join(process.cwd(), 'public', 'generated-sites')
    const siteDir = path.join(sitesDir, siteId)
    const fullPath = path.join(siteDir, filePath)

    // Vérifications de sécurité
    if (!fullPath.startsWith(siteDir)) {
      return NextResponse.json({ error: 'Path traversal detected' }, { status: 400 })
    }

    // Vérifier que le fichier existe
    try {
      await fs.access(fullPath)
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Lire le contenu
    const content = await fs.readFile(fullPath, 'utf-8')

    // Si c'est un fichier HTML, ajouter le bandeau de construction
    if (filePath.endsWith('.html')) {
      const modifiedHTML = content.replace(
        '<body>',
        `<body>
          <div id="construction-banner" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, #10b981, #059669);
            color: white;
            padding: 8px 16px;
            text-align: center;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          ">
            🚧 Site en construction - Aperçu par AWEMA | 📄 ${filePath} 🚧
          </div>
          <script>
            // Ajuster le body pour compenser le bandeau
            document.body.style.paddingTop = '40px';
            
            // Intercepter les liens pour rester dans la prévisualisation
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('a[href$=".html"]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                  link.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = '/api/preview/${siteId}?file=' + href;
                  });
                }
              });
            });
          </script>`
      )

      return new NextResponse(modifiedHTML, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      })
    }

    // Pour les autres types de fichiers
    const mimeTypes: { [key: string]: string } = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    }

    const ext = path.extname(filePath).toLowerCase()
    const mimeType = mimeTypes[ext] || 'text/plain'

    return new NextResponse(content, {
      headers: {
        'Content-Type': mimeType,
      },
    })

  } catch (error) {
    console.error('Erreur prévisualisation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}