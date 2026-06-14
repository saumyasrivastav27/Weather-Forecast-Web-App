let weather = {
    // !! IMPORTANT: Ensure this is your correct OpenWeatherMap API Key !!
    // As per your screenshot, it's "9fd03d6d2e9e3c62fff870bdb79daca14"
    "apikey": "94d8346d2d9e3c82fff878bdb79aca14",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apikey
        )
        .then((response) => {
            if (!response.ok) {
                // If the response is not OK (e.g., 404 for city not found, 401 for invalid key)
                alert("No weather found for that city. Please check the spelling or try another city.");
                // Add a line to reset display or hide it if an error occurs
                document.querySelector(".weather").classList.add("loading"); 
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => console.error("Error fetching weather:", error));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C"; // Round temperature for cleaner display
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        
        // Remove loading state and show weather content
        document.querySelector(".weather").classList.remove("loading");
        
    },

    search: function () {
        // Get the value from the search bar input
        const cityInput = document.querySelector(".search-bar").value;
        this.fetchWeather(cityInput);
    }
};

// --- Event Listeners ---

// 1. For the search button click
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// 2. For the Enter key press in the search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// --- Initial Load ---
// When the page loads, fetch weather for a default city (e.g., Delhi)
// This will populate the display when the page first opens.
weather.fetchWeather("Delhi");
