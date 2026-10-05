const pool = require('../db/db.js');


// CREATE JOB SEEKER
const saveJobSeeker = async (req, res) => {

    try {

        const [result] = await pool.query(
            'INSERT INTO job_seekers SET ?',
            [req.body]
        );

        res.status(201).json({
            message: 'Job seeker profile saved successfully',
            id: result.insertId
        });

    } catch (err) {

        console.error('Error saving job seeker:', err);

        res.status(500).json({
            error: 'Error saving job seeker'
        });

    }

};


// GET ALL JOB SEEKERS
const getJobSeekers = async (req, res) => {

    try {

        const [rows] = await pool.query(
            'SELECT * FROM job_seekers'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching job seekers:', err);

        res.status(500).json({
            error: 'Error fetching job seekers'
        });

    }

};


// GET JOB SEEKER BY ID
const getJobSeekerById = async (req, res) => {

    try {

        const jobSeekerId = req.params.id;

        const [rows] = await pool.query(
            'SELECT * FROM job_seekers WHERE id = ?',
            [jobSeekerId]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                error: 'Job seeker not found'
            });

        }

        res.status(200).json(rows[0]);

    } catch (err) {

        console.error('Error fetching job seeker:', err);

        res.status(500).json({
            error: 'Error fetching job seeker'
        });

    }

};


// UPDATE JOB SEEKER
const updateJobSeekerById = async (req, res) => {

    try {

        const jobSeekerId = req.params.id;

        const [result] = await pool.query(
            'UPDATE job_seekers SET ? WHERE id = ?',
            [req.body, jobSeekerId]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Job seeker not found'
            });

        }

        res.status(200).json({
            message: `Job seeker with ID: ${jobSeekerId} updated successfully`
        });

    } catch (err) {

        console.error('Error updating job seeker:', err);

        res.status(500).json({
            error: 'Error updating job seeker'
        });

    }

};


// DELETE JOB SEEKER
const deleteJobSeekerById = async (req, res) => {

    try {

        const jobSeekerId = req.params.id;

        const [result] = await pool.query(
            'DELETE FROM job_seekers WHERE id = ?',
            [jobSeekerId]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Job seeker not found'
            });

        }

        res.status(200).json({
            message: `Job seeker with ID: ${jobSeekerId} deleted successfully`
        });

    } catch (err) {

        console.error('Error deleting job seeker:', err);

        res.status(500).json({
            error: 'Error deleting job seeker'
        });

    }

};


module.exports = {
    saveJobSeeker,
    getJobSeekers,
    getJobSeekerById,
    updateJobSeekerById,
    deleteJobSeekerById
};