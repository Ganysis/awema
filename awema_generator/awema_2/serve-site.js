const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const PORT = 8080
const SITE_DIR = '/home/Ganyc/Desktop/awema/awema_generator/awema_2/public/generated-sites/site-tgq8bnyq'

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url)
  let pathname = parsedUrl.pathname

  // Redirection vers index.html si racine
  if (pathname === '/') {
    pathname = '/index.html'
  }

  const filePath = path.join(SITE_DIR, pathname)
  
  // Vérifier si le fichier existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(`
        <h1>404 - Fichier non trouvé</h1>
        <p>Le fichier <code>${pathname}</code> n'existe pas.</p>
        <h2>Fichiers disponibles :</h2>
        <ul>
          <li><a href="/index.html">🏠 Page d'accueil</a></li>
          <li><a href="/contact.html">📞 Contact</a></li>
          <li><a href="/mentions-legales.html">⚖️ Mentions légales</a></li>
          <li><a href="/service-depannage.html">⚡ Service Dépannage</a></li>
          <li><a href="/service-installation.html">🔧 Service Installation</a></li>
          <li><a href="/depannage-paris.html">📍 Dépannage Paris</a></li>
          <li><a href="/installation-paris.html">📍 Installation Paris</a></li>
        </ul>
      `)
      return
    }

    // Déterminer le type MIME
    const ext = path.extname(filePath).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    // Lire et servir le fichier
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end('<h1>500 - Erreur serveur</h1>')
        return
      }

      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  })
})

server.listen(PORT, () => {
  console.log(`🌐 Serveur démarré sur http://localhost:${PORT}`)
  console.log('📂 Serveur les fichiers de:', SITE_DIR)
  console.log('')
  console.log('🔗 Liens de test:')
  console.log(`   🏠 http://localhost:${PORT}/index.html`)
  console.log(`   📞 http://localhost:${PORT}/contact.html`)
  console.log(`   ⚖️ http://localhost:${PORT}/mentions-legales.html`)
  console.log(`   ⚡ http://localhost:${PORT}/service-depannage.html`)
  console.log(`   🔧 http://localhost:${PORT}/service-installation.html`)
  console.log(`   📍 http://localhost:${PORT}/depannage-paris.html`)
  console.log('')
  console.log('Press Ctrl+C to stop')
})