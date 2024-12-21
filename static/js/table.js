fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let features = data.features;
        let tableBody = document.querySelector("#earthquakeTable tbody");

        function renderTable(data) {
            tableBody.innerHTML = ""; // Clear the existing table
            data.forEach(function(feature) {
                let properties = feature.properties;
                let row = document.createElement("tr");

                let placeCell = document.createElement("td");
                placeCell.textContent = properties.place;
                row.appendChild(placeCell);

                let checkboxCell = document.createElement("td");
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("earthquake-checkbox");
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);

                let magCell = document.createElement("td");
                magCell.textContent = properties.mag != null ? properties.mag.toFixed(2) : "No Data";  // Handle missing mag value
                row.appendChild(magCell);

                let depthCell = document.createElement("td");
                depthCell.textContent = feature.geometry.coordinates[2].toFixed(2);
                row.appendChild(depthCell);

                let timeCell = document.createElement("td");
                timeCell.textContent = new Date(properties.time).toLocaleString();
                row.appendChild(timeCell);

                tableBody.appendChild(row);
            });
        }

        function filterByTimeRange(startTime, endTime) {
            return features.filter(function(feature) {
                let earthquakeTime = new Date(feature.properties.time);
                return earthquakeTime >= startTime && earthquakeTime <= endTime;
            });
        }

        // Render the full table initially
        renderTable(features);

        // Event listeners for predefined time filters
        document.querySelector("#lastHour").addEventListener("click", function() {
            let oneHourAgo = new Date();
            oneHourAgo.setHours(oneHourAgo.getHours() - 1);
            let filteredData = filterByTimeRange(oneHourAgo, new Date());
            renderTable(filteredData);
        });

        document.querySelector("#lastDay").addEventListener("click", function() {
            let oneDayAgo = new Date();
            oneDayAgo.setDate(oneDayAgo.getDate() - 1);
            let filteredData = filterByTimeRange(oneDayAgo, new Date());
            renderTable(filteredData);
        });

        document.querySelector("#lastMonth").addEventListener("click", function() {
            let oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            let filteredData = filterByTimeRange(oneMonthAgo, new Date());
            renderTable(filteredData);
        });

        // Event listener for custom date range
        document.querySelector("#filterCustom").addEventListener("click", function() {
            let fromDate = new Date(document.querySelector("#customDateFrom").value);
            let toDate = new Date(document.querySelector("#customDateTo").value);
            let filteredData = filterByTimeRange(fromDate, toDate);
            renderTable(filteredData);
        });

        // Add event listener to the search bar
        document.querySelector("#searchBar").addEventListener("input", function() {
            let searchTerm = this.value.toLowerCase();
            let filteredFeatures = features.filter(function(feature) {
                let place = feature.properties.place.toLowerCase();
                return place.includes(searchTerm);
            });
            renderTable(filteredFeatures);
        });
    })
    .catch(function(error) {
        console.error("Error fetching earthquake data:", error);
    });