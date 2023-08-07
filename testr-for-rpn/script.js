"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/WMSLayer",
], function (esriConfig, Map, MapView, WMSLayer) {
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

  const layer = new WMSLayer({
    // url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej?language=pol&width=360&height=740&bbox=2557102.2504235837,6552943.544830687,2557209.739994624,6553164.495615605&srs=EPSG:3857&format=image/png&request=GetMap&service=WMS&styles=&transparent=TRUE&version=1.1.0&layers=prg-adresy,prg-ulice,prg-place",
    url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej?language=pol&width=360&height=740&bbox=133230,171678,774929,861895&srs=EPSG:3857&format=image/png&request=GetMap&service=WMS&styles=&transparent=TRUE&version=1.3.0&layers=prg-adresy,prg-ulice,prg-place",
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

  const map = new Map({
    basemap: {
      baseLayers: [layer],
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    spatialReference: {
      wkid: 3857,
    },
  });
});
