import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import sqlite3

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report

conn = sqlite3.connect('Quake_DB')
df = pd.read_sql('SELECT * FROM Earthquakes', conn)
conn.close()

df = df[['mag', 'depth', 'latitude', 'longitude']]
df['mag'] = np.where(df['mag'] >= df['mag'].quantile(0.50), 1, 0)
print(df.head())

X = df.copy()
X.drop(['mag'], axis=1, inplace=True)
print(X.head())

y = df['mag']

print(df.dtypes)

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
scaler = StandardScaler()
X_scaler = scaler.fit(X_train)
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)
rf_model = RandomForestClassifier(n_estimators=1000, random_state=1)
rf_model = rf_model.fit(X_train_scaled, y_train)
predictions = rf_model.predict(X_test_scaled)

cm = confusion_matrix(y_test, predictions)
cm_df = pd.DataFrame(
    cm, index=["Actual 0", "Actual 1"], columns=["Predicted 0", "Predicted 1"]
)

acc_score = accuracy_score(y_test, predictions)
print("Confusion Matrix")
print(cm_df)
print(f"Accuracy Score : {acc_score}")
print("Classification Report")
print(classification_report(y_test, predictions))

importances = rf_model.feature_importances_
sorted(zip(rf_model.feature_importances_, X.columns), reverse=True)

importances_df = pd.DataFrame(sorted(zip(rf_model.feature_importances_, X.columns), reverse=True))
importances_df.set_index(importances_df[1], inplace=True)
importances_df.drop(columns=1, inplace=True)
importances_df.rename(columns={0: 'Feature Importances'}, inplace=True)
importances_sorted = importances_df.sort_values(by='Feature Importances')
importances_sorted.plot(kind='barh', color='lightgreen', title= 'Feature Importances for High Sig Earthquakes', legend=False)
plt.show()