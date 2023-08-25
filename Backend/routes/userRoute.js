
const {registration, loginUser, getJobSeeker} = require('../controllers/jopSeekerController');
const express = require("express");
const router = express.Router();
router.post("/register", registration);
router.post("/login", loginUser);
router.get("/getJobSeeker", getJobSeeker);
module.exports = router;