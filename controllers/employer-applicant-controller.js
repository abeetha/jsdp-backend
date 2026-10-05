const pool = require('../db/db.js');


// GET APPLICANTS FOR ONE JOB
const getApplicantsForJob = async (req, res) => {

    try {

        const jobId = req.params.jobId;


        const [rows] = await pool.query(
            `SELECT
                applications.id AS application_id,
                applications.job_id,
                applications.user_id,
                applications.cover_letter,
                applications.status,
                applications.applied_at,

                job_seekers.first_name,
                job_seekers.last_name,
                job_seekers.email,
                job_seekers.phone,
                job_seekers.skills,
                job_seekers.experience,
                job_seekers.resume_url

            FROM applications

            INNER JOIN job_seekers
                ON applications.user_id = job_seekers.user_id

            WHERE applications.job_id = ?

            ORDER BY applications.id DESC`,
            [jobId]
        );


        res.status(200).json(rows);


    } catch (err) {

        console.error('Error fetching applicants:', err);

        res.status(500).json({
            error: 'Error fetching applicants'
        });

    }

};


// GET ALL APPLICANTS FOR EMPLOYER
const getEmployerApplicants = async (req, res) => {

    try {

        const employerId = req.params.employerId;


        const [rows] = await pool.query(
            `SELECT
                applications.id AS application_id,
                applications.job_id,
                applications.user_id,
                applications.cover_letter,
                applications.status,
                applications.applied_at,

                jobs.title AS job_title,

                job_seekers.first_name,
                job_seekers.last_name,
                job_seekers.email,
                job_seekers.phone,
                job_seekers.skills,
                job_seekers.experience,
                job_seekers.resume_url

            FROM applications

            INNER JOIN jobs
                ON applications.job_id = jobs.id

            INNER JOIN job_seekers
                ON applications.user_id = job_seekers.user_id

            WHERE jobs.employer_id = ?

            ORDER BY applications.id DESC`,
            [employerId]
        );


        res.status(200).json(rows);


    } catch (err) {

        console.error('Error fetching employer applicants:', err);

        res.status(500).json({
            error: 'Error fetching employer applicants'
        });

    }

};


// GET ONE APPLICATION
const getApplicantById = async (req, res) => {

    try {

        const applicationId = req.params.id;


        const [rows] = await pool.query(
            `SELECT
                applications.id AS application_id,
                applications.job_id,
                applications.user_id,
                applications.cover_letter,
                applications.status,
                applications.applied_at,

                jobs.title AS job_title,

                job_seekers.first_name,
                job_seekers.last_name,
                job_seekers.email,
                job_seekers.phone,
                job_seekers.skills,
                job_seekers.experience,
                job_seekers.resume_url

            FROM applications

            INNER JOIN jobs
                ON applications.job_id = jobs.id

            INNER JOIN job_seekers
                ON applications.user_id = job_seekers.user_id

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

        console.error('Error fetching application:', err);

        res.status(500).json({
            error: 'Error fetching application'
        });

    }

};


// UPDATE APPLICATION STATUS
const updateApplicationStatus = async (req, res) => {

    try {

        const applicationId = req.params.id;

        const { status } = req.body;


        const allowedStatuses = [
            'applied',
            'reviewing',
            'shortlisted',
            'interview',
            'selected',
            'rejected'
        ];


        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({
                error: 'Invalid application status'
            });

        }


        const [result] = await pool.query(
            `UPDATE applications
             SET status = ?
             WHERE id = ?`,
            [
                status,
                applicationId
            ]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Application not found'
            });

        }


        res.status(200).json({
            message: 'Application status updated successfully',
            application_id: applicationId,
            status: status
        });


    } catch (err) {

        console.error('Error updating application status:', err);

        res.status(500).json({
            error: 'Error updating application status'
        });

    }

};


module.exports = {
    getApplicantsForJob,
    getEmployerApplicants,
    getApplicantById,
    updateApplicationStatus
};