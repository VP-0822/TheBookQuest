const express = require('express');
const router = express.Router();
const authValidator = require('../../controllers/auth/authValidator');
const literatureSearch = require('../../controllers/literature/literatureSearch')
const literatureIssue = require('../../controllers/literature/literatureIssue')

router.get('/instance/:litId', authValidator.authValidator(), function(req, res){
    literatureSearch.searchLiteratureInstanceById(req, res, req.params.litId);
    return;
});

router.get('/instances/:litTypeId', authValidator.authValidator(), function(req, res){
    literatureSearch.searchLiteratureAvailableInstances(req, res, req.params.litTypeId, handleSuccessResponse, handleErrorResponse);
    return;
});

router.post('/issue', authValidator.authValidator(),  function(req, res){
    let issueQuery = req.body;
    if(issueQuery)
    {
        issueQuery.issue.userId = res.locals.user.userId
        literatureIssue.issueLiteratureById(req, res, issueQuery, handleSuccessResponse, handleErrorResponse);
        return;
    }
    else
    {
        handleErrorResponse(req, res, new Error('Invalid data provided for request'))
    }
});

router.post('/return', authValidator.authValidator(), function(req, res){
    let returnQuery = req.body;
    if(returnQuery)
    {
        literatureIssue.returnLiterature(req, res, returnQuery, handleSuccessResponse, handleErrorResponse);
        return;
    }
    else
    {
        handleErrorResponse(req, res, new Error('Invalid data provided for request'))
    }
})

router.get('/available', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        literatureIssue.returnAvailableBookCount(req, res, searchJSON, handleSuccessResponse, handleErrorResponse)
        return;
    }
    handleErrorResponse(req, res, new Error('Unable to fetch available literatures'))
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