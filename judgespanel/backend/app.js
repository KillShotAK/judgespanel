
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Serve static files from the frontend and backend directories
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../backend')));

// Use body-parser middleware for parsing JSON and url-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Admin credentials
const adminUsername = 'admin';
const adminPassword = 'admin123';

// Pre-defined judge data
const judges = [
  { id: 1, password: 'judge1', category: 'Jr. Champs' },
  { id: 2, password: 'judge2', category: 'Jr. Champs' },
  { id: 3, password: 'judge3', category: 'Sr. Champs' },
  { id: 4, password: 'judge4', category: 'Sr. Champs' },
  { id: 5, password: 'judge5', category: 'Master Champs' },
  { id: 6, password: 'judge6', category: 'Master Champs' }
];

// Admin login route
app.post('/admin-login', (req, res) => {
  // Check admin credentials
  const { username, password } = req.body;
  if (username === adminUsername && password === adminPassword) {
    res.json({ success: true, redirectUrl: '/admin.html' });
  } else {
    res.json({ success: false, message: 'Invalid admin credentials' });
  }
});

// Judge login route
app.post('/judge-login', (req, res) => {
  // Check judge credentials
  const { id, password, category } = req.body;
  const judge = judges.find(j => j.id === parseInt(id) && j.password === password && j.category === category);

  if (judge) {
    // Construct the redirect URL based on the lowercase and space-removed category
    const categoryFileName = category.toLowerCase().replace(/ /g, '');
    res.json({ success: true, redirectUrl: `/${categoryFileName}.html` });
  } else {
    res.json({ success: false, message: 'Invalid judge credentials' });
  }
});

// Array to store created teams
const teams = [];

// Route to handle team creation form submission
app.post('/create-team', (req, res) => {
  const { teamName, teamCategory } = req.body;

  // Create a new team object and store it in the teams array
  const newTeam = { name: teamName, category: teamCategory };
  teams.push(newTeam);

  res.json({ success: true, message: 'Team created successfully' });
});

// Serve admin.html for the admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
