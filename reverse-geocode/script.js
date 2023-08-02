"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/rest/locator",
], function (esriConfig, Map, MapView, locator) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-navigation",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    center: [-78.50169, -0.21489],
    zoom: 12,
  });

  // Geaocoding service
  const serviceUrl =
    "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  view.on("click", function (event) {
    const params = {
      location: event.mapPoint,
    };

    locator.locationToAddress(serviceUrl, params).then(
      function (response) {
        // Show the address found
        const address = response.address;
        showAddress(address, params.location);
      },
      function (err) {
        // Show no address found
        showAddress("No address found.", params.location);
      }
    );
  });

  function showAddress(address, point) {
    view.openPopup({
      title:
        +Math.round(point.longitude * 1000000) / 1000000 +
        ", " +
        Math.round(point.latitude * 1000000) / 1000000,
      content: address,
      location: point,
    });
  }
});
