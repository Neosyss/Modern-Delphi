const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the MERN Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
