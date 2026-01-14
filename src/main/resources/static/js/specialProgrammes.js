const API_URL = "http://localhost:8080/specialProgrammes";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllProgrammes();
    // Default UI state
    document.getElementById('updateBtn').style.display = 'none';
});

// 2. Fetch all records from Java Backend
async function loadAllProgrammes() {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        }
    } catch (error) {
        console.error("Load Error:", error);
    }
}

// 3. Render Table Rows
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${record.programmeName || "-"}</td>
            <td><span class="badge-status">${record.participationLevel || "Participant"}</span></td>
            <td><strong>${record.marks ? record.marks.toFixed(2) : "0.00"}</strong></td>
            <td><small>${record.remarks || "-"}</small></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editProgramme('${record.studentId}')">
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

// 4. Save Record (POST)
async function saveProgramme() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("Student ID is required");

    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Programme data saved!");
            resetForm();
            loadAllProgrammes();
        }
    } catch (error) {
        alert("Server Error: Could not save.");
    }
}

// 5. Update Record (PUT)
async function updateProgramme() {
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
        }
    } catch (error) {
        console.error("Update Error:", error);
    }
}

// 6. Helper: Collect Data from UI
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        programmeName: document.getElementById('programmeName')?.value || "", 
        participationLevel: document.getElementById('participationLevel')?.value || "",
        marks: parseFloat(document.getElementById('marks').value) || 0.0,
        remarks: document.getElementById('other').value // Mapping 'other' textarea to remarks
    };
}

// 7. Edit Mode: Load data back into form
async function editProgramme(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            document.getElementById('studentId').value = r.studentId;
            if(document.getElementById('programmeName')) document.getElementById('programmeName').value = r.programmeName;
            document.getElementById('marks').value = r.marks;
            document.getElementById('other').value = r.remarks || r.other;

            // UI Changes
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Programme Record';
        }
    } catch (error) {
        console.error("Fetch error");
    }
}

// 8. Delete Single Record
async function deleteSingle(id) {
  const data=collectFormData();
    if (confirm(`Delete special programme record for ${id}?`)) {
        const data = collectFormData(); 
        try {
            const response = await fetch(`${API_URL}/delete`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) loadAllProgrammes();
        } catch (error) {
            alert("Delete failed.");
        }
    }
}

// 9. Utility: Search Table
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// 10. Utility: Reset Form
function resetForm() {
    document.getElementById('rankForm').reset(); // Assuming the form ID remains the same or matches your HTML
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-medal"></i> Leadership & Rank Entry';
}

// 11. Bulk Checkbox Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}