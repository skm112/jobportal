var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Degree = new Schema({
    long_name: String,
    short_name: String,
    name: String,
    st_date: Date,
    up_date: Date
}, { versionKey: false });

module.exports = mongoose.model('Degree', Degree);