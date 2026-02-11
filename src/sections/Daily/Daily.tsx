import type {DailyForecast} from "../../types";
import {getIcon} from "../../utils";
import styles from "./Daily.module.scss";

export default function Daily({
  forecast,
}: {
  forecast: DailyForecast | undefined;
}) {
  const dayCards = forecast?.time.map((time, index) => {
    const date = new Date(time);

    const day = new Intl.DateTimeFormat("en", {weekday: "short"}).format(date);
    const icon = getIcon(forecast.weather_code[index]);
    const maxTemp: number = Math.round(forecast.temperature_2m_max[index]);
    const minTemp: number = Math.round(forecast.temperature_2m_min[index]);

    return (
      <div className={styles.daily__card}>
        <p>{day}</p>
        <img src={icon} alt="" className={styles.daily__icon} />
        <div className={styles.daily__temp}>
          <p>{maxTemp}˚</p>
          <p>{minTemp}˚</p>
        </div>
      </div>
    );
  });

  const emptyCards = new Array(7).fill(0).map(() => {
    return <div className={styles.daily__card}></div>;
  });

  return (
    <section className={styles.daily}>
      <h2 className={styles.daily__header}>Daily forecast</h2>;
      <div className={styles.daily__cardContainer}>
        {dayCards ? dayCards : emptyCards}
      </div>
    </section>
  );
}
