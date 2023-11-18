import { ArcGraphic, ArcGraphicsLayer, ArcMapView } from "./ArcGIS-ReactKit";
import { createPoint } from "./ArcGIS-ReactKit";
import "./App.css";

function App() {
  const point = createPoint({
    longitiude: 55,
    latitude: 25,
  });

  return (
    <ArcMapView>
      <ArcGraphicsLayer>
        <ArcGraphic geometry={point} />
      </ArcGraphicsLayer>
    </ArcMapView>
  );
}

export default App;
