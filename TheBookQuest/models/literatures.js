const mongoose = require('mongoose');

//Literature Type Schema
const LiteratureSchema = mongoose.Schema({
    literatureId:{
        type : String,
        required : true
    },
    literatureTypeId : {
        type: String,
        required: true
    },
    status : String,
    rack_location : String
});

const Literature = module.exports = mongoose.model('literatures', LiteratureSchema, 'literatures');