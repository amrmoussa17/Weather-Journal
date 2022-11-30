// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// post route to get data from client side
app.post('/addData', (req, res) =>  {
  const newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    userResponse: req.body.userFeelings
  }
  projectData = newEntry;
  console.log(projectData)
});

// get route to retrieve app endpoint data
app.get('/getData', (req, res) => {
  console.log(projectData);
  res.send(projectData)
});



