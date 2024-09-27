const express = require('express');

// to parse json data
const bodyParser = require('body-parser');

const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;
//const lesson1Controller = require('./controllers/lesson1');
 
//app.get('/', lesson1Controller.juliRoute);

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Register routes from routes/index.js at the base URL "/"
app.use('/', require('./routes'));


 
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});