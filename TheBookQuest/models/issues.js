const mongoose = require('mongoose');

//Issue Schema
const IssueSchema = mongoose.Schema({
    issueId:{
        type: String,
        required: true
    },
    literatureId:{
        type : String,
        required : true
    },
    userId : {
        type: String,
        required: true
    },
    issueDate : Date,
    returnDate : Date,
    status : {
        type: String,
        required: true
    }
});

const Issue = module.exports = mongoose.model('issues', IssueSchema, 'issues');