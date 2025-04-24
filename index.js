const apiKey = '2d57552a258443222d9036eb2643ba21';

let fetchBtn, cityInput, weatherDisplay, errorMessage, loadingMessage;


async function fetchWeatherData(city) {
  showLoading(true);
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
    return data;
  } catch (error) {
    displayError(error.message); 
    throw error;
  } finally {
    showLoading(false);
  }
}

function displayWeather(data, display = weatherDisplay, error = errorMessage) {
  error.textContent = '';
  display.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
  `;
}

function displayError(message, error = errorMessage, display = weatherDisplay) {
  display.innerHTML = '';
  error.textContent = message;
  error.classList.remove('hidden');
}

function showLoading(isLoading) {
  loadingMessage.style.display = isLoading ? 'block' : 'none';
}


function initDOM() {
  fetchBtn = document.getElementById('fetch-btn');
  cityInput = document.getElementById('city-input');
  weatherDisplay = document.getElementById('weather-display');
  errorMessage = document.getElementById('error-message');
  loadingMessage = document.getElementById('loading-message');

  fetchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
      displayError('Please enter a city name.');
    } else {
      fetchWeatherData(city);
    }
  });
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initDOM);
}

module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError,
  initDOM,
};
