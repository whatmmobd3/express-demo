const express = require("express");
const joi = require("joi");
const logger = require("./logger");
const app = express();
const PORT = process.env.PORT || 5000;

const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(logger);

app.use(helmet());
app.use(morgan('tiny'));

const courses = [
  {
    id: 1,
    name: "Node js",
  },
  {
    id: 2,
    name: "Angular",
  },
  {
    id: 3,
    name: "Swift",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((e) => e.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
