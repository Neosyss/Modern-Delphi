const seedAdmin = require("./seedAdmin");
const seedPrice = require("./seedPrice");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const OpenAI = require('openai');


bcrypt.setRandomFallback((len) => crypto.randomBytes(len));
const { anteroomSystemPrompt, homepageSystemPrompt } = require('./data');

const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const nodemailer = require('nodemailer'); // Import Nodemailer
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
    origin: ['http://82.180.132.121', 'http://localhost:3000'], 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});
seedAdmin(db);
seedPrice(db);


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
                    const updateQuery = "UPDATE sitemetrics SET traffic_count = traffic_count + 1 WHERE metric_date = ? AND metric_hour = ?";
                    db.query(updateQuery, [date, hour], (err) => {
                        if (err) {
                            console.error("Error updating traffic count:", err);
                            return res.status(500).json({ error: "Database error" });
                        }
                        res.json({ message: "Traffic count updated successfully" });
                    });
                } else {
                    // Insert a new record
                    const insertQuery = "INSERT INTO sitemetrics (metric_date, metric_hour, traffic_count) VALUES (?, ?, 1)";
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
        let sitemetricsCondition = "";
        let appointmentsCondition = "";
        let usersCondition = "";

        // Set date conditions based on the filter
        switch (filter) {
            case "today":
                sitemetricsCondition = "AND metric_date = CURDATE()";
                appointmentsCondition = "AND created_at = CURDATE()";
                usersCondition = "AND created_at >= CURDATE()";
                break;
            case "thisWeek":
                sitemetricsCondition = "AND YEARWEEK(metric_date, 1) = YEARWEEK(CURDATE(), 1)";
                appointmentsCondition = "AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)";
                usersCondition = "AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)";
                break;
            case "thisMonth":
                sitemetricsCondition = "AND YEAR(metric_date) = YEAR(CURDATE()) AND MONTH(metric_date) = MONTH(CURDATE())";
                appointmentsCondition = "AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())";
                usersCondition = "AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())";
                break;
            case "last6Months":
                sitemetricsCondition = "AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
                appointmentsCondition = "AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
                usersCondition = "AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)";
                break;
            case "last1Year":
                sitemetricsCondition = "AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                appointmentsCondition = "AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                usersCondition = "AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
                break;
            case "overall":
            default:
                sitemetricsCondition = "";
                appointmentsCondition = "";
                usersCondition = "";
                break;
        }

        // Fetch site traffic
        const [trafficResults] = await db.promise().query(
            `SELECT SUM(traffic_count) AS traffic FROM sitemetrics WHERE 1 ${sitemetricsCondition}`
        );
        const traffic = trafficResults[0].traffic || 0;

        // Fetch confirmed appointments
        const [appointmentsResults] = await db.promise().query(
            `SELECT COUNT(*) AS appointments from appointments WHERE 1 = 1 ${appointmentsCondition}`
        );
        const appointments = appointmentsResults[0].appointments || 0;

        // Fetch users with role = 'user'
        const [usersResults] = await db.promise().query(
            `SELECT COUNT(*) AS users from users WHERE role = 'user' ${usersCondition}`
        );
        const users = usersResults[0].users || 0;

        res.json({ traffic, appointments, users });
    } catch (error) {
        console.error("Error fetching site metrics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// fetch all users
app.get('/api/all-users', (req, res) => {
    const query = `
        SELECT 
            u.name, 
            u.user_id, 
            u.email, 
            COUNT(CASE WHEN a.appt_booked = '1' THEN 1 END) AS booked_appointments, 
            COUNT(CASE WHEN a.appt_booked = '0' THEN 1 END) AS pending_appointments
        from users u
        LEFT JOIN appointments a ON u.user_id = a.user_id
        WHERE u.role = 'user'
        GROUP BY u.user_id
        ORDER BY u.created_at DESC;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;

    const query = `SELECT name FROM users WHERE user_id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(results[0]);
    });
});


