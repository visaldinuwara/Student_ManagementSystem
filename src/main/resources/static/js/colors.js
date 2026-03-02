const API_URL = "http://localhost:8080/colors";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllRecords();
});

// 2. Fetch all records for the Table
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

/**
 * Renders the data table with boolean fields displayed as "Yes" or "No".
 * Maps Java fields: dinisuru, ransilu, praknapradeepa, sisumini, svarnavarna, svarnabushana
 */
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    records.forEach(record => {
        // Helper to convert boolean to Yes/No text
        const formatBool = (val) => val ? '<span style="color:#2e7d32; font-weight:bold;">Yes</span>' : '<span style="color:#d32f2f;">No</span>';

        // Creating a descriptive list for the matrix column
        const matrixHTML = `
            <div style="font-size: 0.85rem; line-height: 1.4;">
                Dinisuru: ${formatBool(record.dinisuru)} | 
                Ransilu: ${formatBool(record.ransilu)} | 
                Prakna: ${formatBool(record.praknapradeepa)} <br>
                Sisumini: ${formatBool(record.sisumini)} | 
                Svarnavarna: ${formatBool(record.svarnavarna)} | 
                Svarnabushana: ${formatBool(record.svarnabushana)}
            </div>
        `;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="vertical-align: middle;">
                <input type="checkbox" class="record-checkbox" value="${record.studentID}">
            </td>
            <td style="font-weight:600; vertical-align: middle;">
                ${record.studentID}
            </td>
            <td style="vertical-align: middle;">
                ${matrixHTML}
            </td>
            <td style="vertical-align: middle;">
                <span class="badge" style="background:#e8f5e9; color:#2e7d32; padding:6px 10px; border-radius:4px; font-weight:bold;">
                    ${(record.totalMarks || 0).toFixed(1)}
                </span>
            </td>
            <td style="vertical-align: middle;">
                <div style="display: flex; gap: 5px;">
                    <button class="btn btn-outline" onclick="editRecord('${record.studentID}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
    
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save New Record (POST)
async function saveData() {
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
            addingToTotalMarks(studentId, data.totalMarks); // Update total marks after saving the record
            alert("Record Saved Successfully!");
            resetForm();
            loadAllRecords();
        } else {
            const err = await response.text();
            alert("Save failed: " + err);
        }
    } catch (error) {
        alert("Error connecting to server");
    }
}
let originalTotalMarks = 0; // Global variable to store original total marks for updating
// 5. Update Existing Record (PUT)
async function updateData() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("No Student ID selected to update");

    const data = collectFormData();
    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            updatingTotalMarks(studentId,originalTotalMarks,data.totalMarks)
            alert("Record for " + studentId + " updated successfully!");
            resetForm();
            loadAllRecords();
        } else {
            alert("Update failed. Please check if the record exists.");
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("Network error during update.");
    }
}

// 6. Helper: Collect Data from UI
function collectFormData() {
    return {
        studentID: document.getElementById('studentId').value,
        dinisuru: document.getElementById('dinisuru').checked,
        ransilu: document.getElementById('ransilu').checked,
        praknapradeepa: document.getElementById('praknapradeepa').checked,
        sisumini: document.getElementById('sisumini').checked,
        svarnavarna: document.getElementById('svarnavarna').checked,
        svarnabushana: document.getElementById('svarnabushana').checked,
        totalMarks: document.getElementById('totalMarks').value || 0.0,
    };
}

/**
 * Fetches student data and prepares the UI for updating an existing record.
 * This hides the Add button and shows the Update button.
 */
async function editRecord(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Populate form fields
            document.getElementById('studentId').value = r.studentID;
            document.getElementById('dinisuru').checked = r.dinisuru;
            document.getElementById('ransilu').checked = r.ransilu;
            document.getElementById('praknapradeepa').checked = r.praknapradeepa;
            document.getElementById('sisumini').checked = r.sisumini;
            document.getElementById('svarnavarna').checked = r.svarnavarna;
            document.getElementById('svarnabushana').checked = r.svarnabushana;
            document.getElementById('totalMarks').value = r.totalMarks;
            originalTotalMarks = r.totalMarks; // Store original marks for later comparison
            // UI State Transformation for Editing
            document.getElementById('studentId').readOnly = true;
            
            // Ensure Add button is completely hidden
            const addBtn = document.getElementById('addBtn');
            addBtn.hidden = true; 
            addBtn.style.display = "none"; // Forced CSS override
            
            // Show Update button
            const updateBtn = document.getElementById('updateBtn');
            updateBtn.hidden = false;
            updateBtn.style.display = "inline-flex";
            
            // Update UI Header
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Activity Record';
            
            // Smooth scroll to top to see the form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Error fetching record for edit:", error);
    }
}

// 8. Delete Single Record
async function deleteSingle() {
    const selectedCheckbox = document.querySelector('.record-checkbox:checked');
    if (!selectedCheckbox) return alert("No Student ID selected to delete");
    const id = selectedCheckbox.value;

    if (confirm(`Are you sure you want to delete record: ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, {
                method: 'POST',
            });
            
            if (response.ok) {
                loadAllRecords();
                // If we were editing the same record we just deleted, reset the form
                if (document.getElementById('studentId').value === id) resetForm();
            } else {
                alert("Could not delete record.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
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
    document.getElementById('activityForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').disabled = false;
    // Hide update button if you prefer toggling it, or keep it visible
    document.getElementById('form-title').innerHTML = '<i class="fas fa-user-plus"></i> Add External Activity Record';
}

// 11. Bulk Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}
function calculateLiveMarks(totalMarks,isChecked) {
    if(Number(totalMarks)==250 && isChecked){
        document.getElementById('totalMarks').value=(Number(totalMarks)+250);
    }else{
    if(isChecked){
        document.getElementById('totalMarks').value = (Number(totalMarks) + 50);
    }else if(Number(totalMarks)>0){
        document.getElementById('totalMarks').value = (Number(totalMarks)-50);
    }else{
        document.getElementById('totalMarks').value = totalMarks;
    }
    }
}
async function addingToTotalMarks(studentId, totalMarks) {
    try {
        const res1 = await fetch(`http://localhost:8080/totalMarks/search/${studentId}`);
        
        if (res1.ok) {
            const data1 = await res1.json();
            
            if (data1!=null) { // Check if record exists
                const currentMarks = parseFloat(data1.totalMarks) || 0.0;
                const newMarks = parseFloat(currentMarks) + parseFloat(totalMarks);
                
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
                    const newMarks = totalMarks; // Starting marks for new record
                    
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
async function updatingTotalMarks(studentId,originalTotalMarks,totalMarksOfC) {
    try {
        const res = await fetch(`http://localhost:8080/totalMarks/search/${studentId}`);
        if (res.ok) {
            const data = await res.json();
            if (data) {
                const oldInputMarks = parseFloat(originalTotalMarks) || 0;
                const newInputMarks = parseFloat(totalMarksOfC) || 0;

                // Subtract old, add new
                const totalMarks = (parseFloat(data.totalMarks) || 0.0) - oldInputMarks + newInputMarks;

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