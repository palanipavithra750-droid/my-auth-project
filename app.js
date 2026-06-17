const express = require('express');
const app = express();

// இதுதான் ரூட் பக்கம். இதைச் சேர்க்கவும்.
app.get('/', (req, res) => {
    res.send("<h1>Server is working perfectly!</h1>");
});

const PORT = process.env.PORT || 3000; // Render-க்கு இந்த போர்ட் அவசியம்
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
