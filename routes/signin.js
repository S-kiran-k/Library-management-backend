// signupRoutes.js

import express from 'express';
import db from '../db.js'; // Assuming db is exported from a separate file where you establish the MySQL connection

const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO signup (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (error, results) => {
        if (error) {
            console.error('Error executing SQL:', error);
            res.status(500).json({ error: 'An error occurred while signing up' });
            return;
        }
        const newUser = { id: results.insertId, name, email };
        console.log('User signed up:', newUser);
        res.status(201).json(newUser);
    });
});

export default router;
