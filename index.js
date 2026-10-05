require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const adminRoute = require('./routes/admin-route.js');
const jobRoute = require('./routes/job-route.js');
const applicationRoute = require('./routes/application-route.js');
const courseRoute = require('./routes/course-route.js');
const jobSeekerRoute = require('./routes/job-seeker-route.js');
const employerJobRoute = require('./routes/employer-job-route.js');

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/jobs', jobRoute);
app.use('/api/v1/applications', applicationRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/job-seekers', jobSeekerRoute);
app.use('/api/v1/employer-jobs', employerJobRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});