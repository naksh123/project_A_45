const mongoose=require('mongoose')
var validator = require('validator');
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const userSchema=new mongoose.Schema(
    {
        
        name:{
            type:String,
            required:true,
        },
        acno:{
            type:String,
            trim:true,
            default:new Date().getTime().toString(),
            minlength:10
        },
        address:{
            type:String,
            trim:true,
            required:true,
        },
        phone:{
            type:String,
            required:true,
            trim:true,
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
        password:{
            type:String,
            required:true,
        },
        messages:[
            { 
                date:{
                    type:String,
                    trim:true,
                    default:new Date(),
                    required:true,
                },
                message:{
                    type:String,
                    trim:true
                },
                email:{
                    type:String,
                    trim:true
                },
                acno:{
                    type:String,
                    trim:true
                }
            }
        ] 
        ,
        bill:[
            { 
                due:{
                    type:String,
                    trim:true,
                    
                },
                status:{
                    type:String,
                    trim:true,
                    default:"notpaid",
                    required:true,
                }, 
                amount:{
                    type:String,
                    trim:true,
                },
                date:{
                    type:String,
                    trim:true,
                    default:"Not Paid",      
                },
                unit:{
                    type:Number,
                    trim:true,
                    default:0
                },
                extra:{
                    type:String,
                    trim:true,
                    default:0
                },
            }
        ] 
        ,
        tokens:[
            {
                token:{
                    type:String,
                    trim:true,
                }
            }
        ]
    }
)
userSchema.pre('save',async function(next){
    try{
        if(this.isModified('password')){
            this.password=await bcrypt.hash(this.password,10)
        }
        next();
    }
    catch(err){
        console.log("Error in hashing password")
    }
})

userSchema.methods.generateToken=async function(){
   try{
    const token=jwt.sign({_id:this.id.toString()},process.env.SECURE_KEY)
    this.tokens=this.tokens.concat({token:token})
    await this.save();
    return token
   }
   catch(err){
       console.log("Error in token generation"+err)
   }
}

const User=new mongoose.model('User',userSchema)

module.exports=User
