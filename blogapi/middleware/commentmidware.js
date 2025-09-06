const {CommentModel}=require('../db')
//Check if user wants to update his own comment
async function checkPostComment(req,res,next){
    const userId=req.userId;
    const commentId=req.params.cid;
    try{
        const response=await CommentModel.findOne({
            CommenterId:userId.toString(),
            _id:commentId
        })
        if(!response){
            return res.status(400).json({message:err.message});
        }
        next();
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports=checkPostComment;