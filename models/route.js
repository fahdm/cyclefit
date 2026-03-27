const { v4: uuidv4 } = require('uuid');
const { getItem, setItem } = require('../config/edgeDb');

async function getRoutes() {
  return (await getItem('routes')) || [];
}

const Route = {
  async create({ name, startLocation, endLocation, waypoints, distance, user }) {
    const routes = await getRoutes();
    const route = {
      _id: uuidv4(),
      name,
      startLocation,
      endLocation,
      waypoints,
      distance: Number(distance),
      user,
      createdAt: new Date().toISOString(),
    };
    routes.push(route);
    await setItem('routes', routes);
    return route;
  },

  async find({ user }) {
    const routes = await getRoutes();
    return routes.filter(r => r.user === user);
  },
};

module.exports = Route;
