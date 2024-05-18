import { useState } from 'react';
import * as routesAPI from '../../utilities/routes-api';

export default function RouteForm() {
  const [route, setRoute] = useState({
    name: '',
    startLocation: '',
    endLocation: '',
    waypoints: '',
    distance: ''
  });

  const [error, setError] = useState('');

  function handleChange(evt) {
    setRoute({ ...route, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      route.waypoints = route.waypoints.split(',').map(w => w.trim());
      await routesAPI.createRoute(route);
      setRoute({
        name: '',
        startLocation: '',
        endLocation: '',
        waypoints: '',
        distance: ''
      });
    } catch {
      setError('Error creating route - try again.');
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={route.name} onChange={handleChange} required />
          <label>Start Location</label>
          <input type="text" name="startLocation" value={route.startLocation} onChange={handleChange} required />
          <label>End Location</label>
          <input type="text" name="endLocation" value={route.endLocation} onChange={handleChange} required />
          <label>Waypoints (comma separated)</label>
          <input type="text" name="waypoints" value={route.waypoints} onChange={handleChange} required />
          <label>Distance (in km)</label>
          <input type="number" name="distance" value={route.distance} onChange={handleChange} required />
          <button type="submit">Create Route</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
