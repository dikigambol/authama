const jwt = require('jsonwebtoken');

export default function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid authentication token' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid authentication token' });
        }
        next();
    });
};
