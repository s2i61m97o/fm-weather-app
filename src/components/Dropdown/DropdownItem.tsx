import styles from "./Dropdown.module.scss";
export default function DropdownItem({children}: {children: string}) {
  return <button className={styles.dropdown__item}>{children}</button>;
}
