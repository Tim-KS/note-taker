const express = require('express');
const Notes = require('./notes');

const app = express();

app.use('./notes', Notes);

module.exports = app;