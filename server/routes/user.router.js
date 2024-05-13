const express = require('express');

const userRouter = express.Router();
const { allUsers, userProfile, loginUser, registerUser, logoutUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth.middleware');
const { access } = require('../middlewares/access.middleware');

// to get all the users -- access to admin only
userRouter.get('/', auth, access('admin'),  allUsers)

// to get profile of the user -- user details
userRouter.get('/:id',auth, userProfile)

// to login the user
userRouter.post('/login', loginUser)

// to register the user
userRouter.post('/register', registerUser)

// to logout the user
userRouter.post('/logout',auth, logoutUser)

// to update the user details

userRouter.patch('/:id',auth,  updateUser)

// to delete the user
userRouter.delete('/:id',auth, deleteUser)

module.exports = {
    userRouter
}