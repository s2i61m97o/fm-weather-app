import "./styles/App.css";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForecast";
import {useState} from "react";
import type {Forecast, Location} from "./types";

function App() {
  const [forecastData, setForecastData] = useState<Forecast>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  return (
    <main>
      <Header />
      <Search
        setForecastData={setForecastData}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <CurrentForecast />
    </main>
  );
}

export default App;
