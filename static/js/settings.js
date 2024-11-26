 // Get elements
        const settingsBtn = document.getElementById('settings-btn');
        const settingsOverlay = document.getElementById('settings-overlay');
        const closeBtn = document.getElementById('close-btn');

        // Toggle the overlay visibility when settings button is clicked
        settingsBtn.addEventListener('click', () => {
            settingsOverlay.style.display = 'flex';
        });

        // Close the overlay when the close button is clicked
        closeBtn.addEventListener('click', () => {
            settingsOverlay.style.display = 'none';
        });

        // Close the overlay if the user clicks outside of the settings panel
        window.addEventListener('click', (event) => {
            if (event.target === settingsOverlay) {
                settingsOverlay.style.display = 'none';
            }
        });

    // Get the checkboxes and sliders
    const setting1 = document.getElementById('setting1');
    const setting2 = document.getElementById('setting2');
    const setting3 = document.getElementById('setting3');
    const magSliderContainer = document.getElementById('mag_slider-container');
    const depthSliderContainer = document.getElementById('depth_slider-container');
    const audioplayer = document.querySelector('.audio-player');

    // Function to update the visibility of sliders based on settings
    function updateSliderVisibility() {
        if (setting1.checked) {
            magSliderContainer.style.display = 'block'; // Show the magnitude slider
        } else {
            magSliderContainer.style.display = 'none'; // Hide the magnitude slider
        }

        if (setting2.checked) {
            depthSliderContainer.style.display = 'block'; // Show the depth slider
        } else {
            depthSliderContainer.style.display = 'none'; // Hide the depth slider
        }

        if (setting3.checked) {
            audioplayer.style.display = 'block'; // Show the audio player
        } else {
            audioplayer.style.display = 'none'; // Hide the audio player
        }

        if (setting4.checked) {
            plates.style.display = 'block'; // Show the audio player
        } else {
            plates.style.display = 'none'; // Hide the audio player
        }

        if (setting5.checked) {
            quake_labels.style.display = 'block'; // Show the audio player
        } else {
            quake_labels.style.display = 'none'; // Hide the audio player
        }
    }

    // Add event listeners to update visibility when settings are changed
    setting1.addEventListener('change', updateSliderVisibility);
    setting2.addEventListener('change', updateSliderVisibility);
    setting3.addEventListener('change', updateSliderVisibility);
    setting4.addEventListener('change'), updateSliderVisibility;
    setting5.addEventListener('change'), updateSliderVisibility;
    // Initialize the checkboxes to be checked and update visibility accordingly
    document.getElementById('setting1').checked = true;
    document.getElementById('setting2').checked = true;
    document.getElementById('setting3').checked = true;
    document.getElementById('setting4').checked = true;
    document.getElementById('setting5').checked = true;
    // Initialize visibility on page load
    updateSliderVisibility();

// Function to calculate the average, min, and max depth values
function calculateDepthStats(features) {
    let depths = [];

    // Iterate through each feature and extract the depth value (geometry[2])
    features.forEach(feature => {
        let depth = feature.geometry.coordinates[2]; // Extract depth
        depths.push(depth); // Push the depth to the depths array
    });

    // Calculate the average depth
    const averageDepth = depths.reduce((acc, val) => acc + val, 0) / depths.length;

    // Find the minimum and maximum depth
    const minDepth = Math.min(...depths);
    const maxDepth = Math.max(...depths);

    // Log the results
    console.log(`Average Depth: ${averageDepth}`);
    console.log(`Min Depth: ${minDepth}`);
    console.log(`Max Depth: ${maxDepth}`);
}

// Example usage: Assuming you've fetched the GeoJSON data from USGS
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(data => {
    // Call the function with the features array from the GeoJSON data
    calculateDepthStats(data.features);
});