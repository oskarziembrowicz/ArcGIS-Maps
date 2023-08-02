"use strict";

require([
  "esri/config",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Legend",
], function (esriConfig, WebScene, SceneView, Legend) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const webscene = new WebScene({
    portalItem: {
      id: "579f97b2f3b94d4a8e48a5f140a6639b",
    },
  });

  const view = new SceneView({
    container: "viewDiv",
    map: webscene,
  });

  const legend = new Legend({
    view: view,
  });

  view.ui.add(legend, "top-right");
});
