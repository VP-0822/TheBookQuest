const LiteratureTypes = require('../../models/literatureTypes');
const Literature = require('../../models/literatures');

exports.searchAllLiteratures = function(req, res, handleSuccessResponse, handleErrorResponse){
    LiteratureTypes.find().lean().exec(function(err, docs){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }
        handleSuccessResponse(req, res, docs)
    });
    return
}

exports.searchLiterature = function(req, res, literatureId, handleSuccessResponse, handleErrorResponse){
    LiteratureTypes.find({"literatureTypeId" : literatureId}).lean().exec(function(err, doc){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }
        handleSuccessResponse(req, res, doc)
    });
    return
}

exports.searchLiteraturesByAuthor = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"authors" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, doc)
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
}

exports.searchLiteraturesByQuery = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find( {$or: [{"authors" : {$regex : modifiedSearchQuery, $options: 'i'}}, {"title" : {$regex : modifiedSearchQuery, $options: 'i'}}, {"tags" : {$regex : modifiedSearchQuery, $options: 'i'}}, {"publisher" : {$regex : modifiedSearchQuery, $options: 'i'}}]}).lean().exec(function(err, doc){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, doc)
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
}

exports.searchLiteraturesByTags = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"tags" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, doc)
        });
        return;
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
}

exports.searchLiteraturesByPublishers = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"publisher" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, doc)
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
}

exports.searchLiteraturesByTitles = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"title" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            if(err)
            {
                console.log(err)
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, doc)
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid search query provided.'))
}

exports.searchLiteratureInstanceById = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery)
    {
        Literature.find({"literatureId" : searchQuery}).lean().exec(function(err, doc){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, doc)
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid literature id provided.'))
}

exports.searchLiteratureAvailableInstances = function(req, res, searchQuery, handleSuccessResponse, handleErrorResponse){
    if(searchQuery){
        Literature.find({$and: [{"literatureTypeId" : searchQuery}, {"status" : "available"}]}).lean().exec(function(err, docs){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, docs)
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid literature type id provided.'))
}
