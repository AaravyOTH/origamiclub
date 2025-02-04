const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL; // Ensure this is the correct backend server URL
const CLIENT_URL = process.env.CLIENT_URL; // Ensure this is the correct client URL

module.exports = async (req, res) => {
  try {
    console.log('Incoming request:', req.method, req.url);
    
    // Extract query parameters from the incoming request
    const queryString = req.url.split('?')[1] || '';
    console.log('Query string:', queryString);

    const response = await axios.get(`${API_URL}${req.path}?${queryString}`);
    console.log('Response from API:', response.data);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', CLIENT_URL); // Replace with your client domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Send the response data
    res.json(response.data);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ type: 'error', message: error.message });
  }
};
