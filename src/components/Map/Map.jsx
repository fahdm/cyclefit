
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const REACT_APP_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const containerStyle = {
    width: '100%',
    height: '400px'
};


const center = {
    lat: 37.7749,
    lng: -122.4194
};

const Map = ({ startLocation, endLocation, waypoints }) => {
    const [directions, setDirections] = useState(null);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY
      })

    useEffect(() => {
        if (startLocation && endLocation) {
            const waypointsArray = waypoints.map(location => ({
                location,
                stopover: true
            }));
            
          
            
        }
    }, [startLocation, endLocation, waypoints]);

    

    return isLoaded ? (
       
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
       
        >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

  ): <></>
};

export default Map;

// import { useEffect, useRef } from 'react';

// export default function Map({ startLocation, endLocation, waypoints }) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
//       zoom: 10,
//     });

//     const directionsService = new window.google.maps.DirectionsService();
//     const directionsRenderer = new window.google.maps.DirectionsRenderer();
//     directionsRenderer.setMap(map);

//     const waypointsArray = waypoints.map(location => ({
//       location,
//       stopover: true
//     }));

//     directionsService.route(
//       {
//         origin: startLocation,
//         destination: endLocation,
//         waypoints: waypointsArray,
//         travelMode: window.google.maps.TravelMode.BICYCLING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           directionsRenderer.setDirections(result);
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   }, [startLocation, endLocation, waypoints]);

//   return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
// }