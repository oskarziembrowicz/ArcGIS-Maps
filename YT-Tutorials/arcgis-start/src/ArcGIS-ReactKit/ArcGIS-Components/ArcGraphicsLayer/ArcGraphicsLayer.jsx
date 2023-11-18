import React, { useContext, useEffect, useState } from "react";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { GraphicsLayerContext } from "../Contexts/GraphicsLayerContext";
import { MapViewContext } from "../Contexts/MapViewContext";

export const ArcGraphicsLayer = ({ children }) => {
  const { view } = useContext(MapViewContext);

  const [graphicsLayer, setGraphicsLayer] = useState();

  useEffect(() => {
    const _graphicsLayer = new GraphicsLayer();
    setGraphicsLayer(_graphicsLayer);

    return () => {
      console.log("ArcGraphicsLayer unmounting");
    };
  }, []);

  useEffect(() => {
    if (!view || !graphicsLayer) return;
    view.map.add(graphicsLayer);
  }, [view, graphicsLayer]);

  return (
    <>
      {graphicsLayer && (
        <GraphicsLayerContext.Provider value={{ graphicsLayer }}>
          {children}
        </GraphicsLayerContext.Provider>
      )}
    </>
  );
};
