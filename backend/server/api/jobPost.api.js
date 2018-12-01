var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/jobPost.js");
var auth = require("../auth/auth");

//@Post api
//address /jobpost/save
router.post("/save", (req, res) => {
  console.log("body");
  console.log(req.body);
  var id = auth.decodeJWT(req).sub;
  var arrDocs = [];
  for (let i = 0; i < req.body.items.length; i++) {
    obj = {
      _id: mongoose.Types.ObjectId(),
      name: req.body.items[i].name,
      avtar: req.body.items[i].avtar
    };
    arrDocs.push(obj);
  }
  var data = {
    user_id: id,
    username: req.body.username,
    _id: mongoose.Types.ObjectId(),
    Jobtitle: req.body.Jobtitle,
    Jobtype: req.body.Jobtype,
    Jobprice: req.body.Jobprice,
    description: req.body.description,
    skills: req.body.skills,
    docs: arrDocs,
    Job_no_of_freelancer_required: req.body.Job_no_of_freelancer_required,
    Job_Start_Date: req.body.Job_Start_Date,
    Job_Closed_Date: req.body.Job_Closed_Date,
    Job_visibility: req.body.Job_visibility,
    Job_Posted_Date: new Date()
  };
  var newRecord = new db(data);
  newRecord.save((err, docs) => {
    if (err) throw err;
    res.send({ msg: "success" });
  });
});

//@get api
//@add:/jobpost/get
//@use in showjobs
router.get("/get/:username", (req, res) => {
  // console.log("get");
  // console.log(req.params.username);
  db.find({ username: req.params.username }, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});

//@api delete
//@add : /jobpost/delete/:id
router.delete("/delete/:id", (req, res) => {
  db.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), err => {
    if (err) res.send(err);
    res.send({ msg: "success" });
  });
});

//@update api for
//address: /update/:id
router.put("/update/:id", (req, res) => {
  console.log("update");
  var _id = req.params.id;
  console.log(_id);
  var query = { _id: mongoose.Types.ObjectId(_id) };
  var id = auth.decodeJWT(req).sub;
  var arrDocs = [];
  for (let i = 0; i < req.body.items.length; i++) {
    obj = {
      _id: mongoose.Types.ObjectId(),
      name: req.body.items[i].name,
      avtar: req.body.items[i].avtar
    };
    arrDocs.push(obj);
  }
  var update = {
    user_id: id,
    username: req.body.username,
    Jobtitle: req.body.Jobtitle,
    Jobtype: req.body.Jobtype,
    Jobprice: req.body.Jobprice,
    description: req.body.description,
    skills: req.body.skills,
    Job_no_of_freelancer_required: req.body.Job_no_of_freelancer_required,
    Job_Start_Date: req.body.Job_Start_Date,
    Job_Closed_Date: req.body.Job_Closed_Date,
    Job_visibility: req.body.Job_visibility,
    docs: arrDocs,
    Job_updated_Date: new Date()
  };
  db.findOneAndUpdate(query, update, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
});

//@get api
//@add:/jobpost/job
router.get("/job/:id", (req, res) => {
  db.find({ _id: mongoose.Types.ObjectId(req.params.id) }, { '_id': 1, "Jobtitle": 1, "Jobtype": 1 }, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});

//@get api for job details---
//@add:/jobpost/list/:id
router.get("/list/:id", (req, res) => {
  console.log(req.params.id);
  db.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs));
  });
});
//--------------------------------------

//@api used in show all jobs--
//route--POST --for--paging
router.post("/pageno/showall", (req, res) => {
  console.log(req.body);
  var limit = req.body.limit;
  var pageNo = req.body.pageno;
  var skip = (pageNo - 1) * limit;
  var cursor = db.aggregate([
    {
      $match: {
        Job_visibility: "public",
        Jobtitle: {
          $regex: req.body.search,
          $options: "i"
        }
      }
    },
    { $skip: skip },
    { $limit: limit }
    // { $project: { Jobtitle:1 } }
  ]);
  cursor.exec((err, docs) => {
    console.log("docs");
    console.log(docs);
    res.end(JSON.stringify(docs));
  });
});

//@get api
//@add:/jobpost/showall
router.get("/showall", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) throw err;
    res.end(JSON.stringify(docs.length));
  });
});

//--------------------------------------
module.exports = router;

