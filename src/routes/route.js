const express = require('express');
const router = express.Router();
const userController=require("../controllers/userController")
const loginController = require("../controllers/loginController")
const bookController = require("../controllers/bookController")
const middleware = require("../middleware/middleware");
const reviewController = require("../controllers/reviewController")


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


module.exports = router;