const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// JSON டேட்டாவைப் புரிந்துகொள்ள இந்த வரி அவசியம்
app.use(express.json());

// 1. Home Route (சர்வர் வேலை செய்கிறதா என்று பார்க்க)
app.get('/', (req, res) => {
    res.send("<h1>Server is working perfectly!</h1>");
});

// 2. Register Route (உதாரணம்)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // கடவுச்சொல்லை ஹேஷ் செய்தல் (Hashed password)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    res.json({ message: "User registered successfully!", username, hashedPassword });
});

// சர்வரை ஸ்டார்ட் செய்தல்
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
