"use strict";

require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (esriConfig, WebMap, MapView, FeatureLayer) {
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
    popupTemplate: {
      title: "{name}",
      content:
        "<b>Typ:</b> {tourism} <br><b>Miejscowość:</b> {addr_city} <br><b>Adres:</b> {addr_street} {addr_housenumber} <br><b>Kod pocztowy:</b> {addr_postcode} <br><b>Strona internetowa:</b> {website}",
    },
  });

  map.add(touristInformationLayer);

  // We will see how it works
  const streetsLayer = new FeatureLayer({
    url: "https://mapy.geoportal.gov.pl/wss/ext/KrajowaIntegracjaNumeracjiAdresowej",
  });

  map.add(streetsLayer);

  // Start from no visibility
  // touristInformationLayer.visible = false;
});
