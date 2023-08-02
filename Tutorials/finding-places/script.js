"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/rest/locator",
  "esri/Graphic",
], function (esriConfig, Map, MapView, locator, Graphic) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const map = new Map({
    basemap: "arcgis-navigation",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    // Santa Monica Mountains in California:
    center: [18.9553, 69.6492],
    zoom: 13,
  });

  const typesOfPlaces = [
    "Choose a place type...",
    "Parks and Outdoors",
    "Coffe shop",
    "Gas station",
    "Food",
    "Hotel",
  ];

  const select = document.createElement("select");
  select.setAttribute("class", "esri-widget esri-select");
  select.setAttribute(
    "style",
    "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em"
  );

  typesOfPlaces.forEach((placeType) => {
    const option = document.createElement("option");
    option.value = placeType;
    option.innerHTML = placeType;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right");

  const locatorUrl =
    "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  function findPlaces(category, point) {
    locator
      .addressToLocations(locatorUrl, {
        location: point,
        categories: [category],
        maxLocations: 25,
        outFields: ["Place-addr", "PlaceName"],
      })
      .then((results) => {
        view.closePopup();
        view.graphics.removeAll();

        results.forEach((result) => {
          view.graphics.add(
            new Graphic({
              attributes: result.attributes,
              geometry: result.location,
              symbol: {
                type: "simple-marker",
                color: "#FF0000",
                size: "12px",
                outline: {
                  color: "#000000",
                  width: "2px",
                },
              },

              popupTemplate: {
                title: "{PlaceName}",
                content: "{PlaceAddr}",
              },
            })
          );
        });
      });
  }

  // Search for places in center of the map
  view.watch("stationary", (value) => {
    if (value) {
      findPlaces(select.value, view.center);
    }
  });

  // Listen for category changes
  select.addEventListener("change", (event) => {
    findPlaces(event.target.value, view.center);
  });
});
