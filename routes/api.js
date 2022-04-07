const fs = require('fs');
const uniqid = require('uniqid');

const note = require("../db/db.json");

module.exports = (app) => {

  app.get("/api/notes", (req, res) => {
      res.json(note);
  });

  app.post("/api/notes", (req, res) => {
    const newnote = req.body;
    newnote.id = uniqid();
    note.push(newnote);

    fs.writeFile("./db/db.json", JSON.stringify(note, null, 4), (err) => {
      if (err) throw err;
      res.send(newnote);
    });
    res.end();
  });

};