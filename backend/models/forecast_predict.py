import sys
import json
import joblib
import os

try:
    model_path = os.path.abspath("sarima_model.pkl")  

    model_loaded = joblib.load(model_path)

    input_data = 12

    if input_data <= 0:
        raise ValueError("Input must be a positive integer.")

    forecast = model_loaded.forecast(steps=input_data)

    # Ensure that you are returning a flat list of forecast values
    data = [round(value, 2) for value in forecast]

    # Directly return the list as JSON
    print(json.dumps(data))

except Exception as e:
    print(json.dumps({'error': str(e)}))
