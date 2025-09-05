const {bcrypt,jwt,z}=require('../config');
const express=require('express');
const userRouter=express.Router();
const {UserModel,CommentModel}=require('../db');
const JWT_SECRET=process.env.JWT_SECRET;
const {Follow,UnFollow}=require('../controllers/Followers');
const {auth,checkInput,checkSigninInput}=require('../middleware/Auth')

userRouter.post('/signup',checkInput,async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    const HASH_TIMES=Number(process.env.HASH_TIMES)||7;
    const hashedPassword=await bcrypt.hash(password,HASH_TIMES);
    try{
        const response=await UserModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName
        })
        if(!response){
            res.status(400).json({message:"Username already exists."});
        }
        res.status(200).json({message:"Signed Up successfully"});
    }catch(err){
        res.status(500).json({message:"Serverside Problem"});
    }
})
userRouter.post('/signin',checkSigninInput,async(req,res)=>{
    const {email,password}=req.body;
    const User=await UserModel.findOne({email});
    const isValidated=await bcrypt.compare(password,User.password);
    if(!isValidated){
       return res.status(401).json({message:"Unauthorized"});
    }
    const token=jwt.sign({
        id:User._id.toString()
    },JWT_SECRET)
    res.status(200).json({
        message:"Signed in successfully",
        Token:token
    })
});

userRouter.get('/comments',auth,async function(req,res){
    const userId=req.userId;
    try{
        const response=await CommentModel.find({
            CommenterId:userId
        })
        if(!response){
            return res.status(400).json({
                message:"No Comments"
            })
        }
        const comments=response.map(c=>({
            Comment:c.Comment,
            PostId:c.PostId
        }))
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

userRouter.post('/follow/:id',auth,Follow);
userRouter.delete('/unfollow/:id',auth,UnFollow);

module.exports=userRouter;