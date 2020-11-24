import React, {useEffect} from 'react';
import axios from "axios";


function App() {

useEffect(() => {
  getCurrentWeather();

}, [])


const getCurrentWeather = async () => {
  try {
    const config = {
      params: {
        key: '0b16e2bb3b094e029bb210414202411',
        q: "Minneapolis"
      }
    }
    const response = await axios.get("http://api.weatherapi.com/v1/current.json", config);
    console.log("response", response);

  } catch (error) {
    console.log("Error", error)
  }
}

  return (
   <div>
     Weather App
   </div>
  );
}

export default App;
