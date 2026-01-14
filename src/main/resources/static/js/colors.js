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

// 3. Render Table Rows
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        // Create a visual string for the activities (Matrix)
        const matrix = [
            record.katinaPerahara ? 'K' : '-',
            record.buddhaPooja ? 'B' : '-',
            record.danaya ? 'D' : '-',
            record.bakthiGeetha ? 'BG' : '-',
            record.paaliDay ? 'P' : '-',
            record.englishDay ? 'E' : '-',
            record.concert ? 'C' : '-'
        ].join(' / ');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentId}"></td>
            <td style="font-weight:600;">${record.studentId}</td>
            <td><small>${matrix}</small></td>
            <td><span class="badge" style="background:#e3f2fd; color:#1976d2; padding:4px 8px; border-radius:4px;">${record.marks.toFixed(1)}</span></td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editRecord('${record.studentId}')">
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
            alert("Record Saved Successfully!");
            resetForm();
            loadAllRecords();
        }
    } catch (error) {
        alert("Error saving record");
    }
}

// 5. Update Existing Record (PUT)
async function updateData() {
    const studentId = document.getElementById('studentId').value;
    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Record Updated!");
            resetForm();
            loadAllRecords();
        }
    } catch (error) {
        console.error("Update Error:", error);
    }
}

// 6. Helper: Collect Data from UI
function collectFormData() {
    return {
        studentId: document.getElementById('studentId').value,
        katinaPerahara: document.getElementById('katinaPerahara').checked,
        buddhaPooja: document.getElementById('buddhaPooja').checked,
        danaya: document.getElementById('danaya').checked,
        bakthiGeetha: document.getElementById('bakthiGeetha').checked,
        paaliDay: document.getElementById('paaliDay').checked,
        englishDay: document.getElementById('englishDay').checked,
        concert: document.getElementById('concert').checked,
        marks: parseFloat(document.getElementById('marks').value) || 0.0,
        other: document.getElementById('other').value
    };
}

// 7. Edit Record: Load data back into form
async function editRecord(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            document.getElementById('studentId').value = r.studentId;
            document.getElementById('katinaPerahara').checked = r.katinaPerahara;
            document.getElementById('buddhaPooja').checked = r.buddhaPooja;
            document.getElementById('danaya').checked = r.danaya;
            document.getElementById('bakthiGeetha').checked = r.bakthiGeetha;
            document.getElementById('paaliDay').checked = r.paaliDay;
            document.getElementById('englishDay').checked = r.englishDay;
            document.getElementById('concert').checked = r.concert;
            document.getElementById('marks').value = r.marks;
            document.getElementById('other').value = r.other;

            // Lock ID and change UI state
            document.getElementById('studentId').readOnly = true;
            document.getElementById('addBtn').disabled = true;
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Activity Record';
        }
    } catch (error) {
        console.error("Fetch record error");
    }
}

// 8. Delete Single Record
async function deleteSingle(id) {
    const data=collectFormData();
    if (confirm(`Delete record for ${id}?`)) {
        await fetch(`${API_URL}/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        loadAllRecords();
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
    document.getElementById('form-title').innerHTML = '<i class="fas fa-user-plus"></i> Add External Activity Record';
}

// 11. Bulk Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}