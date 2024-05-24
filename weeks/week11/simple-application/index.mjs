import express from "express";

const app = express();
const port = 5173;

// intera cartella del progetto
app.use(express.static("./"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => console.log("Server ready"));
