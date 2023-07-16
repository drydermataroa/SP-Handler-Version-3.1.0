const mongo = require('mongoose');

const Schema = mongo.Schema({
    logging: Boolean,    
    logging_channel: String,
});
    
module.exports = mongo.model('Guilds', Schema)