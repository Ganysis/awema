const http = require('http')

function testTemplatePreview() {
  const testData = {
    templateId: 'electricien-elite-pro',
    testData: {
      companyName: "Électricité Pro Demo",
      ownerName: "Jean Dupont", 
      phone: "01 23 45 67 89",
      email: "contact@demo.fr",
      address: "123 Rue de la République",
      city: "Paris",
      trade: "Électricien",
      description: "Démonstration du template ultra-professionnel",
      services: [
        { id: "service-1", name: "Installation électrique", description: "Installation complète" },
        { id: "service-2", name: "Dépannage urgent", description: "Intervention 24h/7j" },
        { id: "service-3", name: "Mise aux normes", description: "Conformité électrique" }
      ],
      serviceCities: ["Paris", "Boulogne-Billancourt", "Neuilly-sur-Seine"]
    }
  }
  
  const postData = JSON.stringify(testData)
  
  const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/api/templates/preview-ultra-pro',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
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
          console.log('🎉 Prévisualisation générée avec succès !')
          console.log(`🔗 URL de prévisualisation: http://localhost:3002${result.previewUrl}`)
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

  req.write(postData)
  req.end()
}

console.log('🚀 Test de prévisualisation des templates Ultra Pro...')
testTemplatePreview()