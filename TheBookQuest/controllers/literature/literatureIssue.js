const Literature = require('../../models/literatures');
const Issue = require('../../models/issues');
const randomstring = require('randomstring');

exports.issueLiteratureById = function(req, res, query, handleSuccessResponse, handleErrorResponse){
    if(query)
    {
        let literatureId = query.issue.literatureId;
        let userId = query.issue.userId;
        let newIssue = new Issue({
            issueId : randomstring.generate(7),
            literatureId : literatureId,
            userId : userId,
            issueDate : new Date(),
            returnDate : new Date('2019-01-30T00:30:00')
        });
        newIssue.save(function(err, issue){
            if(err){
                handleErrorResponse(req, res, err)
                return
            }
            var searchQuery = {literatureId : literatureId}
            var updateLiterature = {
                status: 'issued'
            }
            Literature.findOneAndUpdate(searchQuery, updateLiterature, function(err, literatureInstance){
                if(err){
                    handleErrorResponse(req, res, err)
                    return
                }
                handleSuccessResponse(req, res, literatureInstance, 'Successfully issued book!')
                return
            })
        });
    }
}

exports.returnLiterature = function(req, res, query, handleSuccessResponse, handleErrorResponse){
    if(query)
    {
        let literatureId = query.returnBook.literatureId;
        let searchQuery ={ $and: [{
            literatureId : literatureId
        },{
            status : 'issued'
        }]}

        let updateLiterature = {
            status : 'available'
        }
        Literature.findOneAndUpdate(searchQuery, updateLiterature, function(err, literatureInstance){
            if(err){
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, literatureInstance, 'Book returned successfully')
            return
        })
    }
}

exports.getUserIssues = function(req, res, userId, handleSuccessResponse, handleErrorResponse){
    if(userId)
    {
        Issue.find({userId : userId}).lean().exec(function(err, issues){
            if(err)
            {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, issues)
        })
        return
    }
    handleErrorResponse(req, res, new Error('Invalid user id provided'))
}