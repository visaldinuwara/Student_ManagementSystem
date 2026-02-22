const API_URL = "http://localhost:8080/studentmarks";

// 1. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    loadAllRecords();
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) updateBtn.style.display = 'none';
});

/**
 * CORE CRUD OPERATIONS
 */

// Fetch all records
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

// Render Table Rows
function renderTable(records) {
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="record-checkbox" value="${record.studentID}"></td>
            <td style="font-weight:600;">${record.studentID}</td>
            <td>
                <div style="font-size: 0.85rem; line-height: 1.4;">
                    <span style="color: #666;">T1:</span> <strong>${record.firstTerm}%</strong> | 
                    <span style="color: #666;">T2:</span> <strong>${record.secondTerm}%</strong> | 
                    <span style="color: #666;">T3:</span> <strong>${record.thirdTerm}%</strong>
                </div>
            </td>
            <td>
                <div style="font-size: 0.85rem; line-height: 1.4;">
                    <span style="color: #666;">Dept:</span> <strong>${record.departmentExam}</strong><br>
                    <span style="color: #666;">Eng:</span> <strong>${record.englishMediumExam}</strong>
                </div>
            </td>
            <td>
                <span class="badge" style="background:#f1c40f; color:#000; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">
                    RANKS: ${record.rankFirstTerm} | ${record.rankSecondTerm} | ${record.rankThirdTerm}
                </span>
            </td>
            <td>
                <button class="btn btn-outline" style="padding:5px 10px;" onclick="editRecord('${record.studentID}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline" style="padding:5px 10px; color:#e74c3c;" onclick="deleteSingle('${record.studentID}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Save Record (POST)
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
            alert("Academic records saved successfully!");
            resetForm();
            loadAllRecords();
        } else {
            const msg = await response.text();
            alert("Save failed: " + msg);
        }
    } catch (error) {
        alert("Error connecting to the academic server.");
    }
}

// Update Record (POST/PUT depending on backend)
async function updateData() {
    const data = collectFormData();
    try {
        const response = await fetch(`${API_URL}/update`, {
            method: 'POST', // Adjust to 'PUT' if your Spring controller uses @PutMapping
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Record updated successfully!");
            resetForm();
            loadAllRecords();
        } else {
            alert("Update failed.");
        }
    } catch (error) {
        console.error("Update error:", error);
    }
}

// Delete Single Record
async function deleteSingle(id) {
    if (confirm(`Are you sure you want to delete all marks for Student: ${id}?`)) {
        try {
            // Note: Adjust payload structure based on your @RequestBody requirement
            const response = await fetch(`${API_URL}/delete`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentID: id })
            });

            if (response.ok) {
                loadAllRecords();
            } else {
                alert("Delete operation failed.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    }
}

/**
 * HELPERS & UTILITIES
 */

function collectFormData() {
    return {
        StudentID: document.getElementById('studentID').value,
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

async function editRecord(id) {
    try {
        const response = await fetch(`${API_URL}/search/${id}`);
        if (response.ok) {
            const r = await response.json();
            
            // Populate form fields
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

            // UI Mode: Edit
            document.getElementById('studentID').readOnly = true;
            document.getElementById('addBtn').style.display = 'none';
            document.getElementById('updateBtn').style.display = 'inline-block';
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Comprehensive Record';
            
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Search fetch error:", error);
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
    document.getElementById('marksForm').reset();
    document.getElementById('studentID').readOnly = false;
    document.getElementById('addBtn').style.display = 'inline-block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-graduation-cap"></i> Comprehensive Academic Entry';
}

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

    if (confirm(`Are you sure you want to delete ${idsToDelete.length} records?`)) {
        try {
            const response = await fetch(`${API_URL}/bulk-delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idsToDelete)
            });

            if (response.ok) {
                alert("Records deleted successfully!");
                loadAllRecords();
                document.getElementById('selectAll').checked = false;
            } else {
                alert("Bulk delete failed.");
            }
        } catch (error) {
            console.error("Bulk Delete Error:", error);
        }
    }
}