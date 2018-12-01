var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Area_of_study = new Schema({
    long_name: String,
    short_name: String,
    name: String,
    st_date: Date,
    up_date: Date
}, { versionKey: false });

module.exports = mongoose.model('Area_of_study', Area_of_study);