const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey"; // ஒரு ரகசிய சாவியை வைத்துக்கொள்வோம்

// 1. Register Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    res.json({ message: "User registered!", username, hashedPassword });
});

// 2. Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // உதாரணத்திற்கு admin என்று இருந்தால் லாகின் ஆகும்
    if (username === "admin" && password === "password123") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login success", token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// 3. Protected Route (Middleware உடன்)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: "Welcome to dashboard!", user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${POR
                                                             T}`));
