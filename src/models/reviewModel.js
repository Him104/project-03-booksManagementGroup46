
const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;

let reviewSchema = mongoose.Schema({
    bookId:{
        type: objectId,
        required:true,
        refs: "Book",
    },
    reviewedBy:{
        type:String,
        required: true,
        default: "Guest",
    
    },

    reviewedAt:
    {
        type: Date,
        required:true,
        default:Date.now()
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    review:{
        type:String,


    },

    isDeleted:
    {
        type:Boolean,
        default:false
    }

},
{timestamps:true})
module.exports= mongoose.model("review",reviewSchema)
