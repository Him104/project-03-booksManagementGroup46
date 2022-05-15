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
        res.status(201).send({status:true, msg:saveData});


    }

    catch (err){
        return res.status(500).send({status:false, msg: err.msg})
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

        return res.status(200).send({status: true, message: "Book list", data:findBook})

    }
    catch (err) {
       
        res.status(500).send({ status:false, msg: err.msg })
    }
}

// Update book
const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let data = req.body;
//         let token = req.headers["x-auth-token"];
//   let decodedToken = jwt.verify(token,"him104")
//   const bookId = req.params.bookId || req.query.bookId

        let findingBook = await bookModel.findOne({_id: bookId})
        if(req.data.userId !== findingBook.userId)
        {
            return res.status(400).send({ status: false, message:"you are not authorized"})
        }

        if (!findingBook) 
            return res.status(400).send({ status: false, message: "No book found" })

        if (findingBook.isDeleted == true) 
            return res.status(400).send({ status: false, message: "Book has already been deleted" })

    
        
        let duplicateTitle = await bookModel.findOne({ title: data.title })
        if (duplicateTitle) 
            return res.status(400).send({ status: false, message: "Title already exists, choose some different title" })
        
        let duplicateISBN = await bookModel.findOne({ ISBN: data.ISBN })
        if (duplicateISBN) 
            return res.status(400).send({ status: false, message: "ISBN already exists, choose some different ISBN" })
        
        let updateBook = await bookModel.findByIdAndUpdate({ _id: bookId },
            { $set: { title: data.title, excerpt: data.excerpt, ISBN: data.ISBN, releasedAt: data.releasedAt } }, { new: true })



        res.status(200).send({ status: true, message: "Book updated", data: updateBook })

    }
    catch (err) {
    
        res.status(500).send({status:false, message:err.message })
    }
}

// delete book

const deletedBook = async function (req, res) {
    try {
        
        let bookId = req.params.bookId
       
        let findingDeleted = await bookModel.findOne({ _id: bookId })
        if (!findingDeleted) {
            return res.status(404).send({ status: false, message: "Book not found" })
        }

        
        if (findingDeleted.isDeleted == true) {
            return res.status(400).send({ status: false, message: "Book is already deleted" })
        }

        let deleteBook = await bookModel.findByIdAndUpdate({ _id: bookId },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })

        return res.status(200).send({ status: true, message: "Book deleted", data:deleteBook})

    }
    catch (err) {
        
        res.status(500).send({ status:false, msg:err.msg })
    }
}

module.exports.updateBook = updateBook;
module.exports.deletedBook = deletedBook;
module.exports.getBookbyId = getBookbyId;
module.exports.createBook = createBook;
module.exports.getBooks = getBooks;