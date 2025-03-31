// ui.js

// Function to setup the sliders and their event listeners
export function setupSliders(mag_slider, mag_slider_value, depth_slider, depth_slider_value, updateGlobeData, response, Globe) {
    depth_slider.addEventListener('input', function () {
        const depthThreshold = parseFloat(depth_slider.value);
        depth_slider_value.textContent = `Depth: ${depthThreshold} Km`;
        const magnitudeThreshold = parseFloat(mag_slider.value);
        updateGlobeData(response, Globe, magnitudeThreshold, depthThreshold);
    });

    mag_slider.addEventListener('input', function () {
        const magnitudeThreshold = parseFloat(mag_slider.value);
        mag_slider_value.textContent = `Magnitude: ${magnitudeThreshold}`;
        const depthThreshold = parseFloat(depth_slider.value);
        updateGlobeData(response, Globe, magnitudeThreshold, depthThreshold);
    });
}

// Function to set up the filter button and its functionality
export function setupFilterButton(filterButton, mag_slider, depth_slider, updateGlobeData, response, Globe) {
    filterButton.addEventListener('click', function () {
        const magnitudeThreshold = parseFloat(mag_slider.value);
        const depthThreshold = parseFloat(depth_slider.value);
        updateGlobeData(response, Globe, magnitudeThreshold, depthThreshold);
    });
}