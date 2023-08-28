
const { employerController,JobSeekerController, loginUser, getJobSeeker, getEmployer} = require('../controllers/jopSeekerController');
const {authorize} = require("../middlewares/auth");

const jobSeeker = authorize(["jobSeeker"]);
const employer = authorize(["employer"]);
const express = require("express");
const router = express.Router();
router.post("/employer", employerController);
router.post("/jobSeeker", JobSeekerController);
router.post("/login", loginUser);
router.get("/getJobSeeker",  jobSeeker, getJobSeeker);
router.get("/employer",  employer, getEmployer);
module.exports = router;