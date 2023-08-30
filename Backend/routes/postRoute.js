const express = require('express');
const { Post } = require('../controllers/postController');
const router = express.Router();
const { authorize } = require('../middlewares/auth');
const employer = authorize(["employer"]);
router.post('/post',employer, Post);
module.exports = router; 