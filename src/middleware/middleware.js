const jwt = require("jsonwebtoken");

//authentication

let validateToken = function(req, res, next) {
  try{
    let token = req.headers["x-auth-token"];
    
    if (!token)
    return res.status(400).send({ status: false, msg: "token must be present" });
    
    // authorization 
    let decodedToken = jwt.verify(token, "him104");
    req.user = decodedToken.id

    next();
}
catch (err){
  return res.status(500).send({msg: err.msg})
}
}

// //authorization

// const authorization = async function(req,res,next){
//   try{
  
//     let token = req.headers["x-auth-token"]
//     let decodedToken = jwt.verify(token,"him104")
// let bookId = req.params.bookId;

//   let book = await bookModel.findById(bookId)

// if(!book)

// return res.status(400).send({status:false,msg:"no data with this id"})

//   if(decodedToken.userId != book.userId)

//   return res.status(400).send({status:false,msg:"Unauthorize access"})

// next();
// }
// catch (err) {

// res.status(500).send({status:false, msg:err.msg })
// }
// }

module.exports.validateToken = validateToken;