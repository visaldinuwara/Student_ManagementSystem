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
    tableBody.innerHTML = '';

    records.forEach(record => {
        // Calculate average for the "Annual Avg" column
        const t1 = record.firstTerm || 0;
        const t2 = record.secondTerm || 0;
        const t3 = record.thirdTerm || 0;
        const average = (t1 + t2 + t3) / 3;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td>${t1.toFixed(1)}</td>
            <td>${t2.toFixed(1)}</td>
            <td>${t3.toFixed(1)}</td>
            <td><strong style="color: var(--accent);">${average.toFixed(1)}</strong></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editObservation('${record.studentId}')">
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
        }
    } catch (error) {
        alert("Error saving record.");
    }
}

// 5. Update Existing Observation (PUT)
async function updateObservation() {
    const studentId = document.getElementById('studentId').value;
    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Observation updated!");
            resetForm();
            loadAllObservations();
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 6. Edit Mode: Load data back into the form
async function editObservation(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Fill the form
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('firstTerm').value = r.firstTerm;
            document.getElementById('secondTerm').value = r.secondTerm;
            document.getElementById('thirdTerm').value = r.thirdTerm;

            // UI Changes
            document.getElementById('studentId').readOnly = true; // Protect ID
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Update Observation';
        }
    } catch (error) {
        console.error("Edit fetch error");
    }
}

// 7. Delete Single Record
async function deleteSingle(id) {
  const data=collectFormData();
    if (confirm(`Delete observation record for ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete`, { method: 'POST', body: JSON.stringify(data) });
            if (response.ok) loadAllObservations();
        } catch (error) {
            alert("Delete failed.");
        }
    }
}

// 8. Helper: Grab all form values
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        firstTerm: parseFloat(document.getElementById('firstTerm').value) || 0,
        secondTerm: parseFloat(document.getElementById('secondTerm').value) || 0,
        thirdTerm: parseFloat(document.getElementById('thirdTerm').value) || 0
    };
}

// 9. Utility: Search table
function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

// 10. Utility: Reset Form state
function resetForm() {
    document.getElementById('observationForm').reset();
    document.getElementById('studentId').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-family"></i> Record Parent Observations';
}

// 11. Bulk Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}