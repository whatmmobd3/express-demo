const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const courses = [{ id: 1, name: "Node js" }];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((e) => e.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course not found");
  res.send(course);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
