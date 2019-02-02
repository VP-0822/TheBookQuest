const express = require('express');
const router = express.Router();
const authValidator = require('../controllers/auth/authValidator');
const literatureIssue = require('../controllers/literature/literatureIssue')
const userController = require('../controllers/auth/register')
const literatureRequest = require('../controllers/literature/request')

router.get('/:userId/profile' , authValidator.authValidator(), function(req, res){
    let userId = req.params.userId
    userController.getUserProfile(req, res, userId, handleSuccessResponse, handleErrorResponse)
    return
})

router.get('/:userId/issues', authValidator.authValidator(), function(req, res){
    let userId = req.params.userId
    literatureIssue.getUserIssues(req, res, userId, handleSuccessResponse, handleErrorResponse)
    return
})

router.get('/:userId/requests', authValidator.authValidator(), function(req, res){
    let userId = req.params.userId
    literatureRequest.getUserRequests(req, res, userId, handleSuccessResponse, handleErrorResponse)
    return
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