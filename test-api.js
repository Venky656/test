const { GoogleGenerativeAI } = require('@google/generative-ai');

// Test script to verify dynamic API key functionality
async function testDynamicApiKey(apiKey) {
    console.log('🧪 Testing dynamic API key functionality...');
    
    if (!apiKey) {
        console.log('❌ No API key provided');
        console.log('Usage: node test-api.js YOUR_GEMINI_API_KEY');
        return;
    }
    
    try {
        // Validate API key format
        if (!apiKey.startsWith('AI') || apiKey.length < 30) {
            console.log('❌ Invalid API key format');
            console.log('Expected: API key should start with "AI" and be at least 30 characters long');
            return;
        }
        
        console.log('✅ API key format looks valid');
        console.log(`📝 API key: ${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}`);
        
        // Initialize Gemini AI with provided API key
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        console.log('🔄 Testing API connection...');
        
        // Simple test prompt
        const testPrompt = "Generate a simple LaTeX document with just a title 'Test Resume' and one paragraph saying 'This is a test.'";
        
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ API connection successful!');
        console.log('📄 Generated LaTeX snippet:');
        console.log('---');
        console.log(text.substring(0, 200) + '...');
        console.log('---');
        console.log('🎉 Dynamic API key functionality is working correctly!');
        
    } catch (error) {
        console.log('❌ API test failed:');
        console.log(`Error: ${error.message}`);
        
        if (error.message.includes('API_KEY_INVALID')) {
            console.log('🔧 Solution: Please check that your API key is correct and active');
        } else if (error.message.includes('quota')) {
            console.log('🔧 Solution: You may have exceeded your API quota');
        } else {
            console.log('🔧 Solution: Please check your internet connection and API key');
        }
    }
}

// Get API key from command line argument
const apiKey = process.argv[2];
testDynamicApiKey(apiKey);