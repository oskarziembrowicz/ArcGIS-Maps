"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/VectorTileLayer",
], function (esriConfig, Map, MapView, VectorTileLayer) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const vectorTileLayer = new VectorTileLayer({
    url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/",
  });

  const map = new Map({
    // basemap: "arcgis-topographic",
    basemap: "arcgis-light-gray",
    layers: [vectorTileLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    center: [-118.805, 34.027],
    zoom: 13,
  });
});
