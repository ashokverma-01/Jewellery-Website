const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("./db/connection.js");
const authRoutes = require("./routes/AuthRoute.js");
const customerRoutes = require("./routes/CustomerRoute.js");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", customerRoutes);

app.listen(5002, () => {
  console.log("server on port 5000");
});

// app.js or server.js
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/AuthRoute');

// // Middleware
// app.use(express.json());

// // Use Routes
// app.use('/api', userRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
