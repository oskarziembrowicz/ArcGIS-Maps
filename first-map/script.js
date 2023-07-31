"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  // For graphics:
  //   "esri/Graphic",
  //   "esri/layers/GraphicsLayer",
  "esri/widgets/Locate",
], function (esriConfig, Map, MapView, /*Graphic, GraphicsLayer,*/ Locate) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    // For a regular map:
    // basemap: "arcgis-topographic",

    // For navigation:
    basemap: "arcgis-navigation",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    // center: [-118.805, 34.027],
    // zoom: 13,

    //World:
    center: [-40, 28],
    zoom: 2,
  });

  /*

  // ADDING POINT, LINE ANG POLYGON

    const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  const point = {
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889,
  };
  const simpleMarkerSimbol = {
    type: "simple-marker",
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  };

  const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSimbol,
  });
  graphicsLayer.add(pointGraphic);

  const polyline = {
    type: "polyline",
    paths: [
      [-118.821527826096, 34.0139576938577], //Longitude, latitude
      [-118.814893761649, 34.0080602407843], //Longitude, latitude
      [-118.808878330345, 34.0016642996246], //Longitude, latitude
    ],
  };

  const simpleLineSymbol = {
    type: "simple-line",
    color: [226, 119, 40],
    width: 2,
  };

  const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol,
  });
  graphicsLayer.add(polylineGraphic);

  const polygon = {
    type: "polygon",
    rings: [
      [-118.818984489994, 34.0137559967283], //Longitude, latitude
      [-118.806796597377, 34.0215816298725], //Longitude, latitude
      [-118.791432890735, 34.0163883241613], //Longitude, latitude
      [-118.79596686535, 34.008564864635], //Longitude, latitude
      [-118.808558110679, 34.0035027131376], //Longitude, latitude
    ],
  };

  const simpleFillSymbol = {
    type: "simple-fill",
    color: [227, 139, 79, 0.8],
    outline: {
      color: [255, 255, 255],
      width: 2,
    },
  };

  const popupTemplate = {
    title: "{Name}",
    content: "{Description}",
  };

  const attributes = {
    Name: "Graphic",
    Description: "I am a polygon",
  };

  const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,

    attributes: attributes,
    popupTemplate: popupTemplate,
  });
  graphicsLayer.add(polygonGraphic);
  */

  // DISPLAY YOUR LOCATION

  const locate = new Locate({
    view: view,
    useHeadingEnabled: false,
    goToOverride: function (view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    },
  });

  view.ui.add(locate, "top-left");
});
