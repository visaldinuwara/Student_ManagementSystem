const API_URL = "http://localhost:8080/rank";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllRanks();
    // Default UI state
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = 'none';
});

// 2. Load all records from Backend
async function loadAllRanks() {
    try {
        const response = await fetch(`${API_URL}/getAll`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// 3. Render Table with Boolean Badges
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        
        // Visual indicators for boolean values
        const checkIcon = (val) => val 
            ? '<span style="color:var(--success);"><i class="fas fa-check-circle"></i> Yes</span>' 
            : '<span style="color:#cbd5e0;"><i class="fas fa-times"></i> No</span>';

        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${checkIcon(record.prefect)}</td>
            <td>${checkIcon(record.classMonitor)}</td>
            <td><strong>${(record.marks || 0).toFixed(2)}</strong></td>
            <td><small>${record.other || "-"}</small></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px; margin-right:5px;" onclick="editRank('${record.studentId}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>

            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save Record (POST)
async function saveRank() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("Student ID is required");

    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Rank details saved successfully!");
            resetForm();
            loadAllRanks();
        } else {
            alert("Error: Student ID might already exist.");
        }
    } catch (error) {
        alert("Server connection failed.");
    }
}

// 5. Update Record (POST)
async function updateRank() {
    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Record updated successfully!");
            resetForm();
            loadAllRanks();
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 6. Delete Single Record
async function deleteSingle() {
    const selectedCheckbox = document.querySelector('.record-checkbox:checked');

    if (!selectedCheckbox) {
        // Using a custom UI notification is preferred, but sticking to your logic structure
        console.warn("No record selected");
        return;
    }

    const id = selectedCheckbox.value;

    // Custom confirmation logic (confirm() is discouraged in some environments, but functional here)
    if (window.confirm(`Are you sure you want to delete records for Student ID: ${id}?`)) {
        try {
            // Removed headers and body as the ID is already in the URL path
            const response = await fetch(`${API_URL}/delete/${id}`, { 
                method: 'POST' 
            });

            if (response.ok) {
                // Refresh the table data
                loadAllRanks();
                
                // If the user was currently editing this specific record, reset the form
                if (document.getElementById('studentId').value === id) {
                    resetForm();
                }
            } else {
                console.error("Delete failed on server");
            }
        } catch (error) {
            console.error("Delete request error:", error);
        }
    }
}


// 8. Edit Mode: Load data into form
async function editRank(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Map values to form
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('prefect').checked = r.prefect;
            document.getElementById('classMonitor').checked = r.classMonitor;
            document.getElementById('marks').value = r.marks;
            document.getElementById('other').value = r.other || '';

            // UI Changes
            document.getElementById('studentId').readOnly = true; 
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Leadership Record';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// 9. Helper: Collect Data from UI
function collectFormData() {
    const data = {
        studentId: document.getElementById('studentId').value,
        prefect: document.getElementById('prefect').checked, // Booleans are naturally true/false
        classMonitor: document.getElementById('classMonitor').checked,
        other: document.getElementById('other').value || "No additional info",
        marks: parseFloat(document.getElementById('marks').value) || 0.0
    };
    return data;
}

// 10. Utility: Search Table
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// 11. Utility: Reset Form
function resetForm() {
    const form = document.getElementById('rankForm');
    if (form) form.reset();
    
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-medal"></i> Leadership & Rank Entry';
}

// 12. Bulk Checkbox Toggle
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}