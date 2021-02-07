
const express = require("express");
const path = require('path')

const cors = require("cors");
const multer = require('multer')


const app = express();
const PORT = process.env.PORT || 4000;

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
      cb(null, file.originalname);
  }
  
});

app.use(cors());

const upload = multer({ dest: 'uploads/' ,storage:storage})


app.get("/uploads/:name",(req,res) => {
res.sendFile(path.join(__dirname,"uploads", req.params.name))

})


app.post("/post",upload.any({name:"image.png"}),  async (req, res) => {
  console.log(req.files[0].originalname);

  await res.send('image saved')
});

app.listen(PORT, () => {
  console.log("listening on http://localhost:4000");
});

// to deploy create a vercel.json (delete previous .gitignore, .vercel(Folder) 
   