const pool = require('../db/db.js');


// CREATE COURSE
const saveCourse = async (req, res) => {
    try {

        const [result] = await pool.query(
            'INSERT INTO courses SET ?',
            [req.body]
        );

        res.status(201).json({
            message: 'Course saved successfully',
            id: result.insertId
        });

    } catch (err) {

        console.error('Error saving course:', err);

        res.status(500).json({
            error: 'Error saving course'
        });
    }
};


// GET ALL COURSES
const getCourses = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM courses'
        );

        res.status(200).json(rows);

    } catch (err) {

        console.error('Error fetching courses:', err);

        res.status(500).json({
            error: 'Error fetching courses'
        });
    }
};


// GET COURSE BY ID
const getCourseById = async (req, res) => {
    try {

        const courseId = req.params.id;

        const [rows] = await pool.query(
            'SELECT * FROM courses WHERE id = ?',
            [courseId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Course not found'
            });
        }

        res.status(200).json(rows[0]);

    } catch (err) {

        console.error('Error fetching course:', err);

        res.status(500).json({
            error: 'Error fetching course'
        });
    }
};


// UPDATE COURSE
const updateCourseById = async (req, res) => {
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
const deleteCourseById = async (req, res) => {
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


module.exports = {
    saveCourse,
    getCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById
};