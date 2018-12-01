var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/Professional");
var auth = require("../auth/auth");
var pic = require("../config/config").profilepic

//@type         POST
//@route        /professional/signup
//@desc         user register
//@access       PUBLIC
router.post('/signup', (req, res) => {
    //console.log("save Post");
    // console.log(req.body);

    db.findOne({ username: req.body.username }, (err, existuser) => {
        // console.log(req.body);

        if (existuser) {
            return res.send({ success: false, message: "username already exists ..." });
        }
        else {
            // var image;
            // if (req.body.avtar) {
            //     image = 'data:' + req.body.avtar.filetype + ';base64,' + req.body.avtar.blobdata;
            // } else {
            //     image = pic;
            // }

            var user = new db({
                name: req.body.firstname + " " + req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                mobile: req.body.mobile,
                image: pic,
                role: req.body.selectedItems
            });


            // console.log(user);

            user.save((err, doc) => {
                if (err) {
                    return res.send({ success: false, message: err.message })
                };
                res.send({ success: true, message: "All detail saved ..." });

            })
        }
    })
});

//@type         POST
//@route        /professional/signin
//@desc         user login
//@access       PUBLIC
router.post('/signin', (req, res) => {

    db.findOne({ username: req.body.username }, '+password', (err, user) => {
        if (!user) {
            return res.send({ success: false, message: "username incorrect ..." })
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.send({ success: false, message: "password incorrect ..." });
                }
                res.send({ success: true, token: auth.createJWT(user), username: user.username });
            })
        }
    })
});

//@type         GET
//@route        /professional/profile
//@desc         user profile
//@access       PRIVATE
router.get('/profile', auth.ensureAuthenticated, (req, res) => {
    db.findOne({ '_id': mongoose.Types.ObjectId(req.user) }, (err, doc) => {
        if (!doc) {
            return res.send({ success: false, message: "username incorrect ..." })
        } else {
            res.json(doc);
        }
    })
});

//@type         PUT
//@route        /professional/resetpass
//@desc         reset user password
//@access       PRIVATE
router.put('/resetpass', auth.ensureAuthenticated, (req, res) => {
    var oldpass = req.body.oldpass;
    var id = auth.decodeJWT(req).sub;
    db.findOne({ '_id': id }, '+password', (err, user) => {
        if (!user) {
            return res.send({ success: false, message: "old password not matched" })
        } else {
            user.comparePassword(oldpass, (err, isMatch) => {
                if (!isMatch) {
                    return res.send({ success: false, message: "password incorrect ..." });
                } else {
                    user.changePassword(req.body.password, (err, hashpass) => {
                        if (err) {
                            return res.send({ success: false, message: 'Not Updated' });
                        }
                        else {
                            db.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(user._id) }, { 'password': hashpass }, function (err1, doc1) {
                                if (err1)
                                    res.send({ success: false, message: err1.message });
                                else
                                    res.send({ success: true, message: 'Operation Successful.' });
                            })

                        }
                    })
                }
            })
        }
    })
});

//@type         PUT
//@route        /professional/forgot
//@desc         forgot user password and update
//@access       PRIVATE
router.post('/forgot', auth.forgot_password);
router.post('/reset_password', auth.reset_password);


//@type         delete
//@route        /professional/delete
//@desc         delete user
//@access       PRIVATE
router.delete("/delete/:id", auth.ensureAuthenticated, (req, res) => {

    db.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
        if (err) res.send(err);
        res.send({ msg: "success" });
    });
});

//@type         put
//@route        /professional/update
//@desc         update user
//@access       PRIVATE
router.put("/update/", auth.ensureAuthenticated, (req, res) => {
    //console.log("update");
    //console.log(req.body);
    var id = req.body._id;
    var image;
    if (req.body.avtar) {
        image = 'data:' + req.body.avtar.filetype + ';base64,' + req.body.avtar.blobdata;
    } else {
        image = pic;
    }
    var query = { _id: mongoose.Types.ObjectId(id) };
    var update = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        image: image
    };
    db.findOneAndUpdate(query, update, (err, doc) => {
        if (err) throw err;
        res.json(doc);
    });
});

//@type         PUT
//@route        /professional/save/education/
//@desc         save details in education
//@access       PUBLIC
router.put("/save/education/:username", (req, res) => {
    var username = req.params.username;
    console.log("req.body");

    //  console.log(req.body);
    var edu_Data = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.obj.name,
        school_location: {
            city: req.body.obj.city,
            state: req.body.obj.state,
            country: req.body.obj.country,
            pincode: req.body.obj.pincode
        },
        qualification: req.body.obj.qualification,
        area_of_study: req.body.obj.area_of_study,
        web_page: req.body.obj.web_page,
        period_from: req.body.obj.period_from,
        period_to: req.body.obj.period_to,
        description: req.body.obj.description
    };
    db.findOneAndUpdate(
        { username: username },
        { $push: { education: edu_Data } },
        (err, doc) => {
            if (err) throw err;
            res.json(doc);
        }
    );
});

//@type         delete
//@route        /professional/delete/education/
//@desc         delete school details in education
//@access       PUBLIC
router.delete("/delete/education/:username/:id", (req, res) => {
    //console.log(req.params.username);
    //console.log(req.params.id);
    db.findOneAndUpdate(
        { 'username': req.params.username },
        {
            $pull: {
                education: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                }
            }
        },
        { safe: true, upsert: true },
        (err, doc) => {
            if (err) {
                //  console.log(err);
            } else {
                // console.log(doc);
                //do stuff
                res.end(JSON.stringify(doc));
            }
        }
    );
});

//@type         GET
//@route        /professional/get/education/
//@desc         show education details 
//@access       PUBLIC
router.get("/get/education/:username", (req, res) => {

    db.findOne({ 'username': req.params.username }, (err, doc) => {
        if (!doc) {
            return res.send({ success: false, message: "username incorrect ..." })
        } else {
            res.end(JSON.stringify(doc));
        }
    })
    // db.find({}, function (err, docs) {
    //     res.send(docs);
    // })
});


//@type         PUT
//@route        /professional/update/education/
//@desc         update education details 
//@access       PUBLIC
router.put("/update/education/:username/:id", (req, res) => {
    //console.log(req.params.username);
    // console.log(req.params.id);
    console.log(req.body);

    db.findOne({ "education._id": req.params.id }, (err, result) => {
        if (err) throw err;
        // console.log(result);
        result.education.id(req.params.id).name = req.body.name;
        result.education.id(req.params.id).school_location.country = req.body.school_location.country;
        result.education.id(req.params.id).school_location.state = req.body.school_location.state;
        result.education.id(req.params.id).school_location.city = req.body.school_location.city;
        result.education.id(req.params.id).school_location.pincode = req.body.school_location.pincode;
        result.education.id(req.params.id).qualification = req.body.qualification;
        result.education.id(req.params.id).area_of_study = req.body.area_of_study;
        if (req.body.description) result.education.id(req.params.id).description = req.body.description;
        result.education.id(req.params.id).web_page = req.body.web_page;
        result.education.id(req.params.id).period_from = req.body.period_from;
        result.education.id(req.params.id).period_to = req.body.period_to;
        result.save();
        res.send({ msg: "success" });

        res.end(JSON.stringify(result));
    });
});


module.exports = router;