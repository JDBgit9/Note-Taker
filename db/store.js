// const fs = reqire("fs");
// const util = require("util")

// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// class Store {
//     read() {
//         return readFileAsync("db/db.json", "utf-8");
//     }
//     write(note) {
//         return writeFileAsync("db/db.json", JSON.stringify(note));
//     }

//     addNote(note) {
//         return this.read()
//             .then((data) => JSON.parse(data))
//             .then((notes) => [...notes, note])
//             .then((newNotes) => this.write(newNotes));
//     }

//     del(id) {
//         return this.getNotes()
//             .then((notes) => notes.filter((note) => note.id !== id))
//             .then((filteredNotes) => {
//                 console.log(filteredNotes);
//                 this.write(filteredNotes);
//             });
//     }
// }