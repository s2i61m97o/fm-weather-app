import type {JSX} from "react";
import {useContext} from "react";
import expandIcon from "/images/icon-dropdown.svg";
import styles from "./Dropdown.module.scss";
import {DropdownContext} from "./Dropdown";

type PropsType = {
  children: string;
  icon?: JSX.Element;
  arrow: boolean;
};

export default function DropdownButton({children, icon, arrow}: PropsType) {
  const {setOpen} = useContext(DropdownContext);

  function handleClick() {
    setOpen((prev) => !prev);
  }

  return (
    <button className={styles.dropdown__button} onClick={handleClick}>
      {icon}
      {children}
      {arrow ? <img src={expandIcon} alt="" /> : undefined}
    </button>
  );
}
