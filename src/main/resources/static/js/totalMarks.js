const API_URL = "http://localhost:8080/totalMarks"; // Ensure this matches your Spring Boot Controller path

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllRecords();
});

// 2. Fetch all records
async function loadAllRecords() {
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

// 3. Render Table
function renderTable(records) {
    const tableBody = document.getElementById('finalMarksTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${record.studentName}</td>
            <td>
                <span class="badge" style="background:#e3f2fd; color:#1976d2; padding:6px 10px; border-radius:4px; font-weight:bold;">
                    ${(record.totalMarks || 0).toFixed(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-outline" onclick="editRecord('${record.studentId}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
function collectFormData(){
  const studentId = document.getElementById('studentId').value;
  const studentName = document.getElementById('studentName').value;
  const totalMarks = parseFloat(document.getElementById('finalTotal').value) || 0.0;

  return { studentId, studentName, totalMarks };
}

// 4. Save Record
async function saveFinalMarks() {
    const data = collectFormData();
    if (!data.studentId || !data.studentName) return alert("Please fill all fields");

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Record Saved!");
            resetTotalForm();
            loadAllRecords();
        }
    } catch (error) {
        alert("Server Error");
    }
}

// 5. Edit Record (Prepare for Update)
async function editRecord(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('studentName').value = r.studentName;
            document.getElementById('finalTotal').value = r.totalMarks || 0.0;

            // UI Toggle
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = "none";
            document.getElementById('updateBtn').style.display = "inline-flex";
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Grade Record';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Edit Error:", error);
    }
}

// 6. Update Record
async function updateFinalMarks() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("No Student ID selected for update");
    const data = collectFormData();
    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST', // or 'PUT' based on your Java controller
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Updated Successfully!");
            resetTotalForm();
            loadAllRecords();
        }
    } catch (error) {
        alert("Update Error");
    }
}

// 7. Delete Selected
async function deleteSelectedRecords() {
    const checkedBoxes = document.querySelectorAll('.record-checkbox:checked');
    if (checkedBoxes.length === 0) return alert("Please select records to delete");

    if (confirm(`Delete ${checkedBoxes.length} record(s)?`)) {
        for (let cb of checkedBoxes) {
            await fetch(`${API_URL}/delete/${cb.value}`, { method: 'POST' });
        }
        loadAllRecords();
    }
}

// 8. Utilities
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#finalMarksTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

function resetTotalForm() {
    document.getElementById('totalMarksForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = "inline-flex";
    document.getElementById('updateBtn').style.display = "none";
    document.getElementById('form-title').innerHTML = '<i class="fas fa-calculator"></i> Final Grade Entry';
}

function toggleAllRows(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}
function fetchStudentName(studentId) {
    if (!studentId) {
        document.getElementById('studentName').value = '';
        return;
    }
    // Fetch student name from the server
    fetch(`http://localhost:8080/personalinfo/search/${studentId}`)
        .then(response => {
            if (!response.ok) throw new Error("Student not found");
            return response.json();
        })
        .then(data => {
            document.getElementById('studentName').value = data.fullName || '';
        })
        .catch(error => {
            console.error("Fetch Error:", error);
        });
}