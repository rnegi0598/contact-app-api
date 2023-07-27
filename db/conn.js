const mongoose=require('mongoose');


const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING,{
            dbName:'myContactApp',

        });
        console.log('db connected ');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}



module.exports=connectDB;