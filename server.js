// const express = require('express');
// const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// // Always require and configure near the top
// require('dotenv').config();
// // Connect to the database
// require('./config/database');

// const app = express();

// app.use(logger('dev'));
// app.use(express.json());

// // Configure both serve-favicon & static middleware
// // to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'build')));

// // Middleware to check and verify a JWT and
// // assign the user object from the JWT to req.user
// app.use(require('./config/checkToken'));

// const port = process.env.PORT || 3001;

// // Put API routes here, before the "catch all" route
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/routes', require('./routes/api/routes'));


// // Middleware to inject the Google Maps API key
// app.get('/*', function(req, res, next) {
//   const indexPath = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(indexPath, {headers: {
//     'Content-Type': 'text/html; charset=UTF-8'
//   }}, (err) => {
//     if (err) {
//       next(err);
//     }
//   });
// });


// app.use((req, res, next) => {
//   if (res.statusCode === 200 && res.get('Content-Type') === 'text/html; charset=UTF-8') {
//     let oldSend = res.send;
//     res.send = function(data) {
//       const modifiedData = data.toString().replace('GOOGLE_MAPS_API_KEY', process.env.GOOGLE_MAPS_API_KEY);
//       oldSend.call(this, modifiedData);
//     };
//   }
//   next();
// });

// // The following "catch all" route (note the *) is necessary
// // to return the index.html on all non-AJAX/API requests
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(port, function() {
//   console.log(`Express app running on port ${port}`);
// });


const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/routes', require('./routes/api/routes'));

// app.get('/*', function(req, res, next) {
//   const indexPath = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       next(err);
//     }
//   });
// });

// app.use((req, res, next) => {
//   if (res.statusCode === 200 && res.get('Content-Type') === 'text/html; charset=UTF-8') {
//     let oldSend = res.send;
//     res.send = function(data) {
//       const modifiedData = data.toString().replace('GOOGLE_MAPS_API_KEY', process.env.GOOGLE_MAPS_API_KEY);
//       oldSend.call(this, modifiedData);
//     };
//   }
//   next();
// });

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
