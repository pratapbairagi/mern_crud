

class AppError extends Error{
    constructor(message, statusCode){
        super(message); // super constructor to call this word

        this.statusCode = statusCode;
        // this.message = message;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor) // for this we will get stack from which line error is getting and refferance of this obj and ref of this constructor
    }
}

export default AppError