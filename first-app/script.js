"use strict";

require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (esriConfig, WebMap, MapView, FeatureLayer) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new WebMap({
    portalItem: {
      id: "3bf99800f41543a69ef3a062e5eb1581",
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
  });
});
