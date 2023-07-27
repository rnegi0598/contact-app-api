const express=require('express');
require('dotenv').config();
const bodyParser=require('body-parser');

const contactRouter=require('./routes/contact');
const userRouter=require('./routes/user');
const validateToken=require('./middlewares/validateToken');
const errorHanlder=require('./middlewares/errorHandler');
const connectDB=require('./db/conn');

connectDB();



const app=express();
const PORT=process.env.PORT || 5500;

app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/contacts',validateToken,contactRouter);
app.use('/api/users',userRouter);
app.use('/random',(req,res)=>{
    res.statusCode=405
    // res.status(404);
    throw new Error('hello i am error')
    // res.send('random text');
})
app.use(errorHanlder);

app.listen(PORT,()=>{
    console.log(`server connected at port ${PORT}`);
})