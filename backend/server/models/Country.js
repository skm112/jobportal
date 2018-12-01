var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var country = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    st_date: Date,
    states: [{
        _id: Schema.Types.ObjectId,
        name: String,
        st_date: Date,
        cities: [{
            _id: Schema.Types.ObjectId,
            name: String,
            st_date: Date,
        }]
    }]
},
    { versionKey: false });

module.exports = mongoose.model('country', country);