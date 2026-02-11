import "./styles/App.scss";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForecast";
import Daily from "./sections/Daily/Daily";
import {useState} from "react";
import type {Forecast, Location, ApiError} from "./types";
import Hourly from "./sections/Hourly/Hourly";

function App() {
  const [forecastData, setForecastData] = useState<Forecast>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [locationName, setLocationName] = useState<string>("-");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | undefined>();
  const [imperial, setImperial] = useState<boolean>(false);

  return (
    <>
      <main>
        <Header imperial={imperial} setImperial={setImperial} />
        <Search
          setForecastData={setForecastData}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          setLocationName={setLocationName}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
        <section className="forecasts">
          <CurrentForecast
            locationName={locationName}
            forecast={forecastData ? forecastData.current : undefined}
            loading={loading}
            imperial={imperial}
          />
          <Daily
            forecast={forecastData ? forecastData.daily : undefined}
            imperial={imperial}
          />
          <Hourly
            forecast={forecastData ? forecastData.hourly : undefined}
            imperial={imperial}
          />
        </section>
      </main>
    </>
  );
}

export default App;
