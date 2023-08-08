"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
], function (esriConfig, Map, MapView, SceneView) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-topographic",
  });

  const viewOptions = {
    map: map,
    center: [23.013015, 50.611453],
    zoom: 13,
  };

  const view2d = new MapView(viewOptions);
  view2d.container = "viewDiv2d";

  const view3d = new SceneView(viewOptions);
  view3d.container = "viewDiv3d";

  const views = [view2d, view3d];
  let active; // Currently 'active' view

  function sync(source) {
    if (!active || !active.viewpoint || active !== source) {
      return;
    }

    for (const view of views) {
      if (view !== active) {
        view.viewpoint = active.viewpoint;
      }
    }
  }

  for (const view of views) {
    view.watch(["intereacting", "animation"], () => {
      active = view;
      sync(active);
    });

    view.watch("viewpoint", () => sync(view));
  }
});
