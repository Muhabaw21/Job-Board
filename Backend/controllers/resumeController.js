const { resume } = require('../models/');
const { Op } = require('sequelize');
const resumeController = async (req, res) => {

    const { title, contactInfo, summary, experience, education, certification, award, skill } = req.body;

    try {
        if (!title || !contactInfo || !summary || !experience || !education) {
            res.status(400).json({
                path: req.path,
                message: "All fill all the required field",
                error: "some required information missed"
            });
        }
        const findResumeByEmail = await resume.findOne({
            where: {
                contactInfo: {
                    email: {
                        [Op.eq]: contactInfo.email
                    }
                }
            }
        });

        if (findResumeByEmail) {
            res.status(400).json({
                message: "Resume already exist"
            })
        }
        const saveResume = await resume.create({
            title,
            contactInfo,
            summary,
            experience,
            education,
            certification,
            award,
            skill

        });

        if (saveResume) {
            res.status(201).json({
                message: "Resume registered successfully"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            path: req.path,
            message: "Internal server error",
            error: error.message
        });
    }


}
module.exports = {resumeController};