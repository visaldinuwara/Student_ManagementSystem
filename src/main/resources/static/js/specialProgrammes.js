const API_URL = "http://localhost:8080/specialProgrammes";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllProgrammes();
});

// 2. Fetch all records for the Table
async function loadAllProgrammes() {
    try {
        const response = await fetch(`${API_URL}/getAll`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        }
    } catch (error) {
        console.error("Load Error:", error);
    }
}

// 3. Render Table
function renderTable(records) {
    const tableBody = document.getElementById('programmeTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        // Matches your Java fields: studentID, programmeName, month, marks
        const sId = record.studentID || "N/A";
        const pName = record.programmeName || "N/A";
        const month = record.month || "N/A";
        const marks = parseFloat(record.marks) || 0;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${sId}"></td>
            <td style="font-weight:600;">${sId}</td>
            <td>${pName}</td>
            <td>${month}</td>
            <td><strong style="color: #2c3e50;">${marks.toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px; margin-right:5px;" onclick="editProgramme('${sId}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save Record (POST)
async function saveProgramme() {
    const data = collectFormData();
    
    if (!data.studentID || !data.programmeName) {
        alert("Please fill in the Student ID and Programme Name");
        return; 
    }

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Programme record saved!");
            resetForm();
            loadAllProgrammes();
        } else {
            alert("Server Error: Check backend logs.");
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
}

// 5. Update Record (PUT)
async function updateProgramme() {
    const studentId = document.getElementById('studentID').value;
    if (!studentId) return alert("No student selected to update.");
    
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
            loadAllProgrammes();
        } else {
            alert("Update failed.");
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 6. Collect Form Data
function collectFormData() {
    return {
        studentID: document.getElementById('studentID').value.trim(),
        programmeName: document.getElementById('programmeName').value.trim(),
        month: document.getElementById('month').value,
        marks: parseFloat(document.getElementById('marks').value) || 0.0
    };
}

// 7. Edit (Load data back into form)
async function editProgramme(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            document.getElementById('studentID').value = r.studentID;
            document.getElementById('programmeName').value = r.programmeName;
            document.getElementById('month').value = r.month;
            document.getElementById('marks').value = r.marks;

            // UI State adjustments
            document.getElementById('studentID').readOnly = true;
            document.querySelector('.btn-save').style.display = 'none';
            document.querySelector('.btn-update').style.display = 'inline-flex';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Programme Record';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// 8. Delete Single
async function deleteSingle() {
    const selectedCheckbox = document.querySelector('.record-checkbox:checked');
    if (!selectedCheckbox) return alert("Please select a record to delete.");
    
    const id = selectedCheckbox.value;

    if (confirm(`Delete record for ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, { 
                method: 'POST', // Usually DELETE for specific ID
            });

            if (response.ok) {
                loadAllProgrammes();
                resetForm();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    }
}

// 9. Utility: Search Table
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#programmeTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// 10. Utility: Reset Form
function resetForm() {
    document.getElementById('programmeForm').reset();
    document.getElementById('studentID').readOnly = false;
    document.querySelector('.btn-save').style.display = 'inline-flex';
    document.querySelector('.btn-update').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-star"></i> Special Programme Records';
}

// 11. Toggle Select All
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}