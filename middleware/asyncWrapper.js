
const asyncWrapper = function(asynFun){
    return (req , res , next)=> {
        asynFun(req , res , next).catch(error => next(error));
    }
}

module.exports = asyncWrapper;