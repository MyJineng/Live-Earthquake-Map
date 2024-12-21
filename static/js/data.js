// data.js

// Function to update the globe data based on thresholds
export function updateGlobeData(response, Globe, magnitudeThreshold, depthThreshold) {
    const colorInterpolator = (mag) => {
        if (mag < 2.5) return "#00ff2c";
        if (mag < 5.4) return "#0048ff";
        if (mag < 6.0) return "#fec44f";
        if (mag < 6.9) return "#d95f0e";
        if (mag < 7.9) return "#f03b20";
        return "#de2d26";
    };

    const filteredData = response.features.filter((feature) => {
        const mag = feature.properties.mag;
        const depth = feature.geometry.coordinates[2];
        return mag >= magnitudeThreshold && depth <= depthThreshold;
    }).map((feature) => {
        const geometry = feature.geometry.coordinates;
        const lat = geometry[1];
        const lng = geometry[0];
        const mag = feature.properties.mag;
        const depth = geometry[2];

        let maxR;
        if (mag > 5.4 && Math.abs(depth) < 40) {
            maxR = Math.abs(depth);
        } else {
            maxR = Math.abs(depth) / 20;
        }

        return {
            lat: lat,
            lng: lng,
            maxR: maxR,
            propagationSpeed: mag / 2,
            repeatPeriod: Math.random() * 50000 + 2000
        };
    });

    Globe.ringsData(filteredData)
        .ringColor((d) => colorInterpolator(d.propagationSpeed * 2))
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod');
}