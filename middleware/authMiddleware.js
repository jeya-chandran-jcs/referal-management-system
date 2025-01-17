const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;  // Access the Authorization header directly

    if (!authHeader) {
        console.log("Token is not provided");
        return res.status(401).json({ msg: "Token not provided" });
    }

    let token;

    // If the header contains 'Bearer', split the token
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        // If the token is directly sent in the body or another way
        token = authHeader;
    }

    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: "Server error in auth middleware" });
    }
}

module.exports = authMiddleware;
