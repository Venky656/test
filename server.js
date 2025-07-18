const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Google Gemini AI will be initialized dynamically with user's API key

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure directories exist
const ensureDirectories = async () => {
    await fs.ensureDir('./temp');
    await fs.ensureDir('./output');
    await fs.ensureDir('./public');
};

// LaTeX template generation prompt
const createLatexPrompt = (resumeData) => {
    return `You are a LaTeX expert. Convert the following resume data into a clean, professional LaTeX format using the moderncv class. The output should be ATS-friendly (no images, simple formatting, readable fonts).

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Requirements:
1. Use the moderncv document class with a clean style
2. Include all provided information in a structured format
3. Make it ATS-friendly (no graphics, images, or complex formatting)
4. Use standard LaTeX packages only
5. Ensure proper spacing and readability
6. Format should be professional and modern

Please generate ONLY the complete LaTeX code, starting with \\documentclass and ending with \\end{document}. Do not include any explanations or markdown formatting.`;
};

// API Routes

// Generate LaTeX from resume data
app.post('/api/generate-latex', async (req, res) => {
    try {
        const resumeData = req.body;
        const apiKey = req.headers['x-api-key'] || process.env.GEMINI_API_KEY;
        
        if (!resumeData) {
            return res.status(400).json({ error: 'Resume data is required' });
        }

        if (!apiKey) {
            return res.status(400).json({ error: 'Google Gemini API key is required. Please provide your API key in the form.' });
        }

        // Validate API key format (basic check)
        if (!apiKey.startsWith('AI') || apiKey.length < 30) {
            return res.status(400).json({ 
                error: 'Invalid API key format. Please provide a valid Google Gemini API key starting with "AI".' 
            });
        }

        // Generate LaTeX using Gemini AI with provided API key
        const genAIInstance = new GoogleGenerativeAI(apiKey);
        const model = genAIInstance.getGenerativeModel({ model: "gemini-pro" });
        const prompt = createLatexPrompt(resumeData);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let latexCode = response.text();

        // Clean up the response (remove markdown formatting if present)
        latexCode = latexCode.replace(/```latex/g, '').replace(/```/g, '').trim();

        // Generate unique filename
        const filename = `resume_${uuidv4()}.tex`;
        const filepath = path.join(__dirname, 'temp', filename);

        // Save LaTeX file
        await fs.writeFile(filepath, latexCode);

        res.json({
            success: true,
            filename: filename,
            latexCode: latexCode
        });

    } catch (error) {
        console.error('Error generating LaTeX:', error);
        res.status(500).json({ 
            error: 'Failed to generate LaTeX', 
            details: error.message 
        });
    }
});

// Compile LaTeX to PDF
app.post('/api/compile-pdf', async (req, res) => {
    try {
        const { filename } = req.body;
        
        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        const texPath = path.join(__dirname, 'temp', filename);
        const outputDir = path.join(__dirname, 'output');
        const baseName = path.basename(filename, '.tex');
        const pdfPath = path.join(outputDir, `${baseName}.pdf`);

        // Check if LaTeX file exists
        if (!await fs.pathExists(texPath)) {
            return res.status(404).json({ error: 'LaTeX file not found' });
        }

        // Compile LaTeX to PDF using pdflatex
        const pdflatex = spawn('pdflatex', [
            '-output-directory', outputDir,
            '-interaction=nonstopmode',
            texPath
        ]);

        let stderr = '';
        pdflatex.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        pdflatex.on('close', async (code) => {
            if (code === 0 && await fs.pathExists(pdfPath)) {
                res.json({
                    success: true,
                    pdfPath: `/api/download-pdf/${baseName}.pdf`
                });
            } else {
                console.error('PDF compilation failed:', stderr);
                res.status(500).json({ 
                    error: 'PDF compilation failed', 
                    details: stderr 
                });
            }
        });

    } catch (error) {
        console.error('Error compiling PDF:', error);
        res.status(500).json({ 
            error: 'Failed to compile PDF', 
            details: error.message 
        });
    }
});

// Download PDF
app.get('/api/download-pdf/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const pdfPath = path.join(__dirname, 'output', filename);

        if (!await fs.pathExists(pdfPath)) {
            return res.status(404).json({ error: 'PDF file not found' });
        }

        res.download(pdfPath, filename, (err) => {
            if (err) {
                console.error('Error downloading PDF:', err);
                res.status(500).json({ error: 'Failed to download PDF' });
            }
        });

    } catch (error) {
        console.error('Error in download:', error);
        res.status(500).json({ error: 'Download failed' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Resume Generator API is running' });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const startServer = async () => {
    await ensureDirectories();
    app.listen(PORT, () => {
        console.log(`Resume Generator server running on port ${PORT}`);
        console.log(`Visit http://localhost:${PORT} to use the application`);
    });
};

startServer().catch(console.error);