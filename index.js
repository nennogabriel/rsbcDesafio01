const express = require("express");

const server = express();
server.use(express.json());

const fakedb = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: ["Nova tarefa"]
  }
];

server.get("/projects", (req, res) => {
  return res.json(fakedb);
});

server.listen(3000);
