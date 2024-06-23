const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 4000;
const permitApiKey = process.env.PERMIT_API_KEY;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Function to check permission using Permit.io API
async function checkPermission(userId, resource, role) {
    try {
        const response = await axios.get(`https://api.permit.io/v1/check/${resource}/${role}`, {
            params: { user_id: userId },
            headers: {
                Authorization: `Bearer ${permitApiKey}`,
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error checking permission:', error.message);
        return false;
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route for admin access
app.get('/admin', async (req, res) => {
    const userId = req.query.user_id;
    const isAllowed = await checkPermission(userId, 'account', 'manager');
    if (isAllowed) {
      res.send('Hello Admin!');
    } else {
      res.status(403).send('Access Denied');
    }
  });

// Route for manager access
app.get('/manager', async (req, res) => {
    const userId = req.query.user_id;
    const isAllowed = await checkPermission(userId, 'account', 'manager');
    if (isAllowed) {
        res.send('Hello Manager!');
    } else {
        res.status(403).send('Access Denied!');
    }
});

// Route for customer access
app.get('/customer', async (req, res) => {
    const userId = req.query.user_id;
    const isAllowed = await checkPermission(userId, 'account', 'customer');
    if (isAllowed) {
        res.send('Hello Customer!');
    } else {
        res.status(403).send('Access Denied!');
    }
});

// Route for guest access
app.get('/guest', async (req, res) => {
    const userId = req.query.user_id;
    const isAllowed = await checkPermission(userId, 'account', 'guest');
    if (isAllowed) {
        res.send('Hello Guest!');
    } else {
        res.status(403).send('Access Denied!');
    }
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
