const express = require("express");

const server = express();
server.use(express.json());

let fakedb = [];
let counter = 0;

server.use((req, res, next) => {
  counter++;
  console.log(`${counter} requisições feitas até o momento`);
  return next();
});

function checkIdExists(req, res, next) {
  const { id } = req.params;
  let found = false;
  fakedb.map(obj => {
    if (obj.id == id) {
      found = true;
    }
  });
  return found
    ? next()
    : res.status(400).json({ error: "Project id not found." });
}

server.get("/projects", (req, res) => {
  return res.json(fakedb);
});

server.post("/projects", (req, res) => {
  fakedb.push(req.body);
  return res.json(fakedb);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  fakedb.map(obj => {
    if (obj.id === id) {
      obj.title = title;
    }
  });
  return res.json(fakedb);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  fakedb = fakedb.filter(obj => {
    return obj.id != id;
  });
  return res.json(fakedb);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  fakedb.map(obj => {
    if (obj.id === id) {
      if (!obj.tasks) {
        obj.tasks = [];
      }
      obj.tasks.push(title);
    }
  });
  return res.json(fakedb);
});

server.listen(3000);
