const { default: mongoose } = require("mongoose");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel")

let createBook = async function (req,res){
    try{
        let data = req.body;
        
        if(!data.title)
        
        return res.status(400).send({ status: false, msg: "title is a required field" })

        const usedTitle = await bookModel.findOne({title:data.title})

        if(usedTitle)
        return res.status(400).send({ status: false, msg: "title is already in use" })

        if(!data.excerpt)
        return res.status(400).send({status:false,msg:"excerpt is a required field"})
if(!data.userId)

return res.status(400).send({status:false,msg:"userId is a required field"})

        let isValid = mongoose.Types.ObjectId.isValid(data.userId)
        if(isValid===false)
        return res.status(400).send({ status: false, msg: "Not a valid user ID" })

        if(!data.ISBN)
        return res.status(400).send({status:false,msg:"ISBN is a required field"})

const usedISBN = await bookModel.findOne({ISBN:data.ISBN})

if(usedISBN)

return res.status(400).send({status:false, msg:"ISBN already exists"})

if(!data.category)

return res.status(400).send({status:false,msg:"category is a required field"})

if(!data.subcategory)

return res.status(400).send({status:false,msg:"subcategory is a required field"})

if(!data.releasedAt)

return res.status(400).send({status:false,msg:"released date is required"})

        let saveData = await bookModel.create(data);
        res.status(201).send({status:true,msg:saveData});


    }

    catch (err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}

//--------------------------------------
//get books 

const getBooks = async function (req,res){
    try{
        let data = req.query
        
            let book = await bookModel.find(data,{isDeleted:false}).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1 }).sort({ "title": 1 })


        if(book.length==0)
        
        return res.status(400).send({ status: false, message: "No data found" })
        
return res.status(200).send({status:true, msg:"success", data:book})
}
catch(err){
    res.status(500).send({ status:false, msg: err.msg })
    
}
}

// getbooks by bookid

const getBookbyId = async function (req,res){
    try{

        let bookId = req.params._id

        let findBook = await bookModel.findOne({bookId},{isDeleted:false})
        if (!findBook) 

            return res.status(404).send({ status: false, message: "No book found" })

        return res.status(200).send({status: true, message: "Book ,list", data:findBook})

    }
    catch (err) {
       
        res.status(500).send({ status:false, msg: err.msg })
    }
}

// Update book
const updateBook = async function (req, res) {
    try {
       
        let bookId = req.params._id

        let uniqueBlogId = await bookModel.findOne({bookId })
        if (!uniqueBlogId) {
            return res.status(404).send({ status: false, message: "No book found" })
        }

        if (uniqueBlogId.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Book is already deleted" })
        }
       
        let data = req.body
        const { title, excerpt, ISBN, releasedAt } = data

        
        let uniqueTitle = await bookModel.findOne({ title: title })
        if (uniqueTitle) {
            return res.status(400).send({ status: false, message: "Title is already exist, try new title" })
        }

       
        let uniqueISBN = await bookModel.findOne({ ISBN: ISBN })
        if (uniqueISBN) {
            return res.status(400).send({ status: false, message: "ISBN is already exist, input new ISBN" })
        }

        
        let updateBook = await bookModel.findByIdAndUpdate({ _id: bookId },
            { $set: { title: title, excerpt: excerpt, ISBN: ISBN, releasedAt: releasedAt } }, { new: true })

        res.status(200).send({ status: true, message: "Book has been updated successfully", updateBook })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

// delete book

const deletedBook = async function (req, res) {
    try {
        // Taking data from prams
        let bookId = req.params.bookId
        
        if (!validator.isValidObjectId(bookId)) {
            return res.status(404).send({ status: false, message: "Book id is not valid" })
        }

       
        let uniqueBlogId = await bookModel.findOne({ _id: bookId })
        if (!uniqueBlogId) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        
        if (uniqueBlogId.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Book is already deleted" })
        }

        let deleteBook = await bookModel.findByIdAndUpdate({ _id: bookId },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })

        return res.status(200).send({ status: true, message: "Book has been deleted successfully" })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.updateBook = updateBook;
module.exports.deletedBook = deletedBook;
module.exports.getBookbyId = getBookbyId;
module.exports.createBook = createBook;
module.exports.getBooks = getBooks;