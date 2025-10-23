const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// This is a secret key for signing the JWT. 
// In a real app, keep this in a .env file!
const JWT_SECRET = 'your-super-secret-key-123';

// Middleware to parse JSON bodies
app.use(express.json());

// --- Hardcoded User Data (for simplicity) ---
const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'password123'
};

// --- 1. Login Route (Issues Token) ---
// This matches image_25d25e.png
app.post('/login', (req, res) => {
    // Get username and password from request body
    const { username, password } = req.body;

    // Check if user credentials are valid
    if (username === mockUser.username && password === mockUser.password) {
        // Create the payload for the token
        const payload = {
            id: mockUser.id,
            username: mockUser.username
        };

        // Sign the token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.status(200).json({ token: token });
    } else {
        // Invalid credentials
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// --- 2. Token Verification Middleware ---
function verifyToken(req, res, next) {
    // Get the auth header
    const authHeader = req.headers['authorization'];
    
    // Check if header exists and is in "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // This matches image_25d258.png
        return res.status(401).json({ message: 'Token missing' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Token missing' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Token is invalid (e.g., expired, wrong signature)
            return res.status(403).json({ message: 'Token is not valid' });
        }

        // Token is valid! Attach the decoded user payload to the request object
        req.user = user;
        next(); // Move on to the protected route
    });
}

// --- 3. Protected Route ---
// This matches image_25d23c.png
// The 'verifyToken' middleware runs *before* the route handler
app.get('/protected', verifyToken, (req, res) => {
    // If the code reaches this point, it means verifyToken successfully ran (called next())
    // We have access to the user data from the token via req.user
    res.status(200).json({
        message: 'You have accessed a protected route!',
        user: req.user // req.user was set in the middleware
    });
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});