app.get('/api/all-bookings', (req, res) => {
    const query = `
        SELECT 
            appointments.*, 
            users.user_id AS user_id, 
            users.name AS user_name, 
            users.email AS user_email 
        from appointments
        JOIN users ON appointments.user_id = users.user_id
        ORDER BY appointments.created_at DESC;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get("/api/user-bookings", (req, res) => {
    // Get token from request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        // Verify JWT and extract user_id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user_id;

        // Query to fetch bookings for the logged-in user
        const query = `
            SELECT 
                appointments.*, 
                users.name AS user_name, 
                users.email AS user_email 
            from appointments
            JOIN users ON appointments.user_id = users.user_id
            WHERE appointments.user_id = ?
            and appointments.appt_booked = '1'
            ORDER BY appointments.created_at DESC;
        `;

        db.query(query, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    } catch (error) {
        res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
});



// --------------
// ✅ Fetch all blogs
app.get('/api/blogs', (req, res) => {
    db.query('SELECT blog_id, title, description, hashtags, images, date from blogs ORDER BY date DESC', (err, results) => {
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
    db.query('SELECT * from blogs WHERE blog_id = ?', [id], (err, results) => {
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
    const query = 'INSERT into blogs (title, description, hashtags, date, images) VALUES (?, ?, ?, ?, ?)';
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
    db.query('DELETE from blogs WHERE blog_id = ?', [blogId], (err) => {
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
    db.query('SELECT COUNT(*) as total from blogs', (err, countResults) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = countResults[0].total;

        // Then get the paginated blogs
        db.query(
            'SELECT blog_id, title, description, hashtags, images, date from blogs ORDER BY date DESC LIMIT ? OFFSET ?',
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
        const query = "SELECT user_id, name, email from users WHERE user_id = ? and role = 'user'";
        
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
        const query = "SELECT user_id, name, email from users WHERE user_id = ? and role='admin'";
        
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
        const checkQuery = "SELECT email from users WHERE email = ?";
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
            const insertQuery = "INSERT into users (name, email, password_hash, role, acceptedTerms) VALUES (?, ?, ?, ?, ?)";
            const role = "user";

            db.query(insertQuery, [fullName, email, hashedPassword, role, '1'], (err, result) => {
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

    const query = "SELECT user_id, email, password_hash, role from users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: "Database error" });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        const user = results[0];
        
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

app.post("/api/save-payment", async (req, res) => {
    try {
        const { 
            user_id, paymentIntentId, pricing_id, amount, currency, 
            name, email, address, city, postalCode, country 
        } = req.body;

        if (!user_id || !paymentIntentId || !pricing_id || !amount || !currency || 
            !name || !email || !address || !city || !postalCode || !country) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // ✅ Use async/await for user lookup
        const [users] = await db.promise().query(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
        
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const user = users[0];
        

        const [pricedata] = await db.promise().query(`SELECT * FROM pricing WHERE pricing_id = ?`, [pricing_id]);
        
        if (pricedata.length === 0) {
            return res.status(404).json({ success: false, message: "Price Plan not found" });
        }
        

        // ✅ Use async/await for insertion
        const query = `
            INSERT INTO appointments 
            (user_id, payment_intent_id, pricing_id, amount, currency, 
            name, email, address, city, postal_code, country, paid, appt_booked) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            user_id, paymentIntentId, pricing_id, amount, currency, 
            name, email, address, city, postalCode, country, '1', '0'
        ];

        await db.promise().query(query, values);

        res.status(200).json({ success: true, message: "Payment details saved successfully" });

        // ✅ Ensure email sending happens AFTER response (to prevent delays)
        const mailOptions = {
            from: process.env.SMTP_SENDER, 
            to: user.email, 
            subject: 'Modern Delphi | Booking Successful!', 
            html: `<h3>Dear User</h3>
            <div>Welcome to Modern Delphi and Thank you for your booking.
            Your payment has been successfully recieved. However you need to go to your Dashboard to schedule your appointment in the available time slots.
            </div>
            <br></br>
            <div>Details of Booking:</div>
            <br></br>
            <div><strong>Name:</strong> ${name}</div>
            <div><strong>Email:</strong> ${email}</div>
            <div><strong>Address:</strong> ${address}</div>
            <div><strong>Postal Code:</strong> ${postalCode}</div>
            <div><strong>City:</strong> ${city}</div>
            <div><strong>Country:</strong> ${country}</div>
            <br></br>
            <div><strong>Price Plan:</strong> ${pricedata[0].plan_name}</div>
            <div><strong>Amount Paid:</strong> $${amount}</div>
            <br></br>
            <br></br>
            <div>Thanks and Best Regards.</div>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error('Error sending email:', error);
            else console.log('Email sent:', info.response);
        });

    } catch (error) {
        console.error("Error saving payment details:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});



app.post("/api/save-donation", async (req, res) => {
    try {
        const { 
            paymentIntentId, amount, currency, 
            name, email, address, city, postalCode, country 
        } = req.body;

        if (!paymentIntentId || !amount || !currency || 
            !name || !email || !address || !city || !postalCode || !country) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const query = `
            INSERT into donation 
            (payment_intent_id, amount, currency, 
            name, email, address, city, postal_code, country ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            paymentIntentId, amount, currency, 
            name, email, address, city, postalCode, country
        ];

        const [result] = await db.promise().query(query, values);

        res.status(200).json({ success: true, message: "Donation details saved successfully", result });
    } catch (error) {
        console.error("Error saving donation details:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// stripePayment

app.post("/api/create-payment-intent", async (req, res) => {
    try {
      // You can add logic here to handle dynamic amount, currency, etc.
      const amount = 1000; // Amount in cents (e.g., $10.00)
  
      // Create a PaymentIntent on the server
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd', // or your currency of choice
        // Optional: Add billing details if required
        description: 'Payment for goods/services', // You can adjust description based on the payment scenario
      });
  
      // Send the client secret to the frontend
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  });
  

  app.post("/api/price-data", async (req, res) => {
    const { price_details } = req.body;

    if (!price_details || !Array.isArray(price_details)) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    try {
        for (const plan of price_details) {
            const updateQuery = `
                UPDATE pricing 
                SET plan_name = ?, price = ?, description = ?
                WHERE pricing_id = ?
            `;

            await db.promise().query(updateQuery, [
                plan.plan_name, 
                plan.price, 
                plan.description,
                plan.pricing_id
            ]);
        }

        res.status(200).json({ success: true, message: "Pricing updated successfully" });

    } catch (error) {
        console.error("Error updating prices:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


  app.get("/api/price-data", (req, res) => {

        const query = "SELECT * from pricing";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: "Pricing details not found" });
            }
            res.status(200).json({ price_details: results });
        });
});
  

  app.post("/api/appt_booked", async (req, res) => {
    try {
        const { userId, booked } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const updateQuery = `
            UPDATE appointments 
            SET appt_booked = ? 
            WHERE user_id = ? AND appt_booked = 0 
            ORDER BY date DESC 
            LIMIT 1
        `;

        const [result] = await db.query(updateQuery, [booked, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "No pending appointment found to update" });
        }

        res.status(200).json({ success: true, message: "Appointment successfully booked" });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


app.post("/api/check-appointment", async (req, res) => {
    try {
      const { authToken } = req.body;
      if (!authToken) {
        return res.status(400).json({ success: false, message: "Authentication token is required" });
      }
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      const userId = decodedToken.user_id;
      const checkQuery = `
        SELECT * from appointments WHERE user_id = ? AND appt_booked = '0' ORDER BY created_at DESC LIMIT 1`;
  
      const [result] = await db.promise().query(checkQuery, [userId]);
      if (result.length > 0) {return res.json({ hasPendingAppointment: true });}
      else {return res.json({ hasPendingAppointment: false });}

    } catch (error) {
      console.error("Error checking appointment:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });


app.post("/api/check-paid", async (req, res) => {
    try {
      const { authToken } = req.body;
      if (!authToken) {
        return res.status(400).json({ success: false, message: "Authentication token is required" });
      }
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      const userId = decodedToken.user_id;
      const checkQuery = 
      `SELECT * from appointments WHERE user_id = ? AND appt_booked = '0' AND paid = '1' ORDER BY created_at DESC LIMIT 1`;
  
      const [result] = await db.promise().query(checkQuery, [userId]);
      if (result.length > 0) {return res.json({ hasPendingAppointment: true });}
      else {return res.json({ hasPendingAppointment: false });}

    } catch (error) {
      console.error("Error checking appointment:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  
app.post("/api/set-appointment", async (req, res) => {
    try {
      const { authToken, eventDataCalendly } = req.body;

      if (!authToken) {
        return res.status(400).json({ success: false, message: "Authentication token is required" });
      }
  
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      const userId = decodedToken.user_id;
      const mysqlDate = new Date(eventDataCalendly.created_at).toISOString().slice(0, 19).replace("T", " ");
  
      const checkQuery = `
        Update appointments 
        set appt_booked = '1', 
        meeting_link = ?,
        meeting_time = ?,
        meeting_title = ?,
        meeting_creation_date = ?
        WHERE user_id = ? 
          AND appt_booked = '0' 
        ORDER BY created_at DESC 
        LIMIT 1
      `;
  
      const [result] = await db.promise().query(checkQuery, [eventDataCalendly.location['join_url'], eventDataCalendly.start_time, eventDataCalendly.name, mysqlDate ,userId]);
  
      if (result.length > 0) {
        return res.json({ message:"Appointment Set up" });
    } else {
          return res.json({ message:"Appointment Not Set up" });
      }
    } catch (error) {
      console.error("Error checking appointment:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });



// blog comments

app.get("/api/comments/:blogId", async (req, res) => {
    const { blogId } = req.params;
    try {
        const [comments] = await db.promise().query(
            `SELECT c.id, c.description, c.date, c.user_id, 
                    u.name AS user_name 
             FROM comments c 
             LEFT JOIN users u ON c.user_id = u.user_id 
             WHERE c.blog_id = ? 
             ORDER BY c.date DESC`, 
            [blogId]
        );

        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/api/comments", async (req, res) => {
    const { description, user_id, blog_id } = req.body;
    if (!description || !user_id || !blog_id) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await db.promise().query("INSERT INTO comments (description, user_id, blog_id) VALUES (?, ?, ?)", [description, user_id, blog_id]);
        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

console.log(process.env.OPENROUTER_API_KEY)

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

const chatbotType = {
    HOMEPAGE: 'Homepage',
    ANTEROOM: 'Anteroom'
}

let chatSessions = {};

app.post('/api/chat', async (req, res) => {
    const { message, chatbot, sessionId } = req.body;

    if (!chatSessions[sessionId]) {
        chatSessions[sessionId] = {};
    }
    
    if (!chatSessions[sessionId][chatbot]) {
        chatSessions[sessionId][chatbot] = [];
    }

    chatSessions[sessionId][chatbot].push({ role: 'user', content: message });

    if(chatSessions[sessionId][chatbotType.HOMEPAGE] && chatbot === chatbotType.ANTEROOM) {

    } 

    // openai.FineTuningJob.create

    try {
        let response;
        let maxRetries = 3;
        let attempt = 0;
    
        do {
            response = await openai.chat.completions.create({
                model: 'deepseek/deepseek-r1-distill-llama-70b',
                messages: [
                    { role: 'system', content: chatbot === 'Anteroom' ? anteroomSystemPrompt('') : homepageSystemPrompt },
                    ...chatSessions[sessionId][chatbot]
                ],
                provider: {
                    order: ['DeepInfra', 'Nebius']
                }
            });
    
            attempt++;
        } while ((!response.choices[0].message.content || response.choices[0].message.content.trim() === '') && attempt < maxRetries);
    
        if (response.choices[0].message.content && response.choices[0].message.content.trim() !== '') {
            chatSessions[sessionId][chatbot].push({ role: 'assistant', content: response.choices[0].message.content });
        } else {
            console.error('Failed to get a valid response after retries.');
        }

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post('/api/reset-chat', (req, res) => {
    const { chatbot, sessionId } = req.body;

    if (chatSessions[sessionId] && chatSessions[sessionId][chatbot]) {
        delete chatSessions[sessionId][chatbot];

        if (Object.keys(chatSessions[sessionId]).length === 0) {
            delete chatSessions[sessionId];
        }
    }

    res.json({ message: 'Chat session reset successfully' });
});


// app.listen(5000, '0.0.0.0', () => {
//     console.log("Server running on http://0.0.0.0:5000");
// });

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
