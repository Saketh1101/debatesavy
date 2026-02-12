// Quick test script
const fetch = require('node-fetch');

async function test() {
    try {
        console.log('Testing AI endpoint...');
        const response = await fetch('http://localhost:3000/api/test-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Hello, give me a debate tip' })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

test();
