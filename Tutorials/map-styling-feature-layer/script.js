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

  const trailheadsRenderer = {
    type: "simple",
    symbol: {
      type: "picture-marker",
      url: "https://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
      width: "20px",
      height: "20px",
    },
  };

  const trailheadsLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#5E8D74",
      haloSize: "2px",
      font: {
        size: "12px",
        family: "Noto Sans",
        style: "italic",
        wight: "normal",
      },
    },

    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: "$feature.TRL_NAME",
    },
  };

  const trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    renderer: trailheadsRenderer,
    labelingInfo: [trailheadsLabels],
  });

  map.add(trailheads);

  const trailsRenderer = {
    type: "simple",
    symbol: {
      color: "#BA55D3",
      type: "simple-line",
      style: "solid",
    },

    // The line will be thicker the bigger is the elevation gain on the trail
    visualVariables: [
      {
        type: "size",
        field: "ELEV_GAIN",
        minDataValue: 0,
        maxDataValue: 2300,
        minSize: "3px",
        maxSize: "7px",
      },
    ],
  };

  const trails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    renderer: trailsRenderer,
    opacity: 0.75,
  });

  map.add(trails, 0);

  const bikeTrailsRenderer = {
    type: "simple",
    symbol: {
      type: "simple-line",
      style: "short-dot",
      color: "#0000FF",
      width: "2px",
    },
  };

  // This will be applyed only for bike trails
  const bikeTrails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    renderer: bikeTrailsRenderer,
    definitionExpression: "USE_BIKE = 'YES'", // SQL where clause
  });

  map.add(bikeTrails, 1);

  // This will fill every open space in the same way but with a unique colour
  function createFillSymbol(value, color) {
    return {
      value: value,
      symbol: {
        color: color,
        type: "simple-fill",
        style: "solid",
        outline: {
          style: "none",
        },
      },
      label: value,
    };
  }

  const openSpacesRenderer = {
    type: "unique-value",
    field: "TYPE",
    uniqueValueInfos: [
      createFillSymbol("Natural Areas", "#9E559C"),
      createFillSymbol("Regional Open Space", "#A7C636"),
      createFillSymbol("Local Park", "#149ECE"),
      createFillSymbol("Regional Recreation Park", "#ED5151"),
    ],
  };

  const openSpaces = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
    renderer: openSpacesRenderer,
    opacity: 0.4,
  });

  map.add(openSpaces, 0);
});
