const pool = require('../db/db.js');
// ======================================================
// CREATE JOB
// POST /api/v1/jobs
// ======================================================
const saveJob = async (req, res) => {
    try {

        const [result] = await pool.query(
            'INSERT INTO jobs SET ?',
            [req.body]
        );

        res.status(201).json({
            message: 'Job saved successfully',
            id: result.insertId
        });

    } catch (err) {

        console.error('Error saving job:', err);

        res.status(500).json({
            error: 'Error saving job'
        });
    }
};

// ======================================================
// GET ALL JOBS
// GET /api/v1/jobs
// ======================================================
const getJobs = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM jobs'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching jobs:', err);

        res.status(500).json({
            error: 'Error fetching jobs'
        });
    }
};

// ======================================================
// GET JOB BY ID
// GET /api/v1/jobs/:id
// ======================================================
const getJobById = async (req, res) => {
    try {

        const jobId = req.params.id;

        const [rows] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?',
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
// ======================================================
// UPDATE JOB
// PUT /api/v1/jobs/:id
// ======================================================
const updateJobById = async (req, res) => {
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
// ======================================================
// DELETE JOB
// DELETE /api/v1/jobs/:id
// ======================================================
const deleteJobById = async (req, res) => {
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
module.exports = {
    saveJob,
    getJobs,
    getJobById,
    updateJobById,
    deleteJobById
};