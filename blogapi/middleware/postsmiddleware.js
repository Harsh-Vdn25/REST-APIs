const { z } = require('../config');
const {BlogModel}=require('../db');
function InputCheck(req, res, next) {
    const requiredbody = z.object({
        title: z.string().min(5).max(50),
        content: z.string(),
        Category: z.string()
    })
    const parsed = requiredbody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(404).json({ message: "Invalid Input" });
    }
    next();
}


//Input check for comments
function checkCommentreq(req, res, next) {
    const requiredbody = z.object({
        Comment: z.string().min(1)
    })
    const parsed = requiredbody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid Input" });
    }
    next();
}

//check if post exists
async function checkPost(req, res, next) {
    const postId=req.params.id;
    try {
        const Blog = await BlogModel.findOne({
            _id: postId
        })
        if (!Blog) {
            return res.status(404).json({ messge: "The blog requested doesn't exist." })
        }
        next();
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}
module.exports = {
    InputCheck,
    checkCommentreq,
    checkPost
}