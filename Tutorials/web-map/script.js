"use strict";

require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/ScaleBar",
  "esri/widgets/Legend",
], function (esriConfig, WebMap, MapView, ScaleBar, Legend) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const webmap = new WebMap({
    portalItem: {
      // id: "41281c51f9de45edaf1c8ed44bb10e30",
      id: "6f2372999f444c7b85bfffd50f242d07",
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap,
  });

  const scalebar = new ScaleBar({
    view: view,
  });

  view.ui.add(scalebar, "bottom-left");

  const legend = new Legend({
    view: view,
  });

  view.ui.add(legend, "top-right");
});
