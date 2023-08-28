const express = require("express");
const router = express.Router();
const { resumeController } = require('../controllers/resumeController')
router.post('/resume', resumeController);
module.exports = router;