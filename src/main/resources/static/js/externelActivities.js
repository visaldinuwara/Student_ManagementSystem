const EXTERNAL_API_URL = "http://localhost:8080/externelactivity";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadExternalRecords();
    // Ensure update button is hidden initially
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = 'none';
});

// 2. Fetch all records for the Table
async function loadExternalRecords() {
    try {
        const response = await fetch(`${EXTERNAL_API_URL}/all`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        }
    } catch (error) {
        console.error("Load Error:", error);
    }
}

// 3. Render Table Rows (Updated with all 7 activities)
function renderTable(records) {
    const tableBody = document.getElementById('activityTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        
        // Helper to render green check for true, grey cross for false
        const status = (val) => val 
            ? '<span style="color: #27ae60;"><i class="fas fa-check-circle"></i></span>' 
            : '<span style="color: #cbd5e0;"><i class="fas fa-times-circle"></i></span>';

        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600; text-align: left !important;">${record.studentId}</td>
            <td style="text-align:center;">${status(record.katinaPerahara)}</td>
            <td style="text-align:center;">${status(record.buddhaPooja)}</td>
            <td style="text-align:center;">${status(record.danaya)}</td>
            <td style="text-align:center;">${status(record.bakthiGeetha)}</td>
            <td style="text-align:center;">${status(record.paaliDay)}</td>
            <td style="text-align:center;">${status(record.englishDay)}</td>
            <td style="text-align:center;">${status(record.concert)}</td>
            <td><span class="badge" style="background:#e3f2fd; color:#1976d2; padding:4px 8px; border-radius:4px; font-weight:bold;">${record.marks || 0}</span></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px; margin-right:5px;" onclick="editRecord('${record.studentId}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save Student Record (POST)
async function saveStudentRecord() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("Please enter a valid Student ID");

    const data = collectFormData();

    try {
        const response = await fetch(`${EXTERNAL_API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Record Saved Successfully!");
            resetForm();
            loadExternalRecords();
        } else {
            alert("Failed to save. Record might already exist.");
        }
    } catch (error) {
        alert("Server connection error.");
    }
}

// 5. Update Activity Record (Using PUT to ensure backend updates existing record)
async function updateActivity() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("No Student ID selected to update");

    const data = collectFormData();

    try {
        // We use PUT for updates. If your backend specifically uses POST for /update, change 'PUT' to 'POST'
        const response = await fetch(`${EXTERNAL_API_URL}/update`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Record Updated Successfully!");
            resetForm();
            loadExternalRecords();
        } else {
            const errorMsg = await response.text();
            alert("Update failed: " + errorMsg);
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("Network error during update.");
    }
}

// 6. Helper: Collect Data from UI (Strict boolean check)
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        katinaPerahara: document.getElementById('katinaPerahara').checked === true,
        buddhaPooja: document.getElementById('buddhaPooja').checked === true,
        danaya: document.getElementById('danaya').checked === true,
        bakthiGeetha: document.getElementById('bakthiGeetha').checked === true,
        paaliDay: document.getElementById('paaliDay').checked === true,
        englishDay: document.getElementById('englishDay').checked === true,
        concert: document.getElementById('concert').checked === true,
        marks: parseFloat(document.getElementById('marks').value) || 0.0,
        other: document.getElementById('other').value || ""
    };
}

// 7. Edit Record: Load data back into form
async function editRecord(id) {
    try {
        const response = await fetch(`${EXTERNAL_API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Map data to form fields
            document.getElementById('studentId').value = r.studentId;
            // !! forces any truthy/falsy value into a clean boolean
            document.getElementById('katinaPerahara').checked = !!r.katinaPerahara;
            document.getElementById('buddhaPooja').checked = !!r.buddhaPooja;
            document.getElementById('danaya').checked = !!r.danaya;
            document.getElementById('bakthiGeetha').checked = !!r.bakthiGeetha;
            document.getElementById('paaliDay').checked = !!r.paaliDay;
            document.getElementById('englishDay').checked = !!r.englishDay;
            document.getElementById('concert').checked = !!r.concert;
            document.getElementById('marks').value = r.marks || 0;
            document.getElementById('other').value = r.other || "";

            // Toggle Buttons
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').style.display = "none";
            document.getElementById('updateBtn').style.display = "inline-flex";
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Activity Participation';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Fetch record error:", error);
    }
}

// 8. Delete Single Record
async function deleteSingle() {
    // Look for the first checked checkbox in the table body
    const selectedCheckbox = document.querySelector('.record-checkbox:checked');

    if (!selectedCheckbox) {
        return alert("Please select a record from the table first.");
    }

    const id = selectedCheckbox.value; // This is the studentId from the checkbox value

    if (confirm(`Are you sure you want to delete observation for ${id}?`)) {
        try {
            const response = await fetch(`${EXTERNAL_API_URL}/delete/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: id }) 
            });

            if (response.ok) {
                alert("Deleted successfully.");
                loadExternalRecords();
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



// 10. Utility Functions
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#activityTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

function resetForm() {
    document.getElementById('activityForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = "inline-flex";
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = "none";
    document.getElementById('form-title').innerHTML = '<i class="fas fa-skating"></i> Manage Activity Participation';
}

function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}