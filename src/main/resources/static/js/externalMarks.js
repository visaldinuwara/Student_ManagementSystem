const API_URL = "http://localhost:8080/externalmarks"; // Adjust to your actual backend endpoint

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
        // Calculate Average for display
        const m1 = record.firstTerm || 0;
        const m2 = record.secondTerm || 0;
        const m3 = record.thirdTerm || 0;
        const average = (m1 + m2 + m3) / 3;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${m1.toFixed(1)}</td>
            <td>${m2.toFixed(1)}</td>
            <td>${m3.toFixed(1)}</td>
            <td><strong style="color: #2c3e50;">${average.toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editMarks('${record.studentId}')">
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
async function saveMarks() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("Please enter Student ID");

    const data = collectFormMarks();

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
        }
    } catch (error) {
        alert("Error saving marks.");
    }
}

// 5. Update Record (PUT)
async function updateMarks() {
    const studentId = document.getElementById('studentId').value;
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
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 6. Helper: Collect Data
function collectFormMarks() {
    return {
        studentId: document.getElementById('studentId').value,
        firstTerm: parseFloat(document.getElementById('firstTerm').value) || 0,
        secondTerm: parseFloat(document.getElementById('secondTerm').value) || 0,
        thirdTerm: parseFloat(document.getElementById('thirdTerm').value) || 0
    };
}

// 7. Edit Marks (Load data into form)
async function editMarks(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('firstTerm').value = r.firstTerm;
            document.getElementById('secondTerm').value = r.secondTerm;
            document.getElementById('thirdTerm').value = r.thirdTerm;

            // UI Adjustments
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Term Marks';
        }
    } catch (error) {
        console.error("Fetch error");
    }
}

// 8. Delete Single
async function deleteSingle(id) {
    // 1. We still collect the data object to satisfy the DTO parameter in Java
    const data = collectFormMarks();

    if (confirm(`Are you sure you want to delete marks for ${id}?`)) {
        try {
            // 2. We send the ID in the URL path and the DTO in the body
            const response = await fetch(`${API_URL}/delete`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Record deleted successfully");
                loadAllMarks();
            } else {
                alert("Failed to delete record.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    }
}

// 9. Utility: Search
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// 10. Utility: Reset
function resetForm() {
    document.getElementById('marksForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-file-invoice"></i> Manage Term Marks';
}

// 11. Bulk Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}