/**
 * Created by Michal on 1/01/17.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    user_id: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    }
});