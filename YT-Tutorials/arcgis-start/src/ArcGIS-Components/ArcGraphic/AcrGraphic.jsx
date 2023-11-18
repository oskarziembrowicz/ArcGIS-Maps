import { useContext, useEffect, useState } from "react";

import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { GraphicsLayerContext } from "../Contexts/GraphicsLayerContext";

export const ArcGraphic = () => {
  const { graphicsLayer } = useContext(GraphicsLayerContext);
  const [graphic, setGraphic] = useState();

  useEffect(() => {
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

    setGraphic(graphicPoint);

    return () => {
      console.log("ArcGraphic unmounting");
    };
  }, []);

  useEffect(() => {
    if (!graphic || !graphicsLayer) return;
    graphicsLayer.add(graphic);
  }, [graphic, graphicsLayer]);

  return <></>;
};
