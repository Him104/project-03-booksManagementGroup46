
const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
{ 
    title: {
        type: String,
        required: [true, "title is a required field"],
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
         trim:true},
    email: {
        type:String,
        required:[true, "email is a required field"],
        unique:true,
        lowercase:true,
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

  module.exports = mongoose.model("user",userSchema);