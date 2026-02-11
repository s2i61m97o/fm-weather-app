import styles from "./CurrentForecast.module.scss";
import type {CurrentForecast} from "../../types";
import {getIcon, toFahrenheit, toInches, toMph} from "../../utils";
import loadingIcon from "/images/icon-loading.svg";

type CurrentForecastProps = {
  forecast: CurrentForecast | undefined;
  locationName: string;
  loading: boolean;
  imperial: {
    wind: boolean;
    temp: boolean;
    rain: boolean;
  };
};

export default function CurrentForecast({
  forecast,
  locationName,
  loading,
  imperial,
}: CurrentForecastProps) {
  const iconSrc = getIcon(forecast?.weather_code);

  const date = new Date().toLocaleDateString("utc", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
        ? imperial.wind
          ? `${toMph(forecast?.wind_speed_10m)} mph`
          : `${Math.round(forecast?.wind_speed_10m)} km/h`
        : "-",
    },
    {
      title: "precipitation",
      data: forecast
        ? imperial.rain
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
      </div>
      <div className={styles.forecast__container}>{cards}</div>
    </section>
  );
}
