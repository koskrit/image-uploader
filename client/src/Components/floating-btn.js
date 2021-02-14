import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  }
}));

async function deleteItems() {

await fetch('http://localhost:4000/delete')
}

export default function FloatingActionButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="Delete" onClick = {deleteItems}>
          <h2>-</h2>
      </Fab>
     
    </div>
  );
}