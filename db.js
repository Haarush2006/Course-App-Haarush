const { Schema, default: mongoose, Types } = require('mongoose')
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    Email : {type : String, unique : true },
    Password : String,
    FirstName : String,
    LastName : String
})

const AdminSchema = new Schema({
    Email : {type : String, unique : true },
    Password : String,
    FirstName : String,
    LastName : String

})

const CourseSchema = new Schema({
    title : String,
    description : String,
    ImageUrl : String,
    price : Number,
    CreatorId : ObjectId
})
const PurchaseSchema = new Schema({

    userId : ObjectId,
    CourseId : ObjectId
})

const UserModel = mongoose.model("users",UserSchema)
const AdminModel = mongoose.model("admin", AdminSchema)
const CourseModel = mongoose.model("course",CourseSchema)
const PurchaseModel = mongoose.model("purchase",PurchaseSchema)


module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}