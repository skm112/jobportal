var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/ApplyForJob");
var auth = require("../auth/auth");
var config = require('../config/config')

//@type         GET
//@route        /applyforjob/records
//@desc         get applyforjob
//@access       PUBLIC
router.get("/records", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs));
    });
});

//@type         GET
//@route        /applyforjob/user
//@desc         get applyforjob specific user
//@access       PUBLIC
router.get("/user", (req, res) => {
    //console.log(req);
    var id = auth.decodeJWT(req).sub;
    console.log('id==');
    console.log(id);
    db.find({ 'users.user_id': mongoose.Types.ObjectId(id) }, { 'job_id': 1, "job_name": 1, "users.$user_id": 1 }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        console.log(doc);
        res.end(JSON.stringify(doc));
    })
});




//@type         POST
//@route        /applyforjob/save
//@desc         save applyforjob
//@access       PUBLIC
router.post("/save/:id", (req, res) => {
    console.log(req.body);

    var id = auth.decodeJWT(req).sub;
    var job_id = req.params.id;
    var arrDocs = [];
    for (let i = 0; i < req.body.items.length; i++) {
        obj = {
            _id: mongoose.Types.ObjectId(),
            name: req.body.items[i].name,
            avtar: req.body.items[i].avtar
        }
        arrDocs.push(obj);
    };
    var data = {
        _id: mongoose.Types.ObjectId(),
        job_id: job_id,
        job_name: req.body.job_name,
        users: {
            user_id: id,
            description: req.body.description,
            jobtype: req.body.jobtype,
            price: req.body.price,
            docs: arrDocs,
            created_date: new Date(),
            updated_date: new Date()
        },
    };
    db.findOne({ job_id: mongoose.Types.ObjectId(job_id) }).then(user => {
        if (user) {
            db.findOne({ "users.user_id": id }, (err, existuser) => {
                if (existuser) {
                    console.log("applied");
                    return res.send({ success: false, message: "user already applied for this job..." });
                }
                else {
                    db.findOneAndUpdate(
                        { job_id: mongoose.Types.ObjectId(job_id) },
                        { $push: { users: data.users } },
                        (err, doc) => {
                            if (err) throw err;
                            res.json(doc);
                        })
                }
            })
        } else {
            new db(data)
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
        }
    })
});

//@type         DELETE
//@route        /applyforjob/delete/
//@desc         delete areaOfstudy
//@access       PUBLIC
router.delete("/delete/:id", (req, res) => {
    db.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
        if (err) res.send(err);
        res.send({ msg: "success" });
    });
});

//@type         PUT
//@route        /applyforjob/update/
//@desc         update applyforjob
//@access       PUBLIC
router.put("/update", (req, res) => {
    var id = req.body._id;
    var query = { _id: mongoose.Types.ObjectId(id) };
    var update = {
        description: req.body.description,
        docs: req.body.docs,
        update_date: new Date()
    };
    db.findOneAndUpdate(query, update, (err, doc) => {
        if (err) throw err;
        res.json(doc);
    });
});

//@type         POST
//@route        /applyforjob/pageno/list
//@desc         for paging and search
//@access       PUBLIC
router.post("/pageno/list", (req, res) => {
    console.log(req.body);
    var limit = req.body.limit;
    var pageno = req.body.pageno;
    var skip = (pageno - 1) * limit;
    console.log("skip > " + skip);
    var cursor = db.aggregate([
        {
            $match: {
                name: {
                    $regex: req.body.search,
                    $options: "i"
                }
            }
        },
        { $skip: skip },
        { $limit: limit }
    ]);
    cursor.exec((err, docs) => {
        console.log("docs");
        console.log(docs);
        res.end(JSON.stringify(docs));
    });
});

module.exports = router;