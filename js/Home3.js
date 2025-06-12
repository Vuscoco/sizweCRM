// Toggle Sidebar Collapse
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
});

// Toggle Dropdown Menus
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.closest('li');
        parent.classList.toggle('expanded');
    });
});

// Function to load customers into the "Customers" dropdown
function loadCustomersDropdown() {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = ''; // Clear the list before adding customers

    customers.forEach((customer) => {
        const li = document.createElement('li');
        li.textContent = customer.name || 'Unnamed Customer';
        customerList.appendChild(li);
    });
}

// Function to populate the CRM Dashboard table
function populateTable() {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const tableBody = document.querySelector('#crm-table tbody');
    tableBody.innerHTML = ''; // Clear the table before adding rows

    customers.forEach((customer) => {
        const row = document.createElement('tr');
        const isComplete = customer.name && customer.moderator && customer.service;

        row.innerHTML = `
            <td>${customer.name || 'N/A'}</td>
            <td>${customer.moderator || 'N/A'}</td>
            <td>${customer.service || 'N/A'}</td>
            <td>${customer.seta || 'N/A'}</td>
            <td class="${isComplete ? '' : 'status-incomplete'}">
                ${isComplete ? 'Complete' : 'Incomplete'}
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Sort functions
function sortBy(field) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers.sort((a, b) => (a[field] || '').localeCompare(b[field] || ''));
    localStorage.setItem('customers', JSON.stringify(customers));
    populateTable();
}

// Event listeners for sorting
document.getElementById('filter-by-date').addEventListener('click', () => sortBy('date'));
document.getElementById('filter-by-name').addEventListener('click', () => sortBy('name'));
document.getElementById('filter-by-moderator').addEventListener('click', () => sortBy('moderator'));

// Load customers into the dropdown and populate the table on page load
loadCustomersDropdown();
populateTable();