// // import { useEffect, useState } from 'react';
// // import * as routesAPI from '../../utilities/routes-api';

// // export default function MyRoutesPage() {
// //   const [routes, setRoutes] = useState([]);

// //   useEffect(() => {
// //     async function fetchRoutes() {
// //       const routes = await routesAPI.getRoutes();
// //       setRoutes(routes);
// //     }
// //     fetchRoutes();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>My Routes</h1>
// //       <ul>
// //         {routes.map(route => (
// //           <li key={route._id}>
// //             {route.name}: {route.startLocation} to {route.endLocation}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from 'react';
// import * as routesAPI from '../../utilities/routes-api';
// import Map from '../../components/Map/Map';

// export default function MyRoutesPage() {
//   const [routes, setRoutes] = useState([]);
//   const [selectedRoute, setSelectedRoute] = useState(null);

//   useEffect(() => {
//     async function fetchRoutes() {
//       const routes = await routesAPI.getRoutes();
//       setRoutes(routes);
//     }
//     fetchRoutes();
//   }, []);

//   function handleRouteClick(route) {
//     setSelectedRoute(route);
//   }

//   return (
//     <div>
//       <h1>My Routes</h1>
//       <ul>
//         {routes.map(route => (
//           <li key={route._id} onClick={() => handleRouteClick(route)}>
//             {route.name}: {route.startLocation} to {route.endLocation}
//           </li>
//         ))}
//       </ul>
//       {selectedRoute && (
//         <Map
//           startLocation={selectedRoute.startLocation}
//           endLocation={selectedRoute.endLocation}
//           waypoints={selectedRoute.waypoints}
//         />
//       )}
//     </div>
//   );
// }

// // import { useEffect, useState } from 'react';
// // import * as routesAPI from '../../utilities/routes-api';
// // import Map from '../../components/Map/Map';

// // export default function MyRoutesPage() {
// //   const [routes, setRoutes] = useState([]);
// //   const [selectedRoute, setSelectedRoute] = useState(null);

// //   useEffect(() => {
// //     async function fetchRoutes() {
// //       const routes = await routesAPI.getRoutes();
// //       setRoutes(routes);
// //     }
// //     fetchRoutes();
// //   }, []);

// //   function handleRouteClick(route) {
// //     setSelectedRoute(route);
// //   }

// //   return (
// //     <div>
// //       <h1>My Routes</h1>
// //       <ul>
// //         {routes.map(route => (
// //           <li key={route._id} onClick={() => handleRouteClick(route)}>
// //             {route.name}: {route.startLocation} to {route.endLocation}
// //           </li>
// //         ))}
// //       </ul>
// //       {selectedRoute && (
// //         <Map
// //           startLocation={selectedRoute.startLocation}
// //           endLocation={selectedRoute.endLocation}
// //           waypoints={selectedRoute.waypoints}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // import { useEffect, useState } from 'react';
// // import * as routesAPI from '../../utilities/routes-api';
// // import Map from '../../components/Map/Map';

// // export default function MyRoutesPage() {
// //   const [routes, setRoutes] = useState([]);
// //   const [selectedRoute, setSelectedRoute] = useState(null);

// //   useEffect(() => {
// //     async function fetchRoutes() {
// //       const routes = await routesAPI.getRoutes();
// //       setRoutes(routes);
// //     }
// //     fetchRoutes();
// //   }, []);

// //   function handleRouteClick(route) {
// //     setSelectedRoute(route);
// //   }

// //   return (
// //     <div>
// //       <h1>My Routes</h1>
// //       <ul>
// //         {routes.map(route => (
// //           <li key={route._id} onClick={() => handleRouteClick(route)}>
// //             {route.name}: {route.startLocation} to {route.endLocation}
// //           </li>
// //         ))}
// //       </ul>
// //       {selectedRoute && (
// //         <Map
// //           startLocation={selectedRoute.startLocation}
// //           endLocation={selectedRoute.endLocation}
// //           waypoints={selectedRoute.waypoints}
// //         />
// //       )}
// //     </div>
// //   );
// // }

import { useEffect, useState } from 'react';
import * as routesAPI from '../../utilities/routes-api';
import Map from '../../components/Map/Map';

export default function MyRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    async function fetchRoutes() {
      const routes = await routesAPI.getRoutes();
      setRoutes(routes);
    }
    fetchRoutes();
  }, []);

  function handleRouteClick(route) {
    setSelectedRoute(route);
  }

  return (
    <div>
      <h1>My Routes</h1>
      <ul>
        {routes.map(route => (
          <li key={route._id} onClick={() => handleRouteClick(route)}>
            {route.name}: {route.startLocation} to {route.endLocation}
          </li>
        ))}
      </ul>
      {selectedRoute && (
        <Map
          startLocation={selectedRoute.startLocation}
          endLocation={selectedRoute.endLocation}
          waypoints={selectedRoute.waypoints}
        />
      )}
    </div>
  );
}

