import iconSunny from "/images/icon-sunny.webp";
import styles from "./CurrentForecast.module.scss";
import type {CurrentForecast} from "../../types";

type CurrentForecastProps = {
  forecast: CurrentForecast | undefined;
  locationName: string;
};

export default function CurrentForecast({
  forecast,
  locationName,
}: CurrentForecastProps) {
  return (
    <section className={styles.forecast}>
      <div className={styles.forecast__weatherInfo}>
        <div className={styles.forecast__locationInfo}>
          <h2>{locationName}</h2>
          <p>Monday, Jan 1, 2026</p>
        </div>
        <div className={styles.forecast__temp}>
          <img src={iconSunny} alt="" className={styles.forecast__icon} />
          <p>{forecast ? Math.round(forecast.temperature_2m) : "-"}˚</p>
        </div>
      </div>
    </section>
  );
}
