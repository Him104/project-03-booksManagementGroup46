const userModel = require("../models/userModel");


let createUser = async function (req,res){
    try{
        let data = req.body;
        // if(!data.title)

        // return res.status(400).send({status:false,msg:"title is a required field"})

        // if(!data.name)

        // return res.status(400).send({status:false,msg:"name is a required field"})

        // if(!data.phone)

        // return res.status(400).send({status:false,msg:"phone# is a required field"})

        // if(!data.email)

        // return res.status(400).send({status:false,msg:"email is a required field"})

        // if(!data.password)

        // return res.status(400).send({status:false,msg:"password is a required field"})

        // if(!data.address)

        // return res.status(400).send({status:false,msg:"address is a required field"})

        let saveData = await userModel.create(data);
        res.status(201).send({status:true,msg:saveData});
        

    }
    catch(err){
        return res.status(500).send({status:false,msg:err.msg})

    }
}

module.exports.createUser = createUser;