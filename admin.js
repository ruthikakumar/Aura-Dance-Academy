/*
 * Aura Dance Academy
 * Admin Dashboard Logic
 */

// ============================================================
// INITIAL DATA
// ============================================================

const DEFAULT_STUDENTS = [
    {
        id: "STU001",
        name: "Priya",
        email: "priya@example.com",
        phone: "9876543210",
        dance: "Bharatanatyam",
        level: "Intermediate",
        batch: "B01",
        instructor: "Ananya",
        joiningDate: "2026-09-01",
        feeStatus: "PAID",
        attendance: 92,
        status: "ACTIVE"
    },
    {
        id: "STU002",
        name: "Rahul",
        email: "rahul@example.com",
        phone: "9876543211",
        dance: "Hip Hop",
        level: "Intermediate",
        batch: "B02",
        instructor: "Rahul",
        joiningDate: "2026-09-05",
        feeStatus: "PENDING",
        attendance: 88,
        status: "ACTIVE"
    },
    {
        id: "STU003",
        name: "Anu",
        email: "anu@example.com",
        phone: "9876543212",
        dance: "Contemporary",
        level: "Advanced",
        batch: "C01",
        instructor: "Sneha",
        joiningDate: "2026-09-10",
        feeStatus: "PAID",
        attendance: 95,
        status: "ACTIVE"
    }
];


// ============================================================
// STORAGE KEYS
// ============================================================

const ADMIN_STORAGE_KEYS = {
    STUDENTS: "aura_students"
};


// ============================================================
// INITIALIZE DATA
// ============================================================

function initializeAdminData() {

    const existingStudents =
        localStorage.getItem(ADMIN_STORAGE_KEYS.STUDENTS);

    if (!existingStudents) {

        localStorage.setItem(
            ADMIN_STORAGE_KEYS.STUDENTS,
            JSON.stringify(DEFAULT_STUDENTS)
        );
    }
}


// ============================================================
// GET STUDENTS
// ============================================================

function getStudents() {

    const storedStudents =
        localStorage.getItem(ADMIN_STORAGE_KEYS.STUDENTS);

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
// SAVE STUDENTS
// ============================================================

function saveStudents(students) {

    localStorage.setItem(
        ADMIN_STORAGE_KEYS.STUDENTS,
        JSON.stringify(students)
    );
}


// ============================================================
// DASHBOARD STATISTICS
// ============================================================

function updateDashboardStatistics() {

    const students = getStudents();

    const totalStudents =
        students.length;

    const activeStudents =
        students.filter(function (student) {
            return student.status === "ACTIVE";
        }).length;

    const pendingFees =
        students.filter(function (student) {
            return student.feeStatus === "PENDING";
        }).length;


    const totalStudentsElement =
        document.getElementById("totalStudents");

    const activeStudentsElement =
        document.getElementById("activeStudents");

    const pendingFeesElement =
        document.getElementById("pendingFees");


    if (totalStudentsElement) {
        totalStudentsElement.textContent =
            totalStudents;
    }

    if (activeStudentsElement) {
        activeStudentsElement.textContent =
            activeStudents;
    }

    if (pendingFeesElement) {
        pendingFeesElement.textContent =
            pendingFees;
    }
}


// ============================================================
// DISPLAY ADMIN NAME
// ============================================================

function displayAdminName() {

    const currentUser =
        getCurrentUser();

    const adminName =
        document.getElementById("adminName");

    if (currentUser && adminName) {

        adminName.textContent =
            currentUser.name;
    }
}


// ============================================================
// INITIALIZE DASHBOARD
// ============================================================

function initializeAdminDashboard() {

    initializeAdminData();

    updateDashboardStatistics();

    displayAdminName();
}


// ============================================================
// START DASHBOARD
// ============================================================

initializeAdminDashboard();