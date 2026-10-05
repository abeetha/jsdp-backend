const express = require('express');

const router = express.Router();

const {
    saveJobSeeker,
    getJobSeekers,
    getJobSeekerById,
    updateJobSeekerById,
    deleteJobSeekerById
} = require('../controllers/job-seeker-controller.js');


router.post('/', saveJobSeeker);

router.get('/', getJobSeekers);

router.get('/:id', getJobSeekerById);

router.put('/:id', updateJobSeekerById);

router.delete('/:id', deleteJobSeekerById);


module.exports = router;