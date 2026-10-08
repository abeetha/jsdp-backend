const express = require('express');

const router = express.Router();

const {
    saveJob,
    getJobs,
    getJobById,
    updateJobById,
    deleteJobById,
    searchJobs
} = require('../controllers/job-controller.js');


// Create job
router.post('/', saveJob);

// Get all jobs
router.get('/', getJobs);

router.get('/search', searchJobs);

// Get job by ID
router.get('/:id', getJobById);

// Update job
router.put('/:id', updateJobById);

// Delete job
router.delete('/:id', deleteJobById);


module.exports = router;