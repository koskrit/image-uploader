
   //npm i express

const express = require("express");
const path = require('path')

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());
app.use('/alias',express.static(path.join(__dirname,"folder","file.html")))

app.get("/:name/:age", (req, res) => {
  res.send("<h1>Testing the api calls mr " + req.params.name + " age " + req.params.age + "</h1>");
      // to add query strings in url : ?query1=value&query2=value | req.query
      // params are required | query strings are optional
});

app.get('/static',(req,res) => {
   res.sendFile(path.join(__dirname,"folder","file.html"))
   })

app.post("/post", async (req, res) => {
  let message = req.body.message;

  await res.json({ messager: "file received" });
});

app.listen(PORT, () => {
  console.log("listening on http://localhost:4000");
});

// to deploy create a vercel.json (delete previous .gitignore, .vercel(Folder) 
   