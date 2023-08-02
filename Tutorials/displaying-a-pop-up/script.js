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

  // Trailheads pop-ups
  const popupTrailheads = {
    title: "Trailhead",
    content:
      "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} m",
  };

  const trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
    popupTemplate: popupTrailheads,
  });

  map.add(trailheads);

  // Trails pop-ups
  const popupTrails = {
    title: "Trail Information",
    content: [
      {
        type: "media",
        mediaInfos: [
          {
            type: "column-chart",
            caption: "",
            value: {
              fields: ["ELEV_MIN", "ELEV_MAX"],
              normalizeField: null,
              tooltipField: "Min and max elevation values",
            },
          },
        ],
      },
    ],
  };

  const trails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    outFields: ["TRL_NAME, ELEV_GAIN"],
    popupTemplate: popupTrails,
  });

  map.add(trails);

  // Open Spces pop-ups
  const popupOpenSpaces = {
    title: "{PARK_NAME}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "AGNCY_NAME",
            label: "Agency",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "TYPE",
            label: "Type",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "ACCESS_TYP",
            label: "Access",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box",
          },
          {
            fieldName: "GIS_ACRES",
            label: "Acres",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: {
              places: 2,
              digitSeparator: true,
            },
            stringFieldOption: "text-box",
          },
        ],
      },
    ],
  };

  const openSpaces = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
    outFields: [
      "TYPE",
      "PARK_NAME",
      "AGNCY_NAME",
      "ACCESS_TYP",
      "GIS_ACRES",
      "TRLS_MI",
      "TOTAL_GOOD",
      "TOTAL_FAIR",
      "TOTAL_POOR",
    ],
    popupTemplate: popupOpenSpaces,
  });

  map.add(openSpaces);
});
