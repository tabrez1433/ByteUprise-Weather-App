import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setWeatherData(response.data);
      setLoading(false);
      setCity("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <header className="weather-header">
        <h1><b>Weather App</b></h1>
      </header>
      <Form inline onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <Button type="submit" disabled={loading} className="fw-bold">
            {" "}
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Get Weather"
            )}
          </Button>
        </InputGroup>
      </Form>

      {weatherData && (
        <div className="weather-info fw-bold">
          <h2>{weatherData.name}</h2>
          <p>
            Temperature: {Math.round(Number(weatherData?.main?.temp - 273))}
            &deg; c
          </p>
          <p>{weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData?.main?.humidity}%</p>
          <p>Speed: {Math.round(weatherData?.wind?.speed * 1.60934)} km/h</p>

        </div>
      )}
    </div>
  );
};

export default Weather;
