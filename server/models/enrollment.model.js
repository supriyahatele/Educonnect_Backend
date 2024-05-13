const mongoose = require('mongoose');

const EnrollmentSchema = mongoose.Schema({
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrollmentDate: { type: Date, default: Date.now },
    paymentMethod:{type:"String", required : true, enum:['debitCard','creditCard',"upiID"]},
    status:{type:"String", required : true, enum:['true','false',], default:false}
},{
    versionKey : false,
    timestamps: true,
})

const EnrollmentModel = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = {
    EnrollmentModel
}