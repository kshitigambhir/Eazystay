class ExpressError extends Error{
    constructor (statuscode , message){
        super();
        this.statusCode=this.statusCode;
        this.message=message;
    }
}

module.exports=ExpressError;