const mongoose = require('mongoose');

//Literature Type Schema
const LiteratureTypeSchema = mongoose.Schema({
    literatureTypeId : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    isbn : String,
    issn : String,
    thumbnail : String,
    authors : [],
    summary : String,
    publisher : String,
    year : Number,
    tags : []
});

const literatureType = module.exports = mongoose.model('literatureTypes', LiteratureTypeSchema, 'literatureTypes');