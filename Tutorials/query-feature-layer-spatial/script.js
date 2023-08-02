"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
], function (esriConfig, Map, MapView, Sketch, GraphicsLayer, FeatureLayer) {
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

  const graphicsLayerSketch = new GraphicsLayer();
  map.add(graphicsLayerSketch);

  const sketch = new Sketch({
    layer: graphicsLayerSketch,
    view: view,
    creationMode: "update", // Auto-select
  });

  view.ui.add(sketch, "top-right");

  // Sketch event listener
  sketch.on("update", function (event) {
    // Create
    if (event.state === "start") {
      queryFeatureLayer(event.graphics[0].geometry);
    }
    if (event.state === "complete") {
      graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphics if clicked outside or new one is scetched
    }
    // Change
    if (
      event.toolEventInfo &&
      (event.toolEventInfo.type === "scale-stop" ||
        event.toolEventInfo.type === "reshape-stop" ||
        event.toolEventInfo.type === "move-stop")
    ) {
      queryFeatureLayer(event.graphics[0].geometry);
    }
  });

  // Reference query layer
  const parcelLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
  });

  function queryFeatureLayer(geometry) {
    const parcelQuery = {
      spatialRelationship: "intersects",
      geometry: geometry, // sketch feature geometry
      outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"],
      returnGeometry: true,
    };

    parcelLayer
      .queryFeatures(parcelQuery)
      .then(function (results) {
        // console.log("Feature count " + results.features.length);
        displayResults(results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Show features (graphics)
  function displayResults(results) {
    const symbol = {
      type: "simple-fill",
      color: [20, 130, 200, 0.5],
      outline: {
        color: "white",
        width: 1,
      },
    };

    const popupTemplate = {
      title: "Parcel {APN}",
      content:
        "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}",
    };

    // Set symbol and popup
    results.features.map((feature) => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });

    // Clear display
    view.closePopup();
    view.graphics.removeAll();
    // Add features to graphics layer
    view.graphics.addMany(results.features);
  }
});
