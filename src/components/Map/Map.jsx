import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icons broken by webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DEFAULT_CENTER = [37.7749, -122.4194];

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
  const data = await res.json();
  if (!data.length) throw new Error(`Could not geocode: ${address}`);
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

async function getRoute(coords) {
  const coordStr = coords.map(([lat, lng]) => `${lng},${lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/bicycle/${coordStr}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== 'Ok') throw new Error('OSRM routing failed');
  return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
}

export default function Map({ startLocation, endLocation, waypoints }) {
  const [routeLine, setRouteLine] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!startLocation || !endLocation) return;

    async function fetchRoute() {
      setError('');
      try {
        const allAddresses = [startLocation, ...(waypoints || []), endLocation];
        const coords = await Promise.all(allAddresses.map(geocode));
        setMarkers(coords.map((c, i) => ({ pos: c, label: allAddresses[i] })));
        setCenter(coords[0]);
        const line = await getRoute(coords);
        setRouteLine(line);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRoute();
  }, [startLocation, endLocation, waypoints]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MapContainer center={center} zoom={12} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m, i) => (
          <Marker key={i} position={m.pos}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
        {routeLine && <Polyline positions={routeLine} color="blue" weight={4} />}
      </MapContainer>
    </div>
  );
}
