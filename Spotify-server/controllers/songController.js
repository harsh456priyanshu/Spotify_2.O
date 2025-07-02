const Song = require('../models/Song');
const mongoose = require('mongoose');


exports.uploadSong = async (req , res) => {
    try {
        const { title, artist} = req.body;
        const audio = req.files['audio'] ? req.files['audio'][0] : null;
         const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;

          if (!audio  || !thumbnail) {
            return res.status(400).json({ error: 'Audio  or Thumbnail missing' });
        }


        const newSong = new Song({
            title,
            artist,
            audioUrl: `/uploads/${audio.filename}`,
            thumbnailUrl: `/uploads/${thumbnail.filename}`,
           uploadedBy: new mongoose.Types.ObjectId(req.user.id)
        });

        await newSong.save();
        res.status(201).json({msg : 'Song uploaded', song: newSong  })
    } catch (err) {
        res.status(500).json({error : err.message});
    }
};

