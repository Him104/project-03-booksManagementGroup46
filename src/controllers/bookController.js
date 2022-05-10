const { default: mongoose } = require("mongoose");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");


let createBook = async function (req,res){
    try{
        let data = req.body;

        if(!data.title)
        return res.status(400).send({ status: false, msg: "Not a valid title" })

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

        let saveData = await userModel.create(data);
        res.status(201).send({status:true,msg:saveData});


    }

    catch (err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}

module.exports.createBook = createBook;