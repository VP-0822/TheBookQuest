const mongoose = require('mongoose');

//LiteratureRequests Schema
const LiteratureRequestSchema = mongoose.Schema({
    requestId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    isbn : String,
    issn : String,
    literatureTitle : String,
    comment : String,
    requestDate : Date,
    status : String
})

const LiteratureRequest = module.exports = mongoose.model('literatureRequests', LiteratureRequestSchema);