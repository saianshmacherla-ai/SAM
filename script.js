
const form = document.getElementById("cropForm");
const result = document.getElementById("result");
const historyDiv = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

let predictionHistory = JSON.parse(localStorage.getItem("predictionHistory")) || [];

function displayHistory() {
    historyDiv.innerHTML = "";

    predictionHistory.forEach(function(item) {
        historyDiv.innerHTML += `
            <div class="history-item">
                <h3>${item.crop.toUpperCase()}</h3>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Time:</strong> ${item.time}</p>
                <p><strong>N:</strong> ${item.N} | <strong>P:</strong> ${item.P} | <strong>K:</strong> ${item.K}</p>
                <p><strong>Temperature:</strong> ${item.temperature} °C</p>
                <p><strong>Humidity:</strong> ${item.humidity}%</p>
                <p><strong>pH:</strong> ${item.ph}</p>
                <p><strong>Rainfall:</strong> ${item.rainfall} mm</p>
            </div>
        `;
    });
}

displayHistory();

const cropDetails = {
    rice: {
        description: "Rice is a major food crop grown in warm and humid climates.",
        conditions: "High rainfall, warm temperature and water-retaining soil.",
        season: "Kharif",
        soil: "Clayey or loamy soil",
        water: "High water requirement",
        tips: "Maintain proper water levels and control weeds."
    },
    maize: {
        description: "Maize is an important cereal crop used for food and animal feed.",
        conditions: "Moderate rainfall and well-drained soil.",
        season: "Kharif and Rabi",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Ensure proper spacing and remove weeds regularly."
    },
    chickpea: {
        description: "Chickpea is a pulse crop rich in protein.",
        conditions: "Cool and relatively dry climate.",
        season: "Rabi",
        soil: "Well-drained sandy loam",
        water: "Low to moderate water requirement",
        tips: "Avoid waterlogging and maintain healthy soil."
    },
    kidneybeans: {
        description: "Kidney beans are nutritious legumes rich in protein and fibre.",
        conditions: "Moderate temperature and well-drained soil.",
        season: "Kharif",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Provide support if needed and avoid excess watering."
    },
    pigeonpeas: {
        description: "Pigeon pea is a protein-rich pulse crop.",
        conditions: "Warm climate with moderate rainfall.",
        season: "Kharif",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Maintain proper spacing and control pests."
    },
    mothbeans: {
        description: "Moth bean is a drought-tolerant pulse crop.",
        conditions: "Hot and dry climate.",
        season: "Kharif",
        soil: "Sandy soil",
        water: "Low water requirement",
        tips: "Avoid excessive irrigation and remove weeds."
    },
    mungbean: {
        description: "Green gram is a short-duration pulse crop.",
        conditions: "Warm climate and moderate rainfall.",
        season: "Kharif and Summer",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Use healthy seeds and monitor pest attacks."
    },
    blackgram: {
        description: "Black gram is a protein-rich pulse crop.",
        conditions: "Warm climate with moderate rainfall.",
        season: "Kharif",
        soil: "Loamy soil",
        water: "Moderate water requirement",
        tips: "Maintain proper spacing and avoid waterlogging."
    },
    lentil: {
        description: "Lentil is an important pulse crop rich in protein.",
        conditions: "Cool and dry growing conditions.",
        season: "Rabi",
        soil: "Well-drained loamy soil",
        water: "Low to moderate water requirement",
        tips: "Avoid excess irrigation and maintain soil health."
    },
    pomegranate: {
        description: "Pomegranate is a fruit crop known for its nutritious seeds.",
        conditions: "Warm and relatively dry climate.",
        season: "Perennial",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Prune regularly and maintain balanced irrigation."
    },
    banana: {
        description: "Banana is a tropical fruit crop rich in potassium.",
        conditions: "Warm and humid climate.",
        season: "Year-round",
        soil: "Deep, fertile loamy soil",
        water: "High water requirement",
        tips: "Provide regular irrigation and support plants when necessary."
    },
    mango: {
        description: "Mango is a popular tropical fruit known as the king of fruits.",
        conditions: "Warm climate with a relatively dry flowering period.",
        season: "Perennial",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Prune carefully and protect flowers from pests."
    },
    grapes: {
        description: "Grapes are fruit crops used for fresh consumption and processing.",
        conditions: "Warm climate with suitable dry conditions.",
        season: "Perennial",
        soil: "Well-drained sandy loam",
        water: "Moderate water requirement",
        tips: "Provide suitable support structures and prune regularly."
    },
    watermelon: {
        description: "Watermelon is a summer fruit with high water content.",
        conditions: "Warm climate and plenty of sunlight.",
        season: "Summer",
        soil: "Sandy loam soil",
        water: "Moderate to high water requirement",
        tips: "Maintain consistent soil moisture during fruit development."
    },
    muskmelon: {
        description: "Muskmelon is a sweet summer fruit crop.",
        conditions: "Warm and dry climate.",
        season: "Summer",
        soil: "Sandy loam soil",
        water: "Moderate water requirement",
        tips: "Avoid waterlogging and provide adequate sunlight."
    },
    apple: {
        description: "Apple is a temperate fruit crop rich in fibre.",
        conditions: "Cool climate with suitable chilling conditions.",
        season: "Perennial",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Prune regularly and monitor diseases."
    },
    orange: {
        description: "Orange is a citrus fruit rich in vitamin C.",
        conditions: "Warm climate with suitable rainfall.",
        season: "Perennial",
        soil: "Well-drained loamy soil",
        water: "Moderate water requirement",
        tips: "Maintain balanced irrigation and monitor pests."
    },
    papaya: {
        description: "Papaya is a tropical fruit crop that grows quickly.",
        conditions: "Warm climate without waterlogging.",
        season: "Year-round",
        soil: "Well-drained sandy loam",
        water: "Moderate water requirement",
        tips: "Ensure proper drainage and protect young plants."
    },
    coconut: {
        description: "Coconut is a tropical plantation crop with many uses.",
        conditions: "Warm and humid climate.",
        season: "Perennial",
        soil: "Sandy or loamy soil",
        water: "High water requirement",
        tips: "Maintain moisture and apply organic manure."
    },
    cotton: {
        description: "Cotton is an important fibre crop used in textile production.",
        conditions: "Warm climate with moderate rainfall.",
        season: "Kharif",
        soil: "Black cotton soil",
        water: "Moderate water requirement",
        tips: "Control weeds and monitor bollworm attacks."
    },
    jute: {
        description: "Jute is a natural fibre crop used to manufacture bags and ropes.",
        conditions: "Warm and humid climate with good rainfall.",
        season: "Kharif",
        soil: "Alluvial soil",
        water: "High water requirement",
        tips: "Maintain adequate moisture during early growth."
    },
    coffee: {
        description: "Coffee is a plantation crop grown for its valuable beans.",
        conditions: "Moderate temperature and humid conditions.",
        season: "Perennial",
        soil: "Well-drained, rich organic soil",
        water: "Moderate to high water requirement",
        tips: "Provide suitable shade and maintain soil fertility."
    }
};

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        N: Number(document.getElementById("N").value),
        P: Number(document.getElementById("P").value),
        K: Number(document.getElementById("K").value),
        temperature: Number(document.getElementById("temperature").value),
        humidity: Number(document.getElementById("humidity").value),
        ph: Number(document.getElementById("ph").value),
        rainfall: Number(document.getElementById("rainfall").value)
    };

    result.textContent = "Predicting crop...";

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const output = await response.json();

        if (!response.ok) {
            throw new Error(output.detail || "Prediction failed");
        }

        const cropName = output.recommended_crop.toLowerCase();
        const confidence = output.confidence;
        const now = new Date();

