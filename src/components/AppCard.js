import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
      marginRight: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10,
      justifyContent: "center",
      alignItems: "center",
      width: 300,
      height: 400,
      display: "flex",
      flexDirection: "column",
  },
  // contentContainer: {
  //   width: '100%',
  //   height: 30,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   display: "flex"
  // },
  iconContainer: {
    width: '100%',
    justifyContent: "center",
    display: "flex"
  },
  iconLoading : {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000'
    }
}));


function AppCard({location, currentWeather, title}) {
  const classes = useStyles();
  return (
    <div>
    <Paper
    elevation={3}
    className={classes.container}
    >
  
  <div
className={classes.iconContainer}
>
  {currentWeather.condition.icon ? (
      <img src={currentWeather.condition.icon} width="100" height="100"></img>
  ) : (
<div className={classes.iconLoading}></div>
  )}</div>

<div
className={classes.contentContainer}
>

  <Typography 
  variant="h3"
  >
    {currentWeather.temp_f} F
    </Typography>
</div>
  <Typography
  variant="h5"
  >
    {location.name}
    </Typography>
  <Typography
  variant="h5"
  >{location.region}</Typography>
  <Typography>{moment.unix(currentWeather.last_updated_epoch).format("dddd")}</Typography>
  
  <Typography>{currentWeather.temp_c} C</Typography>
</Paper>
</div>
  );
}


export default AppCard;