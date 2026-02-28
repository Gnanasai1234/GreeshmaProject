"""
DiaPredict — Flask ML Prediction Service
Serves diabetes predictions via REST API on port 5001
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Allow all origins (Express backend on port 5000)

# Load trained model
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'diabetes_model.pkl')

FEATURE_NAMES = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
                 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']

model = None
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully", flush=True)
except Exception as e:
    print(f"Model not found at {MODEL_PATH}. Run 'python train.py' first.", flush=True)
    print(f"Error: {e}", flush=True)


@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded. Run python train.py first.'}), 503

    try:
        data = request.get_json()

        values = [
            float(data.get('pregnancies', 0)),
            float(data.get('glucose', 0)),
            float(data.get('bloodPressure', 0)),
            float(data.get('skinThickness', 0)),
            float(data.get('insulin', 0)),
            float(data.get('bmi', 0)),
            float(data.get('dpf', 0)),
            float(data.get('age', 0))
        ]

        # Use DataFrame with feature names to avoid sklearn warning
        features = pd.DataFrame([values], columns=FEATURE_NAMES)

        # Predict
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        confidence = round(float(max(probabilities)), 2)

        result = 'Diabetic' if prediction == 1 else 'Non-Diabetic'

        return jsonify({
            'result': result,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True, use_reloader=False)
