const mongoose=require('mongoose');
const { required } = require('zod/mini');
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const UserSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:String,
    lastName:String
})

const BlogSchema=new Schema({
    title:{type:String,required:true},
    content:String,
    Category:{type:String,required:true},
    PostedDate:{type:Date,default:Date.now},
    userId:{type:ObjectId,ref:'User'}
})

const CommentSchema=new Schema({
    PostId:{type:ObjectId,ref:'Posts'},
    Comment:String,
    CommenterId:{type:ObjectId,ref:'User'}//A user can comment multiple times on a post 
})


const FollowSchema=new Schema({
    userId:{type:ObjectId,ref:'User'},
    CreatorId:{type:ObjectId,ref:'User'}//The one you are following
})
FollowSchema.index({userId:1,CreatorId:1},{unique:true});

const UserModel=mongoose.model('User',UserSchema);
const BlogModel=mongoose.model('Posts',BlogSchema);
const CommentModel=mongoose.model('Comments',CommentSchema);
const FollowModel=mongoose.model('Follow',FollowSchema);

module.exports={
    UserModel,
    BlogModel,
    CommentModel,
    FollowModel
}