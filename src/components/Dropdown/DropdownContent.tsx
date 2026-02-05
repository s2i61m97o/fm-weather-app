import {type JSX} from "react";
import styles from "./Dropdown.module.scss";
import clsx from "clsx";

export default function DropdownContent({
  children,
  open,
}: {
  children?: JSX.Element | JSX.Element[];
  open: boolean;
}) {
  return (
    <div
      className={clsx(
        styles.dropdown__content,
        open && styles.dropdown__contentOpen,
      )}
    >
      {children}
    </div>
  );
}
