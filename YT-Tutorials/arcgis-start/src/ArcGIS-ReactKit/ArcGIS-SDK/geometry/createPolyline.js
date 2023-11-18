import Polyline from "@arcgis/core/geometry/Polyline";

export const createPolyline = (polylineProperties) =>
  new Polyline(polylineProperties);
