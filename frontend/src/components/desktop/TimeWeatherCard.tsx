
import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

const TimeWeatherCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [weather, setWeather] = useState<WeatherData | null>(
    null
  );

  const [weatherLoading, setWeatherLoading] =
    useState(true);

  const [weatherError, setWeatherError] =
    useState(false);

  // =========================
  // LIVE CLOCK
  // =========================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // LIVE WEATHER
  // Greater Noida
  // =========================

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(false);

        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.4744&longitude=77.5040&current=temperature_2m,weather_code&timezone=Asia%2FKolkata"
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = await response.json();

        setWeather({
          temperature: Math.round(
            data.current.temperature_2m
          ),
          weatherCode: data.current.weather_code,
        });
      } catch (error) {
        console.error("Weather error:", error);
        setWeatherError(true);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();

    // Refresh weather every 10 minutes
    const weatherTimer = setInterval(
      fetchWeather,
      10 * 60 * 1000
    );

    return () => clearInterval(weatherTimer);
  }, []);

  // =========================
  // WEATHER DESCRIPTION
  // =========================

  const getWeatherInfo = (code: number) => {
    if (code === 0) {
      return {
        icon: "☀️",
        text: "Clear Sky",
      };
    }

    if (code === 1 || code === 2) {
      return {
        icon: "🌤️",
        text: "Partly Cloudy",
      };
    }

    if (code === 3) {
      return {
        icon: "☁️",
        text: "Overcast",
      };
    }

    if (
      code === 45 ||
      code === 48
    ) {
      return {
        icon: "🌫️",
        text: "Foggy",
      };
    }

    if (
      code >= 51 &&
      code <= 57
    ) {
      return {
        icon: "🌦️",
        text: "Drizzle",
      };
    }

    if (
      code >= 61 &&
      code <= 67
    ) {
      return {
        icon: "🌧️",
        text: "Rain",
      };
    }

    if (
      code >= 71 &&
      code <= 77
    ) {
      return {
        icon: "❄️",
        text: "Snow",
      };
    }

    if (
      code >= 80 &&
      code <= 82
    ) {
      return {
        icon: "🌦️",
        text: "Rain Showers",
      };
    }

    if (
      code >= 95 &&
      code <= 99
    ) {
      return {
        icon: "⛈️",
        text: "Thunderstorm",
      };
    }

    return {
      icon: "🌤️",
      text: "Unknown",
    };
  };

  // =========================
  // TIME
  // =========================

  const hours = currentTime.getHours();

  const greeting =
    hours < 12
      ? "Good Morning, Abhishek!"
      : hours < 17
        ? "Good Afternoon, Abhishek!"
        : hours < 21
          ? "Good Evening, Abhishek!"
          : "Good Night, Abhishek!";

  const time = currentTime.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );

  const date = currentTime.toLocaleDateString(
    "en-IN",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const weatherInfo = weather
    ? getWeatherInfo(weather.weatherCode)
    : null;

  return (
    <div
      style={{
        position: "fixed",
        top: "32px",
        right: "32px",
        width: "min(300px, calc(100vw - 32px))",
        padding: "16px",
        borderRadius: "18px",
        background:
          "rgba(15, 23, 42, 0.55)",
        border:
          "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter:
          "blur(20px)",
        color: "white",
        zIndex: 5,
        boxSizing: "border-box",
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.25)",
      }}
    >
      {/* Date */}
      <div
        style={{
          fontSize: "14px",
          opacity: 0.75,
          marginBottom: "10px",
        }}
      >
        {date}
      </div>

      {/* Time + Weather */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* TIME */}
        <div>
          <div
            style={{
              fontSize: "42px",
              fontWeight: 600,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            {time}
          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              opacity: 0.85,
            }}
          >
            {greeting}
          </div>
        </div>

        {/* WEATHER */}
        <div
          style={{
            textAlign: "right",
            borderLeft:
              "1px solid rgba(255,255,255,0.2)",
            paddingLeft: "18px",
            minWidth: "92px",
          }}
        >
          {weatherLoading ? (
            <>
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "5px",
                }}
              >
                🌤️
              </div>

              <div
                style={{
                  fontSize: "14px",
                  opacity: 0.7,
                }}
              >
                Loading...
              </div>
            </>
          ) : weatherError ? (
            <>
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "5px",
                }}
              >
                ⚠️
              </div>

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.7,
                }}
              >
                Weather unavailable
              </div>
            </>
          ) : weather && weatherInfo ? (
            <>
              <div
                style={{
                  fontSize: "34px",
                  marginBottom: "3px",
                }}
              >
                {weatherInfo.icon}
              </div>

              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                {weather.temperature}°C
              </div>

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.75,
                  marginTop: "4px",
                }}
              >
                Greater Noida
              </div>

              <div
                style={{
                  fontSize: "11px",
                  opacity: 0.6,
                  marginTop: "2px",
                }}
              >
                {weatherInfo.text}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TimeWeatherCard;
