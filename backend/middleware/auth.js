const jwt = require('jsonwebtoken')
require('dotenv').config();


const auth = (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
    success:false,
    message:"Invalid Token"
})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        res.send('Invalid Token')
    }
}

module.exports = auth