const historyItem = {
    crop: cropName,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    N: data.N,
    P: data.P,
    K: data.K,
    temperature: data.temperature,
    humidity: data.humidity,
    ph: data.ph,
    rainfall: data.rainfall
};

predictionHistory.unshift(historyItem);

localStorage.setItem(
    "predictionHistory",
    JSON.stringify(predictionHistory)
);

displayHistory();

        const details = cropDetails[cropName] || {
            description: "This crop is recommended based on the soil and weather parameters you entered.",
            conditions: "Refer to local agricultural guidance for specific cultivation requirements.",
            season: "Refer to local agricultural guidance",
            soil: "Check local soil recommendations",
            water: "Depends on local growing conditions",
            tips: "Consult a local agricultural expert."
        };

        result.innerHTML = `
            <h3>Prediction Successful!</h3>
            <p>Recommended crop:</p>
            <h2>${cropName.toUpperCase()}</h2>
            <h3>Prediction Confidence: ${confidence}%</h3>

<div class="confidence-bar">
    <div class="confidence-fill" style="width: ${confidence}%"></div>
</div>

            <div class="crop-card">
                <div class="crop-info">
                    <h3>About the Crop</h3>
                    <p>${details.description}</p>

                    <h3>Growing Conditions</h3>
                    <p>${details.conditions}</p>

                    <h3>Cultivation Guide</h3>
                    <p><strong>Best Season:</strong> ${details.season}</p>
                    <p><strong>Soil Type:</strong> ${details.soil}</p>
                    <p><strong>Water Requirement:</strong> ${details.water}</p>
                    <p><strong>Cultivation Tips:</strong> ${details.tips}</p>
                </div>

                <div class="crop-image-box">
                    <img
                        src="images/${cropName}.jpg"
                        alt="${cropName}"
                        class="crop-image"
                    >
                </div>
            </div>
        `;

    } catch (error) {
        result.textContent = "Unable to get crop recommendation. Please check whether the server is running and try again.";
    }
});

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function() {
    form.reset();
    result.innerHTML = "";
});
clearHistoryBtn.addEventListener("click", function() {
    predictionHistory = [];

    localStorage.removeItem("predictionHistory");

    displayHistory();
});
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherCity = document.getElementById("weatherCity");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", async function() {

    const city = weatherCity.value.trim();

    if (city === "") {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    weatherResult.textContent = "Fetching weather information...";

    try {

        // Get city coordinates

        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
            throw new Error("Unable to find city.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.textContent = "City not found. Please try another city.";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;

        // Get current weather

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather.");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        weatherResult.style.whiteSpace = "pre-line";

        weatherResult.textContent =
            `Weather in ${cityName}\n` +
            `Temperature: ${current.temperature_2m} °C\n` +
            `Humidity: ${current.relative_humidity_2m}%\n` +
            `Precipitation: ${current.precipitation} mm\n` +
            `Wind Speed: ${current.wind_speed_10m} km/h`;

    } catch (error) {

        weatherResult.textContent =
            "Unable to fetch weather. Please try again.";

    }

});
// Dark Mode Toggle

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }

});