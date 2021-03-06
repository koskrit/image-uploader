import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import "./floating-btn.css"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
 
}));
let clearFiles;
let clearFileNames;

async function deleteItems() {
await fetch('http://localhost:4000/delete') //https://silk-full-parsnip.glitch.me/delete

clearFiles([])
clearFileNames([])

let notifications = document.querySelectorAll('div.noty_body')
notifications.forEach(notification => notification.style.display ="none")

}

export default function FloatingActionButton(props) {
  const classes = useStyles();
  clearFiles = props.clearTheFiles
  clearFileNames = props.clearFileNames
  return (
    <div className={classes.root}>
      <Fab color="primary" className ="FloatingActionButton" aria-label="Delete" onClick = {deleteItems}>
          <h2>-</h2>
      </Fab>
     
    </div>
  );
}