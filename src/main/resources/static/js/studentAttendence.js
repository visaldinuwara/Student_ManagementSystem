const API_URL = "http://localhost:8080/studentattendence";

document.addEventListener('DOMContentLoaded', () => {
    loadAttendanceRecords();
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = 'none';
});

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
            </td>
        `;
        tableBody.appendChild(row);
    });
}
//Delete
async function deleteSingle() {
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
                if (document.getElementById('studentId').value === id) resetForm();
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
            await addingToTotalMarks(studentId, data.daysPresent);
            resetForm();
            loadAttendanceRecords();
        } else {
            alert("Error: Record might already exist.");
        }
    } catch (error) {
        alert("Error connecting to server.");
    }
}
let originalDaysPresent = 0; // when its updating this is the variable used to update totalmarks
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
            await updatingTotalMarks(data.studentId, originalDaysPresent,data.daysPresent);
            resetForm();
            loadAttendanceRecords();
        }
    } catch (error) {
        console.error("Update Error:", error);
    }
}

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
            originalDaysPresent = r.daysPresent; // Store original days present for update calculations
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
async function addingToTotalMarks(studentId, presentDays) {
    try {
        const res1 = await fetch(`http://localhost:8080/totalMarks/search/${studentId}`);
        
        if (res1.ok) {
            const data1 = await res1.json();
            
            if (data1!=null) { // Check if record exists
                const currentMarks = parseFloat(data1.totalMarks) || 0.0;
                const newMarks = parseFloat(currentMarks) + (parseInt(presentDays) * 10);
                
                await fetch(`http://localhost:8080/totalMarks/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        studentId: studentId, 
                        studentName: data1.studentName, // Fixed variable name
                        totalMarks: newMarks // Ensure key matches your Java Entity
                    })
                });
            } else {
                // If not in totalMarks, check personalinfo
                const res2 = await fetch(`http://localhost:8080/personalinfo/search/${studentId}`);
                if (res2.ok) {
                    const data2 = await res2.json();
                    const newMarks = (parseInt(presentDays) * 10); // Starting marks for new record
                    
                    await fetch(`http://localhost:8080/totalMarks/save`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            studentId: studentId, 
                            studentName: data2.fullName, 
                            totalMarks: newMarks 
                        })
                    });
                }
            }
        }
    } catch (error) {
        console.error("Adding Error:", error);
    }
}
// Make sure you pass originalDaysPresent into the function!
async function updatingTotalMarks(studentId,originalDaysPresent, presentDays) {
    try {
        const res = await fetch(`http://localhost:8080/totalMarks/search/${studentId}`);
        if (res.ok) {
            const data = await res.json();
            if (data) {
                const oldInputMarks = (parseFloat(originalDaysPresent) || 0) * 10;
                const newInputMarks = (parseFloat(presentDays) || 0) * 10;
                
                // Subtract old, add new
                const totalMarks = (parseFloat(data.totalMarks) || 0.0) - parseFloat(oldInputMarks) + parseFloat(newInputMarks);

                await fetch(`http://localhost:8080/totalMarks/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        studentId: studentId, 
                        studentName: data.studentName, 
                        totalMarks: totalMarks 
                    })
                });
            }
        }
    } catch (error) {
        console.error("Update Error:", error);
    }
}