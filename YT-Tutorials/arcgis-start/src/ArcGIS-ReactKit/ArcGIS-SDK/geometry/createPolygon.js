import Polygon from "@arcgis/core/geometry/Polygon";

export const createPolygon = (polygonProperties) =>
  new Polygon(polygonProperties);
