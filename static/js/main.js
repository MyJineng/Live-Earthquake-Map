// main.js
import { initializeGlobe, recenterCamera, handleTectonicPlatesCheckbox } from './globe.js';
import { setupSliders, setupFilterButton } from './ui.js';
import { updateGlobeData } from './data.js';

// Fetch the earthquake data and initialize the globe
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
  .then((response) => {
    const { Globe, scene, camera, renderer, controls } = initializeGlobe();
    recenterCamera(camera);
    handleTectonicPlatesCheckbox(Globe);

    const mag_slider = document.getElementById('mag_slider');
    const mag_slider_value = document.getElementById('mag_slider-value');
    const depth_slider = document.getElementById('depth_slider');
    const depth_slider_value = document.getElementById('depth_slider-value');
    const filterButton = document.getElementById('filter_button');

    setupSliders(mag_slider, mag_slider_value, depth_slider, depth_slider_value, updateGlobeData, response, Globe);
    setupFilterButton(filterButton, mag_slider, depth_slider, updateGlobeData, response, Globe);

    const initialThreshold = parseFloat(mag_slider.value);
    const initial_depth_threshold = parseFloat(depth_slider.value);
    updateGlobeData(response, Globe, initialThreshold, initial_depth_threshold);
  });