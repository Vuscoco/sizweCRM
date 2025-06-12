//Issue by & Expires Date Calculator
function calculateDuration() {
    const issuedBy = document.getElementById('issuedBy').value;
    const expires = document.getElementById('expires').value;

    if (issuedBy && expires) {
        const issuedDate = new Date(issuedBy);
        const expiryDate = new Date(expires);

        // Calculate the difference in milliseconds
        const diffTime = expiryDate - issuedDate;

        // Convert milliseconds to days
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        let durationText = "";

        if (diffDays >= 364) {
            const years = Math.floor(diffDays / 364);
            durationText = `${years} year${years > 1 ? "s" : ""}`;
        } else if (diffDays >= 30.41) {
            const months = Math.floor(diffDays / 30.41);
            durationText = `${months} month${months > 1 ? "s" : ""}`;
        } else if (diffDays >= 0) {
            durationText = `${Math.floor(diffDays)} day${diffDays > 1 ? "s" : ""}`;
        } else {
            durationText = "Invalid Dates";
        }

        // Update the readonly input
        document.getElementById('duration').value = durationText;
    }
}

// Qualification Situation
function updateQualifications() {
    const accreditationNumber = document.getElementById('accreditationNumber').value;
    const qualifications = document.getElementById('qualifications');
    const nqfLevel = document.getElementById('nqfLevel');
    const ofoNumber = document.getElementById('ofoNumber');

    // Clear existing options
    qualifications.innerHTML = '<option value="" disabled selected>Select qualifications</option>';

    // Clear the NQF Level field
    nqfLevel.value = '';
    ofoNumber.value = '';

    // Define qualifications for each accreditation number
    const qualificationsMap = {
        '05-QCTO/AC-TTC250125102623': [
            'Occupational Certificates: Checkout Operator',
            'Occupational Certificates: Dispatching and Receiving Clerk',
            'Occupational Certificates: Visual Merchandiser',
            'Occupational Certificates: Retail Supervisor',
            'Occupational Certificates: Retail Manager/Retail Store Manager'
        ],
        '05-QCTO/SDP010524113839': [
            'Occupational Certificates: Visual Merchandiser',
            'Occupational Certificates: Retail Supervisor',
            'Occupational Certificates: Retail Buyer',
            'Occupational Certificates: Retail Manager/Retail Store Manager'
        ],
        '05-QCTO/AC-TTC240924085655': [
            'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator'
        ],
        '05-QCTO/SDP040325132739': [
            'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator'
        ]
    };

    // Populate qualifications dropdown based on selected accreditation number
    if (qualificationsMap[accreditationNumber]) {
        qualificationsMap[accreditationNumber].forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            option.textContent = optionText;
            qualifications.appendChild(option);
        });
    }
}

// NQF Level Autofill
function updateNQFLevel() {
    const qualification = document.getElementById('qualifications').value;
    const nqfLevel = document.getElementById('nqfLevel');

    // Define NQF levels for each qualification
    const nqfMap = {
        'Occupational Certificates: Checkout Operator': '02',
        'Occupational Certificates: Dispatching and Receiving Clerk': '03',
        'Occupational Certificates: Visual Merchandiser': '03',
        'Occupational Certificates: Retail Supervisor': '04',
        'Occupational Certificates: Retail Manager': '06',
        'Occupational Certificates: Retail Supervisor': '04',
        'Occupational Certificates: Retail Buyer': '05',
        'Occupational Certificates: Retail Manager/Retail Store Manager': '06',
        'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator': '03'
    };

    // Update the NQF Level field based on the selected qualification
    nqfLevel.value = nqfMap[qualification] || '';
}

// NQF Level Autofill
function updateNQFLevel() {
    const qualification = document.getElementById('qualifications').value;
    const nqfLevel = document.getElementById('nqfLevel');

    // Define NQF levels for each qualification
    const nqfMap = {
        'Occupational Certificates: Checkout Operator': '02',
        'Occupational Certificates: Dispatching and Receiving Clerk': '03',
        'Occupational Certificates: Visual Merchandiser': '03',
        'Occupational Certificates: Retail Supervisor': '04',
        'Occupational Certificates: Retail Manager': '06',
        'Occupational Certificates: Retail Supervisor': '04',
        'Occupational Certificates: Retail Buyer': '05',
        'Occupational Certificates: Retail Manager/Retail Store Manager': '06',
        'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator': '03'
    };

       // Update the NQF Level field based on the selected qualification
       nqfLevel.value = nqfMap[qualification] || '';
    }
    
    // OFO Number Autofill
    function updateOFONumber() {
        const qualification = document.getElementById('qualifications').value;
        const ofoNumber = document.getElementById('ofoNumber');
    
        // Define OFO numbers for each qualification
        const ofoMap = {
            'Occupational Certificates: Checkout Operator': '99707',
            'Occupational Certificates: Dispatching and Receiving Clerk': '99446',
            'Occupational Certificates: Retail Buyer': '103145',
            'Occupational Certificates: Visual Merchandiser': '99688',
            'Occupational Certificates: Retail Supervisor': '99573',
            'Occupational Certificates: Retail Manager/Retail Store Manager': '91789',
            'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator': '121149'
        };
    
        // Update the OFO Number field based on the selected qualification
        ofoNumber.value = ofoMap[qualification] || '';
    }
    
    // Combined function to update both NQF Level and OFO Number
    function updateNQFLevelAndOFONumber() {
        updateNQFLevel();
        updateOFONumber();
    }
    
    // Attach the combined function to the qualifications dropdown
    document.getElementById('qualifications').addEventListener('change', updateNQFLevelAndOFONumber);

    // Attach the function to the issuedBy field to calculate duration
    function calculateDuration() {
        const issuedByField = document.getElementById("issuedBy");
        const expiresField = document.getElementById("expires");
        const durationField = document.getElementById("duration");
    
        if (issuedByField.value) {
            const issuedDate = new Date(issuedByField.value); // Get the issued date from the input
            const expiryDate = new Date(issuedDate); // Clone the issued date
            expiryDate.setDate(expiryDate.getDate() + 1825); // Add 1,825 days (5 years)
    
            // Format the expiry date as YYYY-MM-DD
            const expiryFormatted = expiryDate.toISOString().split("T")[0];
            expiresField.value = expiryFormatted; // Set the expiry date in the "Expires" field
    
            // Set the duration to "5 years"
            durationField.value = "5 years";
        }
    }    