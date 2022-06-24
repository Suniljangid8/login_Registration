const express = require('express');
const env = require('dotenv').config();
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 8535;

mongoose.connect('mongodb://127.0.0.1:27017/NodeDataBase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});



 app.use(session({
  secret: 'work',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));  

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

const index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use( (req, res, next)=> {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use( (err, req, res, next)=> {
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
