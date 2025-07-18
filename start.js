const { spawn } = require('child_process');

console.log('🚀 Starting Mass Coders Resume Generator...');
console.log('📝 Built by Dodagatta Nihar');
console.log('🔑 Uses dynamic Google Gemini API keys');
console.log('');

// Start the server
const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
});

server.on('exit', (code) => {
    console.log(`🔄 Server exited with code ${code}`);
    if (code !== 0) {
        console.log('🔄 Restarting server...');
        setTimeout(() => {
            require('./start.js');
        }, 1000);
    }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Resume Generator...');
    server.kill();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down Resume Generator...');
    server.kill();
    process.exit(0);
});