// Add interactivity for sidebar (if needed in the future)
document.addEventListener("DOMContentLoaded", () => {
    console.log("CRM Dashboard Loaded");
});

// Toggle Sidebar Collapse
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.getElementById("toggle-sidebar");

    // Toggle the 'collapsed' class on the sidebar when the logo is clicked
    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', (e) => {
            e.preventDefault();
            const content = collapsible.nextElementSibling;
            const arrow = collapsible.querySelector('.arrow');

            // Toggle active class for content and rotate arrow
            content.classList.toggle('active');
            arrow.classList.toggle('rotate');
        });
    });
});

//Opportunity Javascript Code
document.getElementById('add-opportunity-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const stage = document.getElementById('stage').value;
    const value = document.getElementById('value').value;
    const closeDate = document.getElementById('close-date').value;

    const tableBody = document.querySelector('.opportunity-list tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${stage}</td>
        <td>${value}</td>
        <td>${closeDate}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    tableBody.appendChild(row);

    // Clear form
    e.target.reset();
});

document.querySelector('.opportunity-list tbody').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('tr').remove();
    }
});


// Qualification Situation
function updateQualifications() {
    const accreditationNumber = document.getElementById('accreditationNumber').value;
    const qualifications = document.getElementById('qualifications');
    const nqfLevel = document.getElementById('nqfLevel');

    // Clear existing options
    qualifications.innerHTML = '<option value="" disabled selected>Select qualifications</option>';

    // Clear the NQF Level field
    nqfLevel.value = '';

    // Define qualifications for each accreditation number
    const qualificationsMap = {
        '05-QCTO/AC-TTC250125102623': [
            'Occupational Certificates: Checkout Operator',
            'Occupational Certificates: Dispatching and Receiving Clerk',
            'Occupational Certificates: Visual Merchandiser',
            'Occupational Certificates: Retail Supervisor',
            'Occupational Certificates: Retail Manager'
        ],
        '05-QCTO/SDP010524113839': [
            'Occupational Certificates: Visual Merchandiser',
            'Occupational Certificates: Retail Superior',
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
        'Occupational Certificates: Checkout Operator': '03',
        'Occupational Certificates: Dispatching and Receiving Clerk': '03',
        'Occupational Certificates: Visual Merchandiser': '03',
        'Occupational Certificates: Retail Supervisor': '05',
        'Occupational Certificates: Retail Manager': '06',
        'Occupational Certificates: Retail Superior': '04',
        'Occupational Certificates: Retail Buyer': '05',
        'Occupational Certificates: Retail Manager/Retail Store Manager': '06',
        'Intermediate Occupational Certificate: Food and Beverage Process Machine Operator': '03'
    };

    // Update the NQF Level field based on the selected qualification
    nqfLevel.value = nqfMap[qualification] || '';
}

// Handle menu option selection
document.addEventListener('DOMContentLoaded', function() {
    const menuOptions = document.querySelectorAll('.section-header .dropdown-content a');
    const selectedOption = document.querySelector('.menu-btn .selected-option');
    const summaryHeader = document.getElementById('summaryHeader');
    const accreditationOverview = document.querySelector('.accreditation-overview');

    // Define data for each option
    const optionData = {
        'All': {
            students: 12,
            contracts: 1,
            revenue: 'R 45,000',
            programs: 3,
            showSummary: true
        },
        'Roof Co.': {
            students: 5,
            contracts: 2,
            revenue: 'R 25,000',
            programs: 1,
            showSummary: false
        },
        'Dan Lec': {
            students: 3,
            contracts: 1,
            revenue: 'R 15,000',
            programs: 2,
            showSummary: false
        },
        'Sol Danka': {
            students: 2,
            contracts: 1,
            revenue: 'R 10,000',
            programs: 1,
            showSummary: false
        },
        'SETA': {
            students: 2,
            contracts: 1,
            revenue: 'R 8,000',
            programs: 1,
            showSummary: false
        }
    };

    function updateCardValues(option) {
        const data = optionData[option];
        document.getElementById('studentsCount').textContent = data.students;
        document.getElementById('contractsCount').textContent = data.contracts;
        document.getElementById('revenueAmount').textContent = data.revenue;
        document.getElementById('programsCount').textContent = data.programs;
        
        // Toggle summary section visibility
        if (data.showSummary) {
            accreditationOverview.classList.remove('hidden');
            summaryHeader.textContent = 'Summary';
        } else {
            accreditationOverview.classList.add('hidden');
            summaryHeader.textContent = option;
        }
    }

    menuOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedValue = this.getAttribute('data-option');
            selectedOption.textContent = selectedValue;
            updateCardValues(selectedValue);
        });
    });

    // Initialize with 'All' option
    updateCardValues('All');
});

