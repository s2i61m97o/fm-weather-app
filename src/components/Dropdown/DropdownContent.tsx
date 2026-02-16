import {type JSX} from "react";
import styles from "./Dropdown.module.scss";
import clsx from "clsx";

export default function DropdownContent({
  children,
  open,
  ref,
}: {
  children?: JSX.Element | JSX.Element[];
  open: boolean;
  ref: React.Ref<HTMLDivElement | null>;
}) {
  return (
    <div
      className={clsx(
        styles.dropdown__content,
        open && styles.dropdown__contentOpen,
      )}
      ref={ref}
      inert={!open}
    >
      {children}
    </div>
  );
}
