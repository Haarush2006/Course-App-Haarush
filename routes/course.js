const { Router } = require('express');
const courseRouter = Router();
const express= require('express')
 
courseRouter.use(express.json()) 
courseRouter.post("/purchase", function(req, res) {
    res.json({
        message: "purchase endpoint"
    })
})

    
courseRouter.get("/preview", function(req, res) {
    res.json({
        message: "course preview endpoint"
    })
})


module.exports = {
   courseRouter
}