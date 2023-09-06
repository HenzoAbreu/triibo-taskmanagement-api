const errorMiddleware = function(err, req, res, next) {
    if (err.customErr) {
        return res.status(err.status).json(err.customData);
    } else {
        console.log(err)
        return res.status(500).json({ error_type: "InternalServerError", message: "Service temporary unavailable" });
    }
}

module.exports = errorMiddleware;