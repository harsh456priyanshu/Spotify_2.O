const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    audioUrl: String,
    thumbnail: String,
    uploadedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
} , { timestamps: true});

module.exports = mongoose.model('Song' , songSchema);