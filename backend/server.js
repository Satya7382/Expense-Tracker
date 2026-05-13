require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const authRoutes = require('./routes/authRoutes');
//Middleware to handle cors

app.use (
    cors({
        origin : process.env.CLIENT_URL|| '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ["Content-Type","Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));