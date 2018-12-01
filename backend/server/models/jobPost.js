var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dbschema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    username: { type: String },
    Jobtitle: { type: String },
    Jobtype: { type: String },
    Jobprice: { type: Number },
    description: { type: String },
    skills: [],
    docs: [],
    Job_no_of_freelancer_required: { type: Number },
    Job_desired_experience_level: { type: String },
    Job_Status: { type: String, Default: "New" },
    Job_Start_Date: { type: Date },
    Job_Posted_Date: { type: Date },
    Job_updated_Date: { type: Date },
    Job_Closed_Date: { type: Date },
    Job_Deleted: { type: String, Default: false },
    Job_visibility: { type: String }
  },
  { versionKey: false }
);

var SchemaObject = mongoose.model("jobpost", dbschema);
module.exports = SchemaObject;
