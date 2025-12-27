import { useEffect, useState } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import "./index.css";

function App() {
  const [deliveries, setDeliveries] = useState([]);
  const [route, setRoute] = useState([]);
  const [traffic, setTraffic] = useState(null);
  const [eta, setEta] = useState(null);

  const startLocation = [77.5946, 12.9716]; // vehicle start

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/deliveries")
      .then(res => setDeliveries(res.data))
      .catch(err => console.error(err));
  }, []);

  const buildRouteCoords = (routeAddresses) => {
    return [
      startLocation,
      ...deliveries
        .filter(d => routeAddresses.includes(d.address))
        .map(d => d.location.coordinates)
    ];
  };

  const optimizeRoute = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/routes/smart-route"
    );

    setTraffic(res.data.traffic.traffic);
    setEta(res.data.eta);

    const coords = buildRouteCoords(res.data.route);
    setRoute(coords);
  };

  const reRoute = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/routes/re-route"
    );

    setTraffic(res.data.traffic.traffic);
    setEta(res.data.eta);

    const coords = buildRouteCoords(res.data.route);
    setRoute(coords);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1>AI Route Planner</h1>

        <button onClick={optimizeRoute}>Optimize Route</button>
        <button onClick={reRoute}>Re-route (Incident)</button>

        {traffic && <p><b>Traffic:</b> {traffic}</p>}
        {eta && <p><b>ETA:</b> {eta}</p>}
      </div>

      <div className="map-container">
        <MapView deliveries={deliveries} route={route} />
      </div>
    </div>
  );
}

export default App;
