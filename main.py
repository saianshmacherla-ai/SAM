
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

model = joblib.load("crop_knn_model.pkl")

class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.get("/")
def home():
    return {"message": "Crop Recommendation API is running"}

@app.post("/predict")
@app.post("/predict")
def predict_crop(data: CropInput):

    input_data = np.array([[
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]])

    prediction = model.predict(input_data)

    probabilities = model.predict_proba(input_data)

    confidence = max(probabilities[0]) * 100

    return {
        "recommended_crop": prediction[0],
        "confidence": round(confidence, 2)
    }