"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/layers/TileLayer",
], function (esriConfig, Map, MapView, SceneView, FeatureLayer, TileLayer) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const atractionsLayer = new FeatureLayer({
    portalItem: {
      id: "f3dcc26dd868456da288baca83b8a2cd",
    },
    title: "Atrakcje turystyczne",
    popupTemplate: {
      title: "{name}",
      content:
        "<b>Typ:</b> {tourism} <br><b>Miejscowość:</b> {addr_city} <br><b>Adres:</b> {addr_street} {addr_housenumber} <br><b>Kod pocztowy:</b> {addr_postcode} <br><b>Strona internetowa:</b> {website}",
    },
  });

  const openStreetMap = new TileLayer({
    portalItem: {
      id: "3e1a00aeae81496587988075fe529f71",
    },
  });

  const map = new Map({
    // basemap: {
    //   baseLayers: [openStreetMap],
    // },
    basemap: "arcgis-topographic",
    layers: [atractionsLayer],
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
