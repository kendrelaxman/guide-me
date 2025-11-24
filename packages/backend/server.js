const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Database
const licenses = [];

// Routes

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('--- New Contact Message ---');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('---------------------------');

    // Simulate email sending delay
    setTimeout(() => {
        res.json({ success: true, message: 'Message sent successfully!' });
    }, 1000);
});

// Purchase License
app.post('/api/purchase', (req, res) => {
    const { email, plan } = req.body;

    if (!email || !plan) {
        return res.status(400).json({ error: 'Missing email or plan' });
    }

    // Generate Mock License Key
    const licenseKey = `GM-${plan.toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    licenses.push({ email, plan, licenseKey, date: new Date() });

    console.log('--- New Purchase ---');
    console.log(`Email: ${email}`);
    console.log(`Plan: ${plan}`);
    console.log(`Key: ${licenseKey}`);
    console.log('--------------------');

    // Simulate processing delay
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Purchase successful!',
            licenseKey: licenseKey
        });
    }, 1500);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
