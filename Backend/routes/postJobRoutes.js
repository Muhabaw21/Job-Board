const express = require('express');
const { route } = require('./resumeRoute');
const router = express.Router();
router.get('/',(req,res)=>{

    return res.status(200).json({
        path:req.path,
        message: "Work on branch",
    })
})