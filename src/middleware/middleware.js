const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel")

//authnetication

const validateToken = function(req, res, next) {
  try{
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
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
  let tokenUserId = req.tokenUserId
  let user = req.body.userId
  let user2 = req.params.bookId

  let findingId = await bookModel.findById({_id:user2}).select({userId:1})

  let getUserId = findingId.userId.toString()

  if(getUserId!=tokenUserId){
    return res.status(400).send({status:false,msg:"login required"})
  

} 
else if (user) {
  
  if (user != tokenUserId) {
      return res.status(401).send({ msg: "User must login" })
  }
  
}

next();
}

catch (err) {

res.status(500).send({status:false,err:msg.err })
}
}



module.exports.authorization= authorization;
module.exports.validateToken = validateToken;