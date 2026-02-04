import styles from "./Dropdown.module.scss";
import loadingIcon from "/images/icon-loading.svg";
import checkIcon from "/images/icon-checkmark.svg";

export default function DropdownItem({
  children,
  icon,
}: {
  children: string;
  icon?: "loading" | "check";
}) {
  const buttonIcon =
    icon === "loading" ? loadingIcon : icon === "check" ? checkIcon : undefined;

  return (
    <button className={styles.dropdown__item}>
      {icon === "loading" && <img src={buttonIcon} />}
      {children}
      {icon === "check" && (
        <img src={buttonIcon} style={{justifyContent: "space-between"}} />
      )}
    </button>
  );
}
