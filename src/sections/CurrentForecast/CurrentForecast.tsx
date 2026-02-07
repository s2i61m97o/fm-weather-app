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
  const iconSrc = getIcon(forecast?.weather_code);

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
    </section>
  );
}
