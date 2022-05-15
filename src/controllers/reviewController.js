const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

// review for book id
const createReview = async function (req, res) {
    try {
        
        let data = req.body;

        if (!data.bookId) { 
            return res.status(400).send({ status: false, message: "BookId id is a required field" }) }
        if (!data.rating) {
             return res.status(400).send({ status: false, message: "Rating is a required field" }) }

        let book = await bookModel.findOne({ _id: data.bookId, isDeleted: false })

        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }

        let createData = await reviewModel.create(data);
        return res.status(201).send({ status: true, message: "Review successfully created", data: createData })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
const updateReview = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId;
    
        const data = req.body;
       
        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
             return res.status(400).send({ status: false, message: "No book exist with this id" }) }

        let review = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!review){ 
            return res.status(400).send({ status: false, message: "No review exist with this id" }) }

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId },
            { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy} }, { new: true })

        let result = {
            bookId: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            reviews: book.review,
            releasedAt: book.releasedAt,
            reviewsData: updateReview
        };
        return res.status(200).send({ status: true, message: "Review updated successfully", data: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
const deleteReview = async (req, res) => {
    try {
        let reviewId = req.params.reviewId
        let bookId = req.params.bookId
        
        let book = await bookModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) { return res.status(404).send({ status: false, message: "No book exist with this id" }) }

        let review = await reviewModel.findOne({ _id: reviewId, bookId: bookId });
        if (!review) {
             return res.status(400).send({ status: false, msg: "Review id should be checked, id is not from this book." }) }
        if (review.isDeleted == true) {
             return res.status(400).send({ status: false, msg: "Review has already been deleted" }) }

        let deleteRev = await reviewModel.findOneAndUpdate({ _id: review._id, bookId: review.bookId, isDeleted: false },
            { $set: { isDeleted: true } })
        let deleteReview = await bookModel.findOneAndUpdate({ _id: book._id }, { $inc: { review: -1 } })
        return res.status(200).send({ status: true, message: "Review deleted successfully"})
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
module.exports.createReview = createReview;
module.exports.updateReview=updateReview;
module.exports.deleteReview = deleteReview;