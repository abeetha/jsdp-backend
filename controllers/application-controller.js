const pool = require('../db/db.js');
// ======================================================
// CREATE APPLICATION
// POST /api/v1/applications
// ======================================================
const saveApplication = async (req, res) => {
    try {

        const [result] = await pool.query(
            'INSERT INTO applications SET ?',
            [req.body]
        );

        res.status(201).json({
            message: 'Application submitted successfully',
            id: result.insertId
        });

    } catch (err) {

        console.error('Error saving application:', err);

        res.status(500).json({
            error: 'Error saving application'
        });
    }
};
// ======================================================
// GET ALL APPLICATIONS
// GET /api/v1/applications
// ======================================================
const getApplications = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM applications'
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
// GET APPLICATION BY ID
// GET /api/v1/applications/:id
// ======================================================
const getApplicationById = async (req, res) => {
    try {

        const applicationId = req.params.id;

        const [rows] = await pool.query(
            'SELECT * FROM applications WHERE id = ?',
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
// ======================================================
// UPDATE APPLICATION
// PUT /api/v1/applications/:id
// ======================================================
const updateApplicationById = async (req, res) => {
    try {

        const applicationId = req.params.id;

        const [result] = await pool.query(
            'UPDATE applications SET ? WHERE id = ?',
            [req.body, applicationId]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Application not found'
            });
        }

        res.status(200).json({
            message: `Application with ID: ${applicationId} updated successfully`
        });

    } catch (err) {

        console.error('Error updating application:', err);

        res.status(500).json({
            error: 'Error updating application'
        });
    }
};
// ======================================================
// DELETE APPLICATION
// DELETE /api/v1/applications/:id
// ======================================================
const deleteApplicationById = async (req, res) => {
    try {

        const applicationId = req.params.id;

        const [result] = await pool.query(
            'DELETE FROM applications WHERE id = ?',
            [applicationId]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: 'Application not found'
            });
        }

        res.status(200).json({
            message: `Application with ID: ${applicationId} deleted successfully`
        });

    } catch (err) {

        console.error('Error deleting application:', err);

        res.status(500).json({
            error: 'Error deleting application'
        });
    }
};
module.exports = {
    saveApplication,
    getApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById
};