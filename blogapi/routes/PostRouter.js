const express = require('express');
const PostRouter = express.Router();
const {
    InputCheck,
    checkCommentreq,
    checkPost,
    checkUserBlog
    } = require('../middleware/postsmiddleware');
const {
    CreateBlog,
    ReadBlog,
    ReadBlogs,
    UpdateBlog,
    DeleteBlog
} = require('../controllers/postController');

const {
    getComments,
    postComment,
    updateComment,
    deleteComment
} = require('../controllers/commentController')
const checkPostComment=require('../middleware/commentmidware');
const { auth } = require('../middleware/Auth')


PostRouter.post('/create', auth, InputCheck, CreateBlog);
PostRouter.get('/read/:id', auth, ReadBlog);
PostRouter.get('/read', auth, ReadBlogs);
PostRouter.put('/update/:id', auth,checkUserBlog, InputCheck, UpdateBlog);
PostRouter.delete('/delete/:id', auth,checkUserBlog,DeleteBlog);

//Comments
PostRouter.post('/comment/:pid', auth, checkCommentreq,checkPost, postComment);
PostRouter.get('/comment/:pid', auth,checkPost, getComments);//Read all comments on a post 
PostRouter.put('/comment/:pid/:cid', auth,checkCommentreq, checkPost,checkPostComment,updateComment);
PostRouter.delete('/comment/:pid/:cid', auth,checkPost,checkPostComment, deleteComment);

module.exports = PostRouter;