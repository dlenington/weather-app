import React, {useEffect, useState} from 'react';
import axios from "axios";
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from "@material-ui/core/styles"
import {Grid, makeStyles} from '@material-ui/core';
// import moment from "moment";

import useLocation from './hooks/useLocation';
import MyCard from './components/AppCard';
import AppList from './components/AppList';
import theme from "./theme";
import NavBar from "./components/NavBar";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
  },
}));

function App() {
  const initialLocation = {
    region: ""
  }
  const initialWeather = {
    condition:{icon: ""}
  }
  const initialForecast = {
    forecastday: []
  }
  const [location, setLocation] = useState(initialLocation);
  const [currentWeather, setCurrentWeather] = useState(initialWeather);
  const [forecast, setForecast] = useState(initialForecast);
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const userLocation = useLocation();
  const classes = useStyles();
  
useEffect(() => {
  getForecast();

}, [userLocation])

const getForecast = async () => {
  try {
    setLoading(true);
    const config = {
      params: {
        key: '0b16e2bb3b094e029bb210414202411',
        q: `${searchTerm ? searchTerm : userLocation}`,
        days: 3
      }
    }

      const response = await axios.get("https://api.weatherapi.com/v1/forecast.json", config);
      
      setLoading(false);
      setLocation(response.data.location);
      setCurrentWeather(response.data.current);
      setForecast(response.data.forecast);
      
  } catch (error) {
    console.log("Error getting forecast", error);
    setLoading(false);
  }
}


const handleKeyPress = (e) => {
  if (e.key === "Enter"){
    console.log("enter pressed")
    getForecast();
  }
}

const handleChange = (e) => {
setSearchTerm(e.target.value)
}

  return (
    <ThemeProvider
    theme={theme}
    >
    <CssBaseline>
      <NavBar
      title="Weather App"
      onChange={(e) => handleChange(e)}
      searchTerm={searchTerm}
      onKeyPress={(e) => handleKeyPress(e)}
      />

    <Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
    className={classes.container}
    >
    <MyCard
    location={location}
    currentWeather={currentWeather}
    loading={loading}
    />

    <AppList
    data={forecast.forecastday}
    loading={loading}
    />

    </Grid>
</CssBaseline>
</ThemeProvider>
  );
}

export default App;
