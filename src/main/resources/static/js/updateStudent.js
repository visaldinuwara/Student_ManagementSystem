async function fetchStudentForUpdate(){
  let id=document.getElementById("updateSearchId").value;

  try {
        const response = await fetch(`http://localhost:8080/personalinfo/search/${id}`, {
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
function reload(){
    document.getElementById("fullName").value = "";
    document.getElementById("birthDate").value = "";
    document.getElementById("admissionDate").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("phoneNo").value = "";
    document.getElementById("whatsAppNo").value = "";
    document.getElementById("address").value = "";
    document.getElementById("guardianName").value = "";
    document.getElementById("guardianNIC").value = "";
    document.getElementById("occupation").value = "";
    document.getElementById("futureGoal").value = "";
}
async function updateStudentRecord(){
      // 1. Safety Check: Is there a student name on the screen?
    const loadedName = document.getElementById('fullName').value;
    if (!loadedName) {
        alert("Please find a student record first before trying to delete.");
        return;
    }

    // 2. Identify the student from the search input (for the PathVariable)
    const studentIdForPath = document.getElementById("updateSearchId").value;

    // 3. Final Confirmation
    if (confirm(`CRITICAL: Are you sure you want to permanently delete ${loadedName}?`)) {
        try {
            const formData = new URLSearchParams();
            const getValue = (htmlId) => document.getElementById(htmlId).value || "";

            // Pack the DTO
            formData.append('fullName', getValue('fullName'));
            formData.append('birthDate', getValue('birthDate'));
            formData.append('addmissionDate', getValue('admissionDate'));
            formData.append('grade', getValue('grade'));
            formData.append('phoneNo', getValue('phoneNo'));
            formData.append('whatsAppNo', getValue('whatsAppNo'));
            formData.append('address', getValue('address'));
            formData.append('guardianName', getValue('guardianName'));
            formData.append('guardianNIC', getValue('guardianNIC'));
            formData.append('occupation', getValue('occupation'));
            formData.append('futureGoal', getValue('futureGoal'));

            // 4. Send the request
            const response = await fetch(`http://localhost:8080/personalinfo/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });

            if (response.ok) {
                alert("The student record has been successfully updated.");
                window.location.reload(); 
            } else {
                alert("The server could not delete the record. Please check the ID.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Could not connect to the server.");
        }
    }
}