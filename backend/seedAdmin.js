const bcrypt = require("bcryptjs");
require('dotenv').config();


const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASS
const ADMIN_NAME = process.env.ADMIN_USERNAME

const seedAdmin = (db) => {
    db.query("SELECT * FROM Users WHERE email = ?", [ADMIN_EMAIL], async (err, results) => {
        if (err) {
            console.error("❌ Error checking for existing admin:", err);
            return;
        }

        if (results.length > 0) {
            console.log("✅ Admin user already exists.");
            return;
        }

        // Hash the admin password
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        // Insert admin user into the database
        const insertQuery = "INSERT INTO Users (name, email, password_hash, role, acceptedTerms) VALUES (?, ?, ?, ?, ?)";
        db.query(insertQuery, [ADMIN_NAME, ADMIN_EMAIL, hashedPassword, "admin", '1'], (err, result) => {
            if (err) {
                console.error("❌ Error inserting admin user:", err);
                return;
            }
            console.log("✅ Admin user created successfully!");
        });
    });
};

module.exports = seedAdmin;
