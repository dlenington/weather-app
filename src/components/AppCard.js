import React from 'react';
import PropTypes from "prop-types";
import {fade, Paper, Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles(() => ({
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
  iconContainer: {
    width: '100%',
    justifyContent: "center",
    display: "flex"
  },
  iconLoading : {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: fade(theme.palette.primary.light, 0.25)
    },
    textLoadingLarge: {
      height: 50,
      width: 150,
      marginTop: 10,
      backgroundColor: fade(theme.palette.primary.light, 0.25)
    },
    textLoading: {
      height: 25,
      width: 200,
      marginTop: 10,
      backgroundColor: fade(theme.palette.primary.light, 0.25)
    },
}));


function AppCard({location, currentWeather, loading}) {
  const classes = useStyles();

  return (
    <div>
    <Paper
    elevation={3}
    className={classes.container}
    >
  
  <div className={classes.iconContainer}>
  {loading || !currentWeather ? (
    <CircularProgress/>
  ) : (
    <img 
    src={currentWeather.condition.icon} 
    width="100" 
    height="100"
    />
  )}</div>

{!loading && (
<>
<div
className={classes.contentContainer}
>
  
  {currentWeather.temp_f && <Typography 
  variant="h3"
  >
    {currentWeather.temp_f} F
    </Typography>}
</div>
 
  <Typography
  variant="h5"
  data-testid="location-name"
  >
    {location.name}
  </Typography>
  
  <Typography
  variant="h5"
  >
    {location.region}
  </Typography>
  {currentWeather.last_updated_epoch && (
  <Typography>
    {moment.unix(currentWeather.last_updated_epoch).format("dddd")}
</Typography>
)}
</>
)}
</Paper>
</div>
  );
}

AppCard.propTypes = {
  location: PropTypes.object.isRequired,
  currentWeather: PropTypes.object.isRequired,
  loading: PropTypes.bool
}


export default AppCard;