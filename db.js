// db.js

import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace 'root' with your MySQL username
    password: '1234', // Replace '1234' with your MySQL password
    database: 'libman', // Replace 'libman' with your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

export default db;
