import logo from "/images/logo.svg";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import unitsIcon from "/images/icon-units.svg";
import dropdownIcon from "/images/icon-dropdown.svg";
import styles from "./Header.module.scss";
import useToggle from "../../hooks/useToggle";
import checkIcon from "/images/icon-checkmark.svg";

export default function Header({
  imperial,
  setImperial,
}: {
  imperial: boolean;
  setImperial: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, toggleOpen] = useToggle();
  function toggleUnits() {
    setImperial((prev) => !prev);
  }
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="Weather Now Logo" />
      <Dropdown>
        <button onClick={toggleOpen} className={styles.header__button}>
          <img src={unitsIcon} alt="" />
          Units
          <img src={dropdownIcon} alt="" />
        </button>
        <DropdownContent open={open}>
          <button onClick={toggleUnits} className={styles.dropdown__switch}>
            Switch to {imperial ? "Metric" : "Imperial"}
          </button>
          <p className={styles.dropdown__title}>Temperature</p>
          <button className={styles.dropdown__button}>
            <p>Celsius (˚C)</p>
            {imperial ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button className={styles.dropdown__button}>
            <p>Fahrenheit (˚F)</p>
            {imperial ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>
          <hr className={styles.dropdown__divider} />
          <p className={styles.dropdown__title}>Wind Speed</p>
          <button className={styles.dropdown__button}>
            <p>km / h</p>
            {imperial ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button className={styles.dropdown__button}>
            <p>mph</p>
            {imperial ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>
          <hr className={styles.dropdown__divider} />
          <p className={styles.dropdown__title}>Precipitation</p>
          <button className={styles.dropdown__button}>
            <p>millimetres (mm)</p>
            {imperial ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button className={styles.dropdown__button}>
            <p>inches (in)</p>
            {imperial ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>
        </DropdownContent>
      </Dropdown>
    </header>
  );
}
