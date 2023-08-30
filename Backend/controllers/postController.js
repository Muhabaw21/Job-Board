
const {post} = require('../models/');
const Post = async (req, res, next) => {
    const { title, description, requirement, salary, location, date } = req.body;

    try {
        if (!title || !description || !requirement || !salary || !location || !date) {
            throw { status: 400, message: 'One or more fields are missing' };
        }

        const checkPost = await post.findOne({ where: { title } });
        if (checkPost) {
            throw { status: 400, message: 'Job post already exists' };
        }

        await post.create({
            title,
            description,
            requirement,
            salary,
            location,
            date,
        });
        res.json({
            message: 'Job post created successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {Post}