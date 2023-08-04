"use strict";

require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/WMSLayer",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/widgets/Expand",
], function (
  esriConfig,
  WebMap,
  MapView,
  FeatureLayer,
  WMSLayer,
  LayerList,
  Search,
  Expand
) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new WebMap({
    portalItem: {
      id: "3bf99800f41543a69ef3a062e5eb1581",
    },
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
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

  map.add(touristInformationLayer);

  const wmsLayer = new WMSLayer({
    // url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej",
    url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej?language=pol&width=360&height=740&bbox=2557102.2504235837%2C6552943.544830687%2C2557209.739994624%2C6553164.495615605&crs=EPSG%3857&format=image%2Fpng&request=GetMap&service=WMS&styles=&transparent=TRUE&version=1.1.0&layers=prg-adresy%2Cprg-ulice%2Cprg-place",
  });

  map.add(wmsLayer);

  const layerList = new LayerList({
    view: view,
  });

  // view.ui.add(layerList, "bottom-right");

  const expandLayerList = new Expand({
    view: view,
    expandIcon: "layers",
    content: layerList,
  });

  view.ui.add(expandLayerList, "bottom-right");

  const search = new Search({
    view: view,
  });
  // view.ui.add(search, "top-right");

  const expandSearch = new Expand({
    view: view,
    expandIcon: "search",
    content: search,
  });

  view.ui.add(expandSearch, "top-right");
});
