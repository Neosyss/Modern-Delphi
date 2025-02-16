const seedAdmin = require("./seedAdmin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const nodemailer = require('nodemailer'); // Import Nodemailer
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;


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
seedAdmin(db);


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

const getCurrentDateTime = () => {
    const now = new Date();
    return {
        date: now.toISOString().split("T")[0],  // YYYY-MM-DD
        hour: now.getHours(),  // Current hour (0-23)
    };
};
// tracker
app.post("/api/sitemetrics/track", (req, res) => {
    try {
        const { date, hour } = getCurrentDateTime();

        // Check if an entry exists for the current date/hour
        db.query(
            "SELECT metric_id FROM sitemetrics WHERE metric_date = ? AND metric_hour = ?",
            [date, hour],
            (err, results) => {
                if (err) {
                    console.error("Error checking site metrics:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                if (results.length > 0) {
                    // Update existing record (increment the count)
                    const updateQuery = "UPDATE SiteMetrics SET traffic_count = traffic_count + 1 WHERE metric_date = ? AND metric_hour = ?";
                    db.query(updateQuery, [date, hour], (err) => {
                        if (err) {
                            console.error("Error updating traffic count:", err);
                            return res.status(500).json({ error: "Database error" });
                        }
                        res.json({ message: "Traffic count updated successfully" });
                    });
                } else {
                    // Insert a new record
                    const insertQuery = "INSERT INTO SiteMetrics (metric_date, metric_hour, traffic_count) VALUES (?, ?, 1)";
                    db.query(insertQuery, [date, hour], (err) => {
                        if (err) {
                            console.error("Error inserting new traffic record:", err);
                            return res.status(500).json({ error: "Database error" });
                        }
                        res.json({ message: "Traffic count updated successfully" });
                    });
                }
            }
        );
    } catch (error) {
        console.error("Error tracking site metrics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// --------------


// admin routes

app.get("/api/sitemetrics", async (req, res) => {
    try {
        const { filter } = req.query;
        let siteMetricsCondition = "";
        let appointmentsCondition = "";
        let usersCondition = "";

        // Set date conditions based on the filter
        switch (filter) {
            case "today":
                siteMetricsCondition = "AND metric_date = CURDATE()";
                appointmentsCondition = "AND appointment_date = CURDATE()";
                usersCondition = "AND created_at >= CURDATE()";
                break;
            case "thisWeek":
                siteMetricsCondition = "AND YEARWEEK(metric_date, 1) = YEARWEEK(CURDATE(), 1)";
                appointmentsCondition = "AND YEARWEEK(appointment_date, 1) = YEARWEEK(CURDATE(), 1)";
                usersCondition = "AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)";
                break;
            case "thisMonth":
                siteMetricsCondition = "AND YEAR(metric_date) = YEAR(CURDATE()) AND MONTH(metric_date) = MONTH(CURDATE())";
                appointmentsCondition = "AND YEAR(appointment_date) = YEAR(CURDATE()) AND MONTH(appointment_date) = MONTH(CURDATE())";
                usersCondition = "AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())";
                break;
            case "last6Months":
                siteMetricsCondition = "AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
                appointmentsCondition = "AND appointment_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
                usersCondition = "AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
                break;
            case "last1Year":
                siteMetricsCondition = "AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                appointmentsCondition = "AND appointment_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                usersCondition = "AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                break;
            case "overall":
            default:
                siteMetricsCondition = "";
                appointmentsCondition = "";
                usersCondition = "";
                break;
        }

        // Fetch site traffic
        const [trafficResults] = await db.promise().query(
            `SELECT SUM(traffic_count) AS traffic FROM SiteMetrics WHERE 1 ${siteMetricsCondition}`
        );
        const traffic = trafficResults[0].traffic || 0;

        // Fetch confirmed appointments
        const [appointmentsResults] = await db.promise().query(
            `SELECT COUNT(*) AS appointments FROM Appointments WHERE appt_type = 'confirmed' ${appointmentsCondition}`
        );
        const appointments = appointmentsResults[0].appointments || 0;

        // Fetch users with role = 'user'
        const [usersResults] = await db.promise().query(
            `SELECT COUNT(*) AS users FROM Users WHERE role = 'user' ${usersCondition}`
        );
        const users = usersResults[0].users || 0;

        res.json({ traffic, appointments, users });
    } catch (error) {
        console.error("Error fetching site metrics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// --------------
// ✅ Fetch all blogs
app.get('/api/blogs', (req, res) => {
    db.query('SELECT blog_id, title, description, hashtags, images, date FROM Blogs ORDER BY date DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const blogs = results.map(blog => ({
            ...blog,
            images: blog.images ? `data:image/jpeg;base64,${blog.images.toString('base64')}` : null
        }));
        res.json(blogs);
    });
});

// ✅ Fetch a single blog by ID
app.get('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Blogs WHERE blog_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Blog not found" });

        const blog = results[0];
        blog.images = blog.images && blog.images.length > 0 ? `data:image/jpeg;base64,${blog.images.toString('base64')}` : null
        res.json(blog);
    });
});

// ✅ Add a new blog
app.post('/api/blogs', upload.single('image'), (req, res) => {
    const { title, description, hashtags } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !description) return res.status(400).json({ error: "Title and description are required" });
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const query = 'INSERT INTO Blogs (title, description, hashtags, date, images) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, hashtags, date ,image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ blog_id: result.insertId, title, description, hashtags, image });
    });
});

