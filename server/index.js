const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Middleware
app.use(cors()); // Allow all origins (Default is *)
app.options('*', cors()); // Enable pre-flight for all routes
app.use(express.json());

// Database Setup
const dbPath = path.resolve(__dirname, 'blood_donation.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Create Donors Table
        db.run(`CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            blood_group TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            district TEXT NOT NULL,
            city TEXT,
            last_donation_date TEXT,
            availability TEXT DEFAULT 'Available',
            verified INTEGER DEFAULT 0
        )`);

        // Create Blood Requests Table
        db.run(`CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT NOT NULL,
            blood_group TEXT NOT NULL,
            district TEXT NOT NULL,
            location TEXT,
            urgency TEXT DEFAULT 'Normal',
            contact_number TEXT NOT NULL,
            status TEXT DEFAULT 'Open',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        console.log('Database tables initialized.');
    });
}

// Routes
app.get('/', (req, res) => {
    res.send('Blood Donation Finder API is running.');
});

// Donor Registration
app.post('/api/donors/register', (req, res) => {
    const { name, age, blood_group, phone, district, city, last_donation_date, availability } = req.body;
    const sql = `INSERT INTO donors (name, age, blood_group, phone, district, city, last_donation_date, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, age, blood_group, phone, district, city, last_donation_date, availability], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: 'Donor registered successfully' });
    });
});

// Donor Login (Simulated with Phone Number)
app.post('/api/donors/login', (req, res) => {
    const { phone } = req.body;
    const sql = `SELECT * FROM donors WHERE phone = ?`;
    db.get(sql, [phone], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.json({ message: 'Login successful', donor: row });
        } else {
            res.status(404).json({ message: 'Donor not found' });
        }
    });
});

// Update Donor Profile
app.put('/api/donors/:id', (req, res) => {
    const { id } = req.params;
    const { availability, last_donation_date } = req.body;
    // Dynamic update query could be better, but keeping it simple
    const sql = `UPDATE donors SET availability = ?, last_donation_date = ? WHERE id = ?`;
    db.run(sql, [availability, last_donation_date, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Profile updated' });
    });
});

// Search Donors
app.get('/api/donors', (req, res) => {
    const { group, district } = req.query;
    let sql = `SELECT * FROM donors WHERE verified = 1`;
    const params = [];

    if (group) {
        sql += ` AND blood_group = ?`;
        params.push(group);
    }
    if (district) {
        sql += ` AND district = ?`;
        params.push(district);
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Submit Blood Request
app.post('/api/requests', (req, res) => {
    const { patient_name, blood_group, district, location, urgency, contact_number } = req.body;
    const sql = `INSERT INTO requests (patient_name, blood_group, district, location, urgency, contact_number) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [patient_name, blood_group, district, location, urgency, contact_number], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Request submitted successfully' });
    });
});

// Admin: List Unverified Donors
app.get('/api/admin/donors', (req, res) => {
    db.all(`SELECT * FROM donors WHERE verified = 0`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Admin: Verify Donor
app.post('/api/admin/verify/:id', (req, res) => {
    const { id } = req.params;
    db.run(`UPDATE donors SET verified = 1 WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Donor verified' });
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = { app, db };
