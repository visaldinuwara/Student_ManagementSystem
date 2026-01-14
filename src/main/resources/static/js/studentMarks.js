const API_URL = "http://localhost:8080/studentmarks";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllRecords();
    // Hide update button by default
    document.getElementById('updateBtn').style.display = 'none';
});

// 2. Fetch all records from Java Backend
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

// 3. Render Table with Grouped Data
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentID}"></td>
            <td style="font-weight:600;">${record.studentID}</td>
            <td>
                <small>T1: ${record.firstTerm}%</small><br>
                <small>T2: ${record.secondTerm}%</small><br>
                <small>T3: ${record.thirdTerm}%</small>
            </td>
            <td>
                <small>Dept: ${record.departmentExam}</small><br>
                <small>Eng: ${record.englishMediumExam}</small>
            </td>
            <td>
                <span class="badge" style="background:#f1c40f; color:#000; padding:2px 6px; border-radius:4px; font-size:0.8rem;">
                    Ranks: ${record.rankFirstTerm} | ${record.rankSecondTerm} | ${record.rankThirdTerm}
                </span>
            </td>
            <td>
                <button class="btn btn-outline" style="padding:4px 8px;" onclick="editRecord('${record.studentID}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline" style="padding:4px 8px; color:red;" onclick="deleteSingle('${record.studentID}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 4. Save Record (POST) - Uses @RequestBody in Java
async function saveData() {
    const studentID = document.getElementById('studentID').value;
    if (!studentID) return alert("Student ID is required");

    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Comprehensive records saved!");
            resetForm();
            loadAllRecords();
        }
    } catch (error) {
        alert("Error saving academic data.");
    }
}

// 5. Update Record (PUT)
async function updateData() {
    const studentID = document.getElementById('studentID').value;
    const data = collectFormData();

    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Records updated successfully!");
            resetForm();
            loadAllRecords();
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// 6. Helper: Collect all 11 fields into one DTO object
function collectFormData() {
    return {
        studentID: document.getElementById('studentID').value,
        firstTerm: parseFloat(document.getElementById('firstTerm').value) || 0,
        secondTerm: parseFloat(document.getElementById('secondTerm').value) || 0,
        thirdTerm: parseFloat(document.getElementById('thirdTerm').value) || 0,
        departmentExam: parseFloat(document.getElementById('departmentExam').value) || 0,
        englishMediumExam: parseFloat(document.getElementById('englishMediumExam').value) || 0,
        rankFirstTerm: parseInt(document.getElementById('rankFirstTerm').value) || 0,
        rankSecondTerm: parseInt(document.getElementById('rankSecondTerm').value) || 0,
        rankThirdTerm: parseInt(document.getElementById('rankThirdTerm').value) || 0,
        rankDepartmentExam: parseInt(document.getElementById('rankDepartmentExam').value) || 0,
        rankEnglishMediumExam: parseInt(document.getElementById('rankEnglishMediumExam').value) || 0
    };
}

// 7. Edit Mode: Load massive object back into form
async function editRecord(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Map JSON fields back to input IDs
            document.getElementById('studentID').value = r.studentID;
            document.getElementById('firstTerm').value = r.firstTerm;
            document.getElementById('secondTerm').value = r.secondTerm;
            document.getElementById('thirdTerm').value = r.thirdTerm;
            document.getElementById('departmentExam').value = r.departmentExam;
            document.getElementById('englishMediumExam').value = r.englishMediumExam;
            document.getElementById('rankFirstTerm').value = r.rankFirstTerm;
            document.getElementById('rankSecondTerm').value = r.rankSecondTerm;
            document.getElementById('rankThirdTerm').value = r.rankThirdTerm;
            document.getElementById('rankDepartmentExam').value = r.rankDepartmentExam;
            document.getElementById('rankEnglishMediumExam').value = r.rankEnglishMediumExam;

            // UI Adjustments
            document.getElementById('studentID').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Comprehensive Record';
        }
    } catch (error) {
        console.error("Fetch error");
    }
}

// 8. Delete Single (POST with Body)
async function deleteSingle(id) {
    const data = collectFormData();
    data.studentID = id; 

    if (confirm(`Permanently delete all academic records for ${id}?`)) {
        try {
            const response = await fetch(`${API_URL}/delete`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) loadAllRecords();
        } catch (error) {
            alert("Delete failed.");
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
    document.getElementById('studentID').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-graduation-cap"></i> Comprehensive Academic Entry';
}

// 11. Bulk Checkbox Selection
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('.record-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}