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
    // 1. Safety Check: Ensure the user has actually searched for a student
    const studentIdForPath = document.getElementById("deleteSearchInput").value;
    const loadedName = document.getElementById('viewName').value;

    if (!studentIdForPath || !loadedName) {
        alert("Please find a student record first before trying to delete.");
        return;
    }

    // 2. Final Confirmation
    if (confirm(`CRITICAL: Are you sure you want to permanently delete ${loadedName} (ID: ${studentIdForPath})?`)) {
        try {
            // 3. Send the request using the DELETE method
            // We do NOT send a body or Content-Type because the ID is in the URL
            const response = await fetch(`http://localhost:8080/personalinfo/delete/${studentIdForPath}`, {
                method: 'DELETE' 
            });

            // 4. Handle the Response
            if (response.ok) {
                alert("The student record has been successfully deleted.");
                window.location.reload(); 
            } else {
                const errorMsg = await response.text();
                alert("Server Error: " + errorMsg);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Could not connect to the server. Is the backend running?");
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