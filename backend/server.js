const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const nodemailer = require('nodemailer'); // Import Nodemailer
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',  
  credentials: true,               
}));

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

// Multer configuration for image upload
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const validTypes = ['image/jpeg', 'image/png'];
    if (validTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only .jpg and .png are allowed!'), false); // Reject the file
    }
};
const upload = multer({ storage, fileFilter });

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

app.get('/api/blogs', (req, res) => {
    // db.query('SELECT * FROM blogs ORDER BY date DESC', (err, results) => {
    //     if (err) return res.status(500).json({ error: err.message });
    //     res.json(results);
    // });

    blogs = [
      {
          id: 1,
          date: '12-12-12',
          title: 'Sample Blog',
          hashtags: '#react #webdev',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          image: null
      },
      {
        id: 2,
        date: '12-12-12',
        title: 'Sample Blog',
        hashtags: '#react #webdev',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        image: null
    }
  ];

    res.json(blogs);
});

// Get a specific blog by ID
app.get('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        if (results.length === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json(results[0]);
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid login credentials' });
        }
    });
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { service, name, email, phone, message } = req.body;
    if (!service || !name || !email || !phone || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    
    const currentDate = new Date();
    const query = 'INSERT INTO messages (service, name, email, phone, message, date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [service, name, email, phone, message, currentDate], (err, result) => {
        if (err) return res.status(500).json({ message: 'Failed to send message.' });
        res.status(200).json({ message: 'Message sent successfully!' });
        
        // Send notification email
        const mailOptions = {
            from: process.env.SMTP_SENDER, 
            to: process.env.SMTP_RECIPIENT, 
            subject: 'New Contact Form Submission', 
            html: `
                <h2>New Activity on website - Contact Form Submission</h2>
                <div><strong>Service:</strong> ${service}</div>
                <div><strong>Name:</strong> ${name}</div>
                <div><strong>Email:</strong> ${email}</div>
                <div><strong>Phone:</strong> ${phone}</div><br>
                <div><strong>Message:</strong></div>
                <div>${message}</div><br>
                <div><strong>Date:</strong> ${currentDate}</div>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error('Error sending email:', error);
            console.log('Email sent:', info.response);
        });
    });
});

app.post('/api/create-blog', upload.single('image'), (req, res) => {
    const { title, description, subheading, hashtags } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !description || !subheading || !hashtags || !image) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.query(
        'INSERT INTO blogs (title, description, subheading, date, hashtags, image) VALUES (?, ?, ?, ?, ?, ?)', 
        [title, description, subheading, date, hashtags, image], 
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, title, description, subheading, hashtags, date });
        }
    );
});

app.post('/api/edit-blog', upload.single('image'), (req, res) => {
    const { blogId, title, description, subheading, hashtags } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!blogId || !title || !description || !subheading || !hashtags) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const updateQuery = image
        ? 'UPDATE blogs SET title = ?, description = ?, subheading = ?, hashtags = ?, image = ? WHERE id = ?'
        : 'UPDATE blogs SET title = ?, description = ?, subheading = ?, hashtags = ? WHERE id = ?';

    const params = image
        ? [title, description, subheading, hashtags, image, blogId]
        : [title, description, subheading, hashtags, blogId];

    db.query(updateQuery, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update blog' });
        }
        res.status(200).json({ message: 'Blog updated successfully' });
    });
});



// Delete a blog
app.post('/api/delete-blog', (req, res) => {
    const { blogId } = req.body;

    db.query('DELETE FROM blogs WHERE id = ?', [blogId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete blog' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
