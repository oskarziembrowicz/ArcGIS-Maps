import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

export const createSimpleFillSymbol = (simpleFillSymbolProperties) =>
  new SimpleFillSymbol(simpleFillSymbolProperties);
