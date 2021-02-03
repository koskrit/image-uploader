import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    alignContent:"center"
  },
  navBar:{
    alignItems: 'center',
    justifyContent: 'center',

}
}));

export default function DenseAppBar() {
 
    let classes  = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" className ={classes.navBar}>
        <Toolbar variant="dense">
          
          <Typography variant="h4" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}