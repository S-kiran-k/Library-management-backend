import express from 'express';
import db from '../db.js';


const router = express.Router();

router.get('/', (req, res) => {
    const { title, author } = req.query;
    let query = 'SELECT * FROM books';

    const values = [];
    if (title) {
        query += ' WHERE LOWER(title) LIKE LOWER(?)';
        values.push(`%${title}%`);
    }
    if (author) {
        query += title ? ' AND LOWER(author) LIKE LOWER(?)' : ' WHERE LOWER(author) LIKE LOWER(?)';
        values.push(`%${author}%`);
    }

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error executing SQL:', error);
            res.status(500).json({ error: 'An error occurred' });
            return;
        }
        res.json(results);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting book with ID:', id);
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [id], (error) => {
        if (error) {
            console.error('Error executing SQL:', error);
            res.status(500).json({ error: 'An error occurred' });
            return;
        }
        res.sendStatus(200);
    });
});

router.post('/', (req, res) => {
    const { title, author } = req.body;
    const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
    db.query(query, [title, author], (error, results) => {
        if (error) {
            console.error('Error executing SQL:', error);
            res.status(500).json({ error: 'An error occurred' });
            return;
        }
        const newBook = { id: results.insertId, title, author };
        console.log('Inserted new book:', newBook);
        res.status(201).json(newBook);
    });
});

export default router;
