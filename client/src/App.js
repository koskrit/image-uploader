import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FilePond, File, registerPlugin } from 'react-filepond'

import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import AppBar from "./Components/appBar"
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
export default function App() {
  const [files, setFiles] = useState([])
  return (
    <div className="App">
      <AppBar/>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
}