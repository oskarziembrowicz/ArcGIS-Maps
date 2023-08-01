"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer",
], function (esriConfig, Map, MapView, Basemap, VectorTileLayer, TileLayer) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const vectorTileLayer = new VectorTileLayer({
    portalItem: {
      id: "d2ff12395aeb45998c1b154e25d680e5", // Forest and Parks Canvas
    },
    opacity: 0.75,
  });

  const imageTileLayer = new TileLayer({
    portalItem: {
      id: "1b243539f4514b6ba35e7d995890db1d", // World Hillshade
    },
  });

  const basemap = new Basemap({
    baseLayers: [imageTileLayer, vectorTileLayer],
  });

  const map = new Map({
    basemap: basemap,
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-100, 40],
    zoom: 3,
  });
});
