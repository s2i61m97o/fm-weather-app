import iconSunny from "/images/icon-sunny.webp";
import styles from "./CurrentForecast.module.scss";

export default function CurrentForecast() {
  return (
    <section className={styles.forecast}>
      <div className={styles.forecast__weatherInfo}>
        <div className={styles.forecast__locationInfo}>
          <h2>Berlin, Germany</h2>
          <p>Monday, Jan 1, 2026</p>
        </div>
        <div className={styles.forecast__temp}>
          <img src={iconSunny} alt="" className={styles.forecast__icon} />
          <p>20˚</p>
        </div>
      </div>
    </section>
  );
}
