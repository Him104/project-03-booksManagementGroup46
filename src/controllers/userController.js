const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel")

let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

let mobileRegex =  /\d{10}/;

let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

let createUser = async function (req,res){
    try{
        let data = req.body;
        if(!data.title)

        return res.status(400).send({status:false,msg:"title is a required field"})

        if(!data.name)

        return res.status(400).send({status:false,msg:"name is a required field"})

        if(!data.phone)

        return res.status(400).send({status:false,msg:"phone# is a required field"})

        if(!mobileRegex.test(data.phone))

        return res.status(400).send({ status: false, msg: "Please provide valid phone#" })

        const usedphone = await userModel.findOne({phone:data.phone})

        if(usedphone)

        return res.status(404).send({ status: false, msg: "Phone# already exists" })



        if(!data.email)

        return res.status(400).send({status:false,msg:"email is a required field"})

        if(!emailRegex.test(data.email))

        return res.status(400).send({ status: false, msg: "Please provide valid email" })

        const usedEmail = await userModel.findOne({email:data.email})

        if(usedEmail)

        return res.status(404).send({ status: false, msg: "Email Id already exists" })

        if(!data.password)

        return res.status(400).send({status:false,msg:"password is a required field"})

        if(!passwordRegex.test(data.password))

        return res.status(400).send({ status: false, msg: "Password doesn't match the requirements" })


        if(!data.address)

        return res.status(400).send({status:false,msg:"address is a required field"})

        let saveData = await userModel.create(data);
        res.status(201).send({status:true,msg:saveData});
        

    }
    catch(err){
        return res.status(500).send({status:false, msg:err.msg})

    }
}

module.exports.createUser = createUser;