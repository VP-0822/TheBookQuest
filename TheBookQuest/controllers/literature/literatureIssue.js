const Literature = require('../../models/literatures');
const Issue = require('../../models/issues');
const randomstring = require('randomstring');
const mail = require('../../config/mail');

exports.issueLiteratureById = function (req, res, query, handleSuccessResponse, handleErrorResponse) {
    if (query) {
        let literatureId = query.issue.literatureId;
        let userId = query.issue.userId;
        var issueId = randomstring.generate(10)
        let newIssue = new Issue({
            issueId: issueId,
            literatureId: literatureId,
            userId: userId,
            issueDate: query.issue.startDate,
            returnDate: query.issue.returnDate,
            status: 'issued'
        });
        newIssue.save(function (err) {
            if (err) {
                handleErrorResponse(req, res, err)
                return
            }
            var searchQuery = {
                literatureId: literatureId
            }
            var updateLiterature = {
                status: 'issued'
            }
            Literature.findOneAndUpdate(searchQuery, updateLiterature, function (err, literatureInstance) {
                if (err) {
                    handleErrorResponse(req, res, err)
                    return
                }
                mail.sendIssuedLitConfirmation(req, res, userId,literatureId,issueId);
                
                handleSuccessResponse(req, res, literatureInstance)
                return
                })
        });
        return
    }
    handleErrorResponse(req, res, new Error('Invalid data provided'))
}

exports.returnLiterature = function (req, res, query, handleSuccessResponse, handleErrorResponse) {
    if (query) {
        let literatureId = query.returnBook.literatureId;
        let searchQuery = {
            $and: [{
                literatureId: literatureId
            }, {
                status: 'issued'
            }]
        }
        let updateIssue = {
            status: 'returned'
        }

        Issue.findOneAndUpdate(searchQuery, updateIssue, function (err) {
            if (err) {
                handleErrorResponse(req, res, err)
                return
            }
            let updateLiterature = {
                status: 'available'
            }


            Literature.findOneAndUpdate(searchQuery, updateLiterature, function (err, literatureInstance) {
                if (err) {
                    handleErrorResponse(req, res, err)
                    return
                }

                handleSuccessResponse(req, res, literatureInstance)
                return
            })
            mail.sendReturnLitConfirmation(req, res, userId,literatureId,issueId);
            return
        })
    }
    handleErrorResponse(req, res, new Error('Invalid literature id provided'))
}

exports.returnAvailableBookCount = function (req, res, query, handleSuccessResponse, handleErrorResponse) {
    if (query) {
        let literatureTypeId = query.literatureTypeId;
        Literature.find({
            $and: [{
                status: 'available'
            }, {
                literatureTypeId: literatureTypeId
            }]
        }).count(function (err, result) {
            if (err) {
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, {
                count: result
            })
            return
        })
        return
    }
    handleErrorResponse(req, res, new Error('Invalid literature type id provided'))
}

exports.getUserIssues = function (req, res, userId, handleSuccessResponse, handleErrorResponse) {
    if (userId) {
        Issue.aggregate([{
                $match: {
                    "userId": userId
                }
            },
            {
                $lookup: {
                    from: "literatures",
                    localField: "literatureId",
                    foreignField: "literatureId",
                    as: "literatures"
                }
            }
        ]).exec(function (err, issues) {
            if (err) {
                console.log(err);
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, issues)
        })
        return
    }
    
    handleErrorResponse(req, res, new Error('Invalid user id provided'))
}

