const express = require('express');
const router = express.Router();
const authValidator = require('../../controllers/auth/authValidator');
const literatureSearch = require('../../controllers/literature/literatureSearch')
const literatureIssue = require('../../controllers/literature/literatureIssue')

router.get('/instance/:litId', authValidator.authValidator(), function(req, res){
    literatureSearch.searchLiteratureInstanceById(req, res, req.params.litId);
    return;
});

router.post('/issue', authValidator.authValidator(),  function(req, res){
    let issueQuery = req.body;
    if(issueQuery)
    {
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
    req.sendStatus(500);
}


module.exports = router;