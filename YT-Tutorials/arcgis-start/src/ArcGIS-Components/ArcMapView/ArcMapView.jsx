import { useEffect, useRef } from "react";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

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

    const graphicsLayer = new GraphicsLayer();
    view.map.add(graphicsLayer);

    const point = new Point({
      longitude: 55,
      latitude: 25,
    });
    const simpleMarkerSymbol = new SimpleMarkerSymbol({
      color: "red",
    });
    const graphicPoint = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
    });

    graphicsLayer.add(graphicPoint);

    return () => view && view.destroy();
  }, []);
  return <div className="viewDiv" ref={mapRef}></div>;
};
