const LiteratureRequest = require('../../models/literatureRequests')
const randomstring = require('randomstring');

exports.addLiteratureRequest = function(req, res, requestDetails, handleSuccessResponse, handleErrorResponse){
    let userId = requestDetails.userId
    let isbn = requestDetails.isbn
    let issn = requestDetails.issn
    let literatureTitle = requestDetails.literatureTitle
    let comment = requestDetails.comment
    
    let newRequest = new LiteratureRequest({
        requestId : randomstring.generate(10),
        userId : userId,
        isbn : isbn,
        issn : issn,
        literatureTitle : literatureTitle,
        comment : comment,
        requestDate : new Date(),
        status : 'pending'
    })

    newRequest.save(function(err, docs){
        if(err)
        {
            handleErrorResponse(req, res, err)
            return
        }

        handleSuccessResponse(req, res, docs, 'Request added successfully')
    })

}

exports.getUserRequests = function(req, res, userId, handleSuccessResponse, handleErrorResponse){
    if(userId)
    {
        LiteratureRequest.find({"userId" : userId}).lean().exec(function(err, requests){
            if(err){
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, requests)
        })
        return
    }
    handleErrorResponse(req, res, new Error('User id is not provided'))
}

exports.updateUserRequest = function(req, res, userRequest, handleSuccessResponse, handleErrorResponse){
    let requestId = userRequest.requestId
    let status = userRequest.status

    if(requestId && status)
    {
        let searchQuery = {
            requestId : requestId
        }
        let userRequest = {
            status : status
        }

        Literature.findOneAndUpdate(searchQuery, userRequest, function(err, requestInstance){
            if(err){
                handleErrorResponse(req, res, err)
                return
            }
            handleSuccessResponse(req, res, requestInstance, 'User request updated successfully')
        })
        return
    }
    handleErrorResponse(req, res, new Error('Invalid data provided for update operation'))
}