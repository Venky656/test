#!/bin/bash

# Resume Generator Setup Script
echo "🚀 Setting up Mass Coders Resume Generator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "⚠️ pdflatex is not installed. PDF compilation will not work."
    echo "Please install a LaTeX distribution:"
    echo "- Ubuntu/Debian: sudo apt-get install texlive-latex-recommended texlive-fonts-recommended"
    echo "- macOS: Install MacTeX from https://www.tug.org/mactex/"
    echo "- Windows: Install MiKTeX from https://miktex.org/"
else
    echo "✅ pdflatex found: $(pdflatex --version | head -n1)"
fi

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p temp output templates

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Environment file created. Please edit .env with your settings."
else
    echo "⚠️ Environment file already exists."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Google Gemini API key"
echo "2. Run 'npm start' to start the server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For development mode: npm run dev"
echo ""