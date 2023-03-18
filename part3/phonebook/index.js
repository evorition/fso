const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

morgan.token("post-data", (request) => JSON.stringify(request.body));

app.use(cors());
app.use(express.json());
app.use(morgan("tiny", { skip: (request) => request.method === "POST" }));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data",
    {
      skip: (request) => request.method !== "POST",
    }
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  let error = null;

  switch (true) {
    case persons.some((person) => person.name === body.name):
      error = "name must be unique";
      break;
    case !body.name:
      error = "name is missing";
      break;
    case !body.number:
      error = "number is missing";
      break;
  }

  if (error) {
    return response.status(400).json({ error });
  }

  const person = {
    id: Math.floor(Math.random() * 1_000_000_000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/info", (request, response) => {
  const requestTime = Date();

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${requestTime}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
