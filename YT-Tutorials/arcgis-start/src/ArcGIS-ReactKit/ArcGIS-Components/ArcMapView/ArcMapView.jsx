import { useEffect, useRef, useState } from "react";

import "./ArcMapView.css";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { MapViewContext } from "../Contexts/MapViewContext";

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

export const ArcMapView = ({ children }) => {
  const mapRef = useRef(null);

  const [view, setView] = useState();

  useEffect(() => {
    if (!mapRef?.current) return;

    const _view = createMapView(mapRef.current);
    setView(_view);

    return () => _view && _view.destroy();
  }, []);
  return (
    <div className="viewDiv" ref={mapRef}>
      <MapViewContext.Provider value={{ view }}>
        {children}
      </MapViewContext.Provider>
    </div>
  );
};
