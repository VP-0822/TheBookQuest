const express = require('express');
const router = express.Router();
const authValidator = require('../../controllers/auth/authValidator');
const literatureSearch = require('../../controllers/literature/literatureSearch')

router.get('/', authValidator.authValidator(), function(req, res){
    literatureSearch.searchAllLiteratures(req, res, handleSuccessResponse, handleErrorResponse);
})

router.get('/literature/:literatureTypeId', authValidator.authValidator(), function(req, res){
    let literatureId = req.params.literatureTypeId;
    if(literatureId)
    {
        literatureSearch.searchLiterature(req, res, literatureId, handleSuccessResponse, handleErrorResponse)
        return
    }
    handleErrorResponse(req, res, new Error('Invalid literature id'))
})
router.get('/searchtitle', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        literatureSearch.searchLiteraturesByTitles(req, res, searchJSON.query, handleSuccessResponse, handleErrorResponse);
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
    return;
})

router.get('/searchauthor', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        literatureSearch.searchLiteraturesByAuthor(req, res, searchJSON.query, handleSuccessResponse, handleErrorResponse);
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
    return;
})

router.get('/searchtags', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        literatureSearch.searchLiteraturesByTags(req, res, searchJSON.query, handleSuccessResponse, handleErrorResponse);
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
    return;
})

router.get('/searchpublishers', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        literatureSearch.searchLiteraturesByPublishers(req, res, searchJSON.query, handleSuccessResponse, handleErrorResponse);
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
    return;
})

router.get('/search', authValidator.authValidator(), function(req, res){
    let searchQuery = req.get('search-query');
    if(searchQuery)
    {
        let searchJSON = JSON.parse(searchQuery);
        literatureSearch.searchLiteraturesByQuery(req, res, searchJSON.query, handleSuccessResponse, handleErrorResponse);
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
    return;
});

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