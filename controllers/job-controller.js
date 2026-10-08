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

const searchJobs = async (req, res) => {

    try {

        const {
            title,
            location,
            skills,
            employment_type,
            min_salary,
            max_salary,
            page = 1,
            limit = 10
        } = req.query;


        // Convert pagination values to numbers
        const pageNumber = Math.max(parseInt(page) || 1, 1);

        const limitNumber = Math.min(
            Math.max(parseInt(limit) || 10, 1),
            100
        );

        const offset = (pageNumber - 1) * limitNumber;


        let whereConditions = [];

        let queryParams = [];


        // TITLE FILTER
        if (title) {

            whereConditions.push(
                'title LIKE ?'
            );

            queryParams.push(
                `%${title}%`
            );

        }


        // LOCATION FILTER
        if (location) {

            whereConditions.push(
                'location LIKE ?'
            );

            queryParams.push(
                `%${location}%`
            );

        }


        // SKILLS FILTER
        if (skills) {

            whereConditions.push(
                'required_skills LIKE ?'
            );

            queryParams.push(
                `%${skills}%`
            );

        }


        // EMPLOYMENT TYPE FILTER
        if (employment_type) {

            whereConditions.push(
                'employment_type = ?'
            );

            queryParams.push(
                employment_type
            );

        }


        // MINIMUM SALARY
        if (min_salary) {

            whereConditions.push(
                'CAST(salary AS DECIMAL(15,2)) >= ?'
            );

            queryParams.push(
                parseFloat(min_salary)
            );

        }


        // MAXIMUM SALARY
        if (max_salary) {

            whereConditions.push(
                'CAST(salary AS DECIMAL(15,2)) <= ?'
            );

            queryParams.push(
                parseFloat(max_salary)
            );

        }


        let whereClause = '';

        if (whereConditions.length > 0) {

            whereClause =
                'WHERE ' + whereConditions.join(' AND ');

        }


        // GET TOTAL COUNT
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM jobs
            ${whereClause}
        `;


        const [countRows] = await pool.query(
            countQuery,
            queryParams
        );


        const totalJobs = countRows[0].total;


        // GET JOBS
        const jobsQuery = `
            SELECT *
            FROM jobs
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        `;


        const [jobs] = await pool.query(
            jobsQuery,
            [
                ...queryParams,
                limitNumber,
                offset
            ]
        );


        const totalPages = Math.ceil(
            totalJobs / limitNumber
        );


        res.status(200).json({

            success: true,

            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalJobs: totalJobs,
                totalPages: totalPages
            },

            filters: {
                title: title || null,
                location: location || null,
                skills: skills || null,
                employment_type: employment_type || null,
                min_salary: min_salary || null,
                max_salary: max_salary || null
            },

            data: jobs

        });


    } catch (err) {

        console.error(
            'Error searching jobs:',
            err
        );

        res.status(500).json({
            error: 'Error searching jobs'
        });

    }

};

module.exports = {
    saveJob,
    getJobs,
    getJobById,
    updateJobById,
    deleteJobById,
    searchJobs
};