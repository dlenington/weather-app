import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';

function NavBar(props) {
  return (
      <AppBar position="sticky">
          <Toolbar>
              <Typography>

              </Typography>
          </Toolbar>
      </AppBar>
  );
}



export default NavBar;