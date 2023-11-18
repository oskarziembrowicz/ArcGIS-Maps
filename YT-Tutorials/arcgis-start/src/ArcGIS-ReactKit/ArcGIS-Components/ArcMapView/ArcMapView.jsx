import { useEffect, useRef, useState } from "react";

import "./ArcMapView.css";

import { MapViewContext } from "../Contexts/MapViewContext";
import { createMapView } from "../../ArcGIS-SDK";

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
