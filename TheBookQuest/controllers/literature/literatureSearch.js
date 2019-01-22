let LiteratureTypes = require('../../models/literatureTypes');

exports.searchAllLiteratures = function(req, res){
    LiteratureTypes.find().lean().exec(function(err, docs){
        res.send(JSON.stringify(docs))
    });
}

exports.searchLiterature = function(req, res){
    let literatureId = req.params.literatureTypeId;
    LiteratureTypes.find({"literatureTypeId" : literatureId}).lean().exec(function(err, doc){
        res.send(JSON.stringify(doc))
    });
}

exports.searchLiteraturesByAuthor = function(req, res, searchQuery){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"authors" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            res.send(JSON.stringify(doc))
        });
    }
}

exports.searchLiteraturesByQuery = function(req, res, searchQuery){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find( {$or: [{"authors" : {$regex : modifiedSearchQuery, $options: 'i'}}, {"title" : {$regex : modifiedSearchQuery, $options: 'i'}}, {"tags" : {$regex : modifiedSearchQuery, $options: 'i'}}, {"publisher" : {$regex : modifiedSearchQuery, $options: 'i'}}]}).lean().exec(function(err, doc){
            res.send(JSON.stringify(doc))
        });
    }
}

exports.searchLiteraturesByTags = function(req, res, searchQuery){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"tags" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            res.send(JSON.stringify(doc))
        });
    }
}

exports.searchLiteraturesByPublishers = function(req, res, searchQuery){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"publisher" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            res.send(JSON.stringify(doc))
        });
    }
}

exports.searchLiteraturesByTitles = function(req, res, searchQuery){
    if(searchQuery)
    {
        let modifiedSearchQuery = '.*' + searchQuery + '*.';
        LiteratureTypes.find({"title" : {$regex : modifiedSearchQuery, $options: 'i'}}).lean().exec(function(err, doc){
            res.send(JSON.stringify(doc))
        });
    }
}
