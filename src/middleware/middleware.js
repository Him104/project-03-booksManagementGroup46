const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel")


//authentication

let validateToken = function(req, res, next) {
  try{
    let token = req.header["x-auth-token"];
    
  
    if (!token)
    { return res.status(400).send({ status: false, msg: "token must be present" });
    }
    console.log(token);
    
    let decodedToken = jwt.verify(token, "him104");
    if (!decodedToken) {
      return res.send({ status: false, msg: "token is invalid" });
    }

    next()
}
catch (err){
  return res.status(500).send({msg: err.msg})
}
}

//authorization

const authorization = async function(req,res,next){
  try{
  let token = req.headers["x-auth-token"];
  let decodedToken = jwt.verify(token,"him104")
  const bookId = req.params.bookId || req.query.bookId

  let book = await bookModel.findOne({_id:bookId})

if(!book)
{
return res.status(400).send({status:false,msg: "data has been deleted or id is not correct"})
  }

  if(decodedToken.userId != book.userId){
    return res.status(400).send({status:false,msg:"You are not authorized"})
  }

next();
}
catch (err) {

res.status(500).send({status:false, msg:err.msg })
}
}

module.exports.authorization= authorization;
module.exports.validateToken = validateToken;