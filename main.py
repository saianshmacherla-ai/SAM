from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np


app = FastAPI()


# Allow frontend to communicate with FastAPI

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained KNN model

model = joblib.load("crop_knn_model.pkl")


# Input structure

class CropInput(BaseModel):

    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float


# Home route

@app.get("/")
def home():

    return {
        "message": "Crop Recommendation API is running"
    }


# Prediction route

@app.post("/predict")
def predict_crop(data: CropInput):

    # Validate values BEFORE sending them to the model

    if (
        data.N < 0 or
        data.N > 2000 or

        data.P < 0 or
        data.P > 2000 or

        data.K < 0 or
        data.K > 2000 or

        data.temperature < -20 or
        data.temperature > 60 or

        data.humidity < 0 or
        data.humidity > 100 or

        data.ph < 0 or
        data.ph > 14 or

        data.rainfall < 0 or
        data.rainfall > 5000
    ):

        return {
            "recommended_crop":
            "No crop is suitable to grow in these conditions",

            "confidence": 0
        }


    # Create input array

    input_data = np.array([[
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]])


    # Get prediction

    prediction = model.predict(input_data)

    recommended_crop = prediction[0]


    # Calculate prediction confidence

    try:

        probabilities = model.predict_proba(input_data)

        confidence = float(
            np.max(probabilities[0]) * 100
        )

    except Exception:

        confidence = 0.0


    return {
        "recommended_crop": recommended_crop,
        "confidence": round(confidence, 2)
    }