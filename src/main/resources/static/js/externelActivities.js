async function saveStudentRecord() {
const studentData = {
        studentID: document.getElementById('studentID').value,
        firstTerm: parseFloat(document.getElementById('firstTerm').value) || 0.0,
        secondTerm: parseFloat(document.getElementById('secondTerm').value) || 0.0,
        thirdTerm: parseFloat(document.getElementById('thirdTerm').value) || 0.0,
        departmentExam: parseFloat(document.getElementById('departmentExam').value) || 0.0,
        englishMediumExam: parseFloat(document.getElementById('englishMediumExam').value) || 0.0,
        rankFirstTerm: parseInt(document.getElementById('rankFirstTerm').value) || 0,
        rankSecondTerm: parseInt(document.getElementById('rankSecondTerm').value) || 0,
        rankThirdTerm: parseInt(document.getElementById('rankThirdTerm').value) || 0,
        rankDepartmentExam: parseInt(document.getElementById('rankDepartmentExam').value) || 0,
        rankEnglishMediumExam: parseInt(document.getElementById('rankEnglishMediumExam').value) || 0
    };
try {
        const response = await fetch('http://localhost:8080/api/students/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Crucial: Tells Java to expect JSON
            },
            body: JSON.stringify(studentData) // Converts JS object to JSON string
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
function searchTable() {}
function resetStudentForm() {}
function bulkDelete() {}