import styles from "./CurrentForecast.module.scss";
import type {CurrentForecast} from "../../types";
import {getIcon} from "../../utils";

type CurrentForecastProps = {
  forecast: CurrentForecast | undefined;
  locationName: string;
};

export default function CurrentForecast({
  forecast,
  locationName,
}: CurrentForecastProps) {
  if (!forecast) {
    return;
  }

  const iconSrc = getIcon(forecast?.weather_code);
  const cardData = [
    {
      title: "feels like",
      data: `${Math.round(forecast?.apparent_temperature)}˚`,
    },
    {title: "humidity", data: `${forecast?.relative_humidity_2m}%`},
    {title: "wind", data: `${Math.round(forecast?.wind_speed_10m)} km/h`},
    {title: "precipitation", data: `${Math.round(forecast?.precipitation)} mm`},
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
        {forecast && (
          <>
            <div className={styles.forecast__locationInfo}>
              <h2>{locationName}</h2>
              <p>Monday, Jan 1, 2026</p>
            </div>
            <div className={styles.forecast__temp}>
              <img src={iconSrc} alt="" className={styles.forecast__icon} />
              <p>{forecast ? Math.round(forecast.temperature_2m) : "-"}˚</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.forecast__container}>{cards}</div>
    </section>
  );
}
