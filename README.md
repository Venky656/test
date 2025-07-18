# Mass Coders Resume Generator

An AI-powered Resume Generator that converts user input into professional, ATS-friendly LaTeX resumes using Google Gemini API.

![Resume Generator Demo](https://i.imgur.com/placeholder.jpg)

## 🚀 Features

- **🔑 Dynamic API Key**: Users provide their own Google Gemini API key - no server-side storage required
- **🤖 AI-Powered LaTeX Generation**: Uses Google Gemini API to convert structured data into professional LaTeX resume code
- **📊 ATS-Friendly**: Generates clean, simple resumes optimized for Applicant Tracking Systems
- **⚡ Real-time PDF Compilation**: Automatically compiles LaTeX to PDF using pdflatex
- **🎨 Modern UI**: Beautiful, responsive interface with smooth animations
- **➕ Dynamic Form Fields**: Add/remove experience, projects, and education entries
- **💾 Auto-save**: Automatically saves form data locally
- **👀 LaTeX Code Preview**: View and copy the generated LaTeX code
- **📥 One-Click Download**: Download your compiled PDF resume instantly
- **🔒 Privacy First**: API keys are only used for the current session and never stored

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher)
2. **LaTeX Distribution** (for PDF compilation):
   - **Linux**: `sudo apt-get install texlive-latex-recommended texlive-fonts-recommended`
   - **macOS**: Install MacTeX from [https://www.tug.org/mactex/](https://www.tug.org/mactex/)
   - **Windows**: Install MiKTeX from [https://miktex.org/](https://miktex.org/)
3. **Google Gemini API Key**: Each user needs their own (see setup below)

## 🔑 Google Gemini API Key Setup

Each user needs to provide their own Google Gemini API key for AI-powered resume generation:

### Steps to Get Your API Key:

1. **Visit [Google AI Studio](https://makersuite.google.com/app/apikey)**
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Copy the generated key** (starts with "AIza...")
5. **Paste it in the application form** when generating your resume

### Key Features:
- ✅ **Free to use** (with generous quotas)
- ✅ **No server storage** - your key is used only during your session
- ✅ **Privacy focused** - each user manages their own API access
- ✅ **Instant setup** - no complex authentication flows

### Testing Your API Key:
```bash
# Test your API key before using the application
node test-api.js YOUR_API_KEY_HERE
```

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/resume-generator.git
   cd resume-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   SESSION_SECRET=your_secure_session_secret
   JWT_SECRET=your_jwt_secret
   ```

4. **Verify LaTeX installation**:
   ```bash
   pdflatex --version
   ```

## 🚀 Usage

1. **Start the server**:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Navigate to `http://localhost:3000`

3. **Generate your resume**:
   - Enter your Google Gemini API key
   - Fill in your personal information
   - Add your experience, projects, and education
   - Click "Generate Resume"
   - Download your PDF resume

## 📁 Project Structure

```
resume-generator/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML page
│   ├── styles.css         # CSS styles
│   └── script.js          # JavaScript functionality
├── temp/                  # Temporary LaTeX files
├── output/                # Generated PDF files
├── server.js              # Express server
├── package.json           # Dependencies
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🔧 API Endpoints

### POST `/api/generate-latex`
Generates LaTeX code from resume data using Google Gemini API.

**Headers:**
- `X-API-Key`: Google Gemini API key
- `Content-Type`: application/json

**Request Body:**
```json
{
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "City, State",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": "https://johndoe.com"
  },
  "summary": "Professional summary...",
  "skills": "JavaScript, Python, React...",
  "experience": [...],
  "projects": [...],
  "education": [...],
  "certifications": "...",
  "languages": "..."
}
```

**Response:**
```json
{
  "success": true,
  "filename": "resume_unique-id.tex",
  "latexCode": "\\documentclass{moderncv}..."
}
```

### POST `/api/compile-pdf`
Compiles LaTeX file to PDF using pdflatex.

**Request Body:**
```json
{
  "filename": "resume_unique-id.tex"
}
```

**Response:**
```json
{
  "success": true,
  "pdfPath": "/api/download-pdf/resume_unique-id.pdf"
}
```

### GET `/api/download-pdf/:filename`
Downloads the compiled PDF file.

## 🎨 Customization

### LaTeX Template
The LaTeX template is generated by Google Gemini API. You can modify the prompt in `server.js` to customize the output format:

```javascript
const createLatexPrompt = (resumeData) => {
    return `Your custom prompt here...`;
};
```

### UI Styling
Modify `public/styles.css` to customize the appearance:
- Colors: Update CSS custom properties
- Layout: Modify grid layouts and spacing
- Animations: Add or modify CSS animations

### Form Fields
Add new form fields by:
1. Adding HTML elements in `public/index.html`
2. Updating the data collection in `public/script.js`
3. Modifying the LaTeX prompt to include new data

## 🔒 Security

- API keys are handled client-side and sent via secure headers
- Form data is validated on both client and server
- Temporary files are cleaned up automatically
- No sensitive data is stored permanently

## 🐛 Troubleshooting

### Common Issues

1. **"pdflatex command not found"**
   - Make sure LaTeX is properly installed
   - Add LaTeX bin directory to your PATH

2. **"API key invalid"**
   - Verify your Google Gemini API key
   - Check that the API is enabled in Google Cloud Console

3. **"PDF compilation failed"**
   - Check LaTeX logs in the console
   - Ensure all required LaTeX packages are installed

4. **Slow generation**
   - API calls may take 10-30 seconds
   - Consider implementing caching for repeated requests

### Development

To run in development mode with debugging:
```bash
DEBUG=resume-generator npm run dev
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dodagatta Nihar**
- Website: [https://masscoders.nihar.tech](https://masscoders.nihar.tech)
- GitHub: [@codenihar](https://github.com/codenihar)
- LinkedIn: [niharrdg](https://linkedin.com/in/niharrdg)

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) for AI-powered LaTeX generation
- [ModernCV](https://ctan.org/pkg/moderncv) LaTeX class for resume templates
- [Express.js](https://expressjs.com/) for the backend framework
- [Font Awesome](https://fontawesome.com/) for icons

## 📊 Stats

- ⭐ Star this repo if you found it helpful!
- 🐛 Report bugs in the Issues section
- 💡 Suggest new features

---

**Built with ❤️ by Mass Coders Community**