import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

export const createSimpleMarkerSymbol = (simpleMarkerSymbolProperties) =>
  new SimpleMarkerSymbol(simpleMarkerSymbolProperties);
