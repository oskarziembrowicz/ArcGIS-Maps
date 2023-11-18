import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

export const createMapView = (container, mapProperties) => {
  const map = new Map({ basemap: "osm", ...mapProperties });

  return new MapView({
    map: map,
    container: container,
    center: [55, 25],
    zoom: 13,
  });
};
