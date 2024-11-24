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