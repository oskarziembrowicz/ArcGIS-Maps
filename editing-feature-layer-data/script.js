"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Editor",
], function (esriConfig, Map, MapView, FeatureLayer, Editor) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const myPointsLayer = new FeatureLayer({
    url: "https://services7.arcgis.com/osCjE10FtDEkAsa0/arcgis/rest/services/my_points/FeatureServer/0",
  });

  const map = new Map({
    basemap: "arcgis-topographic",
    // layers: [myPointsLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    center: [-118.805, 34.027],
    zoom: 13,
  });

  map.add(myPointsLayer);

  const editor = new Editor({
    view: view,
  });

  view.ui.add(editor, "top-right");
});