// ✅ Update a blog
// Update a blog
app.put('/api/blogs/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    let updateQuery, params;

    if (image) {
        updateQuery = 'UPDATE Blogs SET title = ?, description = ?, hashtags = ?, images = ? WHERE blog_id = ?';
        params = [title, description, hashtags, image, id];
    } else {
        updateQuery = 'UPDATE Blogs SET title = ?, description = ?, hashtags = ? WHERE blog_id = ?';
        params = [title, description, hashtags, id];
    }

    db.query(updateQuery, params, (err, result) => {
        if (err) {
            console.error('Error updating blog:', err);
            return res.status(500).json({ error: 'Failed to update blog' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog updated successfully' });
    });
});

// ✅ Delete a blog
app.delete('/api/blogs/:id', (req, res) => {
    const blogId = req.params.id;
    db.query('DELETE FROM Blogs WHERE blog_id = ?', [blogId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Blog deleted successfully" });
    });
});

// display on frontend to user

// Add these routes to your existing backend code

app.post('/api/blogs/paginated', (req, res) => {
    const { limit, page } = req.body;

    if (!limit || !page) {
        return res.status(400).json({ error: "Limit and page are required" });
    }

    const offset = (page - 1) * limit;

    // First, get total count of blogs
    db.query('SELECT COUNT(*) as total FROM Blogs', (err, countResults) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = countResults[0].total;

        // Then get the paginated blogs
        db.query(
            'SELECT blog_id, title, description, hashtags, images, date FROM Blogs ORDER BY date DESC LIMIT ? OFFSET ?',
            [limit, offset],
            (err, results) => {
                if (err) return res.status(500).json({ error: err.message });

                const blogs = results.map(blog => ({
                    ...blog,
                    images: blog.images ? `data:image/jpeg;base64,${blog.images.toString('base64')}` : null
                }));

                res.json({
                    blogs,
                    pagination: {
                        total,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                        hasMore: offset + results.length < total
                    }
                });
            }
        );
    });
});

// user auth

app.get("/api/auth/user", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const query = "SELECT user_id, name, email FROM Users WHERE user_id = ? and role = 'user'";
        
        db.query(query, [decoded.user_id], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ user: results[0] });
        });
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
});

app.get("/api/auth/admin", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const query = "SELECT user_id, name, email FROM Users WHERE user_id = ? and role='admin'";
        
        db.query(query, [decoded.user_id], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ user: results[0] });
        });
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
});


app.post("/api/auth/signup", async (req, res) => {
    const { fullName, email, password } = req.body;


    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const checkQuery = "SELECT email FROM Users WHERE email = ?";
        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error("Error checking existing user:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: "User already exists" });
            }

            // Hash the password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into database
            const insertQuery = "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)";
            const role = "user";

            db.query(insertQuery, [fullName, email, hashedPassword, role], (err, result) => {
                if (err) {
                    console.error("Error inserting user:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                const userId = result.insertId;
                const token = jwt.sign({ user_id: userId, email, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

                res.status(201).json({ message: "Signup successful", userId, role, token });
            });
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// User Login Route
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const query = "SELECT user_id, email, password_hash, role FROM Users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];

        // Compare hashed password
        if (!bcrypt.compareSync(password, user.password_hash)) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({ message: "Login successful", userId: user.user_id, userRole: user.role, token });
    });
});

// change pass

app.post("/api/auth/change-password", async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "SELECT password_hash FROM Users WHERE user_id = ?";
    
    db.query(query, [userId], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, results[0].password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect current password" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = "UPDATE Users SET password_hash = ? WHERE user_id = ?";

        db.query(updateQuery, [hashedNewPassword, userId], (err) => {
            if (err) {
                console.error("Error updating password:", err);
                return res.status(500).json({ error: "Error updating password" });
            }
            res.status(200).json({ message: "Password updated successfully" });
        });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
