import "./styles/App.css";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForecast";
import {useState} from "react";
import type {Forecast, Location} from "./types";

function App() {
  const [forecastData, setForecastData] = useState<Forecast>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [locationName, setLocationName] = useState<string>("-");

  return (
    <main>
      <Header />
      <Search
        setForecastData={setForecastData}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        setLocationName={setLocationName}
      />
      <CurrentForecast
        locationName={locationName}
        forecast={forecastData ? forecastData.current : undefined}
      />
    </main>
  );
}

export default App;
