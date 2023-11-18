import {
  ArcGraphic,
  ArcGraphicsLayer,
  ArcMapView,
  createSimpleMarkerSymbol,
} from "./ArcGIS-ReactKit";
import { createPoint } from "./ArcGIS-ReactKit";
import "./App.css";

function App() {
  const point = createPoint({
    longitude: 55,
    latitude: 25,
  });

  const simpleMarkerSymbol = createSimpleMarkerSymbol({
    color: "red",
  });

  return (
    <ArcMapView>
      <ArcGraphicsLayer>
        <ArcGraphic geometry={point} symbol={simpleMarkerSymbol} />
      </ArcGraphicsLayer>
    </ArcMapView>
  );
}

export default App;
