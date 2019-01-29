const Review = require('../../models/reviews')
const randomstring = require('randomstring');
let User = require('../../models/user');

exports.getAllReviewsForLiteratureId = function(req, res, literatureTypeId, handleSuccessResponse, handleErrorResponse){
    if(literatureTypeId)
    {
        // Review.find({"literatureTypeId" : literatureTypeId}).lean().exec(function(err, reviews){
        //     if(err){
        //         handleErrorResponse(req, res, err)
        //         return
        //     }
        //     handleSuccessResponse(req, res, reviews)
        // })
        Review.aggregate([{
                $match:{
                "literatureTypeId" : literatureTypeId
                }
            },
            {$lookup: {
                from: "users",
                localField: "userId",
                foreignField: "userId",
                as: "users"
            }
        }]).exec(function(err, reviews){
            if(err)
            {
                handleErrorResponse(req, res, err)
                 return
            }
            handleSuccessResponse(req, res, reviews)
        })
        return
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

        handleSuccessResponse(req, res, reviewInstance)
    })
}

exports.getAvgRatingForLiteratureId = function(req, res, query, handleSuccessResponse, handleErrorResponse){
    let literatureTypeId = query.literatureTypeId
    Review.aggregate([{$match : {literatureTypeId : literatureTypeId}}, {$group : {_id : {literatureTypeId : literatureTypeId}, average : {$avg: '$rating'}}}], function(err, result){
        if(err)
        {
            console.log(err)
            handleErrorResponse(req, res, err)
            return
        }
        Review.find({literatureTypeId : literatureTypeId}).count(function(err, count){
            if(err)
            {
                console.log(err)
                handleErrorResponse(req, res, err)
                return 
            }
            handleSuccessResponse(req, res, {avgRating : result, count: count})
        })

        
    })
}