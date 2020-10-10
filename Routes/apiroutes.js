// const path = require("..db/store");
//required items
const path = require('path');
const fs = require('fs');
//path requirements
const OUTPUT_DIR = path.resolve(__dirname, "../db");
outputPath = path.join(OUTPUT_DIR, "db.json");
// var notes = require("../db/db.json");
//empty arrays to put note data into
let noteArray = [];
let savedNotes = [];
//sets a a variable to be exported equal to the return of a function
module.exports = function (app) {
    //creates a get request that pulls any saved note data from the db.json file
    app.get("/api/notes", function (req, res) {
        //adding the array within the function (for scope purposed)
        savedNotes = [];
        //reads the data from the db.json file in human english
        fs.readFile(outputPath, 'utf8', (err, data) => {
            if (err) throw err;
            //if no err occurs, takes read result and stores it as the value of a variable called data
            data = JSON.parse(data)
            //loops through parsed data and pushes it's content into the savedNotes array
            for (i = 0; i < data.length; i++) {
                savedNotes.push(data[i]);
            }
            // console.log(savedNotes)
            //returns the savedNotes array content
            res.send(savedNotes);
        });
    });
    //selects the notes file and created a function
    app.post("/api/notes", function (req, res) {
        console.log(req.body);
        //entered array for scope purposes
        notesArray = [];
        notesArray.push(req.body);
        //reads the outputPath value (db.json) in english
        fs.readFile(outputPath, 'utf8', (err, data) => {
            if (err) throw err;
           
            data = JSON.parse(data);
            for (let i = 0; i < data.length; i++) {
                notesArray.push(data[i])
            }
            for (let i = 0; i < notesArray.length; i++) {
                notesArray[i].id = i + 1;
            }
            res.send(notesArray);
            // console.log(notesArray);
            //writes the notes array values to the db.json file and logs success if no error occurs
            fs.writeFile(outputPath, JSON.stringify(notesArray), function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log("success");
                }
            })
        });
    })


app.delete("/api/notes/:id", (req, res) => {
    notesArray = [];
    let noteId = req.params.id;
    fs.readFile(outputPath, "utf-8", (err, data) => {
        if (err) throw err;
        notesArray = JSON.parse(data);

        const newNotesArray = notesArray.filter(note => note.id != noteId);
        fs.writeFile(outputPath, JSON.stringify(newNotesArray) + "\t", err => {
            if (err) throw err;
            console.log("note deleted");
            res.send(newNotesArray)
        })
    })
})
}