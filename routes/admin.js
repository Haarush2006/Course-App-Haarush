const { Router } = require('express');
const adminRouter = Router();
const express= require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { AdminModel } = require('../db');
const {JWT_ADMIN_SECRET} = require('../config')
const { adminMiddleware } = require('../middlewares/admin')
const { CourseModel } = require('../db')
adminRouter.use(express.json())



adminRouter.post("/signup", async function(req, res) {
    const { Email , Password , FirstName, LastName } = req.body
        const hashedPassword = await bcrypt.hash(Password,7)
        try{
            await AdminModel.create({
                Email,
                Password : hashedPassword,
                FirstName,
                LastName
            })
            res.json({
                message: "signup successfull"
            })
        } catch(e){
            res.json({
                message:"DB error"
            })
        }
})

adminRouter.post("/signin", async function(req, res) {
    const { Email, Password } = req.body
    
        const admin = await AdminModel.findOne({
            Email
        })
        if(!admin){
            return res.json({
                message: "Admin not found"
            })
            
        }
        const compare = await bcrypt.compare(Password, admin.Password)
    
        if(compare){
            const token = jwt.sign({ID : admin._id}, JWT_ADMIN_SECRET)
            res.json({
                token
            })
        }
        else{
            res.json({
                message:"Wrong Crendentials"
            })
        }
})


adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const CreatorId = req.AdminID
    const { title, description,ImageUrl,price } = req.body
    try{

        const creator = await CourseModel.create({
            title,
            description,
            ImageUrl,
            price,
            CreatorId
        })
        
        res.json({
            message: "Course Created",
            courseID: creator._id
        })
    }
    catch(e){
        res.json({
            message:"DB error"
        })
    }
    
    
})


adminRouter.put("/course", function(req, res) {

    res.json({
        message: "post course endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "bulk endpoint"
    })
})

module.exports = {
    adminRouter
}