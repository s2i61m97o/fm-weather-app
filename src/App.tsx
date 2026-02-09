import "./styles/App.css";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForecast";
import {useState} from "react";
import type {Forecast, Location, ApiError} from "./types";

function App() {
  const [forecastData, setForecastData] = useState<Forecast>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [locationName, setLocationName] = useState<string>("-");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | undefined>();

  return (
    <main>
      <Header />
      <Search
        setForecastData={setForecastData}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        setLocationName={setLocationName}
        setLoading={setLoading}
        setError={setError}
      />
      <CurrentForecast
        locationName={locationName}
        forecast={forecastData ? forecastData.current : undefined}
        loading={loading}
      />
    </main>
  );
}

export default App;
