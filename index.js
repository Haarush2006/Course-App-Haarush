const express = require('express')
const mongoose = require('mongoose')
const { userRouter } = require('./routes/users')
const { courseRouter } = require('./routes/course')
const { adminRouter} = require('./routes/admin')
const {ConnectionString} = require('./config')
const app = express()

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)


async function main() {
    try{
        await mongoose.connect(ConnectionString)
        app.listen(3000,()=>{console.log("Listening on port 3000")})
    }catch(e){
        console.log("Not connected to db")
    }
}

main()