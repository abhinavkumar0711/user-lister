const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Send email endpoint
app.post("/sendemail", (req, res) => {
  const { name, email } = req.body;

  let data = [];
  try {
    data = JSON.parse(fs.readFileSync("emails.json"));
  } catch (error) {}
  
  data.push({ name, email });

  fs.writeFile("emails.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
    res.send("success");
  });
});

// frontend endpoint
app.use("/", express.static("public"));

// users endpoint
app.get("/users", (req, res) => {

  let data = [];
  try {
    data = JSON.parse(fs.readFileSync("emails.json"));
  } catch (error) {}

  res.send(data);
});

// users.html file
app.get("/users.html", (req, res) => {
  res.sendFile(__dirname + "/public/users.html");
});

app.listen(5000, () => {
  console.log("app running on port 5000");
});
