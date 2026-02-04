import styles from "./Dropdown.module.scss";
import loadingIcon from "/images/icon-loading.svg";
import checkIcon from "/images/icon-checkmark.svg";
import type {MouseEvent} from "react";

export default function DropdownItem({
  children,
  icon,
  clickFunc,
  id,
}: {
  children: string;
  icon?: "loading" | "check";
  clickFunc?: (e: MouseEvent<HTMLButtonElement>) => void;
  id?: number;
}) {
  const buttonIcon =
    icon === "loading" ? loadingIcon : icon === "check" ? checkIcon : undefined;

  return (
    <button
      id={id?.toString()}
      className={styles.dropdown__item}
      onClick={clickFunc}
    >
      {icon === "loading" && <img src={buttonIcon} />}
      {children}
      {icon === "check" && (
        <img src={buttonIcon} style={{justifyContent: "space-between"}} />
      )}
    </button>
  );
}
