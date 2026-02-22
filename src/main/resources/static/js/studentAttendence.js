const API_URL = "http://localhost:8080/studentattendence";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAttendanceRecords();
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = 'none';
});

/**
 * BULK OPERATIONS
 */
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}

async function bulkDelete() {
    const selectedCheckboxes = document.querySelectorAll('.record-checkbox:checked');
    const idsToDelete = Array.from(selectedCheckboxes).map(cb => cb.value);

    if (idsToDelete.length === 0) {
        return alert("Please select at least one record to delete.");
    }

    if (confirm(`Are you sure you want to permanently delete ${idsToDelete.length} records?`)) {
        try {
            const response = await fetch(`${API_URL}/bulk-delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idsToDelete)
            });

            if (response.ok) {
                alert("Selected records deleted successfully!");
                loadAttendanceRecords();
                const selectAll = document.getElementById('selectAll');
                if (selectAll) selectAll.checked = false;
            } else {
                const errorMsg = await response.text();
                alert("Failed to delete records: " + errorMsg);
            }
        } catch (error) {
            console.error("Bulk Delete error:", error);
            alert("Network error.");
        }
    }
}

/**
 * CORE CRUD OPERATIONS
 */

// Fetch all records
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

// Render Table Rows
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    records.forEach(record => {
        const days = record.daysPresent || 0;
        let statusBadge = '';
        
        if (days >= 4) {
            statusBadge = '<span style="color: #27ae60; font-weight: bold;"><i class="fas fa-star"></i> EXCELLENT</span>';
        } else if (days >= 2) {
            statusBadge = '<span style="color: #f39c12; font-weight: bold;"><i class="fas fa-check"></i> AVERAGE</span>';
        } else {
            statusBadge = '<span style="color: #e74c3c; font-weight: bold;"><i class="fas fa-exclamation-triangle"></i> LOW</span>';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${record.year}</td>
            <td>${record.month}</td>
            <td><strong>${days}</strong> days</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-outline" onclick="editAttendance('${record.studentId}')" title="Edit" style="padding:4px 8px; margin-right:5px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline" onclick="deleteSingle('${record.studentId}')" title="Delete" style="padding:4px 8px; color:#e74c3c;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Single delete function using POST with PathVariable
 * Targets: @PostMapping("/delete/{studentId}")
 */
// 6. Delete Single Record (Selected from Table)
async function deleteSingle() {
    // Look for the first checked checkbox in the table body
    const selectedCheckbox = document.querySelector('.record-checkbox:checked');

    if (!selectedCheckbox) {
        return alert("Please select a record from the table first.");
    }

    const id = selectedCheckbox.value; // This is the studentId from the checkbox value

    if (confirm(`Are you sure you want to delete observation for ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: id }) 
            });

            if (response.ok) {
                alert("Deleted successfully.");
                loadAttendanceRecords();
                // Clear form if we happened to be editing that student
                if(document.getElementById('studentId').value === id) resetForm();
            } else {
                alert("Could not delete record.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }
}

// Helper to clean up UI after delete
function handleDeleteSuccess(id) {
    alert("Record deleted successfully.");
    if (document.getElementById('studentId').value === id) {
        resetForm();
    }
    loadAttendanceRecords();
}

// Save Record
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
            resetForm();
            loadAttendanceRecords();
        } else {
            alert("Error: Record might already exist.");
        }
    } catch (error) {
        alert("Error connecting to server.");
    }
}

// Update Record
async function updateAttendance() {
    const data = collectFormData();
    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            resetForm();
            loadAttendanceRecords();
        }
    } catch (error) {
        console.error("Update Error:", error);
    }
}

/**
 * HELPERS
 */
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        year: parseInt(document.getElementById('year').value),
        month: document.getElementById('month').value,
        daysPresent: parseInt(document.getElementById('daysPresent').value) || 0
    };
}

async function editAttendance(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('year').value = r.year;
            document.getElementById('month').value = r.month;
            document.getElementById('daysPresent').value = r.daysPresent;

            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Attendance Record';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

function resetForm() {
    const form = document.getElementById('attendanceForm');
    if (form) form.reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-calendar-check"></i> Monthly Attendance Entry';
    document.getElementById('year').value = "2026";
}