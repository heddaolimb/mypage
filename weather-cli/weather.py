import sys
import requests

API_KEY = "e862e478cbd3791c0caf38a98f19abba"  # din OpenWeather key
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather_openweather(city):
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",  
        "lang": "en"         
    }
    response = requests.get(BASE_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        city_name = data["name"]
        temp = data["main"]["temp"]
        desc = data["weather"][0]["description"]
        return f"{city_name}: {temp}°C, {desc.capitalize()}"
    else:
        return None  


def get_weather_wttr(city):
    """Fallback til wttr.in"""
    url = f"http://wttr.in/{city}?format=3"
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    return "Could not fetch weather data from wttr.in either."


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python weather.py <city>")
    else:
        city = " ".join(sys.argv[1:])  # støtter bynavn med mellomrom
        result = get_weather_openweather(city)

        if result:
            print(result)
        else:
            print("⚠️ OpenWeather not available, using fallback...")
            print(get_weather_wttr(city))
