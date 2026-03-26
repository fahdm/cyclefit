import { useEffect, useState } from 'react';
import * as routesAPI from '../../utilities/routes-api';

export default function OrderHistoryPage() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    async function fetchRoutes() {
      const routes = await routesAPI.getRoutes();
      setRoutes(routes);
    }
    fetchRoutes();
  }, []);

  return (
    <div>
      <h1>Route History</h1>
      <ul>
        {routes.map(route => (
          <li key={route._id}>
            <strong>{route.name}</strong>: {route.startLocation} to {route.endLocation} ({route.distance} km)
          </li>
        ))}
      </ul>
    </div>
  );
}
