const http = require('http')

const routes = [
  '/',
  '/dashboard',
  '/dashboard/cms',
  '/api/cms/sites',
  '/client-cms/egsl.pro'
]

async function testRoute(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    }

    const req = http.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => body += chunk)
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          success: res.statusCode < 400
        })
      })
    })

    req.on('error', (e) => {
      resolve({
        path,
        status: 'ERROR',
        success: false,
        error: e.message
      })
    })

    req.setTimeout(5000, () => {
      resolve({
        path,
        status: 'TIMEOUT',
        success: false
      })
    })

    req.end()
  })
}

async function testAllRoutes() {
  console.log('🧪 Test des routes AWEMA 2...\n')
  
  for (const route of routes) {
    const result = await testRoute(route)
    const status = result.success ? '✅' : '❌'
    console.log(`${status} ${route} - ${result.status}`)
  }

  console.log('\n🔗 URLs importantes:')
  console.log('   🏠 Dashboard: http://localhost:3000/dashboard')
  console.log('   🎛️ CMS Admin: http://localhost:3000/dashboard/cms')
  console.log('   👤 Client CMS: http://localhost:3000/client-cms/egsl.pro')
  console.log('   📝 Formulaire: http://localhost:3000/form/[token]')
}

testAllRoutes()