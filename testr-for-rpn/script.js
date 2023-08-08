"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/WMSLayer",
  "esri/layers/WMTSLayer",
  "esri/widgets/LayerList",
], function (esriConfig, Map, MapView, WMSLayer, WMTSLayer, LayerList) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const testLayer = new WMSLayer({
    url: "https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/StandardResolution",
    sublayers: [
      {
        name: "Raster",
      },
    ],
  });

  // const layer = new WMSLayer({
  //   // url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej?language=pol&width=360&height=740&bbox=2557102.2504235837,6552943.544830687,2557209.739994624,6553164.495615605&srs=EPSG:3857&format=image/png&request=GetMap&service=WMS&styles=&transparent=TRUE&version=1.1.0&layers=prg-adresy,prg-ulice,prg-place",
  //   url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej?language=pol&width=360&height=740&bbox=133230,171678,774929,861895&srs=EPSG:3857&format=image/png&request=GetMap&service=WMS&styles=&transparent=TRUE&version=1.3.0&layers=prg-adresy,prg-ulice,prg-place",
  //   sublayers: [
  //     {
  //       name: "prg-adresy",
  //     },
  //     {
  //       name: "prg-ulice",
  //     },
  //     {
  //       name: "prg-place",
  //     },
  //   ],
  // });

  const streetsLayer = new WMSLayer({
    url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej",
    sublayers: [
      {
        name: "prg-adresy",
      },
      {
        name: "prg-ulice",
      },
      {
        name: "prg-place",
      },
    ],
  });

  const terrainModelLayer = new WMSLayer({
    url: "https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/ShadedRelief",
    opacity: 0.5,
    sublayers: [
      {
        name: "Raster",
      },
    ],
  });

  const boundariesLayer = new WMSLayer({
    url: "https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow",
    sublayers: [
      {
        name: "dzialki",
      },
    ],
  });

  const topographicLayer = new WMTSLayer({
    url: "https://mapy.geoportal.gov.pl/wss/service/WMTS/guest/wmts/G2_MOBILE_500",
    activeLayer: {
      id: "G2_MOBILE_500",
      tileMatrixSetId: "EPSG:2180",
    },
    seviceMode: "KVP",
  });

  const map = new Map({
    // basemap: {
    //   baseLayers: [topographicLayer],
    // },
    basemap: "arcgis-light-gray",
    // layers: [/*terrainModelLayer*/ streetsLayer, boundariesLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [23.013015, 50.611453],
    zoom: 13,
    // scale: 250000,
    // spatialReference: {
    //   // wkid: 2180,
    //   wkid: 3857,
    // },
  });

  const layerList = new LayerList({
    view: view,
  });

  view.ui.add(layerList, "bottom-right");
});
