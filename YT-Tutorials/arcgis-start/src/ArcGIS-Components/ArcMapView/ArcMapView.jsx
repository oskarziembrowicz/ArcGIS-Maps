import { useEffect, useRef } from "react";
import "./ArcMapView.css";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

function createMapView(container) {
  const map = new Map({
    basemap: "osm",
  });
  return new MapView({
    map: map,
    container: container,
    center: [55, 25],
    zoom: 13,
  });
}

export const ArcMapView = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef?.current) return;

    const view = createMapView(mapRef.current);

    return () => view && view.destroy();
  }, []);
  return <div className="viewDiv" ref={mapRef}></div>;
};
