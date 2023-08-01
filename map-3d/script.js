"use strict";

require(["esri/config", "esri/Map", "esri/views/SceneView"], function (
  esriConfig,
  Map,
  SceneView
) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-topographic",
    ground: "world-elevation",
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: { x: -118.808, y: 33.961, z: 2000 },
      tilt: 75,
    },
  });
});
