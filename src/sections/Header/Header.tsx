import logo from "/images/logo.svg";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import unitsIcon from "/images/icon-units.svg";
import styles from "./Header.module.scss";
import useToggle from "../../hooks/useToggle";

export default function Header() {
  const [open, toggleOpen] = useToggle();
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="Weather Now Logo" />
      <Dropdown>
        <button onClick={toggleOpen} className={styles.header__button}>
          <img src={unitsIcon} />
          Units
        </button>
        <DropdownContent open={open}>
          <button>Switch to Imperial</button>
          <p className={styles.dropdown__title}>Temperature</p>
          <button>Celsius (˚C)</button>
          <button>Fahrenheit (˚F)</button>
          <hr />
          <p className={styles.dropdown__title}>Wind Speed</p>
          <button>km / h</button>
          <button>mph (˚F)</button>
          <hr />
          <p className={styles.dropdown__title}>Precipitation</p>
          <button>millimetres (mm)</button>
          <button>inches (in)</button>
        </DropdownContent>
      </Dropdown>
    </header>
  );
}
