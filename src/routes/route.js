const express = require('express');
const router = express.Router();
const userController=require("../controllers/userController")
const loginController = require("../controllers/loginController")
const bookController = require("../controllers/bookController")
const middleware = require("../middleware/middleware");
const reviewController = require("../controllers/reviewController")
const aws= require("aws-sdk")

router.post("/register", userController.createUser)
router.post("/login", loginController.loginUser)
router.post ("/books", middleware.validateToken, bookController.createBook)
router.get("/getbooks", middleware.validateToken, bookController.getBooks)
router.get("/books/:bookId", middleware.validateToken, bookController.getBookbyId)
router.put("/books/:bookId", middleware.validateToken, bookController.updateBook)
router.delete("/books/:bookId", middleware.validateToken, bookController.deletedBook)
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})
let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
   
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we 

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

  

   })
}
router.post("/write-file-aws", async function(req, res){
    

try{
    let files= req.files
    if(files && files.length>0){
        //upload to s3 and get the uploaded link
        // res.send the link back to frontend/postman
        let uploadedFileURL= await uploadFile( files[0] )
        res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
    }
    else{
        res.status(400).send({ msg: "No file found" })
    }
    
}
catch(err){
    res.status(500).send({msg: err})
}

})




module.exports = router;