var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/Country");

//@type         GET
//@route        /country/records
//@desc         get no of records
//@access       PUBLIC
router.get("/records", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs.length));
    });
});

//@type         SAVE
//@route        /country/save
//@desc         for save country
//@access       PUBLIC
router.post("/save", (req, res) => {
    var data = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        st_date: new Date()
    };
    var newRecord = new db(data);
    newRecord.save((err, docs) => {
        if (err) throw err;
        res.send({ msg: "success" });
    });
});

//@type         DELETE
//@route        /country/delete/ :id
//@desc         for delete country
//@access       PUBLIC
router.delete("/delete/:id", (req, res) => {
    country.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
        if (err) res.send(err);
        res.send({ msg: "success" });
    });
});

//@type         PUT
//@route        /country/update
//@desc         update country
//@access       PUBLIC
router.put("/update", (req, res) => {
    console.log("update");
    var id = req.body._id;
    var query = { _id: mongoose.Types.ObjectId(id) };
    var update = { name: req.body.name };
    db.findOneAndUpdate(query, update, (err, doc) => {
        if (err) throw err;
        res.json(doc);
    });
});

//@type         POST
//@route        /country/pageno/list
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