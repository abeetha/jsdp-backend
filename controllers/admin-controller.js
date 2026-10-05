const pool = require('../db/db.js');


// ======================================================
// USER MANAGEMENT
// ======================================================


// GET ALL USERS
// GET /api/v1/admin/users
const getUsers = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM users ORDER BY id DESC'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching users:', err);

        res.status(500).json({
            error: 'Error fetching users'
        });
    }
};


// GET USER BY ID
// GET /api/v1/admin/users/:id
const getUserById = async (req, res) => {
    try {

        const userId = req.params.id;

        const [rows] = await pool.query(
            'SELECT * FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json(rows[0]);

    } catch (err) {

        console.error('Error fetching user:', err);

        res.status(500).json({
            error: 'Error fetching user'
        });
    }
};


// UPDATE USER
// PUT /api/v1/admin/users/:id
const updateUser = async (req, res) => {
    try {

        const userId = req.params.id;

        const [result] = await pool.query(
            'UPDATE users SET ? WHERE id = ?',
            [req.body, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json({
            message: `User with ID: ${userId} updated successfully`
        });

    } catch (err) {

        console.error('Error updating user:', err);

        res.status(500).json({
            error: 'Error updating user'
        });
    }
};


// DELETE USER
// DELETE /api/v1/admin/users/:id
const deleteUser = async (req, res) => {
    try {

        const userId = req.params.id;

        const [result] = await pool.query(
            'DELETE FROM users WHERE id = ?',
            [userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json({
            message: `User with ID: ${userId} deleted successfully`
        });

    } catch (err) {

        console.error('Error deleting user:', err);

        res.status(500).json({
            error: 'Error deleting user'
        });
    }
};



// ======================================================
// JOB MANAGEMENT
// ======================================================


// GET ALL JOBS
// GET /api/v1/admin/jobs
const getJobs = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM jobs ORDER BY id DESC'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching jobs:', err);

        res.status(500).json({
            error: 'Error fetching jobs'
        });
    }
};


// UPDATE JOB
// PUT /api/v1/admin/jobs/:id
const updateJob = async (req, res) => {
    try {

        const jobId = req.params.id;

        const [result] = await pool.query(
            'UPDATE jobs SET ? WHERE id = ?',
            [req.body, jobId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Job not found'
            });
        }

        res.status(200).json({
            message: `Job with ID: ${jobId} updated successfully`
        });

    } catch (err) {

        console.error('Error updating job:', err);

        res.status(500).json({
            error: 'Error updating job'
        });
    }
};


// DELETE JOB
// DELETE /api/v1/admin/jobs/:id
const deleteJob = async (req, res) => {
    try {

        const jobId = req.params.id;

        const [result] = await pool.query(
            'DELETE FROM jobs WHERE id = ?',
            [jobId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Job not found'
            });
        }

        res.status(200).json({
            message: `Job with ID: ${jobId} deleted successfully`
        });

    } catch (err) {

        console.error('Error deleting job:', err);

        res.status(500).json({
            error: 'Error deleting job'
        });
    }
};



// ======================================================
// COURSE MANAGEMENT
// ======================================================


// GET ALL COURSES
// GET /api/v1/admin/courses
const getCourses = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM courses ORDER BY id DESC'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching courses:', err);

        res.status(500).json({
            error: 'Error fetching courses'
        });
    }
};


// UPDATE COURSE
// PUT /api/v1/admin/courses/:id
const updateCourse = async (req, res) => {
    try {

        const courseId = req.params.id;

        const [result] = await pool.query(
            'UPDATE courses SET ? WHERE id = ?',
            [req.body, courseId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Course not found'
            });
        }

        res.status(200).json({
            message: `Course with ID: ${courseId} updated successfully`
        });

    } catch (err) {

        console.error('Error updating course:', err);

        res.status(500).json({
            error: 'Error updating course'
        });
    }
};


// DELETE COURSE
// DELETE /api/v1/admin/courses/:id
const deleteCourse = async (req, res) => {
    try {

        const courseId = req.params.id;

        const [result] = await pool.query(
            'DELETE FROM courses WHERE id = ?',
            [courseId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Course not found'
            });
        }

        res.status(200).json({
            message: `Course with ID: ${courseId} deleted successfully`
        });

    } catch (err) {

        console.error('Error deleting course:', err);

        res.status(500).json({
            error: 'Error deleting course'
        });
    }
};



// ======================================================
// APPLICATION MANAGEMENT
// ======================================================


// GET ALL APPLICATIONS
// GET /api/v1/admin/applications
const getApplications = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM applications ORDER BY id DESC'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching applications:', err);

        res.status(500).json({
            error: 'Error fetching applications'
        });
    }
};



// ======================================================
// ANALYTICS
// ======================================================


// GET SYSTEM ANALYTICS
// GET /api/v1/admin/analytics
const getAnalytics = async (req, res) => {
    try {

        // Total users
        const [userCount] = await pool.query(
            'SELECT COUNT(*) AS totalUsers FROM users'
        );

        // Total jobs
        const [jobCount] = await pool.query(
            'SELECT COUNT(*) AS totalJobs FROM jobs'
        );

        // Total courses
        const [courseCount] = await pool.query(
            'SELECT COUNT(*) AS totalCourses FROM courses'
        );

        // Total applications
        const [applicationCount] = await pool.query(
            'SELECT COUNT(*) AS totalApplications FROM applications'
        );


        res.status(200).json({

            users: userCount[0].totalUsers,

            jobs: jobCount[0].totalJobs,

            courses: courseCount[0].totalCourses,

            applications: applicationCount[0].totalApplications

        });

    } catch (err) {

        console.error('Error fetching analytics:', err);

        res.status(500).json({
            error: 'Error fetching analytics'
        });
    }
};



// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {

    // Users
    getUsers,
    getUserById,
    updateUser,
    deleteUser,

    // Jobs
    getJobs,
    updateJob,
    deleteJob,

    // Courses
    getCourses,
    updateCourse,
    deleteCourse,

    // Applications
    getApplications,

    // Analytics
    getAnalytics
};