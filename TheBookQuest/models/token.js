const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
    
});

const Token = module.exports = mongoose.model('tokens', TokenSchema);