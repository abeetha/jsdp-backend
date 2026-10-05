const express = require('express');

const router = express.Router();

const {
    createEmployerJob,
    getEmployerJobs,
    getEmployerJobById,
    updateEmployerJob,
    deleteEmployerJob
} = require('../controllers/employer-job-controller.js');


router.post('/', createEmployerJob);

router.get('/employer/:employerId', getEmployerJobs);

router.get('/:id', getEmployerJobById);

router.put('/:id', updateEmployerJob);

router.delete('/:id', deleteEmployerJob);


module.exports = router;