var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ApplyForJob = new Schema({
    _id: mongoose.Types.ObjectId,
    job_id: {
        type: mongoose.Types.ObjectId,
        ref: 'jobpost'
    },
    job_name: String,
    users: [{
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'professional'
        },
        jobtype: String,
        price: Number,
        description: {
            type: String,
        },
        docs: [],
        created_date: Date,
        updated_date: Date
    }]

}, { versionKey: false });

module.exports = mongoose.model('ApplyForJob', ApplyForJob);