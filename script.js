document.getElementById("getWeather").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      resultDiv.textContent = "Please enter a city name.";
      return;
    }
  
    resultDiv.textContent = "Loading weather data...";
  
    try {
      // Get coordinates for the input city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
      const geoData = await geoRes.json();
  
      if (!geoData.results || geoData.results.length === 0) {
        resultDiv.textContent = "City not found.";
        return;
      }
  
      const { latitude, longitude, name, country } = geoData.results[0];
  
      // Fetch weather data using those coordinates
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      const weather = weatherData.current_weather;
  
      resultDiv.innerHTML = `
        📍 <strong>${name}, ${country}</strong><br>
        🌡️ Temperature: <strong>${weather.temperature}°C</strong><br>
        💨 Wind Speed: ${weather.windspeed} km/h<br>
        🕒 Time: ${weather.time}
      `;
    } catch (error) {
      console.error(error);
      resultDiv.textContent = "An error occurred while fetching weather data.";
    }
  });