const express = require('express');
const router = express.Router();
const authValidator = require('../../controllers/auth/authValidator');
const review = require('../../controllers/literature/review');

router.get('/literature/:literatureTypeId', authValidator.authValidator(), function(req, res){
    let literatureTypeId = req.params.literatureTypeId;
    if(literatureTypeId)
    {
        review.getAllReviewsForLiteratureId(req, res, literatureTypeId, handleSuccessResponse, handleErrorResponse)
        return;
    }
    handleErrorResponse(req, res, new Error('Literature is missing'))
})

router.post('/add', authValidator.authValidator(), function(req, res){
    let reviewDetails = req.body
    if(reviewDetails)
    {
        console.log(res.locals.user)
        reviewDetails.userId = res.locals.user.userId
        console.log(reviewDetails)
        review.addReviewForLiterature(req, res, reviewDetails, handleSuccessResponse, handleErrorResponse)
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid data for adding review'))
})

router.get('/rating', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        review.getAvgRatingForLiteratureId(req, res, searchJSON, handleSuccessResponse, handleErrorResponse)
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query header provided.'))
})

function handleSuccessResponse(req, res, responseData, displayMessage)
{
    if(displayMessage)
    {
        req.flash('success', displayMessage);
    }
    if(responseData)
    {
        res.send(responseData)
        return;
    }
    res.sendStatus(200);
}

function handleErrorResponse(req, res, err)
{
    req.flash('error', err.message);
    res.sendStatus(500);
}

module.exports = router;