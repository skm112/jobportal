var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var University = new Schema({
    alpha_two_code: String,
    name: String,
    country: String,
    web_page: String,
    domain: String,
    st_date: Date
}, { versionKey: false });

module.exports = mongoose.model('University', University);