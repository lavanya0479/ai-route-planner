import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapView = ({ deliveries, route }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // 1️⃣ Initialize map ONLY ONCE
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
      center: [77.5946, 12.9716],
      zoom: 11
    });
  }, []);

  // 2️⃣ Add markers + route dynamically
  useEffect(() => {
    const map = mapRef.current;
    if (!map || deliveries.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();

    // Clear old markers
    document.querySelectorAll(".maplibregl-marker").forEach(m => m.remove());

    deliveries.forEach(d => {
      new maplibregl.Marker()
        .setLngLat(d.location.coordinates)
        .addTo(map);

      bounds.extend(d.location.coordinates);
    });

    // Update route
    if (route.length > 1) {
      const geojson = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: route
        }
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addSource("route", {
          type: "geojson",
          data: geojson
        });

        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#2563eb",
            "line-width": 4
          }
        });
      }

      route.forEach(coord => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 60 });
    }
  }, [deliveries, route]);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MapView;
