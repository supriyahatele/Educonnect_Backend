const { UserModel } = require('../models/user.model.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BlackListModel } = require('../models/blackList.model.js');
const { CourseModel } = require('../models/course.model.js');
const { SubmissionModel } = require('../models/submission.model.js');
const saltRounds = 7;

// get all users list only acces for admin
const allUsers = async (req, res) => {
    try{
        const userData = await UserModel.find();
        res.status(200).json(userData);

    }catch(error){
        res.status(500).json({error : error.message})
    }
}


// get the user profile info
const userProfile =  async (req, res) => {
    try{
        const { id } = req;
        const courses = await CourseModel.find({ students: { $in: [id] } })
        const isUser = await UserModel.findById(id);
      
        if(isUser){
            res.status(200).json({user : isUser,courses});
        }else{
            res.status(404).json({error : 'User not found'})
        }

    }catch(error){
        res.status(500).json({error : error.message})
    }
}

// cheks the user exits and verifies the password then response with 'access-token & refresh-token' for authentication
const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body
        const isUser = await UserModel.findOne({email:email});
        if(isUser){
             bcrypt.compare(password,isUser.password, (err, result) => {
                if(err){
                    return res.status(500).json({error : err})
                }else{
                    if(result){
                       
                        const accessToken = jwt.sign({id : isUser._id, username:isUser.username,role : isUser.role}, process.env.PRIVATE_KEY,{expiresIn :  '1h'})
                        const refreshToken = jwt.sign({id : isUser._id, username:isUser.username,role : isUser.role}, process.env.PRIVATE_KEY,{expiresIn : '1d'})
                        res.status(200).json({accessToken , refreshToken })
                    }else{
                        res.status(200).json({error : 'wrong password'})
                    }
                }
             })
        }else{
            res.status(200).json({error : 'wrong username'})
        }

    }catch(error){
        res.status(500).json({error : error.message})
    }
}


// registers the user in database only if all fields are excides in req.body then saves in db.
const registerUser = async (req, res) => {
    try{
        const {username,email,interests,age,role,password} = req.body;
        if(username && email && interests.length > 0 && age && role && password){
            bcrypt.hash(password,saltRounds, async(err, hash) => {
                if(err){
                    return res.status(500).json({error : err.message})
                }else{
                    const newUser = new UserModel({...req.body,password:hash})
                    await newUser.save();
                    res.status(200).json({message : 'user successfully registered'})
                }
            })
        }else{
            res.status(400).json({error : 'all fields are required'})
        }

    }catch(error){
        res.status(500).json({error : error.message})
    }
}


// logout the user with removing the token access and saving the token in blacklist.
const logoutUser = async (req, res) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const newToken = new BlackListModel({token});
        await newToken.save();
        res.status(200).json({message : 'user logout successfully'})

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

// for to update the user details.
const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const isUser = await UserModel.findById(id);
        if(isUser) {
            await UserModel.findByIdAndUpdate(id,req.body);
            const updatedUser = await UserModel.findById(id);
            res.status(200).json(updatedUser)
        }else{
            res.status(200).json({message : 'User not found'})
        }
    }catch(error){
        res.status(500).json({message : error.message})
    }
}


// removes the user from db if exists.
const deleteUser = async ( req,res) => {
    try{
        const { id } = req.params;
        const isUser = await UserModel.findById(id);
        if(isUser){
            await UserModel.findByIdAndDelete(id);
            res.status(200).json({message : "User deleted successfully"})
        }else{
            res.status(404).json({message : "User not found"})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    allUsers,
    userProfile,
    loginUser,
    logoutUser,
    deleteUser,
    registerUser,
    updateUser
}

