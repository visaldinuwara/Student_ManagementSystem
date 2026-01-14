const API_URL = "http://localhost:8080/studentattendence";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAttendanceRecords();
    document.getElementById('updateBtn').style.display = 'none';
});

// 2. Fetch all records from Java Backend
async function loadAttendanceRecords() {
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
        // Simple logic for attendance status badge
        const days = record.daysPresent || 0;
        let statusBadge = '';
        
        if (days >= 4) {
            statusBadge = '<span style="background: #c6f6d5; color: #22543d; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">EXCELLENT</span>';
        } else if (days >= 2) {
            statusBadge = '<span style="background: #feebc8; color: #744210; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">AVERAGE</span>';
        } else {
            statusBadge = '<span style="background: #fed7d7; color: #822727; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">LOW</span>';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${record.year}</td>
            <td>${record.month}</td>
            <td>${days} days</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editAttendance('${record.studentId}')">
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

// 4. Save Record (POST) - Remember @RequestBody in Java
async function saveAttendance() {
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
            alert("Attendance logged successfully!");
            resetForm();
            loadAttendanceRecords();
        }
    } catch (error) {
        alert("Error saving attendance.");
    }
}

// 5. Update Record (PUT) - Remember @RequestBody in Java
async function updateAttendance() {
    const studentId = document.getElementById('studentId').value;
    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Attendance updated!");
            resetForm();
            loadAttendanceRecords();
        }
    } catch (error) {
        console.error("Update Error:", error);
    }
}

// 6. Helper: Collect Data from UI
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        year: parseInt(document.getElementById('year').value),
        month: document.getElementById('month').value,
        daysPresent: parseInt(document.getElementById('daysPresent').value) || 0
    };
}

// 7. Edit Mode: Load data back into form
async function editAttendance(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('year').value = r.year;
            document.getElementById('month').value = r.month;
            document.getElementById('daysPresent').value = r.daysPresent;

            // UI Changes
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Attendance Record';
        }
    } catch (error) {
        console.error("Fetch error");
    }
}

// 8. Delete Single (Using POST with Body as you requested previously)
async function deleteSingle(id) {
    const data = collectFormData();
    data.studentId = id; // Ensure the ID is correctly set in the object

    if (confirm(`Remove attendance record for ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                loadAttendanceRecords();
            }
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
    document.getElementById('attendanceForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-calendar-check"></i> Monthly Attendance Entry';
}

// 11. Bulk Checkbox Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}