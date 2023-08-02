"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (esriConfig, Map, MapView, FeatureLayer) {
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

  // UI with expressions
  const sqlExpressions = [
    "Choose a SQL where clause...",
    "Roll_LandValue < 2000000",
    "TaxRateArea = 10853",
    "Bedrooms5 > 0",
    "UseType = 'Residential'",
    "Roll_RealEstateExemp > 0",
  ];

  const selectFilter = document.createElement("select");
  selectFilter.setAttribute("class", "esri-widget esri-select");
  selectFilter.setAttribute(
    "style",
    "width: 275px; font-family: Avenit Next W00; font-size: 1em;"
  );

  sqlExpressions.forEach((sql) => {
    let option = document.createElement("option");
    option.value = sql;
    option.innerHTML = sql;
    selectFilter.appendChild(option);
  });

  view.ui.add(selectFilter, "top-right");

  const parcelsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: {
      title: "{UseType}",
      content: "Description: {UseDescription}. Land value: {Roll_LandValue}",
    },
    definitionExpression: "1=0", // So that nothing will be displayed at the start
  });

  map.add(parcelsLayer);

  function setFeatureLayerFilter(expression) {
    parcelsLayer.definitionExpression = expression;
  }

  selectFilter.addEventListener("change", (event) => {
    setFeatureLayerFilter(event.target.value);
  });
});
