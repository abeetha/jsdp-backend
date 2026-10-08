const pool = require('../db/db.js');


// ==========================================
// APPLY FOR A JOB
// ==========================================

const saveApplication = async (req, res) => {

    try {

        const {
            user_id,
            job_id,
            cover_letter
        } = req.body;


        // Check required fields
        if (!user_id || !job_id) {

            return res.status(400).json({
                error: 'user_id and job_id are required'
            });

        }


        // Check whether job exists
        const [jobRows] = await pool.query(
            'SELECT id FROM jobs WHERE id = ?',
            [job_id]
        );


        if (jobRows.length === 0) {

            return res.status(404).json({
                error: 'Job not found'
            });

        }


        // Check whether user already applied
        const [existingApplication] = await pool.query(
            `SELECT id
             FROM applications
             WHERE user_id = ?
             AND job_id = ?`,
            [
                user_id,
                job_id
            ]
        );


        if (existingApplication.length > 0) {

            return res.status(409).json({
                error: 'You have already applied for this job'
            });

        }


        // Create application
        const [result] = await pool.query(
            `INSERT INTO applications
            (
                user_id,
                job_id,
                cover_letter,
                status
            )
            VALUES (?, ?, ?, ?)`,
            [
                user_id,
                job_id,
                cover_letter || null,
                'applied'
            ]
        );


        res.status(201).json({

            message: 'Application submitted successfully',

            application_id: result.insertId,

            status: 'applied'

        });


    } catch (err) {

        console.error(
            'Error submitting application:',
            err
        );


        // Duplicate entry protection
        if (err.code === 'ER_DUP_ENTRY') {

            return res.status(409).json({
                error: 'You have already applied for this job'
            });

        }


        res.status(500).json({
            error: 'Error submitting application'
        });

    }

};


// ==========================================
// GET ALL APPLICATIONS
// ==========================================

const getApplications = async (req, res) => {

    try {

        const [rows] = await pool.query(
            `SELECT
                applications.id,
                applications.user_id,
                applications.job_id,
                applications.cover_letter,
                applications.status,
                applications.applied_at,

                jobs.title AS job_title,
                jobs.location,
                jobs.employment_type

            FROM applications

            INNER JOIN jobs
                ON applications.job_id = jobs.id

            ORDER BY applications.id DESC`
        );


        res.status(200).json(rows);


    } catch (err) {

        console.error(
            'Error fetching applications:',
            err
        );


        res.status(500).json({
            error: 'Error fetching applications'
        });

    }

};


// ==========================================
// GET MY APPLICATIONS
// ==========================================

const getUserApplications = async (req, res) => {

    try {

        const userId = req.params.userId;


        const [rows] = await pool.query(
            `SELECT
                applications.id AS application_id,
                applications.user_id,
                applications.job_id,
                applications.cover_letter,
                applications.status,
                applications.applied_at,

                jobs.title AS job_title,
                jobs.description,
                jobs.location,
                jobs.employment_type,
                jobs.required_skills

            FROM applications

            INNER JOIN jobs
                ON applications.job_id = jobs.id

            WHERE applications.user_id = ?

            ORDER BY applications.id DESC`,
            [userId]
        );


        res.status(200).json({

            success: true,

            user_id: userId,

            total: rows.length,

            data: rows

        });


    } catch (err) {

        console.error(
            'Error fetching user applications:',
            err
        );


        res.status(500).json({
            error: 'Error fetching user applications'
        });

    }

};


// ==========================================
// GET ONE APPLICATION
// ==========================================

const getApplicationById = async (req, res) => {

    try {

        const applicationId = req.params.id;


        const [rows] = await pool.query(
            `SELECT
                applications.id AS application_id,
                applications.user_id,
                applications.job_id,
                applications.cover_letter,
                applications.status,
                applications.applied_at,

                jobs.title AS job_title,
                jobs.description,
                jobs.location,
                jobs.employment_type,
                jobs.required_skills

            FROM applications

            INNER JOIN jobs
                ON applications.job_id = jobs.id

            WHERE applications.id = ?`,
            [applicationId]
        );


        if (rows.length === 0) {

            return res.status(404).json({
                error: 'Application not found'
            });

        }


        res.status(200).json(rows[0]);


    } catch (err) {

        console.error(
            'Error fetching application:',
            err
        );


        res.status(500).json({
            error: 'Error fetching application'
        });

    }

};


// ==========================================
// WITHDRAW APPLICATION
// ==========================================

const deleteApplicationById = async (req, res) => {

    try {

        const applicationId = req.params.id;


        const [result] = await pool.query(
            `DELETE FROM applications
             WHERE id = ?`,
            [applicationId]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Application not found'
            });

        }


        res.status(200).json({

            message:
                `Application with ID: ${applicationId} withdrawn successfully`

        });


    } catch (err) {

        console.error(
            'Error withdrawing application:',
            err
        );


        res.status(500).json({
            error: 'Error withdrawing application'
        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    saveApplication,

    getApplications,

    getApplicationById,

    getUserApplications,

    deleteApplicationById

};