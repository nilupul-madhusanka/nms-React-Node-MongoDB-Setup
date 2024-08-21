const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodbtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Customer = mongoose.model('Customer', customerSchema);

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({ name, email, password: hashedPassword });
    await newCustomer.save();

    res.json({ message: 'Customer registered successfully!' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
        return res.status(400).json({ message: 'Invalid email or password!' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password!' });
    }

    res.json({ message: 'Login successful!' });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
