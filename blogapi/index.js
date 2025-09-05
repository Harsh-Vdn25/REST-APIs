const express=require('express');
const app=express();
const mongoose=require('mongoose')

require('dotenv').config()
app.use(express.json());

const userRouter=require('./routes/UserRouter')
const PostRouter=require('./routes/PostRouter')
const port=process.env.PORT;


app.use('/User',userRouter);
app.use('/posts',PostRouter);
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port,()=>{
        console.log(`App is listening on port ${port}`);
    })
}
main();
