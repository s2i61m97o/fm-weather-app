import styles from "./Search.module.scss";

export default function Search() {
  return (
    <section className={styles.search}>
      <h1 className={styles.search__header}>How's the sky looking today?</h1>
      <form action="get" className={styles.search__form}>
        <div className={styles.search__wrapper}>
          <input
            type="text"
            className={styles.search__input}
            placeholder="Search for a place..."
          />
        </div>
        <button className={styles.search__button}>Search</button>
      </form>
    </section>
  );
}
