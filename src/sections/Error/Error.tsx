import styles from "./Error.module.scss";

export default function NoResults({message}: {message: string}) {
  return (
    <section className={styles.error}>
      <h2 className={styles.error__heading}>{message}!</h2>;
    </section>
  );
}
