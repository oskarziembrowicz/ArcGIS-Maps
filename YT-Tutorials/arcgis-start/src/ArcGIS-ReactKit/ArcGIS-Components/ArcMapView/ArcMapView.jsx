import { useEffect, useRef, useState } from "react";

import Basemap from "@arcgis/core/Basemap";

import "./ArcMapView.css";

import { MapViewContext } from "../Contexts/MapViewContext";
import { createMapView } from "../../ArcGIS-SDK";

export const ArcMapView = ({ children, mapProperies, onClick }) => {
  const mapRef = useRef(null);

  const [view, setView] = useState();

  useEffect(() => {
    if (!mapRef?.current) return;

    const _view = createMapView(mapRef.current, mapProperies);
    setView(_view);

    return () => _view && _view.destroy();
  }, []);

  useEffect(() => {
    if (!view || !mapProperies) return;

    view.map.basemap = Basemap.fromId(mapProperies.basemap);
  }, [view, mapProperies]);

  useEffect(() => {
    if (!view || !onClick) return;

    const handle = view.on("click", onClick);

    return () => handle.remove();
  }, [view, onClick]);

  return (
    <div className="viewDiv" ref={mapRef}>
      <MapViewContext.Provider value={{ view }}>
        {children}
      </MapViewContext.Provider>
    </div>
  );
};
