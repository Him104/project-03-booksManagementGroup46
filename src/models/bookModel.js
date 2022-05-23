const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
let bookSchema = mongoose.Schema({

    title: {
      type: String,
      required: true,
       unique:true},
    excerpt: {
      type:String,
      required:true
    }, 

    userId: {
        type: objectId,
      required: true,
       refs:"User",
    },

    ISBN: {
      type:String,
      required: true,
       unique:true},
    category: {
      type:String,
      required: true,
    },
    subcategory: [
      {type:String},
      {required: true}
    ],
bookCover:{
  type:String
},

    reviews: {
      type: Number, 
      default: 0, 
      comment: {
        type:String
      }},
    deletedAt: {
      type: Date
    }, 
    isDeleted: {
      type: Boolean, 
      default: false
    },
    reviews: {
      type:Number, 
      default: 0
    },
    releasedAt: {
      type: String,
       required: true, 
      
  
  }
},
{timestamps: true})

  module.exports = mongoose.model("book",bookSchema)