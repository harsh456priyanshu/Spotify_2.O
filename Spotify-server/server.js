require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/uploads', express.static(path.join(__dirname , 'uploads')));
app.use('/api/songs', songRoutes);



mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error :", err));


app.get('/' , (req , res) => {
    res.send("Spotify Backend Is Running");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});