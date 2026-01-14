async function addStudent() {
    const student = {
  fullName: document.getElementById("fullName").value,
  birthDate: document.getElementById("birthDate").value,
  addmissionDate: document.getElementById("addmissionDate").value,
  grade: document.getElementById("grade").value,
  phoneNo: document.getElementById("phoneNo").value,
  whatsAppNo: document.getElementById("whatsAppNo").value,
  address: document.getElementById("address").value,
  guardianName: document.getElementById("guardianName").value,
  guardianNIC: document.getElementById("guardianNIC").value,
  occupation: document.getElementById("occupation").value,
  futureGoal: document.getElementById("futureGoal").value
};
    console.log(student);
    try {
        const response = await fetch('http://localhost:8080/personalinfo/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Crucial: Tells Java to expect JSON
            },
            body: JSON.stringify(student) // Converts JS object to JSON string
        });

        // 3. Handle the Response from the Controller
        if (response.ok) {
            const result = await response.text();
            alert("Success: " + result);
            resetForm(); // Clears the form after successful save
        } else {
            const errorText = await response.text();
            alert("Server Error: " + errorText);
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert("Failed to connect to the server. Is your Java app running?");
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