const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static('./'));

// Network folder paths
const NETWORK_BASE = '\\\\LAPTOP-M3S2MT2Q\\ETQAs\\clients';
const JSON_FOLDER = path.join(NETWORK_BASE, 'JSON');
const HTML_FOLDER = path.join(NETWORK_BASE, 'HTML');

// Middleware
app.use(cors());

// Create network directories if they don't exist
[NETWORK_BASE, JSON_FOLDER, HTML_FOLDER].forEach(dir => {
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir, { recursive: true });
        } catch (error) {
            console.error(`Error creating directory ${dir}:`, error);
        }
    }
});

// Function to generate HTML content
function generateHTML(clientData) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Details - ${clientData.basicInfo.clientName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        .section {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #2980b9;
            margin-top: 0;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        .info-item {
            margin-bottom: 10px;
        }
        .label {
            font-weight: bold;
            color: #7f8c8d;
        }
        .value {
            color: #2c3e50;
        }
        .services-list {
            margin-top: 10px;
        }
        .service-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 5px;
        }
        .timestamp {
            color: #95a5a6;
            font-size: 0.9em;
            text-align: right;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Client Details</h1>
    
    <div class="section">
        <h2>Basic Information</h2>
        <div class="info-grid">
            <div class="info-item">
                <span class="label">Company/Client Name:</span>
                <span class="value">${clientData.basicInfo.clientName}</span>
            </div>
            <div class="info-item">
                <span class="label">Registration Number:</span>
                <span class="value">${clientData.basicInfo.clientReg}</span>
            </div>
            <div class="info-item">
                <span class="label">Registered Address:</span>
                <span class="value">${clientData.basicInfo.clientAddress}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Contact Information</h2>
        <div class="info-grid">
            <div class="info-item">
                <span class="label">Contact Person:</span>
                <span class="value">${clientData.contactInfo.contactPerson}</span>
            </div>
            <div class="info-item">
                <span class="label">Position:</span>
                <span class="value">${clientData.contactInfo.contactPosition}</span>
            </div>
            <div class="info-item">
                <span class="label">Phone Number:</span>
                <span class="value">${clientData.contactInfo.contactPhone}</span>
            </div>
            <div class="info-item">
                <span class="label">Email Address:</span>
                <span class="value">${clientData.contactInfo.contactEmail}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>SETA and Service Details</h2>
        <div class="info-grid">
            <div class="info-item">
                <span class="label">SETA:</span>
                <span class="value">${clientData.setaInfo.seta}</span>
            </div>
            <div class="info-item">
                <span class="label">Service Type:</span>
                <span class="value">${clientData.setaInfo.service}</span>
            </div>
            <div class="info-item">
                <span class="label">SDL Number:</span>
                <span class="value">${clientData.setaInfo.sdlNumber}</span>
            </div>
            <div class="info-item">
                <span class="label">Assigned Moderator:</span>
                <span class="value">${clientData.setaInfo.moderator}</span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Financial Details</h2>
        <div class="info-grid">
            <div class="info-item">
                <span class="label">Monthly Retainer:</span>
                <span class="value">R ${clientData.financialInfo.retainer}</span>
            </div>
            <div class="info-item">
                <span class="label">Payment Terms:</span>
                <span class="value">${clientData.financialInfo.paymentTerms} Days</span>
            </div>
        </div>

        <h3>Additional Services</h3>
        <div class="services-list">
            ${clientData.financialInfo.services.map(service => `
                <div class="service-item">
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">Service Type:</span>
                            <span class="value">${service.type}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Rate:</span>
                            <span class="value">R ${service.rate}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Recurring:</span>
                            <span class="value">${service.recurring ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="section">
        <h2>Qualification Details</h2>
        <div class="info-grid">
            <div class="info-item">
                <span class="label">Qualification Type:</span>
                <span class="value">${clientData.qualificationInfo.type}</span>
            </div>
            <div class="info-item">
                <span class="label">Qualification Level:</span>
                <span class="value">${clientData.qualificationInfo.level}</span>
            </div>
            <div class="info-item">
                <span class="label">Cost per Learner:</span>
                <span class="value">R ${clientData.qualificationInfo.costPerLearner}</span>
            </div>
        </div>
    </div>

    <div class="timestamp">
        Created: ${new Date().toLocaleString()}
    </div>
</body>
</html>`;
}

// Handle form submissions
app.post('/save-client', (req, res) => {
    try {
        const { htmlContent, jsonContent, filename } = req.body;
        
        // Define network paths
        const htmlPath = '\\\\LAPTOP-M3S2MT2Q\\ETQAs\\clients\\HTML';
        const jsonPath = '\\\\LAPTOP-M3S2MT2Q\\ETQAs\\clients\\JSON';

        // Create directories if they don't exist
        if (!fs.existsSync(htmlPath)) {
            fs.mkdirSync(htmlPath, { recursive: true });
        }
        if (!fs.existsSync(jsonPath)) {
            fs.mkdirSync(jsonPath, { recursive: true });
        }

        // Save HTML file
        fs.writeFileSync(path.join(htmlPath, `${filename}.html`), htmlContent);
        
        // Save JSON file
        fs.writeFileSync(path.join(jsonPath, `${filename}.json`), jsonContent);

        res.json({ success: true, message: 'Files saved successfully' });
    } catch (error) {
        console.error('Error saving files:', error);
        res.status(500).json({ success: false, message: 'Error saving files: ' + error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Saving files to: ${NETWORK_BASE}`);
});

