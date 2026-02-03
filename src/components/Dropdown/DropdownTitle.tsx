import styles from "./Dropdown.module.scss";

export default function DropdownTitle({children}: {children: string}) {
  return <p className={styles.dropdown__title}>{children}</p>;
}
