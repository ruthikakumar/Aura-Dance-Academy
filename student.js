/*
 * Aura Dance Academy
 * Student Dashboard Logic
 */

// ============================================================
// STORAGE
// ============================================================

const STUDENT_STORAGE_KEY = "aura_students";


// ============================================================
// GET ALL STUDENTS
// ============================================================

function getAllStudents() {

    const storedStudents =
        localStorage.getItem(STUDENT_STORAGE_KEY);

    if (!storedStudents) {
        return [];
    }

    try {

        return JSON.parse(storedStudents);

    } catch (error) {

        console.error(
            "Unable to read student data.",
            error
        );

        return [];
    }
}


// ============================================================
// GET LOGGED-IN STUDENT
// ============================================================

function getLoggedInStudent() {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return null;
    }


    const students =
        getAllStudents();


    /*
     * The demo student account is linked to STU001.
     *
     * Later, when we build student account creation,
     * this relationship will be stored properly.
     */

    const student =
        students.find(function (item) {

            return item.id === currentUser.id;

        });


    return student || null;
}


// ============================================================
// DISPLAY STUDENT INFORMATION
// ============================================================

function displayStudentInformation() {

    const currentUser =
        getCurrentUser();

    const student =
        getLoggedInStudent();


    if (!currentUser) {
        return;
    }


    // --------------------------------------------------------
    // Student name
    // --------------------------------------------------------

    const studentName =
        document.getElementById("studentName");

    const studentNameHeader =
        document.getElementById("studentNameHeader");


    if (studentName) {

        studentName.textContent =
            currentUser.name;
    }


    if (studentNameHeader) {

        studentNameHeader.textContent =
            currentUser.name;
    }


    // --------------------------------------------------------
    // No student record found
    // --------------------------------------------------------

    if (!student) {

        console.warn(
            "No student record found for the logged-in user."
        );

        return;
    }


    // --------------------------------------------------------
    // Student dashboard values
    // --------------------------------------------------------

    const dashboardValues = {

        studentDance:
            student.dance,

        studentLevel:
            student.level,

        studentAttendance:
            `${student.attendance}%`,

        studentFeeStatus:
            student.feeStatus,

        studentId:
            student.id,

        studentBatch:
            student.batch,

        studentInstructor:
            student.instructor

    };


    // --------------------------------------------------------
    // Update elements
    // --------------------------------------------------------

    Object.keys(dashboardValues).forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                dashboardValues[id];
        }

    });
}


// ============================================================
// INITIALIZE
// ============================================================

function initializeStudentDashboard() {

    displayStudentInformation();

}


// Run when page loads
initializeStudentDashboard();