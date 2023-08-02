"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
], function (esriConfig, Map, MapView, Search) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-navigation",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    center: [-122.3321, 47.6062],
    zoom: 12,
  });

  const search = new Search({
    view: view,
  });

  view.ui.add(search, "top-right");
});
