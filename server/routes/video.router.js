const express = require('express');
const multer = require('multer');
require('dotenv').config();

const { auth } = require('../middlewares/auth.middleware');
const { access } = require('../middlewares/access.middleware');
const { allVideos, singleVideo, uploadVideo, updateVideo, deleteVideo } = require('../controllers/video.controller');
const { isEnrolled } = require('../middlewares/isEnrolled.middleware');

const videoRouter = express.Router();
const upload = multer({ dest: 'uploads/' });


videoRouter.get('/', allVideos)

videoRouter.get('/:id', auth, singleVideo)

videoRouter.post('/uploads', upload.single('video'), uploadVideo)

videoRouter.patch('/:id', auth, access('educator'), updateVideo)

videoRouter.delete('/:id', auth, access('educator'), deleteVideo)

module.exports = {
    videoRouter
}