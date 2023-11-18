import { useContext, useEffect, useState } from "react";

import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { GraphicsLayerContext } from "../Contexts/GraphicsLayerContext";

export const ArcGraphic = ({ geometry, symbol }) => {
  const { graphicsLayer } = useContext(GraphicsLayerContext);
  const [graphic, setGraphic] = useState();

  useEffect(() => {
    const graphicPoint = new Graphic({
      geometry: geometry,
      symbol: symbol,
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
