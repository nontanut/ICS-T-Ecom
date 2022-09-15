require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Require Routes
const usersRouter = require("./routes/users");


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api", usersRouter);

// Port
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`server is running on port ${port}`));