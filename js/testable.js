// Loading overlay functionality
window.onload = function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');
    setTimeout(() => {
        loadingOverlay.classList.remove('active');
    }, 1000);
};

// Qualification levels update function
function updateQualificationLevels() {
    const qualificationType = document.getElementById('qualificationType').value;
    const levelSelect = document.getElementById('qualificationLevel');
    levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';

    switch(qualificationType) {
        case 'ncv':
            for(let i = 1; i <= 4; i++) {
                const option = document.createElement('option');
                option.value = `level${i}`;
                option.textContent = `Level ${i}`;
                levelSelect.appendChild(option);
            }
            break;
        case 'tvet':
            for(let i = 2; i <= 6; i++) {
                const option = document.createElement('option');
                option.value = `level${i}`;
                option.textContent = `Level ${i}`;
                levelSelect.appendChild(option);
            }
            break;
        case 'diploma':
            for(let i = 3; i <= 6; i++) {
                const option = document.createElement('option');
                option.value = `level${i}`;
                option.textContent = `Level ${i}`;
                levelSelect.appendChild(option);
            }
            break;
        case 'unemployed_learnership':
        case 'employed_learnership':
            for(let i = 1; i <= 8; i++) {
                const option = document.createElement('option');
                option.value = `nqf${i}`;
                option.textContent = `NQF Level ${i}`;
                levelSelect.appendChild(option);
            }
            break;
        case 'graduate':
            const graduateLevels = [
                'Postgraduate',
                'Master\'s',
                'Doctorate',
                'Professional'
            ];
            graduateLevels.forEach(level => {
                const option = document.createElement('option');
                option.value = level.toLowerCase().replace(/\s+/g, '_');
                option.textContent = level;
                levelSelect.appendChild(option);
            });
            break;
        case 'degree':
            const degreeLevels = [
                'Bachelor\'s',
                'Honours',
                'Master\'s',
                'Doctorate'
            ];
            degreeLevels.forEach(level => {
                const option = document.createElement('option');
                option.value = level.toLowerCase().replace(/\s+/g, '_');
                option.textContent = level;
                levelSelect.appendChild(option);
            });
            break;
    }
}

// Add service function
function addService() {
    const servicesList = document.getElementById('servicesList');
    const newService = document.createElement('div');
    newService.className = 'service-item';
    newService.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>SLA</label>
                <select name="serviceType[]">
                    <option value="trench1">Trench 1</option>
                    <option value="trench2">Trench 2</option>
                    <option value="trench3">Trench 3</option>
                    <option value="trench4">Trench 4</option>
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
        </div>
    `;
    servicesList.appendChild(newService);
}

// Preview SLA function
function previewSLA() {
    const formData = new FormData(document.querySelector('form'));
    const data = {};
    for (let [key, value] of formData.entries()) {
        if (key === 'qualificationLevel') {
            data[key] = document.getElementById('qualificationLevel').options[document.getElementById('qualificationLevel').selectedIndex].text;
        } else {
            data[key] = value;
        }
    }
    sessionStorage.setItem('slaPreviewData', JSON.stringify(data));
    window.location.href = 'sla-preview.html';
} 