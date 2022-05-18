// var bodyParser = require('body-parser')
const express = require('express')
const fs = require("fs");
const app = express()
const path = require("path")
const PORT = process.env.PORT|| 8080;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'db')));
app.use(express.json());

require("./Routes/apiroutes")(app);
require("./Routes/htmlroutes")(app);

// parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))
app.get("/", function(req, res) {
res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.listen(PORT, function() {  console.log("App listening on PORT: http://localhost:" + PORT);

});