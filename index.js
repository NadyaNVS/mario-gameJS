import express from "express";
const app = express();

app.use(express.static("public"));

const server = app.listen(5500, () => {
  const port = server.address().port;
  console.log(`App started at http://localhost:${port}`);
});
