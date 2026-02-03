import type {JSX} from "react";
import styles from "./Dropdown.module.scss";

export default function DropdownGroup({
  title,
  children,
}: {
  title: string;
  children: JSX.Element[];
}) {
  return (
    <>
      <div className={styles.dropdown__group}>
        <p className={styles.dropdown__groupTitle}>{title}</p>
        <div className={styles.dropdown__groupItems}>{children}</div>
      </div>
    </>
  );
}
