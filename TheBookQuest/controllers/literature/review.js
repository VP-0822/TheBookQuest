const Review = require('../../models/reviews')
const randomstring = require('randomstring');
exports.getAllReviewsForLiteratureId = function(req, res, literatureTypeId, handleSuccessResponse, handleErrorResponse){
    if(literatureTypeId)
    {
        Review.find({"literatureTypeId" : literatureTypeId}).lean().exec(function(err, reviews){
            if(err){
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, reviews)
        })
    }
}

exports.addReviewForLiterature = function(req, res, reviewDetails, handleSuccessResponse, handleErrorResponse)
{
    let literatureTypeId = reviewDetails.literatureTypeId
    let userId = reviewDetails.userId
    let reviewComment = reviewDetails.comment
    let rating = reviewDetails.rating

    let newReview = new Review({
        reviewId : randomstring.generate(10),
        literatureTypeId : literatureTypeId,
        userId : userId,
        reviewComment : reviewComment,
        rating : rating,
        reviewDate : new Date()
    })

    newReview.save(function(err, reviewInstance){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }

        handleSuccessResponse(req, res, reviewInstance, 'Comment added successfully')
    })
}

exports.getAvgRatingForLiteratureId = function(req, res, query, handleSuccessResponse, handleErrorResponse){
    let literatureTypeId = query.literatureTypeId
    Review.aggregate([{$match : {literatureTypeId : literatureTypeId}}, {$group : {literatureTypeId : literatureTypeId, average : {$avg: '$rating'}}}], function(err, result){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }

        handleSuccessResponse(req, res, result)
    })
}