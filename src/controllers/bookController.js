const { default: mongoose } = require("mongoose");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");


let createBook = async function (req,res){
    try{
        let data = req.body;
        let isValid = mongoose.Types.ObjectId.isValid(data.userId)
        if(isValid===false)
        return res.status(404).send({ status: false, msg: "Not a valid user ID" })


        let saveData = await userModel.create(data);
        res.status(201).send({status:true,msg:saveData});


    }

    catch (err){
        return res.status(500).send({status:false,msg:err.msg})
    }
}