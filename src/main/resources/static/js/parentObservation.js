const API_URL = "http://localhost:8080/ParentObservation";

// 1. Initialize Page - Load all records when the page opens
document.addEventListener('DOMContentLoaded', () => {
    loadAllObservations();
});

// 2. Load all records into the table
async function loadAllObservations() {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (response.ok) {
            const data = await response.json();
            renderTable(data);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// 3. Render Table Rows with live Average calculation
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    records.forEach(record => {
        // Calculate average
        const t1 = parseFloat(record.firstTerm) || 0;
        const t2 = parseFloat(record.secondTerm) || 0;
        const t3 = parseFloat(record.thirdTerm) || 0;
        const average = (t1 + t2 + t3) / 3;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${t1.toFixed(1)}</td>
            <td>${t2.toFixed(1)}</td>
            <td>${t3.toFixed(1)}</td>
            <td><strong style="color: #2c3e50;">${average.toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px; margin-right:5px;" onclick="editObservation('${record.studentId}')" title="Edit">
                    <i class="fas fa-edit"></i>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save New Observation (POST)
async function saveObservation() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("Please enter a Student ID");

    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Observation saved successfully!");
            resetForm();
            loadAllObservations();
        } else {
            const err = await response.text();
            alert("Error: " + err);
        }
    } catch (error) {
        alert("Error saving record. Check connection.");
    }
}

// 5. Update Existing Observation (POST/PUT)
async function updateObservation() {
    const studentId = document.getElementById('studentId').value;
    if (!studentId) return alert("No student selected to update.");

    const data = collectFormData();

    try {
        // Keeping POST as per your provided logic, though PUT is standard for updates
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Observation updated successfully!");
            resetForm();
            loadAllObservations();
        } else {
            alert("Update failed.");
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 6. Delete Single Record
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
                loadAllObservations();
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

// 8. Edit Mode: Load data back into the form
async function editObservation(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Fill the form fields
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('firstTerm').value = r.firstTerm;
            document.getElementById('secondTerm').value = r.secondTerm;
            document.getElementById('thirdTerm').value = r.thirdTerm;

            // UI Changes
            document.getElementById('studentId').readOnly = true; 
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Update Observation';
            
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Edit fetch error:", error);
    }
}

// 9. Helper: Grab all form values
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        firstTerm: parseFloat(document.getElementById('firstTerm').value) || 0.0,
        secondTerm: parseFloat(document.getElementById('secondTerm').value) || 0.0,
        thirdTerm: parseFloat(document.getElementById('thirdTerm').value) || 0.0
    };
}

// 10. Utility: Search table
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// 11. Utility: Reset Form state
function resetForm() {
    const form = document.getElementById('observationForm');
    if (form) form.reset();
    
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-users-viewfinder"></i> Record Parent Observations';
}

// 12. Bulk Selection Toggle
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}