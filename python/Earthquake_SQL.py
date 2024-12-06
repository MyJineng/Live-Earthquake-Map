import requests
import pandas as pd
import sqlite3

quake_data = requests.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson').json()
features = quake_data['features']

data = []
for feature in features:
    json_data = {
        'id': feature['id'],
        'type': feature['type'],
        'mag': feature['properties'].get('mag', None),
        'net': feature['properties'].get('net', None),
        'time': feature['properties'].get('time', None),
        'title': feature['properties'].get('title', None),
        'status': feature['properties'].get('status', None),
        'latitude': feature['geometry']['coordinates'][1],
        'longitude': feature['geometry']['coordinates'][0],
        'depth': feature['geometry']['coordinates'][2],
        'alert': feature['properties'].get('alert', None),
        'tsunami': feature['properties'].get('tsunami', 0),
        'felt': feature['properties'].get('felt', None),
        'rms': feature['properties'].get('rms', 0),
        'sig': feature['properties'].get('sig', 0),
        'url': feature['properties'].get('url', None),
        'detail': feature['properties'].get('detail', None),
        'updated': feature['properties'].get('updated', None),
        'place': feature['properties'].get('place', None),
        'code': feature['properties'].get('code', None),
        'ids': feature['properties'].get('ids', None),
        'sources': feature['properties'].get('sources', None),
        'types': feature['properties'].get('types', None),
        'nst': feature['properties'].get('nst', None),
        'magType': feature['properties'].get('magType', None),
    }
    data.append(json_data)

df = pd.DataFrame(data)

conn = sqlite3.connect('Quake_DB')
quake_df = pd.read_sql('SELECT * FROM Earthquakes', conn)


existing_ids = quake_df['id'].tolist()
new_data_filtered = df[~df['id'].isin(existing_ids)]
if not new_data_filtered.empty:
    new_data_filtered.to_sql('Earthquakes', conn, if_exists='append', index=False)
    print(new_data_filtered[['id', 'title']])

updated_df = pd.read_sql('SELECT * FROM Earthquakes', conn)
conn.close()