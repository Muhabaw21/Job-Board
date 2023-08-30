const express = require("express");
const router = express.Router();
const { resumeController } = require('../controllers/resumeController')
const {authorize} = require('../middlewares/auth');
const seeker = authorize(["jobSeeker"]);
router.post('/resume',seeker, resumeController);
module.exports = router;