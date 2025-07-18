// Global variables
let currentFilename = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadSampleData();
});

// Initialize form with default values
function initializeForm() {
    updateExperienceFields();
    updateProjectFields();
    updateEducationFields();
}

// Load sample data for demonstration
function loadSampleData() {
    const sampleData = {
        fullName: 'Dodagatta Nihar',
        email: 'codenihar@gmail.com',
        phone: '+919999999999',
        location: 'India',
        linkedin: 'https://linkedin.com/in/niharrdg',
        github: 'https://github.com/codenihar',
        website: 'https://masscoders.nihar.tech',
        summary: 'Mern stack developer, made more than 50+ websites till date, machine learning engineer, teaching coding for free on my youtube and instagram, youtube - 120k subscribers, instagram 450k+ subscribers',
        skills: 'Web Development: HTML CSS Bootstrap React Node, Machine Learning: Pandas Numpy Scikit Learn Tensorflow'
    };

    // Populate form with sample data
    Object.keys(sampleData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = sampleData[key];
        }
    });
}

// Dynamic field generation functions
function updateExperienceFields() {
    const count = parseInt(document.getElementById('experienceCount').value) || 0;
    const container = document.getElementById('experienceContainer');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const experienceHtml = `
            <div class="experience-item fade-in">
                <h4><i class="fas fa-briefcase"></i> Experience ${i + 1}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="jobTitle${i}">Job Title</label>
                        <input type="text" id="jobTitle${i}" name="jobTitle${i}" 
                               placeholder="Software Engineer" 
                               value="${i === 0 ? 'Community Leader' : ''}">
                    </div>
                    <div class="form-group">
                        <label for="company${i}">Company</label>
                        <input type="text" id="company${i}" name="company${i}" 
                               placeholder="Tech Company Inc." 
                               value="${i === 0 ? 'Mass Coders' : ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="startDate${i}">Start Date</label>
                        <input type="date" id="startDate${i}" name="startDate${i}" 
                               value="${i === 0 ? '2023-06-28' : ''}">
                    </div>
                    <div class="form-group">
                        <label for="endDate${i}">End Date</label>
                        <input type="date" id="endDate${i}" name="endDate${i}">
                    </div>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="currentJob${i}" name="currentJob${i}" 
                               ${i === 0 ? 'checked' : ''} 
                               onchange="toggleEndDate(${i})"> 
                        I am currently working in this role
                    </label>
                </div>
                <div class="form-group">
                    <label for="jobDescription${i}">Job Description</label>
                    <textarea id="jobDescription${i}" name="jobDescription${i}" rows="4"
                              placeholder="Describe your responsibilities and achievements...">${i === 0 ? 'Teaching coding for free, taught python, c, web dev with mern and machine learning so far, actively engaging with my mass coders coding community, conducting regular workshops on various tech domains' : ''}</textarea>
                </div>
            </div>
        `;
        container.innerHTML += experienceHtml;
    }

    // Disable end date for current jobs
    for (let i = 0; i < count; i++) {
        toggleEndDate(i);
    }
}

function updateProjectFields() {
    const count = parseInt(document.getElementById('projectCount').value) || 0;
    const container = document.getElementById('projectContainer');
    container.innerHTML = '';

    const sampleProjects = [
        {
            title: 'AI Resume Generator',
            url: 'https://resume.masscoders.tech',
            description: 'built ai resume generator using streamlit and google gemini ai, which generates latex ats friendly resume which helps you land in your first job. Deployed on digital ocean, served by nginx'
        },
        {
            title: 'Mass Commerce',
            url: 'https://commerce.masscoders.tech',
            description: 'Full-stack e-commerce platform with modern UI/UX'
        }
    ];

    for (let i = 0; i < count; i++) {
        const project = sampleProjects[i] || { title: '', url: '', description: '' };
        const projectHtml = `
            <div class="project-item fade-in">
                <h4><i class="fas fa-code"></i> Project ${i + 1}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="projectTitle${i}">Project Title</label>
                        <input type="text" id="projectTitle${i}" name="projectTitle${i}" 
                               placeholder="Amazing Project" 
                               value="${project.title}">
                    </div>
                    <div class="form-group">
                        <label for="projectUrl${i}">Project URL</label>
                        <input type="url" id="projectUrl${i}" name="projectUrl${i}" 
                               placeholder="https://github.com/username/project" 
                               value="${project.url}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="projectDescription${i}">Project Description</label>
                    <textarea id="projectDescription${i}" name="projectDescription${i}" rows="4"
                              placeholder="Describe your project, technologies used, and impact...">${project.description}</textarea>
                </div>
            </div>
        `;
        container.innerHTML += projectHtml;
    }
}

