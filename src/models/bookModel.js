// const mongoose = require('mongoose');
// const objectId = mongoose.Schema.Types.ObjectId;
// let bookSchema = mongoose.Schema({

//     title: {
//       type: String,
//       required: [true,"title is a required field"],
//        unique:true},
//     excerpt: {
//       type:String,
//       required:true
//     }, 
//     userId: {objectId,
//       required: [true, "user id is a required field"],
//        refs:"user",
//       trim:true},

//     ISBN: {
//       type:String,
//       required: [true,"ISBN is a required field"],
//        unique:true},
//     category: {
//       type:String,
//       required: [true,"category is a required field"]
//     },
//     subcategory: 
//     {
//       type:String,
//       required: [true,"subcategory is required to be entered"]
//     },
//     reviews: {
//       type: Number, 
//       default: 0, 
//       comment: {
//         type:String
//       }},
//     deletedAt: {
//       type: Date,
//     }, 
//     isDeleted: {
//       type: Boolean, 
//       default: false
//     },
//     releasedAt: {
//       type: Date,
//        required: true, 
      
  
//   }
// },
// {timestamps: true})

//   module.exports = mongoose.model("book",bookSchema)