const express = require('express');
const path = require('path');
const { clog } = require('./middlware/clog');
const api = require('./routes/index.js');

// PORT
const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// GET for notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET for home page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
    console.log(`App is listening on PORT: ${PORT}`)
);