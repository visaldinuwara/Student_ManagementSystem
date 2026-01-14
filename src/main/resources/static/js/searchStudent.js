async function searchStudent() {
    let studentId = document.getElementById("searchQuery").value;
    
    try {
        const response = await fetch(`http://localhost:8080/personalinfo/search/${studentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // 1. FIRST: Get the data from the response
            const result = await response.json();
            
            // 2. SECOND: Map that data to your HTML fields
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

            console.log("Fields populated successfully");
            
            // Note: I removed resetForm() here because you want the user to 
            // see the data you just searched for!
            
        } else {
            const errorText = await response.text();
            alert("Student not found: " + errorText);
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
}