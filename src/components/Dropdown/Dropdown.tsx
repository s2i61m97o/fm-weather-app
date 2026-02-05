import type {JSX} from "react";
import styles from "./Dropdown.module.scss";

export default function Dropdown({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return <div className={styles.dropdown}>{children}</div>;
}
