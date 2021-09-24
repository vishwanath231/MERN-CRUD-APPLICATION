const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');

// dotenv 
dotenv.config({ path: './config/config.env' });

//Mongodb connection
connectDB();

//Router Path
const routerPath = require('./router/router');


// init Express
const app = express();


//MIDDLEWARE
app.use(cors())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(bodyParser.json())

// Allow to json
app.use(express.json());

//Router
app.use('/api/user', routerPath);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// Port
const PORT = process.env.PORT || 5000;


// confirm server is running
app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.bold)
})










