const mongoose=require('mongoose')
var validator = require('validator');
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const deletedUserSchema=new mongoose.Schema(
    {
        
        acno:{
            type:String,
            trim:true,
            required:true,
            minlength:10
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is inValid")
                }
            } 
        },
        
        message:{
            type:String,
            trim:true,
            required:true,
            maxlength:100
        }
        
    }
)

const deletedUser=new mongoose.model('deletedUser',deletedUserSchema)

module.exports=deletedUser
