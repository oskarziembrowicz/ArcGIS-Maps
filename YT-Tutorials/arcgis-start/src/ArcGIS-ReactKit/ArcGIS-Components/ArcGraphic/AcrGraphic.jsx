import { useContext, useEffect, useState } from "react";

import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { GraphicsLayerContext } from "../Contexts/GraphicsLayerContext";

export const ArcGraphic = ({ geometry }) => {
  const { graphicsLayer } = useContext(GraphicsLayerContext);
  const [graphic, setGraphic] = useState();

  useEffect(() => {
    const simpleMarkerSymbol = new SimpleMarkerSymbol({
      color: "red",
    });

    const graphicPoint = new Graphic({
      geometry: geometry,
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
