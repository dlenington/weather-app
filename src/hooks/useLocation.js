import {useState, useEffect} from 'react';

const useLocation = () => {
const [location, setLocation] = useState();

   const getLocation = async () => {
            const success = (position) => {
                let coords = position.coords;

                console.log("Successs", coords);

                setLocation(
                    `${coords.latitude},
                    ${coords.longitude}`
                 )
            }

            const error = (error) => {
                console.log("Error getting user location", error);
            }

            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }

           navigator.geolocation.getCurrentPosition(success, error, options);
   }

   useEffect(() => {
       getLocation();
   })

   return location
}

export default useLocation;