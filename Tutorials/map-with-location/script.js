"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Locate",
  "esri/widgets/Track",
  "esri/Graphic",
], function (esriConfig, Map, MapView, Locate, Track, Graphic) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-navigation",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-40, 28],
    zoom: 2,
  });

  //   const locate = new Locate({
  //     view: view,
  //     useHeadingEnabled: false,
  //     goToOverride: function (view, options) {
  //       options.target.scale = 1500;
  //       return view.goTo(options.target);
  //     },
  //   });

  const track = new Track({
    view: view,
    graphic: new Graphic({
      symbol: {
        type: "simple-marker",
        size: "12px",
        color: "green",
        outline: {
          color: "#efefef",
          width: "1.5px",
        },
      },
    }),
    useHeadingEnabled: false,
  });

  //   view.ui.add(locate, "top-left");
  view.ui.add(track, "top-left");
});
