const API_URL = "http://localhost:8080/externalmarks";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllMarks();
});

// 2. Fetch all marks for the Table
async function loadAllMarks() {
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

// 3. Render Table with Calculation Logic
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        // MATCH THE DATA: Use record.StudentId (Capital S)
        const sId = record.StudentId || "N/A";

        // Calculate Average
        const m1 = parseFloat(record.firstTerm) || 0;
        const m2 = parseFloat(record.secondTerm) || 0;
        const m3 = parseFloat(record.thirdTerm) || 0;
        const average = (m1 + m2 + m3) / 3;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${sId}"></td>
            <td style="font-weight:600;">${sId}</td>
            <td>${m1.toFixed(1)}</td>
            <td>${m2.toFixed(1)}</td>
            <td>${m3.toFixed(1)}</td>
            <td><strong style="color: #2c3e50;">${average.toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px; margin-right:5px;" onclick="editMarks('${sId}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function saveMarks() {
    const data = collectFormMarks();
    console.log("Collected form data:", data); // Debug: Check collected data before validation
    // The Gatekeeper: Stop here if studentId is missing
    if (!data.StudentId) {
        alert("Please enter a Student ID");
        return; 
    }

    console.log("Payload being sent to Java:", data); // Check this in your browser console!

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Marks saved successfully!");
            resetForm();
            loadAllMarks();
        } else {
            const err = await response.text();
            console.error("Server Error Detail:", err);
            alert("Server Error: Check backend logs.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Check your connection to the backend.");
    }
}

// 5. Update Record (PUT)
async function updateMarks() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("No student selected to update.");
    
    const data = collectFormMarks();

    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Marks updated successfully!");
            resetForm();
            loadAllMarks();
        } else {
            alert("Update failed. Record may not exist.");
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

function collectFormMarks() {
    return {
        StudentId: document.getElementById('studentId').value.trim(),
        firstTerm: parseFloat(document.getElementById('firstTerm').value) || 0.0,
        secondTerm: parseFloat(document.getElementById('secondTerm').value) || 0.0,
        thirdTerm: parseFloat(document.getElementById('thirdTerm').value) || 0.0
    };
}

// 7. Edit Marks (Load data back into form)
async function editMarks(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            document.getElementById('studentId').value = r.StudentId;
            document.getElementById('firstTerm').value = r.firstTerm;
            document.getElementById('secondTerm').value = r.secondTerm;
            document.getElementById('thirdTerm').value = r.thirdTerm;

            // UI State adjustments
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-flex';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Term Marks';
            
            // Scroll to form for better UX
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

// 8. Delete Single
async function deleteSingle() {
        const selectedCheckbox = document.querySelector('.record-checkbox:checked');
        const id =selectedCheckbox.value;
        const data = { StudentId: id }; 

    if (confirm(`Are you sure you want to delete marks for ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, { 
                method: 'POST',
            });

            if (response.ok) {
                loadAllMarks();
                // If the deleted record was being edited, clear the form
                if(document.getElementById('studentId').value === id) resetForm();
            } else {
                alert("Failed to delete record.");
            }
        } catch (error) {
            console.error("Delete error:", error);
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

// 10. Utility: Reset Form & UI State
function resetForm() {
    document.getElementById('marksForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-flex';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-file-invoice"></i> Manage Term Marks';
}

// 11. Bulk Selection Toggle
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

// 12. Bulk Delete
async function bulkDelete() {
    const selectedCheckboxes = document.querySelectorAll('.record-checkbox:checked');
    const idsToDelete = Array.from(selectedCheckboxes).map(cb => cb.value);

    if (idsToDelete.length === 0) {
        return alert("Please select at least one record to delete.");
    }

    if (confirm(`Are you sure you want to delete ${idsToDelete.length} selected records?`)) {
        try {
            const response = await fetch(`${API_URL}/bulk-delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idsToDelete)
            });

            if (response.ok) {
                alert("Selected records deleted successfully.");
                loadAllMarks();
                const selectAll = document.getElementById('selectAll');
                if (selectAll) selectAll.checked = false;
            } else {
                const error = await response.text();
                alert("Server Error: " + error);
            }
        } catch (error) {
            console.error("Bulk Delete Error:", error);
            alert("Failed to connect to the server.");
        }
    }
}