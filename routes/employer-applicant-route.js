const express = require('express');

const router = express.Router();

const {
    getApplicantsForJob,
    getEmployerApplicants,
    getApplicantById,
    updateApplicationStatus
} = require('../controllers/employer-applicant-controller.js');


// Applicants for one specific job
router.get('/job/:jobId', getApplicantsForJob);


// All applicants for an employer
router.get('/employer/:employerId', getEmployerApplicants);


// Get one application
router.get('/:id', getApplicantById);


// Change application status
router.put('/:id/status', updateApplicationStatus);


module.exports = router;