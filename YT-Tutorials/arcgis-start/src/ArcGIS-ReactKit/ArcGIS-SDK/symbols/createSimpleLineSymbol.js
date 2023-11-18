import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

export const createSimpleLineSymbol = (simpleLineSymbolProperties) =>
  new SimpleLineSymbol(simpleLineSymbolProperties);
