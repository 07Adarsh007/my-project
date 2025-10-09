const express = require('express');
const app = express();
const PORT = 3000;

// ---------------------------
// Middleware 1: Logging
// ---------------------------
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware
};

// Apply logging middleware globally
app.use(loggerMiddleware);

// ---------------------------
// Middleware 2: Bearer Token Authentication
// ---------------------------
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Expecting "Bearer mysecrettoken"

    if (token === 'mysecrettoken') {
        next(); // Token is valid
    } else {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// ---------------------------
// Routes
// ---------------------------

// Public Route
app.get('/public', (req, res) => {
    res.send('This is a public route accessible by anyone.');
});

// Protected Route
app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route. You provided the correct Bearer token!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
