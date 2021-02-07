import React, { useState } from 'react'
import { FilePond, File, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import AppBar from "./Components/appBar"
import {Container,makeStyles} from "@material-ui/core/"
import "./App.css"

const useStyles = makeStyles((theme) => ({
  
  container:{
    
  }
}));

//http://localhost:3000


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
export default function App() {
  const [files, setFiles] = useState([])
  const styles = useStyles()
  return (
    <div className="App">
      <AppBar/>
      
      <FilePond 
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={10}
        server="http://localhost:4000/post"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      
    </div>
  )
}