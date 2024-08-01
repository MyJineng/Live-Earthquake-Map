function createMap(earthquakes) {

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  let baseMaps = {
    "Topographic Map": topo
  };

  let overlayMaps = {
    Earthquakes: earthquakes
  };

  let myMap = L.map("map", {
    center: [34.0549, -118.2426],
    zoom: 5,
    layers: [topo, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

function markerSize(mag) {
  if (mag < 0.00) {
    return 0;
  }
  return Math.sqrt(mag) * 100;
}

function createMarkers(response) {
  let QuakeMarkers = [];

  for (let i = 0; i < response.features.length; i++) {
    let feature = response.features[i];
    let properties = feature.properties;
    let depth = feature.geometry.coordinates[2];

    let markerColor;
    if (depth < 11) {
         markerColor = "#2ca25f";
    } else if (depth < 31) {
        markerColor = "#addd8e";
    } else if (depth < 51) {
        markerColor = "#fec44f";
    } else if (depth < 71) {
        markerColor = "#d95f0e";
    } else if (depth < 71) {
        markerColor = "#f03b20";
    } else {
        markerColor = "#de2d26";
    }

    let QuakeMarker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: markerColor,
        radius: markerSize(properties.mag) * 500
    }).bindPopup("<h3>" + properties.place + "</h3><h3>Magnitude: " + properties.mag + "</h3><h3>Depth: " + depth + "</h3>");
      QuakeMarkers.push(QuakeMarker);
  }
  createMap(L.layerGroup(QuakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);