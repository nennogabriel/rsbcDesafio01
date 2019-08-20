const express = require("express");

const server = express();
server.use(express.json());

let fakedb = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: ["Nova tarefa"]
  }
];

server.get("/projects", (req, res) => {
  return res.json(fakedb);
});

server.post("/projects", (req, res) => {
  fakedb.push(req.body);
  return res.json(fakedb);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  fakedb.map(obj => {
    if (obj.id === id) {
      obj.title = title;
    }
  });
  return res.json(fakedb);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  fakedb = fakedb.filter(obj => {
    return obj.id != id;
  });
  return res.json(fakedb);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  fakedb.map(obj => {
    if (obj.id === id) {
      obj.tasks.push(title);
    }
  });
  return res.json(fakedb);
});

server.listen(3000);
