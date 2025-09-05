const express = require('express');
const PostRouter = express.Router();
const {
    InputCheck,
    checkCommentreq,
    checkPost
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
    deleteComment,
    getComment
} = require('../controllers/commentController')
const { auth } = require('../middleware/Auth')


PostRouter.post('/create', auth, InputCheck, CreateBlog);
PostRouter.get('/read/:id', auth, ReadBlog);
PostRouter.get('/read', auth, ReadBlogs);
PostRouter.put('/update/:id', auth, InputCheck, UpdateBlog);
PostRouter.delete('/delete/:id', auth, DeleteBlog);

//Comments
PostRouter.post('/comment/:id', auth, checkCommentreq,checkPost, postComment);
PostRouter.get('/comment/:id', auth,checkPost, getComments);//Read all comments on a post 
PostRouter.put('/comment/:id', auth, checkPost,updateComment);
PostRouter.delete('/comment/:id', auth,checkPost, deleteComment);
// PostRouter.get('/comment/:id', auth,checkPost, getComment)//Read a single comment 

module.exports = PostRouter;