const { JWT_ADMIN_SECRET } = require('../config')


function adminMiddleware(req,res,next) {
    const token = req.headers.authorization

    const verification = jwt.verify(token,JWT_ADMIN_SECRET)
    if(verification){
        req.AdminID = verification.ID
        next()
    }
    else{
        return res.json({
            message:"Authentication failed"
        })
    }
}


module.exports = {
    adminMiddleware
}