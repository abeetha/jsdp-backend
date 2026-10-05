const express = require('express');

const router = express.Router();

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getJobs,
    updateJob,
    deleteJob,
    getCourses,
    updateCourse,
    deleteCourse,
    getApplications,
    getAnalytics
} = require('../controllers/admin-controller.js');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/jobs', getJobs);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

router.get('/courses', getCourses);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

router.get('/applications', getApplications);
router.get('/analytics', getAnalytics);

module.exports = router;