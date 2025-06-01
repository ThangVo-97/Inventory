const jwt = require('jsonwebtoken');
const logger = require('../utils/logger')
module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('token');
    logger.info(`my token: ${token}`)
    if (!token) return res.status(401).json({error: 'No token, access denied'});
    // logger.info(`User role: `, req)
    // if (req.role !== 'admin') return res.status(403).json({error: 'Access denied'})
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id; // Attach user ID to request
            next();
        } catch (err) {
            res.status(401).json({error: 'Invalid token'});
        }
};