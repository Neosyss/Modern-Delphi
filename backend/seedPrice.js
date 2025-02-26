require('dotenv').config();

const seedPrice = (db) => {
    db.query("SELECT * FROM pricing", async (err, results) => {
        if (err) {
            console.error("❌ Error checking for pricing:", err);
            return;
        }

        if (results.length > 0) {
            console.log("✅ Pricing details already exist.");
            return;
        }

        // Define initial pricing plans
        const pricingPlans = [
            { plan_name: "Basic", price: 9.99, description: "Feature 1 Feature 2 Feature 3" },
            { plan_name: "Standard", price: 19.99, description: "Feature 1 Feature 2 Feature 3" },
            { plan_name: "Premium", price: 29.99, description: "Feature 1 Feature 2 Feature 3"  }
        ];

        // Insert initial pricing plans
        const insertQuery = "INSERT INTO pricing (plan_name, price, description) VALUES ?";
        const values = pricingPlans.map(plan => [plan.plan_name, plan.price,plan.description]);

        db.query(insertQuery, [values], (err, result) => {
            if (err) {
                console.error("❌ Error inserting initial pricing plans:", err);
                return;
            }
            console.log("✅ Initial pricing plans inserted successfully!");
        });
    });
};

module.exports = seedPrice;
