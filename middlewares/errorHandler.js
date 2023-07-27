const errorHandler=(err,req,res,next)=>{
    console.log('in error handler');
    const statusCode=res.statusCode ;
    console.log(statusCode);
    switch(statusCode){
        case 400:
            res.json({
                title:"validation failed",
                message:err.message,
                stackTrace:err.stack,
            });
            break;
        case  404:
            res.json({
                title:'not found',
                message:err.message,
                stackTrace:err.stack,
            })
            break;
        case 401:
            res.json({
                title:'unauthorized',
                message:err.message,
                stackTrace:err.stack,
            })
            break;
        case 403:
            res.json({
                title:"forbidden",
                message:err.message,
                stackTrace:err.stack,
            });
            break;
        case 500:
            res.json({
                title:'server error',
                message:err.message,
                stackTrace:err.stack,
            })
            break;
        default:
            console.log('default error');
            res.json({
                title:'default error'
            })
    }
}


module.exports=errorHandler;

/*
Client error response
- VALIDATION_ERROR: 400 (Bad request)
- UNAUTHORIZED: 401 
- FORBIDDEN: 403
- NOT_FOUND: 404
Server error response
- SERVER_ERROR: 500
*/