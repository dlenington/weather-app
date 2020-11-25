import React, {useEffect, useState} from 'react';
import axios from "axios";
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from "@material-ui/core/styles"
import {TextField, Typography, Grid, makeStyles} from '@material-ui/core';

import useLocation from './hooks/useLocation';
import MyCard from './components/AppCard';
import AppList from './components/AppList';
import theme from "./theme";
import NavBar from "./components/NavBar";


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
  },
}));

function App() {
  const initialLocation = {
    name: "Location",
    region: "Region"
  }
  const initialWeather = {
    last_updated: "",
    condition:{icon: ""}
  }
  const initialForecast = {
    forecastday: []
  }
  const [location, setLocation] = useState(initialLocation);
  const [currentWeather, setCurrentWeather] = useState(initialWeather);
  const [forecast, setForecast] = useState(initialForecast);
  const [searchTerm, setSearchTerm] = useState();
  const userLocation = useLocation();
  const classes = useStyles();
  
useEffect(() => {
  getForecast();

}, [userLocation])

const getForecast = async () => {
  try {
    const config = {
      params: {
        key: '0b16e2bb3b094e029bb210414202411',
        q: `${searchTerm ? searchTerm : userLocation}`,
        days: 3
      }
    }

    if(typeof searchTerm != 'undefined' || typeof userLocation != 'undefined'){
      console.log("searchTerm", searchTerm);
      console.log("userLocation", userLocation);
    const response = await axios.get("http://api.weatherapi.com/v1/forecast.json", config);
    console.log("response", response);
    setLocation(response.data.location);
    setCurrentWeather(response.data.current);
    setForecast(response.data.forecast);
    console.log("forecast", response.data.forecast);
  }

  } catch (error) {
    console.log("Error", error)
  }
}


const handleSubmit = () => {
  getForecast();
}

const handleChange = (e) => {
setSearchTerm(e.target.value)
}

  return (
    <>
    <ThemeProvider
    theme={theme}
    >
    <CssBaseline>
      <NavBar
      title="Weather App"
      onChange={(e) => handleChange(e)}
      searchTerm={searchTerm}
      />
{/* <TextField
placeholder="Search for a location"
onChange={(e) => handleChange(e)}
value={searchTerm}
/> */}
{/* <Button
onClick={handleSubmit}
>
  Submit
</Button> */}

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
title="Current Weather"
/>

<AppList
data={forecast.forecastday}
title="Forecast"
/>

</Grid>
</CssBaseline>
</ThemeProvider>
</>
  );
}

export default App;
