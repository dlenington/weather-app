import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Paper, TextField, Typography} from '@material-ui/core';
import useLocation from './hooks/useLocation';



function App() {
  const initialLocation = {
    name: "",
    region: ""
  }
  const initialWeather = {
    last_updated: ""
  }
  const [location, setLocation] = useState(initialLocation);
  const [weather, setWeather] = useState(initialWeather);
  const [searchTerm, setSearchTerm] = useState();
  const [allowPermissions, setAllowPermissions] = useState(false);
  const userLocation = useLocation();

useEffect(() => {
  
  getCurrentWeather();

  // if(userLocation)
  // getCurrentWeather();

}, [userLocation])


const getCurrentWeather = async () => {
  try {
    const config = {
      params: {
        key: '0b16e2bb3b094e029bb210414202411',
        q: `${searchTerm ? searchTerm : userLocation}`
      }
    }
    const response = await axios.get("http://api.weatherapi.com/v1/current.json", config);
    console.log("response", response);
    setLocation(response.data.location);
    setWeather(response.data.current);

  } catch (error) {
    console.log("Error", error)
  }
}
const handleSubmit = () => {
  getCurrentWeather();
}

const handleChange = (e) => {
setSearchTerm(e.target.value)
}

  return (
    <>
   <Typography>
     Weather App
   </Typography>

<TextField
placeholder="Search for a location"
onChange={handleChange}
value={searchTerm}
/>
<Button
onClick={handleSubmit}
>
  Submit
</Button>

<Paper>
  <Typography>{location.name}</Typography>
  <Typography>{location.region}</Typography>
  <Typography>Updated {weather.last_updated}</Typography>
  <Typography>{weather.temp_f} F</Typography>
  <Typography>{weather.temp_c} C</Typography>
</Paper>
</>
  );
}

export default App;
