"use strict";

require(["esri/config", "esri/Map", "esri/views/MapView"], function (
  esriConfig,
  Map,
  MapView
) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-topographic",
  });

  const view = new MapView({
    map: map,
    center: [-118.805, 34.027],
    zoom: 13,
    container: "viewDiv",
  });
});