function updateEducationFields() {
    const count = parseInt(document.getElementById('educationCount').value) || 0;
    const container = document.getElementById('educationContainer');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const educationHtml = `
            <div class="education-item fade-in">
                <h4><i class="fas fa-graduation-cap"></i> Education ${i + 1}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="degree${i}">Degree</label>
                        <input type="text" id="degree${i}" name="degree${i}" 
                               placeholder="Bachelor of Science in Computer Science" 
                               value="${i === 0 ? 'Artificial Intelligence and Machine Learning' : ''}">
                    </div>
                    <div class="form-group">
                        <label for="school${i}">School/University</label>
                        <input type="text" id="school${i}" name="school${i}" 
                               placeholder="University Name" 
                               value="${i === 0 ? 'UVCE' : ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="gradYear${i}">Graduation Year</label>
                        <input type="number" id="gradYear${i}" name="gradYear${i}" 
                               placeholder="2024" min="1950" max="2030" 
                               value="${i === 0 ? '2024' : ''}">
                    </div>
                    <div class="form-group">
                        <label for="gpa${i}">GPA/Grade (optional)</label>
                        <input type="text" id="gpa${i}" name="gpa${i}" 
                               placeholder="3.8" 
                               value="${i === 0 ? '8.65' : ''}">
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += educationHtml;
    }
}

// Toggle end date field for current jobs
function toggleEndDate(index) {
    const currentJobCheckbox = document.getElementById(`currentJob${index}`);
    const endDateInput = document.getElementById(`endDate${index}`);
    
    if (currentJobCheckbox && endDateInput) {
        endDateInput.disabled = currentJobCheckbox.checked;
        if (currentJobCheckbox.checked) {
            endDateInput.value = '';
        }
    }
}

// Toggle password visibility for API key
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        button.className = 'fas fa-eye';
    }
}



// Collect form data
function collectFormData() {
    const formData = {
        apiKey: document.getElementById('apiKey').value,
        personalInfo: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            website: document.getElementById('website').value
        },
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        certifications: document.getElementById('certifications').value,
        languages: document.getElementById('languages').value,
        experience: [],
        projects: [],
        education: []
    };

    // Collect experience data
    const experienceCount = parseInt(document.getElementById('experienceCount').value) || 0;
    for (let i = 0; i < experienceCount; i++) {
        const experience = {
            jobTitle: document.getElementById(`jobTitle${i}`)?.value || '',
            company: document.getElementById(`company${i}`)?.value || '',
            startDate: document.getElementById(`startDate${i}`)?.value || '',
            endDate: document.getElementById(`endDate${i}`)?.value || '',
            current: document.getElementById(`currentJob${i}`)?.checked || false,
            description: document.getElementById(`jobDescription${i}`)?.value || ''
        };
        if (experience.jobTitle || experience.company) {
            formData.experience.push(experience);
        }
    }

    // Collect project data
    const projectCount = parseInt(document.getElementById('projectCount').value) || 0;
    for (let i = 0; i < projectCount; i++) {
        const project = {
            title: document.getElementById(`projectTitle${i}`)?.value || '',
            url: document.getElementById(`projectUrl${i}`)?.value || '',
            description: document.getElementById(`projectDescription${i}`)?.value || ''
        };
        if (project.title) {
            formData.projects.push(project);
        }
    }

    // Collect education data
    const educationCount = parseInt(document.getElementById('educationCount').value) || 0;
    for (let i = 0; i < educationCount; i++) {
        const education = {
            degree: document.getElementById(`degree${i}`)?.value || '',
            school: document.getElementById(`school${i}`)?.value || '',
            year: document.getElementById(`gradYear${i}`)?.value || '',
            gpa: document.getElementById(`gpa${i}`)?.value || ''
        };
        if (education.degree || education.school) {
            formData.education.push(education);
        }
    }

    return formData;
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    
    const form = document.getElementById('resumeForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    const form = document.getElementById('resumeForm');
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show loading overlay
function showLoading(show = true) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.style.display = 'flex';
        overlay.classList.add('fade-in');
    } else {
        overlay.style.display = 'none';
        overlay.classList.remove('fade-in');
    }
}

// Update loading text
function updateLoadingText(text) {
    const loadingText = document.getElementById('loadingText');
    if (loadingText) {
        loadingText.textContent = text;
    }
}

// Handle form submission
document.getElementById('resumeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // Show loading
        showLoading(true);
        updateLoadingText('Collecting your information...');
        
        // Collect form data
        const formData = collectFormData();
        
        // Validate required fields
        if (!formData.apiKey || formData.apiKey.trim() === '') {
            throw new Error('Google Gemini API key is required. Please get your free API key from: https://makersuite.google.com/app/apikey');
        }
        
        // Basic API key format validation
        if (!formData.apiKey.trim().startsWith('AI') || formData.apiKey.trim().length < 30) {
            throw new Error('Invalid API key format. Please ensure you\'ve entered a valid Google Gemini API key.');
        }
        if (!formData.personalInfo.fullName) {
            throw new Error('Full name is required');
        }
        if (!formData.personalInfo.email) {
            throw new Error('Email is required');
        }
        if (!formData.summary) {
            throw new Error('Professional summary is required');
        }
        if (!formData.skills) {
            throw new Error('Skills are required');
        }

        updateLoadingText('Generating LaTeX code with AI...');
        
        // Prepare data for backend (exclude API key from resume data)
        const resumeData = { ...formData };
        delete resumeData.apiKey;
        
        // Generate LaTeX
        console.log('Sending API request with data:', resumeData);
        console.log('API Key (first 10 chars):', formData.apiKey.substring(0, 10) + '...');
        
        const latexResponse = await fetch('/api/generate-latex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': formData.apiKey
            },
            body: JSON.stringify(resumeData)
        });

        console.log('LaTeX Response status:', latexResponse.status);
        console.log('LaTeX Response headers:', latexResponse.headers);

        if (!latexResponse.ok) {
            const errorData = await latexResponse.json();
            console.error('LaTeX Error response:', errorData);
            throw new Error(errorData.error || 'Failed to generate LaTeX');
        }

        const latexResult = await latexResponse.json();
        console.log('LaTeX Result:', latexResult);
        currentFilename = latexResult.filename;

        updateLoadingText('Compiling PDF document...');

        // Compile PDF
        const pdfResponse = await fetch('/api/compile-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: currentFilename })
        });

        if (!pdfResponse.ok) {
            const errorData = await pdfResponse.json();
            throw new Error(errorData.error || 'Failed to compile PDF');
        }

        const pdfResult = await pdfResponse.json();

        // Hide loading
        showLoading(false);

        // Show results
        showResults(latexResult.latexCode, pdfResult.pdfPath);
        showSuccess('Resume generated successfully!');

    } catch (error) {
        showLoading(false);
        console.error('Full error details:', error);
        console.error('Error stack:', error.stack);
        showError(`Error: ${error.message}`);
        
        // Show detailed error for debugging
        alert(`Debug Error: ${error.message}\n\nCheck browser console for more details.`);
    }
});

// Show results section
function showResults(latexCode, pdfPath) {
    // Hide form
    document.getElementById('resumeForm').style.display = 'none';
    
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    resultsSection.classList.add('fade-in');
    
    // Display LaTeX code
    document.getElementById('latexCode').textContent = latexCode;
    
    // Setup download button
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.style.display = 'inline-flex';
    downloadBtn.onclick = () => {
        window.open(pdfPath, '_blank');
    };
    
    // Hide loading message
    document.getElementById('loadingMessage').style.display = 'none';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Copy to clipboard function
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('LaTeX code copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccess('LaTeX code copied to clipboard!');
    });
}

// Reset form function
function resetForm() {
    // Show form
    document.getElementById('resumeForm').style.display = 'block';
    
    // Hide results
    document.getElementById('resultsSection').style.display = 'none';
    
    // Reset form fields
    document.getElementById('resumeForm').reset();
    
    // Reload sample data
    loadSampleData();
    
    // Reset dynamic fields
    document.getElementById('experienceCount').value = '2';
    document.getElementById('projectCount').value = '2';
    document.getElementById('educationCount').value = '1';
    
    updateExperienceFields();
    updateProjectFields();
    updateEducationFields();
    
    // Clear results
    document.getElementById('latexCode').textContent = '';
    document.getElementById('downloadBtn').style.display = 'none';
    document.getElementById('loadingMessage').style.display = 'block';
    
    // Reset filename
    currentFilename = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form validation
function validateForm() {
    const requiredFields = ['apiKey', 'fullName', 'email', 'summary', 'skills'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#27ae60';
        }
    });
    
    return isValid;
}

// Add real-time validation
document.addEventListener('input', function(e) {
    if (e.target.hasAttribute('required')) {
        if (e.target.value.trim()) {
            e.target.style.borderColor = '#27ae60';
        } else {
            e.target.style.borderColor = '#e74c3c';
        }
    }
});

// Auto-save functionality (optional)
function autoSave() {
    const formData = collectFormData();
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
}

// Load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            // Populate form with saved data
            Object.keys(data.personalInfo || {}).forEach(key => {
                const element = document.getElementById(key);
                if (element && data.personalInfo[key]) {
                    element.value = data.personalInfo[key];
                }
            });
            
            if (data.summary) document.getElementById('summary').value = data.summary;
            if (data.skills) document.getElementById('skills').value = data.skills;
            if (data.certifications) document.getElementById('certifications').value = data.certifications;
            if (data.languages) document.getElementById('languages').value = data.languages;
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Auto-save every 30 seconds
setInterval(autoSave, 30000);

// Load saved data on page load
window.addEventListener('load', loadSavedData);