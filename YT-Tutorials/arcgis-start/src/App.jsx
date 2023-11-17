import { useEffect, useRef } from "react";
import "./App.css";
import MapView from "@arcgis/core/views/MapView";

function App() {
  const mapRef = useRef(null);

  useEffect(() => {
    const view = new MapView({
      container: mapRef.current,
    });
  }, []);

  return <div className="viewDiv" ref={mapRef}></div>;
}

export default App;
