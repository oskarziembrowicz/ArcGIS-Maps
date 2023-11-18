import {
  ArcGraphic,
  ArcGraphicsLayer,
  ArcMapView,
  createPolygon,
  createPolyline,
  createSimpleFillSymbol,
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

  const polygon = createPolygon({
    rings: [
      [
        [54.98995645744563, 24.998541454346366],
        [55.0000362883807, 24.980401436239674],
        [55.00514924734901, 24.982387700223256],
        [54.99404682216087, 25.00065982331722],
        [54.98995645744563, 24.998541454346366],
      ],
    ],
  });

  const simpleFillSymbol = createSimpleFillSymbol({
    color: "green",
  });

  return (
    <ArcMapView>
      <ArcGraphicsLayer>
        <ArcGraphic geometry={point} symbol={simpleMarkerSymbol} />
        <ArcGraphic geometry={polyline} symbol={simpleLineSymbol} />
        <ArcGraphic geometry={polygon} symbol={simpleFillSymbol} />
      </ArcGraphicsLayer>
    </ArcMapView>
  );
}

export default App;
