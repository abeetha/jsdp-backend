const express = require('express');

const router = express.Router();

const {
    saveApplication,
    getApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById
} = require('../controllers/application-controller.js');


// Create application
router.post('/', saveApplication);

// Get all applications
router.get('/', getApplications);

// Get application by ID
router.get('/:id', getApplicationById);

// Update application
router.put('/:id', updateApplicationById);

// Delete application
router.delete('/:id', deleteApplicationById);


module.exports = router;