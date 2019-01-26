const mongoose = require('mongoose');

//Review schema
const ReviewSchema = mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    },
    literatureTypeId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    reviewComment: String,
    rating: Number,
    reviewDate: Date
})

const Review = module.exports = mongoose.model('reviews', ReviewSchema);