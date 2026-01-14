document.addEventListener('DOMContentLoaded', function() {
    loadAllStudents();
});

async function loadAllStudents() {
    try {
        const response = await fetch('http://localhost:8080/personalinfo/all'); 
        
        if (response.ok) {
            const data = await response.json();
            document.getElementById('totalCount').innerText = data.length;
            renderTable(data);
        } else {
            alert("Error: Could not retrieve student list.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Failed to connect to server.");
    }
}

function renderTable(students) {
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');

        // Formats Date objects properly (or shows '-' if null)
        const formatDate = (dateStr) => {
            if (!dateStr) return "-";
            const d = new Date(dateStr);
            return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
        };

        row.innerHTML = `
            <td style="font-weight: 600; color: #2c5282;">${student.fullName || "-"}</td>
            <td>${formatDate(student.birthDate)}</td>
            <td>${formatDate(student.addmissionDate)}</td>
            <td><span class="badge">Grade ${student.grade || "N/A"}</span></td>
            <td>${student.phoneNo || "-"}</td>
            <td>${student.whatsAppNo || "-"}</td>
            <td style="max-width: 200px; white-space: normal;">${student.address || "-"}</td>
            <td>${student.guardianName || "-"}</td>
            <td>${student.guardianNIC || "-"}</td>
            <td>${student.occupation || "-"}</td>
            <td style="font-style: italic; color: #38a169;">"${student.futureGoal || "-"}"</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search Filter Logic
document.getElementById('filterTable').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('#studentTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});