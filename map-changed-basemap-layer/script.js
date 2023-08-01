"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/BasemapToggle",
  "esri/widgets/BasemapGallery",
], function (esriConfig, Map, MapView, BasemapToggle, BasemapGallery) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-topographic",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    center: [-118.805, 34.027],
    zoom: 13,
  });

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "arcgis-imagery",
  });

  view.ui.add(basemapToggle, "bottom-right");

  const basemapGallery = new BasemapGallery({
    view: view,

    // Not needed in new releases:
    // source: {
    //   query: {
    //     title: '"World Basemaps for Developers" AND owner:esri',
    //   },
    // },
  });

  view.ui.add(basemapGallery, "top-right");
});
