import {useContext, type JSX} from "react";
import styles from "./Dropdown.module.scss";
import {DropdownContext} from "./Dropdown";
import clsx from "clsx";

export default function DropdownContent({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const {open} = useContext(DropdownContext);
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
