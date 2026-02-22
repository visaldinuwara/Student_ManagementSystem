async function fetchStudentForUpdate(){
    let id = document.getElementById("updateSearchId").value;
    if(!id) { alert("Please enter an ID first"); return; }

    try {
        const response = await fetch(`http://localhost:8080/personalinfo/search/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const result = await response.json();
            
            // Map text fields
            document.getElementById('fullName').value = result.fullName || "";
            document.getElementById('birthDate').value = result.birthDate || "";
            document.getElementById('grade').value = result.grade || "";
            document.getElementById('phoneNo').value = result.phoneNo || "";
            document.getElementById('whatsAppNo').value = result.whatsAppNo || "";
            document.getElementById('admissionDate').value = result.addmissionDate || "";
            document.getElementById('futureGoal').value = result.futureGoal || "";
            document.getElementById('address').value = result.address || "";
            document.getElementById('guardianName').value = result.guardianName || "";
            document.getElementById('guardianNIC').value = result.guardianNIC || "";
            document.getElementById('occupation').value = result.occupation || "";

            // --- CRITICAL FIX: Update Radio Buttons ---
            if (result.isEnglishMedium) {
                document.getElementById('englishMedium').checked = true;
            } else {
                document.getElementById('sinhalaMedium').checked = true;
            }

            // Update status text
            document.getElementById('updateStatus').innerHTML = `<i class="fas fa-history"></i> Last fetched: ${new Date().toLocaleTimeString()}`;
            
        } else {
            alert("Student not found!");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to connect to server.");
    }
}

function reload(){
    document.getElementById("updateForm").reset(); // Shorter way to clear all inputs
    document.getElementById('sinhalaMedium').checked = true; // Reset radio to default
}

async function updateStudentRecord() {
    const studentId = document.getElementById("updateSearchId").value;
    const isEnglish = document.getElementById("englishMedium").checked;

    const studentData = {
        fullName: document.getElementById('fullName').value,
        birthDate: document.getElementById('birthDate').value,
        addmissionDate: document.getElementById('admissionDate').value,
        grade: document.getElementById('grade').value,
        phoneNo: document.getElementById('phoneNo').value,
        whatsAppNo: document.getElementById('whatsAppNo').value,
        address: document.getElementById('address').value,
        guardianName: document.getElementById('guardianName').value,
        guardianNIC: document.getElementById('guardianNIC').value,
        occupation: document.getElementById('occupation').value,
        futureGoal: document.getElementById('futureGoal').value,
        isEnglishMedium: isEnglish
    };

    if (confirm(`Are you sure you want to update ${studentData.fullName}?`)) {
        try {
            const response = await fetch(`http://localhost:8080/personalinfo/update/${studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            if (response.ok) {
                alert("Updated successfully!");
                window.location.reload();
            } else {
                alert("Error: " + await response.text());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
