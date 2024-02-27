// routes/loginRoutes.js

import express from 'express';
import db from '../db.js'; // Assuming db is exported from a separate file where you establish the MySQL connection

const router = express.Router();

// POST route for handling login requests
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find a user with the provided email
    const query = 'SELECT * FROM signup WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error executing SQL:', error);
            res.status(500).json({ success: false, message: 'An error occurred while logging in' });
            return;
        }

        // Check if a user with the provided email exists
        if (results.length === 0) {
            res.status(401).json({ success: false, message: 'User not found' });
            return;
        }

        // Compare the provided password with the hashed password stored in the database
        const user = results[0];
        if (password !== user.password) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        // Successful login
        res.status(200).json({ success: true, message: 'Login successful' });
    });
});

export default router;
