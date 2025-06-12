// Toggle between color grid and contact list
function toggleForm() {
    const container = document.querySelector('.container');
    container.classList.toggle('active');
}

function updateColorCard(cardClass, hex, rgb) {
    const card = document.querySelector(`.color-card.${cardClass}`);
    card.querySelector('.hex-code').textContent = hex;
    card.querySelector('.rgb-code').textContent = rgb;
}

// Theme management
function changeTheme(theme) {
    const container = document.querySelector('.container');
    const themeHeaders = document.querySelectorAll('.theme-header');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Remove all theme classes
    container.classList.remove('inverted-colors', 'gradient');
    document.body.classList.remove('dark-theme');
    
    // Add selected theme class and update headers
    if (theme === 'inverted') {
        container.classList.add('inverted-colors');
        themeHeaders.forEach(header => header.textContent = 'Inverted Colors');
    } else if (theme === 'gradient') {
        container.classList.add('gradient');
        themeHeaders.forEach(header => header.textContent = 'Gradient Theme');
    } else if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeHeaders.forEach(header => header.textContent = 'Dark Theme');
    } else {
        themeHeaders.forEach(header => header.textContent = 'Default Theme');
    }
    
    // Update active state
    themeOptions.forEach(option => {
        if (option.dataset.theme === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Save theme checkpoint
    localStorage.setItem('savedTheme', theme);
}

// Initialize theme dropdown and load checkpoint
document.addEventListener('DOMContentLoaded', function() {
    const themeOptions = document.querySelectorAll('.theme-option');
    const colorGrids = document.querySelectorAll('.form-container.color-grid');

    // Theme switching
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            
            // Update active theme option
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Show corresponding color grid
            colorGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.classList.contains(`${theme}-theme`)) {
                    grid.classList.add('active');
                }
            });
        });
    });

    // Initialize with default theme
    document.querySelector('.theme-option[data-theme="default"]').click();
}); 