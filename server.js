// app.js
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import mysql from 'mysql';
import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signin.js';
import libraryRoutes from './routes/library.js';

const app = express();
const PORT = process.env.PORT || 8000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace 'root' with your MySQL username
    password: '1234', // Replace 'password' with your MySQL password
    database: 'libman', // Replace 'mydatabase' with your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());

app.use('/api/books', libraryRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
