const express = require("express");
const router = express.Router();
const { resumeController } = require('../controllers/resumeController')
const {authorizatin} = require('../middlewares/auth');
const seeker = authorizatin(["jobSeeker"]);
router.post('/resume',seeker, resumeController);
module.exports = router;