const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    courseName : { type : String , required : true },
    educator  : { type : String , required : true },
    price : { type : Number , required : true },
    students: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    techStack  : { type : [String] },
    imageUrl:{ type:String },
    rating:{ type:Number},
    reviews:{type:Number}
},{
    versionKey : false,
    timestamps: true,
})

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = {
    CourseModel
}