// Table Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filterToggle');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterOptions = document.querySelectorAll('.filter-option[data-column]');
    const clearFilterBtn = document.querySelector('.clear-filter');
    const tableSearch = document.querySelector('.table-search');
    const table = document.querySelector('.accreditation-list table');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    let activeFilters = new Set();

    // Toggle filter dropdown
    filterToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('show');
        filterToggle.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterDropdown.contains(e.target) && !filterToggle.contains(e.target)) {
            filterDropdown.classList.remove('show');
            filterToggle.classList.remove('active');
        }
    });

    // Handle filter option clicks
    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const column = option.dataset.column;
            option.classList.toggle('active');
            
            if (option.classList.contains('active')) {
                activeFilters.add(column);
            } else {
                activeFilters.delete(column);
            }
            
            applyFilters();
        });
    });

    function applyFilters() {
        const searchTerm = tableSearch.value.toLowerCase();

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            let showRow = true;

            // Apply search term
            if (searchTerm) {
                const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
                if (rowText.indexOf(searchTerm) === -1) {
                    showRow = false;
                }
            }

            // Apply column filters
            if (showRow && activeFilters.size > 0) {
                activeFilters.forEach(column => {
                    const cell = cells[column];
                    if (cell) {
                        const cellText = cell.textContent.toLowerCase();
                        if (cellText.indexOf(searchTerm) === -1) {
                            showRow = false;
                        }
                    }
                });
            }

            row.style.display = showRow ? '' : 'none';
        });
    }

    function clearFilters() {
        // Clear search
        tableSearch.value = '';
        
        // Clear active filters
        activeFilters.clear();
        filterOptions.forEach(option => {
            option.classList.remove('active');
        });
        
        // Show all rows
        rows.forEach(row => {
            row.style.display = '';
        });
        
        // Close dropdown
        filterDropdown.classList.remove('show');
        filterToggle.classList.remove('active');
    }

    // Clear filters
    clearFilterBtn.addEventListener('click', clearFilters);

    // Apply filter on search input
    tableSearch.addEventListener('input', applyFilters);
});

// Filter dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filterToggle');
    const filterDropdown = document.getElementById('filterDropdown');

    if (filterToggle && filterDropdown) {
        filterToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            filterDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterDropdown.contains(e.target) && !filterToggle.contains(e.target)) {
                filterDropdown.classList.remove('show');
            }
        });

        // Prevent dropdown from closing when clicking inside it
        filterDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// Theme dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('#themeDropdown .filter-option');

    if (themeToggle && themeDropdown) {
        // Toggle theme dropdown
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
            themeToggle.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeDropdown.contains(e.target) && !themeToggle.contains(e.target)) {
                themeDropdown.classList.remove('show');
                themeToggle.classList.remove('active');
            }
        });

        // Prevent dropdown from closing when clicking inside it
        themeDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Theme switching functionality
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                const themeValues = document.querySelectorAll('.theme-value');
                const themeHeader = document.querySelector('.theme-header');
                
                // Update values based on theme
                themeValues.forEach(value => {
                    value.textContent = value.dataset[theme] || value.dataset.default;
                });

                // Update header text based on theme
                if (themeHeader) {
                    themeHeader.textContent = themeHeader.dataset[theme] || themeHeader.dataset.default;
                }

                // Save theme preference
                localStorage.setItem('savedTheme', theme);

                // Close dropdown after selection
                themeDropdown.classList.remove('show');
                themeToggle.classList.remove('active');
            });
        });
    }
});

// Client Form Data Handling
document.addEventListener('DOMContentLoaded', function() {
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        clientForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
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
                timestamp: new Date().toISOString()
            };

            try {
                // Send data to server
                const response = await fetch('http://localhost:3000/api/save-client', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (response.ok) {
                    alert('Client data saved successfully!');
                    // Optionally redirect or clear form
                    window.location.href = 'clientmanagement.html';
                } else {
                    alert('Error saving client data: ' + result.error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error saving client data. Please try again.');
            }
        });
    }
});

