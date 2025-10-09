const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Secret key for signing JWTs
const SECRET_KEY = 'mybanksecret';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// ---------------------------
// Hardcoded user and balance
// ---------------------------
let user = {
    username: 'user1',
    password: 'password123',
    balance: 1000
};

// ---------------------------
// Login Route (Generates JWT)
// ---------------------------
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Basic hardcoded authentication
    if (username === user.username && password === user.password) {
        // Generate JWT
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

// ---------------------------
// Middleware: Verify JWT
// ---------------------------
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Expect "Bearer token"

    jwt.verify(token, SECRET_KEY, (err, userData) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = userData; // Store decoded token data
        next();
    });
};

// ---------------------------
// Protected Banking Routes
// ---------------------------

// View Balance
app.get('/balance', authenticateJWT, (req, res) => {
    res.json({ balance: user.balance });
});

// Deposit Money
app.post('/deposit', authenticateJWT, (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid deposit amount' });
    }

    user.balance += amount;
    res.json({ message: `Deposited ${amount} successfully`, balance: user.balance });
});

// Withdraw Money
app.post('/withdraw', authenticateJWT, (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid withdrawal amount' });
    }

    if (amount > user.balance) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.balance -= amount;
    res.json({ message: `Withdrew ${amount} successfully`, balance: user.balance });
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () => {
    console.log(`Banking API running on http://localhost:${PORT}`);
});
