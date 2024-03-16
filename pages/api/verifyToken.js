const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
            return res.status(200).json({
                status: false
            });
        }
        return res.status(200).json({
            status: true
        });
    });
}