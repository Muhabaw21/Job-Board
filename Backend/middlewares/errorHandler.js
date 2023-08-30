const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    switch (err.status) {
        case 400:
            res.status(400).json({
                status: 400,
                message: err.message || 'One or more fields are missing',
                type: 'bad_request'
            });
            break;
        case 401:
            res.status(401).json({
                status: 401,
                message: err.message || 'Unauthorized',
                type: 'unauthorized'
            });
            break;
        case 403:
            res.status(403).json({
                status: 403,
                message: err.message || 'Forbidden',
                type: 'forbidden'
            });
            break;
        case 404:
            res.status(404).json({
                status: 404,
                message: err.message || 'Not Found',
                type: 'not_found'
            });
            break;
        case 422:
            res.status(422).json({
                status: 422,
                message: err.message || 'Unprocessable Entity',
                type: 'unprocessable_entity'
            });
            break;
        case 500:
        default:
            res.status(500).json({
                status: 500,
                message: err.message || 'Internal Server Error',
                type: 'internal'
            });
    }
}
module.exports = { errorHandler }