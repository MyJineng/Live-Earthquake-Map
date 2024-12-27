![{8D8E7789-CEA4-499E-BC2E-71FCA544F4C9}](https://github.com/user-attachments/assets/33563f35-be58-4d86-880f-1ff3b2a2dac3)

Overview

The Earthquake Interactive Globe Mapper is an advanced tool designed to visualize and analyze earthquake data in a dynamic, user-friendly interface. It integrates powerful features, such as interactive globe visualization, data filtering, long-term data storage, and machine learning capabilities, to provide a comprehensive view of global seismic activity. The tool fetches real-time earthquake data via the USGS GeoJSON API and includes key functionalities like switching globe images to display tectonic plate boundaries and generating machine learning reports for identifying significant earthquakes.
Key Features
1. Interactive Globe Visualization

    Switch Globe Image: Toggle between different globe images, with the option to display plate boundaries alongside real-time earthquake markers.
    Plate Boundaries Overlay: Visualize tectonic plate boundaries to better understand the correlation between earthquake activity and plate movements.

2. Data Filtering

    Time Filter: Filter earthquake data by a specific time range to view activity over days, weeks, or months.
    Event Name Filter: Search and filter earthquake events by name or identifier to focus on specific incidents.

3. SQL Server Integration

    Long-Term Data Storage: Store earthquake data older than one month in a SQL server database for future retrieval and analysis.
    Efficient Data Management: Retrieve historical earthquake data for in-depth research or monitoring long-term trends.

4. Machine Learning: Random Forest Classifier

    Above Average Earthquake Detection: The system uses a Random Forest Classifier to analyze earthquake characteristics and identify those that are above average in terms of magnitude, impact, or other factors.
    Detailed Reports: The tool generates reports on significant earthquakes based on machine learning classification, providing valuable insights for researchers.

5. Data Powered by USGS GeoJSON API

    Real-Time Data: The application fetches real-time earthquake data from the USGS GeoJSON API, ensuring up-to-date and accurate earthquake information.
