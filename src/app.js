const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
// const repositorie = {id: uuid(), title: 'ABC', url: 'ABC', techs: ['123', '213', '345'], like: 1};
// repositories.push(repositorie);
// console.log(repositories);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, like} = request.body;
  const repositorie = { id: uuid(), title, url, techs, like }

  repositories.push(repositorie)

  return response.json(repositorie)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).send();
  }

  const like = repositories[repositorieIndex].like
  const repositorie = {
    id,
    title,
    url,
    techs,
    like
  }

  repositories[repositorieIndex] = repositorie

  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);
  
  if (repositorieIndex < 0) {
    return response.status(400).send()
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieIndex < 0) {
    return response.status(400).send()
  }

  repositories[repositorieIndex].like += 1;

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;