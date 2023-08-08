"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/VectorTileLayer",
], function (esriConfig, Map, MapView, TileLayer) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const openStreetMap = new VectorTileLayer({
    portalItem: {
      id: "3e1a00aeae81496587988075fe529f71",
    },
  });

  const map = new Map({
    // basemap: "arcgis-topographic",
    basemap: {
      baseLayers: [openStreetMap],
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [23.013015, 50.611453],
    zoom: 13,
  });
});
