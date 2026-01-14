const API_URL = "http://localhost:8080/rank";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllRanks();
});

// 2. Load all records into the table
async function loadAllRanks() {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// 3. Render Table Rows
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        // Create Status Icons for the roles
        const prefectIcon = record.prefect 
            ? '<i class="fas fa-check-circle" style="color: var(--success-green);"></i>' 
            : '<i class="fas fa-times-circle" style="color: #cbd5e0;"></i>';
            
        const monitorIcon = record.classMonitor 
            ? '<i class="fas fa-check-circle" style="color: var(--success-green);"></i>' 
            : '<i class="fas fa-times-circle" style="color: #cbd5e0;"></i>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td style="text-align: center;">${prefectIcon}</td>
            <td style="text-align: center;">${monitorIcon}</td>
            <td><span class="badge-rank bg-gold">${record.marks.toFixed(1)}</span></td>
            <td><small>${record.other || "-"}</small></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editRank('${record.studentId}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline" style="padding:4px 8px; color:red;" onclick="deleteSingle('${record.studentId}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save New Record (POST)
async function saveRank() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("Student ID is required.");

    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Rank details saved!");
            resetForm();
            loadAllRanks();
        }
    } catch (error) {
        alert("Server error while saving.");
    }
}

// 5. Update Existing Record (PUT)
async function updateRank() {
    const studentId = document.getElementById('studentId').value;
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

// 6. Helper: Collect Data from UI
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        prefect: document.getElementById('prefect').checked,
        classMonitor: document.getElementById('classMonitor').checked,
        marks: parseFloat(document.getElementById('marks').value) || 0.0,
        other: document.getElementById('other').value
    };
}

// 7. Edit Mode: Fetch and Fill
async function editRank(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('prefect').checked = r.prefect;
            document.getElementById('classMonitor').checked = r.classMonitor;
            document.getElementById('marks').value = r.marks;
            document.getElementById('other').value = r.other;

            // UI State Change
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Rank & Responsibility';
        }
    } catch (error) {
        console.error("Error fetching rank record");
    }
}

// 8. Delete Single
async function deleteSingle(id) {
    // 1. Get the data object first so "data" is defined
    const data = collectFormData(); 

    if (confirm(`Are you sure you want to delete rank details for ${id}?`)) {
        try {
            // 2. Add /${id} to the URL so Java knows which record to target
            const response = await fetch(`${API_URL}/delete`, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json' 
                },
                // 3. Now "data" exists and can be sent
                body: JSON.stringify(data) 
            });

            if (response.ok) {
                alert("Record deleted successfully.");
                loadAllRanks(); // Refresh the table
            } else {
                alert("Server error: Could not delete.");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }
}

// 9. Utility: Search
function searchTable() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(term) ? "" : "none";
    });
}

// 10. Utility: Reset
function resetForm() {
    document.getElementById('rankForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-medal"></i> Student Rank & Responsibilities';
}

// 11. Bulk Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}