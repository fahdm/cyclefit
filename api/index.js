const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(require('../config/checkToken'));

app.use('/api/users', require('../routes/api/users'));
app.use('/api/routes', require('../routes/api/routes'));

module.exports = app;
