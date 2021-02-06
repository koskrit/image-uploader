
const express = require("express");
const path = require('path')

const cors = require("cors");
const multer = require('multer')


const app = express();
const PORT = process.env.PORT || 4000;

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() +     path.extname(file.originalname));
  }
});

app.use(cors());
app.use('/alias',express.static(path.join(__dirname,"folder","file.html")))

const upload = multer({ dest: 'uploads/' ,storage:storage})



app.get("/:name/:age", (req, res) => {
  res.send("<h1>Testing the api calls mr " + req.params.name + " age " + req.params.age + "</h1>");
      // to add query strings in url : ?query1=value&query2=value | req.query
      // params are required | query strings are optional
});

app.get('/static',(req,res) => {
   res.sendFile(path.join(__dirname,"folder","file.html"))
   })


app.post("/post",upload.any({name:"image.png"}),  async (req, res) => {
  console.log(req.file,req.body);


  await res.send('jksadf')
});

app.listen(PORT, () => {
  console.log("listening on http://localhost:4000");
});

// to deploy create a vercel.json (delete previous .gitignore, .vercel(Folder) 
   