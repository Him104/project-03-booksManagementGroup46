
const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
{ 
    title: {
        type: String,
        required: true,
         enum:["Mr", "Mrs", "Miss"]
        },
    name: {
        type: String,
    required:[true,"name is a required field"]
},
    phone: {
        type:String, 
        required:[true, "phone number is a required field"],
         unique:true,
         trim:true,
         validate: {
            validator: function (str){
             return  /\d{10}/.test(str)
            },
            message:props=>`${props.value} is not a valid phone number!`
         }
         },
    email: {
        type:String,
        required:[true, "email is a required field"],
        unique:true,
        lowercase:true,
    validate:{
        validator: function (str){
            return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(str)
        },
        message:props=>`${props.value} is not a valid email !`

    }
    }, 
    password: {
        type:String, 
        required:[true, "password is a required field"],
        minLength: 8, 
        maxLength: 15},
    address: {
      street: {
          type:String},
      city: {
          type:String},
      pincode: {
          type:String}
    }
},

    {timestamps:true}
  ) 

  module.exports = mongoose.model("user-for-book",userSchema);