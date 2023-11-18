import {
  ArcGraphic,
  ArcGraphicsLayer,
  ArcMapView,
  createPolyline,
  createSimpleLineSymbol,
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

  const polyline = createPolyline({
    paths: [
      [
        [54.943317188469194, 25.00082604252715],
        [54.964223727281336, 25.04897516352014],
        [55.02520113215138, 25.032138274720992],
      ],
    ],
  });

  const simpleLineSymbol = createSimpleLineSymbol({
    color: "red",
    width: 3,
  });

  return (
    <ArcMapView>
      <ArcGraphicsLayer>
        <ArcGraphic geometry={point} symbol={simpleMarkerSymbol} />
        <ArcGraphic geometry={polyline} symbol={simpleLineSymbol} />
      </ArcGraphicsLayer>
    </ArcMapView>
  );
}

export default App;
