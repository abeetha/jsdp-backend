const express = require('express');

const router = express.Router();

const {
    saveApplication,
    getApplications,
    getApplicationById,
    getUserApplications,
    deleteApplicationById
} = require('../controllers/application-controller.js');


// Apply for a job
router.post('/', saveApplication);


// Get all applications
router.get('/', getApplications);


// Get applications of one job seeker
router.get('/user/:userId', getUserApplications);


// Get one application
router.get('/:id', getApplicationById);


// Withdraw application
router.delete('/:id', deleteApplicationById);


module.exports = router;