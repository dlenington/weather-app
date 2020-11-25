import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
container: {
flexGrow: 1,
},
inputRoot: {
 color: "inherit"   
},
inputInput: {
    padding: theme.spacing(1,1,1,0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '20ch',
    },
},
search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: '#000',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
},
searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
}

}));

function NavBar({searchTerm, onChange, title}) {
const classes = useStyles();

  return (
      <div
      className={classes.container}
      >
      <AppBar position="sticky">
          <Toolbar>
              <Typography
              variant="h6"
              noWrap
              >
                {title}
              </Typography>
              <div
              className={classes.search}
              >
                  <div
                  className={classes.searchIcon}
                  >
                      <SearchIcon/>
                  </div>
                  <InputBase
                  placeholder="Search for location..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                onChange={(e) => onChange(e)}
                value={searchTerm}
                  />
              </div>
          </Toolbar>
      </AppBar>
      </div>
  );
}

export default NavBar;