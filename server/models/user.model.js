const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : { type : String , required : true },
    password : { type : String , required : true },
    email : { type : String , Unique : true , required : true },
    interests : { type : [String] },
    role : {type : String , required : true, enum : ['admin', 'student', 'educator'], defaultValue : 'student'},
    age : { type : Number, required : true,},
    

},{
    versionKey : false,
    timestamps: true,
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    UserModel
}