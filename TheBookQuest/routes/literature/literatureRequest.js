const express = require('express');
const router = express.Router();
const authValidator = require('../../controllers/auth/authValidator');
const literatureRequest = require('../../controllers/literature/request');

router.post('/add', authValidator.authValidator(), function(req, res){
    let requestDetails = req.body
    if(requestDetails)
    {
        requestDetails.userId = res.locals.user.userId
        literatureRequest.addLiteratureRequest(req, res, requestDetails, handleSuccessResponse, handleErrorResponse)
        return
    }
    handleErrorResponse(req, res, new Error('Invalid data for adding request'))
})

router.post('/update', authValidator.authValidator(), function(req, res){
    let requestDetails = req.body
    if(requestDetails)
    {
        literatureRequest.updateUserRequest(req, res, requestDetails, handleSuccessResponse, handleErrorResponse)
        return
    }
    handleErrorResponse(req, res, new Error('Invalid data for updating request'))
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