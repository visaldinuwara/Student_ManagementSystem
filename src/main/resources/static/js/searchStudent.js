async function searchStudent() {
    let studentId = document.getElementById("searchQuery").value;
    
    // Clear old data before starting a new search
    clearFields();

    try {
        const response = await fetch(`http://localhost:8080/personalinfo/search/${studentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            
            // Populate all fields
            document.getElementById('fullName').value = result.fullName || "";
            document.getElementById('addmissionDate').value = result.addmissionDate || "";
            document.getElementById('birthDate').value = result.birthDate || "";
            document.getElementById('grade').value = result.grade || "";
            document.getElementById('phoneNo').value = result.phoneNo || "";
            document.getElementById('whatsAppNo').value = result.whatsAppNo || "";
            document.getElementById('futureGoal').value = result.futureGoal || "";
            document.getElementById('address').value = result.address || "";
            document.getElementById('guardianName').value = result.guardianName || "";
            document.getElementById('guardianNIC').value = result.guardianNIC || "";
            document.getElementById('occupation').value = result.occupation || "";

            // --- NEW LOGIC FOR MEDIUM ---
            // If isEnglishMedium is true, set text to "English Medium", otherwise "Sinhala Medium"
            const mediumField = document.getElementById('viewMedium');
            if (mediumField) {
                mediumField.value = result.isEnglishMedium ? "English Medium" : "Sinhala Medium";
            }

            console.log("Fields populated successfully");
            
        } else {
            alert("Student not found. Please check the ID.");
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert("Failed to connect to the server.");
    }
}

function clearFields() {
    document.getElementById("fullName").value = "";
    document.getElementById("birthDate").value = "";
    document.getElementById("addmissionDate").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("phoneNo").value = "";
    document.getElementById("whatsAppNo").value = "";
    document.getElementById("address").value = "";
    document.getElementById("guardianName").value = "";
    document.getElementById("guardianNIC").value = "";
    document.getElementById("occupation").value = "";
    document.getElementById("futureGoal").value = "";
    // Clear the new medium field too
    if(document.getElementById("viewMedium")) {
        document.getElementById("viewMedium").value = "";
    }
}