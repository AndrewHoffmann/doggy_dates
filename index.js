const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const path = require('path');
const request = require('request');
const moment = require('moment');

mongoose.connect('mongodb://andrew:quidfacit01@ds011912.mlab.com:11912/doggydates');	// copy link from mlab, replace user and password, delete < >

app.use(cors());
app.use(express.static('app'));
app.use(express.static(__dirname));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'./app/index.html'));
});

// Start the server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})