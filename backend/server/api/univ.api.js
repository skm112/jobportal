var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/University");


//@type         GET
//@route        /university/list
//@desc         get university 
//@access       PUBLIC
router.get("/list", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs));
    });
});

//@type         POST
//@route        /university/save
//@desc         save universities 
//@access       PUBLIC
router.post("/save", (req, res) => {
    var data = {
        _id: mongoose.Types.ObjectId(),
        alpha_two_code: req.body.alpha_two_code,
        name: req.body.name,
        country: req.body.country,
        web_page: req.body.web_page,
        domain: req.body.domain,
        st_date: new Date()
    };
    var newRecord = new db(data);
    newRecord.save((err, docs) => {
        if (err) throw err;
        res.send({ msg: "success" });
    });
});

//@type         DELETE
//@route        /university/delete/
//@desc         delete universities
//@access       PUBLIC
router.delete("/delete/:id", (req, res) => {
    db.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
        if (err) res.send(err);
        res.send({ msg: "success" });
    });
});

//@type         PUT
//@route        /university/update
//@desc         update universities
//@access       PUBLIC
router.put("/update", (req, res) => {
    console.log("update");
    console.log(req.body);

    var _id = req.body._id;
    console.log(_id);
    var query = { _id: mongoose.Types.ObjectId(_id) };
    var update = {
        alpha_two_code: req.body.alpha_two_code,
        name: req.body.name,
        country: req.body.country,
        web_page: req.body.web_page,
        domain: req.body.domain,
    };
    db.findOneAndUpdate(query, update, (err, doc) => {
        if (err) throw err;
        res.json(doc);
    });
});



module.exports = router;