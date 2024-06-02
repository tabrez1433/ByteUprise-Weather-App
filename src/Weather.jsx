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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY
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
          <h3>{weatherData.name}
            <p>
              Temperature: {Math.round(Number(weatherData?.main?.temp - 273.15))}
              &deg; c
            </p>
            {/* In most cases both temp_min and temp_max parameters have the same volume as 'temp'. */}
            {/* <div className="d-flex justify-content-center">
              <p>
                Max: {Math.round(Number(weatherData?.main?.temp_max - 273.15))}
                &deg; c | &nbsp;
              </p>
              <p>
                Min: {Math.round(Number(weatherData?.main?.temp_min - 273.15))}
                &deg; c
              </p>
            </div> */}
          </h3>
            <h4 className="text-capitalize">{weatherData.weather[0].description}</h4>
            <h4>Humidity: {weatherData?.main?.humidity}%</h4>
            <h4>Wind: {Math.round(weatherData?.wind?.speed * 3.6)} km/h</h4>

        </div>
      )}
    </div>
  );
};

export default Weather;
