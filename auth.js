/*
 * Dance Academy Management System
 * Authentication & Authorization
 *
 * Frontend-only demo authentication.
 * Data is stored in localStorage.
 */

// ============================================================
// DEMO USERS
// ============================================================

const USERS = [
    {
        id: "ADM001",
        username: "admin",
        email: "admin@danceacademy.com",
        password: "admin123",
        role: "ADMIN",
        name: "Academy Admin"
    },
    {
        id: "INS001",
        username: "instructor",
        email: "instructor@danceacademy.com",
        password: "instructor123",
        role: "INSTRUCTOR",
        name: "Ananya Sharma"
    },
    {
        id: "STU001",
        username: "student",
        email: "student@danceacademy.com",
        password: "student123",
        role: "STUDENT",
        name: "Ruthika"
    }
];


// ============================================================
// STORAGE KEYS
// ============================================================

const STORAGE_KEYS = {
    CURRENT_USER: "danceAcademy_currentUser"
};


// ============================================================
// LOGIN
// ============================================================

function login(usernameOrEmail, password, expectedRole = null) {

    const username = usernameOrEmail.trim().toLowerCase();

    const user = USERS.find(function (account) {

        const matchesUsername =
            account.username.toLowerCase() === username;

        const matchesEmail =
            account.email.toLowerCase() === username;

        const matchesPassword =
            account.password === password;

        return (
            (matchesUsername || matchesEmail) &&
            matchesPassword
        );
    });


    // User doesn't exist or password is incorrect
    if (!user) {
        return {
            success: false,
            message: "Invalid username/email or password."
        };
    }


    // Prevent a student from logging in through admin login
    if (expectedRole && user.role !== expectedRole) {
        return {
            success: false,
            message: `This login is only for ${expectedRole.toLowerCase()} users.`
        };
    }


    // Store only necessary session information
    const sessionUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name
    };

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(sessionUser)
    );


    return {
        success: true,
        user: sessionUser
    };
}


// ============================================================
// GET CURRENT USER
// ============================================================

function getCurrentUser() {

    const storedUser =
        localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch (error) {

        console.error("Invalid stored user session.");

        localStorage.removeItem(
            STORAGE_KEYS.CURRENT_USER
        );

        return null;
    }
}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_USER
    );

    window.location.href = "index.html";
}


// ============================================================
// CHECK LOGIN
// ============================================================

function isLoggedIn() {
    return getCurrentUser() !== null;
}


// ============================================================
// CHECK ROLE
// ============================================================

function hasRole(requiredRole) {

    const user = getCurrentUser();

    if (!user) {
        return false;
    }

    return user.role === requiredRole;
}


// ============================================================
// PROTECT PAGE
// ============================================================

function requireLogin(loginPage = "index.html") {

    const user = getCurrentUser();

    if (!user) {
        window.location.href = loginPage;
        return false;
    }

    return true;
}


// ============================================================
// PROTECT PAGE BY ROLE
// ============================================================

function requireRole(requiredRole, loginPage = "index.html") {

    const user = getCurrentUser();


    // Not logged in
    if (!user) {
        window.location.href = loginPage;
        return false;
    }


    // Logged in but wrong role
    if (user.role !== requiredRole) {

        if (user.role === "ADMIN") {
            window.location.href = "admin-dashboard.html";
        }
        else if (user.role === "INSTRUCTOR") {
            window.location.href = "instructor-dashboard.html";
        }
        else if (user.role === "STUDENT") {
            window.location.href = "student-dashboard.html";
        }
        else {
            window.location.href = loginPage;
        }

        return false;
    }

    return true;
}


// ============================================================
// REDIRECT LOGGED-IN USER
// ============================================================

function redirectBasedOnRole() {

    const user = getCurrentUser();

    if (!user) {
        return;
    }


    switch (user.role) {

        case "ADMIN":
            window.location.href = "admin-dashboard.html";
            break;

        case "INSTRUCTOR":
            window.location.href = "instructor-dashboard.html";
            break;

        case "STUDENT":
            window.location.href = "student-dashboard.html";
            break;

        default:
            logout();
    }
}