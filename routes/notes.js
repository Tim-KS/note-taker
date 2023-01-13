const notes = require('express').Router();
const fs = rqeuire('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for notes
notes.get('/', (req, res) =>
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for sending notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNotes, './db/notes.json');
        const response = {
            status: 'Success!',
            body: newNotes,
        };

        res.json(response);
    } else {
        res.json('Something went wrong!');
    }
});

notes.delete("/:id", (req, res) => {
    console.info(`${req.method}`);
    const notesId = req.params.id.toString();
    const file = JSON.parse(fs.readFileSync("./db/notes.json", "utf8"));
    const newNotes = file.filter(notes =>
        notes.id.toString() !== notesId
    );
    fs.writeFileSync('./db/notes.json', JSON.stringify(newNotes));
    res.json(newNotes);
    console.log(`${req.method}`);
});

module.exports = notes;