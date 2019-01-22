const express = require('express');
const router = express.Router();
const authValidator = require('../../controllers/auth/authValidator');
const literatureSearch = require('../../controllers/literature/literatureSearch')

router.get('/', authValidator.authValidator(), literatureSearch.searchAllLiteratures)

router.get('/:literatureTypeId', authValidator.authValidator(), literatureSearch.searchLiterature)

router.get('/:stype/:query', authValidator.authValidator(), function(req, res){
    //let searchJSON = req.body.searchJSON;
    //req.checkBody('searchJSON', 'First name is required').notEmpty();

    let searchType = req.params.stype;
    let searchJSON = {query : req.params.query};
    if(searchType)
    {
        switch(searchType)
        {
            case 'all':
                literatureSearch.searchLiteraturesByQuery(req, res, searchJSON.query);
                return;
            case 'title':
                literatureSearch.searchLiteraturesByTitles(req, res, searchJSON.query);
                return;
            case 'author':
                literatureSearch.searchLiteraturesByAuthor(req, res, searchJSON.query);
                return;
            case 'tags':
                literatureSearch.searchLiteraturesByTags(req, res, searchJSON.query);
                return;
            case 'publisher':
                literatureSearch.searchLiteraturesByPublishers(req, res, searchJSON.query);
                return;
            default:
                throw Error;
        }
    }
})

module.exports = router;