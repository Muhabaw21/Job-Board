const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { user } = require("../models");

const authorize = (allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                // Verify token
                const decode = jwt.verify(token, `${process.env.JWT_SECRET}`);
                const User = await user.findOne({
                    where: { id: decode.id },
                });
                if (User && allowedRoles.includes(User.role)) {
                    req.user = user;
                    next();
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
        res.status(403).json({
            path: req.path,
            error: "Forbidden",
            message: "You do not have permission to access this resource", 
            status: 403,
        });
    });
};

module.exports = { authorize };
