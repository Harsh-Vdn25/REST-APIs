const {CommentModel,BlogModel}=require('../db');

async function postComment(req,res){
    const {postId,Comment}=req.body;
    const userId=req.userId;
    try{
        const response=await CommentModel.create({
            postId:postId,
            Comment:Comment,
            CommenterId:userId
        })
        res.status(200).json({message:"Commented successfully"});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
async function getComments(req,res){
    const postId=req.params.id;
    try{
        const response=await CommentModel.find({
            postId:postId
        })
        console.log(response);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
async function updateComment(req,res){
    const postId=req.params.id;
}
async function deleteComment(req,res){

}
async function getComment(req,res){

}


module.exports={
    getComments,
    postComment,
    updateComment,
    deleteComment,
    getComment
}


