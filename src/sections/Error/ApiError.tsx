import type {ErrorRes} from "../../types";
import styles from "./Error.module.scss";
import errorIcon from "/images/icon-error.svg";
import retryIcon from "/images/icon-retry.svg";

export default function ApiError({
  setError,
}: {
  setError: React.Dispatch<React.SetStateAction<ErrorRes["error"] | undefined>>;
}) {
  return (
    <section className={styles.error}>
      <img src={errorIcon} alt="" className={styles.error__icon} />
      <h1 className={styles.error__apiTitle}>Something went wrong</h1>
      <p className={styles.error__text}>
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button className={styles.error__btn} onClick={() => setError(undefined)}>
        <img src={retryIcon} alt="" /> Retry
      </button>
    </section>
  );
}
