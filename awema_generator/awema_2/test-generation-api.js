const http = require('http')

function makePostRequest(projectId) {
  const data = JSON.stringify({})
  
  const options = {
    hostname: 'localhost',
    port: 3002,
    path: `/api/projects/${projectId}/generate`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`)
    console.log(`Headers: ${JSON.stringify(res.headers)}`)
    
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    
    res.on('end', () => {
      console.log('Response body:', body)
      try {
        const result = JSON.parse(body)
        if (result.success) {
          console.log('🎉 Site généré avec succès !')
          console.log(`📂 Site ID: ${result.siteId}`)
          console.log(`🔗 URL de prévisualisation: ${result.previewUrl}`)
        } else {
          console.log('❌ Erreur:', result.error)
        }
      } catch (e) {
        console.log('❌ Erreur de parsing JSON:', e.message)
      }
    })
  })

  req.on('error', (e) => {
    console.error(`❌ Erreur de requête: ${e.message}`)
  })

  req.write(data)
  req.end()
}

// Utiliser l'ID du projet test
const projectId = 'cmbjqww7o0001j1opl377ib96'
console.log(`🚀 Test de génération pour le projet: ${projectId}`)
makePostRequest(projectId)