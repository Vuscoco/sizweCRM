// Function to add a new service item
function addService() {
    const servicesList = document.getElementById('servicesList');
    const newService = document.createElement('div');
    newService.className = 'service-item';
    newService.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>Service Type</label>
                <select name="serviceType[]">
                    <option value="training">Training</option>
                    <option value="consulting">Consulting</option>
                    <option value="assessment">Assessment</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Rate (R)</label>
                <input type="number" name="serviceRate[]" step="0.01">
            </div>
            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" name="serviceRecurring[]">
                    Recurring
                </label>
            </div>
            <div class="form-group">
                <button type="button" class="remove-service-btn" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    servicesList.appendChild(newService);
}

// Function to generate a unique filename
function generateUniqueFilename(clientName) {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const safeName = clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `client_${safeName}_${timestamp}_${random}`;
}

// Function to get form type based on current page
function getFormType() {
    const path = window.location.pathname;
    if (path.includes('clientconcept-sol')) {
        return 'sol';
    } else if (path.includes('clientconcept-seta')) {
        return 'seta';
    }
    return 'default';
}

// Client Form Data Handling
document.addEventListener('DOMContentLoaded', function() {
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        console.log('Form found, adding submit handler');
        clientForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Get all form data
            const formData = {
                basicInfo: {
                    clientName: document.getElementById('clientName').value,
                    clientReg: document.getElementById('clientReg').value,
                    clientAddress: document.getElementById('clientAddress').value
                },
                contactInfo: {
                    contactPerson: document.getElementById('contactPerson').value,
                    contactPosition: document.getElementById('contactPosition').value,
                    contactPhone: document.getElementById('contactPhone').value,
                    contactEmail: document.getElementById('contactEmail').value
                },
                setaInfo: {
                    seta: document.getElementById('seta').value,
                    service: document.getElementById('service').value,
                    sdlNumber: document.getElementById('sdlNumber').value,
                    moderator: document.getElementById('moderator').value
                },
                financialInfo: {
                    retainer: document.getElementById('retainer').value,
                    paymentTerms: document.getElementById('paymentTerms').value,
                    services: Array.from(document.querySelectorAll('.service-item')).map(item => ({
                        type: item.querySelector('select[name="serviceType[]"]').value,
                        rate: item.querySelector('input[name="serviceRate[]"]').value,
                        recurring: item.querySelector('input[name="serviceRecurring[]"]').checked
                    }))
                },
                qualificationInfo: {
                    type: document.getElementById('qualificationType').value,
                    level: document.getElementById('qualificationLevel').value,
                    costPerLearner: document.getElementById('costPerLearner').value
                },
                timestamp: new Date().toISOString(),
                formType: getFormType(),
                uniqueId: generateUniqueFilename(document.getElementById('clientName').value)
            };

            console.log('Form data before sending:', formData);

            try {
                // Send data to server
                const response = await fetch('http://localhost:3000/api/save-client', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Server response status:', response.status);
                console.log('Server response headers:', response.headers);

                const result = await response.json();
                console.log('Server response data:', result);
                
                if (response.ok) {
                    alert('Client data saved successfully!');
                    window.location.href = 'clientmanagement.html';
                } else {
                    alert('Error saving client data: ' + result.error);
                }
            } catch (error) {
                console.error('Error details:', error);
                alert('Error saving client data. Please try again.');
            }
        });
    } else {
        console.log('Client form not found');
    }
}); 