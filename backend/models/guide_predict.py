import sys
import json
import joblib
import os

def load_and_predict(model_path, input_value):
    model = joblib.load(model_path)
    
    y_pred = model.predict([[input_value]])
    y_prob = model.predict_proba([[input_value]])
    
    # Friendly label based on prediction
    label = "High" if y_pred[0] == 1 else "Low"
    
    return {
        "emission_value": input_value,
        "prediction": int(y_pred[0]),    # numeric prediction
        "label": f"{label} emission",
        "confidence_high_emission": float(y_prob[0][1])  # probability of class 1 (High emission)
    }

if __name__ == "__main__":
    try:
        if len(sys.argv) != 2:
            raise ValueError("Missing input argument")

        input_yield = float(sys.argv[1])
        model_path = os.path.abspath("rf_emission_model.pkl")
        result = load_and_predict(model_path, input_yield)

        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
