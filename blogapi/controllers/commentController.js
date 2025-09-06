const {CommentModel,BlogModel}=require('../db');

async function postComment(req,res){
    const postId=req.params.pid;
    const {Comment}=req.body;
    const userId=req.userId;
    try{
        const response=await CommentModel.create({
            PostId:postId,
            Comment:Comment,
            CommenterId:userId
        })

        res.status(200).json({message:"Commented successfully"});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
async function getComments(req,res){
    const postId=req.params.pid;
    try{
        const response=await CommentModel.find({
            PostId:postId
        })
        const comments=response.map(c=>({
            Comment:c.Comment,
            Commenter:c.CommenterId
        }))
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
async function updateComment(req,res){
    const postId=req.params.pid;
    const commentId=req.params.cid;
    const {Comment}=req.body;
    const userId=req.userId;
    try{
        const response=await CommentModel.updateOne({
            _id:commentId
        },{
            Comment:Comment
        })
        if(!response){
            res.status(400).json({message:err.message})
        }
        const updated=await CommentModel.findOne({
            _id:commentId
        })
        res.status(200).json({
            message:"Updated successfully",
            Updated:updated
        });
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
async function deleteComment(req,res){
    const postId=req.params.pid;
    const userId=req.userId;
    const commentId=req.params.cid;
    try{
        const response=await CommentModel.deleteOne({
            _id:commentId
        })
        if(!response){
            res.status(404).json({
                message:err.message
            })
        }
        res.status(200).json({
            message:"Deleted successfully"
        });
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports={
    getComments,
    postComment,
    updateComment,
    deleteComment
}
