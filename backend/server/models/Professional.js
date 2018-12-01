var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
// var Enum=require('enum');
var dbSchema = new Schema({
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false
    },
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: Date
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    image: String,
    role: {
        type: String,
        default: "Client"
    },
    education: [{
        name: String,
        school_location: {
            city: String,
            state: String,
            country: String,
            pincode: String
        },
        qualification: String,
        area_of_study: String,
        web_page: String,
        period_from: { type: Date },
        period_to: { type: Date },
        description: String,

    }]
},
    {
        versionKey: false
    }
);

dbSchema.pre('save', function (next) {
    now = new Date();
    this.update = now;
    if (!this.created) {
        this.created = now;
    }
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err1, hash) {
            user.password = hash;
            next();
        });
    });
});

dbSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

dbSchema.methods.changePassword = function (password, done) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err1, hash) => {
            done(err, hash);
        });
    });
};

var schemaObject = mongoose.model('professional', dbSchema);
module.exports = schemaObject;