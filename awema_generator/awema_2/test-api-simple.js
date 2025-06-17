const http = require('http')

function testSimpleAPI() {
  const testData = { message: 'hello' }
  const postData = JSON.stringify(testData)
  
  const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/api/test-preview',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`)
    
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    
    res.on('end', () => {
      console.log('Response:', body)
    })
  })

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`)
  })

  req.write(postData)
  req.end()
}

console.log('Testing simple API...')
testSimpleAPI()