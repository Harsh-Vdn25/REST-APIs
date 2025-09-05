const JWT_SECRET=process.env.JWT_SECRET;
const {jwt,z,bcrypt}=require('../config')
const {UserModel}=require('../db');

function checkInput(req,res,next){
    const requiredbody=z.object({
        email:z.string().email({message:"Invalid email address"}),
        password:z.string().min(7).max(50),
        firstName:z.string().min(3).max(30),
        lastName:z.string()
    })
    const parsed=requiredbody.safeParse(req.body);
    if(!parsed.success){
        return  res.status(404).json({message:"Invalid Input"});
    }
    next();
}

const checkSigninInput=(req,res,next)=>{
    const requiredbody=z.object({
        email:z.string().email({message:"Invalid email address"}),
        password:z.string().min(7).max(50)
    })
    const parsed=requiredbody.safeParse(req.body);
    if(!parsed.success){
        return  res.status(404).json({message:"Invalid Input"});
    }
    next();
}





const auth=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        res.status(401).json({message:"Unauthorized"});
    }
    const userInfo=jwt.verify(token,JWT_SECRET);
    try{
        const response=await UserModel.findOne({
            _id:userInfo.id
        })
        if(!response){
            return res.status(401).json({message:"Invalid token or Token timed out"});
        }
        req.userId=userInfo.id
        next();
    }catch(err){
        res.status(500).json({message:"SERVER ERROR"});
    }
}
module.exports={
    auth,
    checkInput,
    checkSigninInput
};