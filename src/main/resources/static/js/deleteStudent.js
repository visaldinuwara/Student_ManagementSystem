/**
 * 1. SEARCH FUNCTION
 * Fetches the student record and populates both visible and hidden fields.
 */
async function findStudentToDelete() {
  const studentId = document.getElementById("deleteSearchInput").value;

  if (!studentId) {
    alert("Please enter a Student ID or Name to search.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/personalinfo/search/${studentId}`);

    if (response.ok) {
      const result = await response.json();

      // Reveal the preview card
      document.getElementById('deletePreview').style.display = 'block';

      // VISIBLE FIELDS (For User Verification)
      document.getElementById('viewName').value = result.fullName || "";
      document.getElementById('viewPhone').value = result.phoneNo || "";
      document.getElementById('viewGrade').value = result.grade || "";
      document.getElementById('viewGuardianName').value = result.guardianName || "";
      document.getElementById('viewGuardianNIC').value = result.guardianNIC || "";
      document.getElementById('viewOccupation').value = result.occupation || "";

      // HIDDEN FIELDS (To ensure the full DTO is sent to Java)
      document.getElementById('viewBirthDate').value = result.birthDate || "";
      document.getElementById('viewAdmissionDate').value = result.addmissionDate || "";
      document.getElementById('viewWhatsAppNo').value = result.whatsAppNo || "";
      document.getElementById('viewAddress').value = result.address || "";
      document.getElementById('viewFutureGoal').value = result.futureGoal || "";

      console.log("Data loaded into hidden and visible fields.");
    } else {
      alert("Student record not found. Please check the ID.");
      document.getElementById('deletePreview').style.display = 'none';
    }
  } catch (error) {
    console.error("Search Error:", error);
    alert("Failed to connect to the server.");
  }
}

/**
 * 2. DELETE FUNCTION
 * Collects all data and sends a POST request with 'id' in URL and DTO in body.
 */
async function deleteStudentRecord() {
    // 1. Safety Check: Is there a student name on the screen?
    const loadedName = document.getElementById('viewName').value;
    if (!loadedName) {
        alert("Please find a student record first before trying to delete.");
        return;
    }

    // 2. Identify the student from the search input (for the PathVariable)
    const studentIdForPath = document.getElementById("deleteSearchInput").value;

    // 3. Final Confirmation
    if (confirm(`CRITICAL: Are you sure you want to permanently delete ${loadedName}?`)) {
        try {
            const formData = new URLSearchParams();
            const getValue = (htmlId) => document.getElementById(htmlId).value || "";

            // Pack the DTO
            formData.append('fullName', getValue('viewName'));
            formData.append('birthDate', getValue('viewBirthDate'));
            formData.append('addmissionDate', getValue('viewAdmissionDate'));
            formData.append('grade', getValue('viewGrade'));
            formData.append('phoneNo', getValue('viewPhone'));
            formData.append('whatsAppNo', getValue('viewWhatsAppNo'));
            formData.append('address', getValue('viewAddress'));
            formData.append('guardianName', getValue('viewGuardianName'));
            formData.append('guardianNIC', getValue('viewGuardianNIC'));
            formData.append('occupation', getValue('viewOccupation'));
            formData.append('futureGoal', getValue('viewFutureGoal'));

            // 4. Send the request
            const response = await fetch(`http://localhost:8080/personalinfo/delete/${studentIdForPath}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("The student record has been successfully deleted.");
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