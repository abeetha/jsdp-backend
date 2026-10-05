const pool = require('../db/db.js');


// CREATE JOB FOR EMPLOYER
const createEmployerJob = async (req, res) => {

    try {

        const {
            employer_id,
            title,
            description,
            location,
            employment_type,
            salary,
            required_skills,
            experience_required,
            deadline
        } = req.body;


        const [result] = await pool.query(
            `INSERT INTO jobs
            (
                employer_id,
                title,
                description,
                location,
                employment_type,
                salary,
                required_skills,
                experience_required,
                deadline
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                employer_id,
                title,
                description,
                location,
                employment_type,
                salary,
                required_skills,
                experience_required,
                deadline
            ]
        );


        res.status(201).json({
            message: 'Job created successfully',
            job_id: result.insertId
        });


    } catch (err) {

        console.error('Error creating employer job:', err);

        res.status(500).json({
            error: 'Error creating job'
        });

    }

};


// GET ALL JOBS OF AN EMPLOYER
const getEmployerJobs = async (req, res) => {

    try {

        const employerId = req.params.employerId;


        const [rows] = await pool.query(
            `SELECT *
             FROM jobs
             WHERE employer_id = ?
             ORDER BY id DESC`,
            [employerId]
        );


        res.status(200).json(rows);


    } catch (err) {

        console.error('Error fetching employer jobs:', err);

        res.status(500).json({
            error: 'Error fetching employer jobs'
        });

    }

};


// GET ONE EMPLOYER JOB
const getEmployerJobById = async (req, res) => {

    try {

        const jobId = req.params.id;


        const [rows] = await pool.query(
            `SELECT *
             FROM jobs
             WHERE id = ?`,
            [jobId]
        );


        if (rows.length === 0) {

            return res.status(404).json({
                error: 'Job not found'
            });

        }


        res.status(200).json(rows[0]);


    } catch (err) {

        console.error('Error fetching job:', err);

        res.status(500).json({
            error: 'Error fetching job'
        });

    }

};


// UPDATE EMPLOYER JOB
const updateEmployerJob = async (req, res) => {

    try {

        const jobId = req.params.id;


        const [result] = await pool.query(
            `UPDATE jobs
             SET ?
             WHERE id = ?`,
            [
                req.body,
                jobId
            ]
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


// DELETE EMPLOYER JOB
const deleteEmployerJob = async (req, res) => {

    try {

        const jobId = req.params.id;


        const [result] = await pool.query(
            `DELETE FROM jobs
             WHERE id = ?`,
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


module.exports = {
    createEmployerJob,
    getEmployerJobs,
    getEmployerJobById,
    updateEmployerJob,
    deleteEmployerJob
};