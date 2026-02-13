import styles from "./CurrentForecast.module.scss";
import type {CurrentForecast} from "../../types";
import {getIcon, toFahrenheit, toInches, toMph} from "../../utils";
import loadingIcon from "/images/icon-loading.svg";
import {FiSunrise, FiSunset} from "react-icons/fi";

type CurrentForecastProps = {
  forecast: CurrentForecast;
  locationName: string;
  timezone: string | undefined;
  loading: boolean;
  imperial: {
    speed: boolean;
    temp: boolean;
    precipitation: boolean;
  };
  sun: {
    sunrise: string[];
    sunset: string[];
  };
};

export default function CurrentForecast({
  forecast,
  locationName,
  timezone,
  loading,
  imperial,
  sun,
}: CurrentForecastProps) {
  const iconSrc = getIcon(forecast?.weather_code);

  const date = new Date().toLocaleDateString("utc", {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const sunTime = {
    sunrise: new Date(sun.sunrise[0]).toLocaleTimeString("utc", {
      timeZone: timezone,
      timeStyle: "short",
    }),
    sunset: new Date(sun.sunset[0]).toLocaleTimeString("utc", {
      timeZone: timezone,
      timeStyle: "short",
    }),
  };

  const cardData = [
    {
      title: "feels like",
      data: forecast
        ? `${imperial.temp ? toFahrenheit(forecast?.apparent_temperature) : Math.round(forecast?.apparent_temperature)}˚`
        : "-",
    },
    {
      title: "humidity",
      data: forecast ? `${forecast?.relative_humidity_2m}%` : "-",
    },
    {
      title: "wind",
      data: forecast
        ? imperial.speed
          ? `${toMph(forecast?.wind_speed_10m)} mph`
          : `${Math.round(forecast?.wind_speed_10m)} km/h`
        : "-",
    },
    {
      title: "precipitation",
      data: forecast
        ? imperial.precipitation
          ? `${toInches(forecast.precipitation)} in`
          : `${Math.round(forecast?.precipitation)} mm`
        : "-",
    },
  ];

  const cards = cardData.map((data) => {
    return (
      <div key={data.title} className={styles.forecast__card}>
        <h3>{data.title}</h3>
        <p>{data.data}</p>
      </div>
    );
  });

  return (
    <section className={styles.forecast}>
      <div className={styles.forecast__weatherInfo}>
        {loading && (
          <div className={styles.forecast__loading}>
            <img src={loadingIcon} />
            <h3>Loading...</h3>
          </div>
        )}
        <div className={styles.forecast__locationInfo}>
          <h2>{locationName}</h2>
          <p>{date}</p>
        </div>
        <div className={styles.forecast__temp}>
          {forecast ? (
            <img src={iconSrc} alt="" className={styles.forecast__icon} />
          ) : (
            <div className={styles.forecast__icon}></div>
          )}
          <p>
            {forecast
              ? imperial.temp
                ? `${toFahrenheit(forecast.temperature_2m)}`
                : Math.round(forecast.temperature_2m)
              : "-"}
            ˚
          </p>
        </div>
        <div className={styles.forecast__sunContainer}>
          <div className={styles.forecast__sun}>
            <FiSunrise color="ff7a0a" />
            <p>{sunTime.sunrise}</p>
          </div>
          <div className={styles.forecast__sun}>
            <FiSunset color="ff7a0a" />
            <p>{sunTime.sunset}</p>
          </div>
        </div>
      </div>
      <div className={styles.forecast__container}>{cards}</div>
    </section>
  );
}
