# 🌱 AI Crop Recommendation System

A Machine Learning based web application that recommends a suitable crop based on soil and weather conditions.

## 📌 Project Overview

The AI Crop Recommendation System helps farmers make better crop selection decisions by analyzing important soil and environmental parameters.

The system uses a trained **K-Nearest Neighbors (KNN)** machine learning model to predict the most suitable crop.

Users can enter soil and weather values through a web interface and receive a crop recommendation along with additional cultivation information.

## ✨ Features

- 🌱 AI-based crop recommendation
- 🧠 KNN Machine Learning model
- 📊 Prediction confidence percentage
- 🌦️ Live weather information
- 📚 Crop cultivation guide
- 🕒 Prediction history
- 💾 Local storage for prediction history
- 🌙 Dark Mode / Light Mode
- 🖼️ Crop images
- ⚡ FastAPI backend
- 💻 Responsive web interface

## 🧪 Input Parameters

The model uses the following seven parameters:

| Parameter | Description |
|---|---|
| N | Nitrogen |
| P | Phosphorus |
| K | Potassium |
| Temperature | Temperature in °C |
| Humidity | Relative humidity in % |
| pH | Soil pH value |
| Rainfall | Rainfall in mm |

## 🤖 Machine Learning

The project uses the **K-Nearest Neighbors (KNN)** classification algorithm.

Hyperparameter tuning was performed using GridSearchCV.

The selected model parameters are:

- Number of Neighbors: 7
- Weights: distance
- Distance Metric: Manhattan
- Cross-validation: 5-fold

The trained model is saved as:

```text 
CROP_REC/
├── main.py
├── crop.py
├── index.html
└── style.css
crop_knn_model.pkl