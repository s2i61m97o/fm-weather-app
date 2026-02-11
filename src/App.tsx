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
  const [speedImperial, setSpeedImperial] = useState(false);
  const [tempImperial, setTempImperial] = useState(false);
  const [precipImperial, setPrecipImperial] = useState(false);

  const imperialStates = [speedImperial, tempImperial, precipImperial];

  return (
    <>
      <main>
        <Header
          speedImperial={speedImperial}
          setSpeedImperial={setSpeedImperial}
          tempImperial={tempImperial}
          setTempImperial={setTempImperial}
          precipImperial={precipImperial}
          setPrecipImperial={setPrecipImperial}
          imperialStates={imperialStates}
        />
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
            imperial={{
              wind: speedImperial,
              temp: tempImperial,
              rain: precipImperial,
            }}
          />
          <Daily
            forecast={forecastData ? forecastData.daily : undefined}
            imperial={tempImperial}
          />
          <Hourly
            forecast={forecastData ? forecastData.hourly : undefined}
            imperial={tempImperial}
          />
        </section>
      </main>
    </>
  );
}

export default App;
