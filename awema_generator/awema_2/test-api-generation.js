const http = require('http');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

async function testGeneration() {
  try {
    console.log('🔄 Testing Ultra Pro generation API...');
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/projects/cmbjtiza40003j1zrb8tx34zz/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    console.log('📡 Making API call...');
    const response = await makeRequest(options);
    
    console.log('📊 Response status:', response.status);
    
    if (response.status === 200) {
      console.log('✅ Generation successful!');
      console.log('Result:', JSON.stringify(response.data, null, 2));
    } else {
      console.log('❌ Generation failed');
      console.log('Error response:', response.data);
    }
    
  } catch (error) {
    console.error('💥 Request error:', error.message);
  }
}

testGeneration();