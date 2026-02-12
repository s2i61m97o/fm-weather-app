import "./styles/App.scss";
import Header from "./sections/Header/Header";
import Search from "./sections/Search/Search";
import CurrentForecast from "./sections/CurrentForecast/CurrentForecast";
import Daily from "./sections/Daily/Daily";
import Error from "./sections/Error/Error";
import {useState} from "react";
import type {Forecast, Location, ErrorRes} from "./types";
import Hourly from "./sections/Hourly/Hourly";
import clsx from "clsx";
import ApiError from "./sections/Error/ApiError";

function App() {
  const [forecastData, setForecastData] = useState<Forecast>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [locationName, setLocationName] = useState<string>("-");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes["error"] | undefined>();
  const [speedImperial, setSpeedImperial] = useState(false);
  const [tempImperial, setTempImperial] = useState(false);
  const [precipImperial, setPrecipImperial] = useState(false);

  const imperial = {
    speed: speedImperial,
    temp: tempImperial,
    precipitation: precipImperial,
  };

  return (
    <>
      <main>
        <Header
          setSpeedImperial={setSpeedImperial}
          setTempImperial={setTempImperial}
          setPrecipImperial={setPrecipImperial}
          imperial={imperial}
        />
        {error?.status && error?.status >= 400 ? (
          <ApiError setError={setError} />
        ) : (
          <Search
            setForecastData={setForecastData}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            loading={loading}
            setLocationName={setLocationName}
            setLoading={setLoading}
            error={error}
            setError={setError}
            forecast={forecastData ? true : false}
          />
        )}
        {error?.type === "NO_RESULTS" ? (
          <Error message={error.userMessage} />
        ) : undefined}
        <section className={clsx("forecasts", !forecastData && "hide")}>
          <CurrentForecast
            locationName={locationName}
            timezone={currentLocation?.timezone}
            forecast={forecastData ? forecastData.current : undefined}
            loading={loading}
            imperial={imperial}
          />
          <Daily
            forecast={forecastData ? forecastData.daily : undefined}
            imperial={tempImperial}
          />
          <Hourly
            forecast={forecastData ? forecastData.hourly : undefined}
            imperial={tempImperial}
            timezone={currentLocation?.timezone}
          />
        </section>
      </main>
    </>
  );
}

export default App;
