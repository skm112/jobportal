var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose")
const port = process.env.PORT || 3000;
const path = require('path');


//@paths
const db = require("./server/config/config").mongoURL1;
const userAPI = require("./server/api/user.api")
const univAPI = require("./server/api/univ.api")
const areaOfStudyAPI = require("./server/api/area.of.study.api")
const degreeAPI = require("./server/api/degree.api")
const countryAPI = require("./server/api/country.api")
const stateAPI = require("./server/api/state.api")
const cityAPI = require("./server/api/city.api")
const applyforjobAPI = require("./server/api/apply.for.job.api")
var jobpostAPI = require("./server/api/jobPost.api");

//@access controls----------------------------------------------
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    next();
});

//@middleware --- body-parser
app.use(bodyparser.json({ limit: '20mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '20mb', extended: true }));
app.use(express.static(path.join(__dirname, 'server/templates')));
//@connect database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected successfully..."))
    .catch(err => console.log(err));

//@testing
app.get('/', (req, res) => {
    res.send("Testing success : True")

})

//@actual routes
app.use('/professional', userAPI);
app.use('/university', univAPI);
app.use('/areaOfstudy', areaOfStudyAPI);
app.use('/degree', degreeAPI);
app.use('/country', countryAPI);
app.use('/state', stateAPI);
app.use('/city', cityAPI);
app.use('/applyforjob', applyforjobAPI);
app.use("/jobpost", jobpostAPI);




app.listen(port, () => console.log(`Server is running at PORT: ${port} ...`));