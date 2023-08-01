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

  // SQL query array
  const parcelLayerSQL = [
    "Choose a SQL where clause...",
    "UseType = 'Residential'",
    "UseType = 'Government'",
    "UseType = 'Irrigated Farm'",
    "TaxRateArea = 10853",
    "TaxRateArea = 10860",
    "TaxRateArea = 08637",
    "Roll_LandValue > 1000000",
    "Roll_LandValue < 1000000",
  ];
  let whereClause = parcelLayerSQL[0];

  // SQL UI
  const select = document.createElement("select");
  select.setAttribute("class", "esri-widget esri-select");
  select.setAttribute(
    "style",
    "width: 200px; font-family: 'Avenir Next'; font-size: 1em"
  );
  parcelLayerSQL.forEach(function (query) {
    let option = document.createElement("option");
    option.innerHTML = query;
    option.value = query;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right");

  // Listen for changes
  select.addEventListener("change", (event) => {
    whereClause = event.target.value;

    queryFeatureLayer(view.extent);
  });

  const parcelLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
  });

  function queryFeatureLayer(extent) {
    const parcelQuery = {
      where: whereClause,
      spatialProperty: "intersects", // Relationship operation to apply
      geometry: extent, // Restrictet to visible extent of the map
      outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"],
      returnGeometry: true,
    };

    parcelLayer
      .queryFeatures(parcelQuery)
      .then((results) => {
        // console.log("Feature count: " + results.features.length);
        displayResults(results);
      })
      .catch((error) => {
        console.log(error.error);
      });
  }

  function displayResults(results) {
    const symbol = {
      type: "simple-fill",
      color: [20, 130, 200, 0.5],
      outline: {
        color: "white",
        width: 0.5,
      },
    };

    const popupTemplate = {
      title: "Parcel {APN}",
      content:
        "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}",
    };

    // Assing styles and popup to features
    results.features.map((feature) => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });

    // Clear display
    view.closePopup();
    view.graphics.removeAll();
    // Add features
    view.graphics.addMany(results.features);
  }
});
