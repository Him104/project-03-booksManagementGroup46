const express = require('express');
const router = express.Router();
const userController=require("../controllers/userController")
const loginController = require("../controllers/loginController")
const bookController = require("../controllers/bookController")
const middleware = require("../middleware/middleware");


router.post("/register", userController.createUser)
router.post("/login", loginController.loginUser)
router.post ("/books", middleware.validateToken, middleware.authorization, bookController.createBook)
router.get("/getbooks", middleware.validateToken, bookController.getBooks)
router.get("/books/:bookId", middleware.validateToken, bookController.getBookbyId)
router.put("/books/:bookId", middleware.validateToken, middleware.authorization, bookController.updateBook)
router.delete("/books/:bookId", middleware.validateToken, middleware.authorization, bookController.deletedBook)




module.exports = router;