const { Router } = require("express");
const express= require('express')
const { UserModel } = require('../db')
const userRouter = Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_USER_SECRET} = require('../config')

userRouter.use(express.json()) 

userRouter.post("/signup", async function(req, res) {
    const { Email , Password , FirstName, LastName } = req.body
    const hashedPassword = await bcrypt.hash(Password,7)
    try{
        await UserModel.create({
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
 
 userRouter.post("/signin", async function(req, res) {
    const { Email, Password } = req.body

    const user = await UserModel.findOne({
        Email
    })
    if(!user){
        return res.json({
            message: "User not found"
        })
        
    }
    const compare = await bcrypt.compare(Password, user.Password)

    if(compare){
        const token = jwt.sign({ID : user._id}, JWT_USER_SECRET)
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
 
 userRouter.get("/purchases", function(req, res) {
     res.json({
         message: "purchase endpoint"
     })
 })
 
 module.exports = {
     userRouter
 }