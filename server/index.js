const express = require("express");
const path = require("path");
const fs = require("fs");

const cors = require("cors");
const multer = require("multer");
const { fstat } = require("fs");

const app = express();
const PORT = process.env.PORT || 4000;

const storage = multer.diskStorage({
   destination: "./uploads/",
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

app.use(cors());

const upload = multer({ dest: "uploads/", storage: storage });

let lastUploadLink;

app.get("/uploads/:name", (req, res) => {
   res.sendFile(path.join(__dirname, "uploads", req.params.name));
});

app.post("/post", upload.any({ name: "image.png" }), async (req, res) => {
   console.log(req.files[0].originalname);

   lastUploadLink = req.protocol+ "://" + req.get("host") + "/uploads/" + req.files[0].originalname

   await res.send(req.protocol+ "://" + req.get("host") + "/uploads/" + req.files[0].originalname );

});
app.get("/delete",  (req, res) => {
   fs.readdir("uploads", (err, results) => {
      results.forEach((file) => {
         fs.unlink("uploads/" + file, () => {
            console.log("file " + file + " deleted");
         });
      });
   });
   res.send('file deleted')
});

app.get('/url',(req,res) => {

   res.send(lastUploadLink)
})

app.listen(PORT, () => {
   console.log("listening on http://localhost:4000");
});

// to deploy create a vercel.json (delete previous .gitignore, .vercel(Folder)

