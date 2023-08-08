"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/WMSLayer",
  "esri/layers/WMTSLayer",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/widgets/Expand",
], function (
  esriConfig,
  Map,
  WebMap,
  MapView,
  FeatureLayer,
  WMSLayer,
  WMTSLayer,
  LayerList,
  Search,
  Expand
) {
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

  const terrainModelLayer = new WMSLayer({
    url: "https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/ShadedRelief",
    opacity: 0.3,
    sublayers: [
      {
        name: "Raster",
      },
    ],
  });

  const parcelsLayer = new WMSLayer({
    url: "https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow",
    sublayers: [
      {
        name: "dzialki",
      },
    ],
  });

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

  const touristInformationLayer = new FeatureLayer({
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

  const topographicLayer = new WMTSLayer({
    url: "https://mapy.geoportal.gov.pl/wss/service/WMTS/guest/wmts/G2_MOBILE_500",
    activeLayer: {
      id: "G2_MOBILE_500",
    },
  });

  // const map = new WebMap({
  //   portalItem: {
  //     id: "3bf99800f41543a69ef3a062e5eb1581",
  //   },
  //   // basemap: {
  //   //   baselayers: [testLayer],
  //   // },
  //   layers: [
  //     /* testLayer, */
  //     terrainModelLayer,
  //     streetsLayer,
  //     boundariesLayer,
  //     touristInformationLayer,
  //   ],
  // });

  const map = new Map({
    basemap: {
      baseLayers: [topographicLayer],
    },
    layers: [
      /* testLayer, */
      terrainModelLayer,
      streetsLayer,
      parcelsLayer,
      touristInformationLayer,
    ],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [23.013015, 50.611453],
    scale: 60000,
    spatialReference: {
      wkid: 2180,
    },
  });

  const layerList = new LayerList({
    view: view,
  });

  const expandLayerList = new Expand({
    view: view,
    expandIcon: "layers",
    content: layerList,
  });

  view.ui.add(expandLayerList, "bottom-right");

  const search = new Search({
    view: view,
  });

  const expandSearch = new Expand({
    view: view,
    expandIcon: "search",
    content: search,
  });

  view.ui.add(expandSearch, "top-right");
});
