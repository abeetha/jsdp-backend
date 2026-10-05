const express = require('express');

const router = express.Router();

const {
    saveCourse,
    getCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById
} = require('../controllers/course-controller.js');


// Create course
router.post('/', saveCourse);

// Get all courses
router.get('/', getCourses);

// Get course by ID
router.get('/:id', getCourseById);

// Update course
router.put('/:id', updateCourseById);

// Delete course
router.delete('/:id', deleteCourseById);


module.exports = router;