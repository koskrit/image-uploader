import React, { useState } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import AppBar from "./Components/appBar";
import FloatBtn from "./Components/floating-btn";

import { Container, makeStyles } from "@material-ui/core/";
import "./App.css";

import Noty from "noty";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/sunset.css";

const useStyles = makeStyles((theme) => ({
   container: {},
}));

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export default function App() {
   const [files, setFiles] = useState([]);
   const styles = useStyles();

   window.files = files;

   const clearFiles = () => {
      setFiles([]);
   };

   let [fileNames, setFileNames] = useState([]);

   const getLastItemLink = async () => {
      let raw = await fetch("http://localhost:4000/url"); //192.168.1.2 (ip for mobile test)
      let datas = await raw.text(); // split datas to array
      // do forEach item of datas (named : data)
      // watch for notifications to work
      datas = datas.split(',')
      let copyAlert = new Noty({
         theme: "sunset",
         type: "success",
         layout: "topRight",
         text: "Link copied!",
         timeout: 1000,
      });

      datas.forEach(data => {
         if(data ){
      let containers = Array.from(document.querySelectorAll(".filepond--image-preview-wrapper"));
      let div = document.createElement("div");

      
      
        new Noty({
         theme: "sunset",
         type: "alert",
         layout: "centerRight",
         text: "File Link " + data + "🔗",
         timeout:2000,
         callbacks: {
            onHover: () => {
               navigator.clipboard.writeText(data);
               copyAlert.show();
            },
         },
      }).show();
      
     

      div.innerHTML = `
    <div class = "url-container"><p class = "url-link">${data} </p> <button class = "url-btn">🔗</button>  </div>
`;    
   let match = data.split('/')[4]
      console.log(match)
   let container1 = containers.find(container => container.parentElement.querySelector('.filepond--file-info').children[0].innerText === match)
      container1.insertAdjacentElement("afterbegin", div);
      let urlBtn = container1.querySelector(".url-btn");
      console.log(urlBtn);
      urlBtn.addEventListener("click", (e) => {
         navigator.clipboard.writeText(data);
         copyAlert.showing = false;
         copyAlert.shown = false
         copyAlert.show();
      });
   }})
   };

   async function getFiles (error, fileItem)  {
      if (fileNames.some((item) => fileItem.file.name === item)) {
         fileItem.abortLoad();
      } else {
         setFileNames([...fileNames, fileItem.file.name]);
      }
      console.log(fileNames);
      console.log(fileItem);
   }

   async function removeFile (error,fileItem){
      let fileName =fileItem.file.name
      let raw = await fetch(`http://localhost:4000/delete-file/${fileName}`)
   }


   return (
      <div className="App">
         <AppBar />
         
         <FilePond
            allowPaste={true}
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={10}
            server="http://localhost:4000/post" //https://silk-full-parsnip.glitch.me/post
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            onprocessfile={getLastItemLink}
            onaddfile={getFiles}
            onremovefile={removeFile}
         />
         <FloatBtn clearTheFiles={clearFiles} clearFileNames = {setFileNames} />
      </div>
   );
}

//
/*

** put files from server to client on Initiation
(
   -find how to add a file instance on state
)   


*/