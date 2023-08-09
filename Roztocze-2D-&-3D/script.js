"use strict";

require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/layers/BaseElevationLayer",
  "esri/layers/ElevationLayer",
  "esri/widgets/Search",
  "esri/widgets/Locate",
  "esri/widgets/ScaleBar",
  "esri/widgets/Home",
  "esri/widgets/Daylight",
  "esri/widgets/Expand",
], function (
  esriConfig,
  Map,
  MapView,
  SceneView,
  FeatureLayer,
  VectorTileLayer,
  BaseElevationLayer,
  ElevationLayer,
  Search,
  Locate,
  ScaleBar,
  Home,
  Daylight,
  Expand
) {
  esriConfig.apiKey =
    "AAPK1048c04e0d1a4046b15f7383bf8d72e555Dqjx7S4pgbyhPx5Tug3bRK3MwLF4eHcK3Y3n1c9uao-mV4gfHuKQtSKLXMuOVn";

  const atractionsLayer = new FeatureLayer({
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

  const openStreetMap = new VectorTileLayer({
    portalItem: {
      // id: "3e1a00aeae81496587988075fe529f71",
      id: "8f9cb35cec274e25b4c5d6add631f1f0",
      // id: "fd3e3d0f97204bd8a4c2167ab2f669f0",
    },
  });

  const elevationLayer = new ElevationLayer({
    url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
  });

  const ExageratedElevationLayer = BaseElevationLayer.createSubclass({
    load: function () {
      this._elevation = elevationLayer;
      this.addResolvingPromise(this._elevation.load());
      this.exaggeration = 1.5;
    },
    fetchTile: function (level, row, col, options) {
      return this._elevation.fetchTile(level, row, col, options).then(
        function (data) {
          let exaggeration = this.exaggeration;
          for (let i = 0; i < data.values.length; i++) {
            if (data.values[i] !== data.noDataValue) {
              data.values[i] *= exaggeration;
            }
          }
          return data;
        }.bind(this)
      );
    },
  });

  const map = new Map({
    basemap: {
      baseLayers: [openStreetMap],
    },
    // ground: "world-elevation",
    ground: {
      // layers: [elevationLayer],
      layers: [new ExageratedElevationLayer()],
    },
    layers: [atractionsLayer],
  });

  const viewOptions = {
    map: map,
    center: [23.013015, 50.611453],
    zoom: 12,
  };

  const view2d = new MapView(viewOptions);
  view2d.container = "viewDiv2d";

  const view3d = new SceneView(viewOptions);
  view3d.container = "viewDiv3d";
  view3d.camera = {
    position: {
      longitude: viewOptions.center[0],
      latitude: viewOptions.center[1],
      z: 2000,
    },
    tilt: 75,
  };

  // Widgets:

  const search = new Search({
    view: view2d,
  });
  const expandSearch = new Expand({
    view: view2d,
    content: search,
    expandIcon: "search",
  });
  view2d.ui.add(expandSearch, "top-right");

  const locate = new Locate({
    view: view2d,
  });
  view2d.ui.add(locate, "bottom-right");

  const scaleBar = new ScaleBar({
    view: view2d,
  });
  view2d.ui.add(scaleBar, "bottom-left");

  const home = new Home({
    view: view2d,
  });
  view2d.ui.add(home, "top-left");

  // Synchronize views:

  const views = [view2d, view3d];
  let active; // Currently 'active' view

  function sync(source) {
    if (!active || !active.viewpoint || active !== source) {
      return;
    }

    for (const view of views) {
      if (view !== active) {
        view.viewpoint = active.viewpoint;
      }
    }
  }

  for (const view of views) {
    view.watch(["intereacting", "animation"], () => {
      active = view;
      sync(active);
    });

    view.watch("viewpoint", () => sync(view));
  }
});
