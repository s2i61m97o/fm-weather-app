import logo from "/images/logo.svg";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import unitsIcon from "/images/icon-units.svg";
import dropdownIcon from "/images/icon-dropdown.svg";
import styles from "./Header.module.scss";
import useToggle from "../../hooks/useToggle";
import checkIcon from "/images/icon-checkmark.svg";
import clsx from "clsx";

interface HeaderProps {
  speedImperial: boolean;
  setSpeedImperial: React.Dispatch<React.SetStateAction<boolean>>;
  tempImperial: boolean;
  setTempImperial: React.Dispatch<React.SetStateAction<boolean>>;
  precipImperial: boolean;
  setPrecipImperial: React.Dispatch<React.SetStateAction<boolean>>;
  imperialStates: boolean[];
}

export default function Header({
  speedImperial,
  setSpeedImperial,
  tempImperial,
  setTempImperial,
  precipImperial,
  setPrecipImperial,
  imperialStates,
}: HeaderProps) {
  const [open, toggleOpen] = useToggle();
  function toggleUnits(setFn: React.Dispatch<React.SetStateAction<boolean>>) {
    setFn((prev) => !prev);
  }

  const numOfImperials = imperialStates.filter((state) => state).length;
  const toggleAllUnits = () => {
    if (numOfImperials > 1) {
      setPrecipImperial(false);
      setSpeedImperial(false);
      setTempImperial(false);
    } else {
      setPrecipImperial(true);
      setSpeedImperial(true);
      setTempImperial(true);
    }
  };

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
          <button className={styles.dropdown__switch} onClick={toggleAllUnits}>
            Switch to
            {numOfImperials > 1 ? " Metric" : " Imperial"}
          </button>

          <p className={styles.dropdown__title}>Temperature</p>
          <button
            className={clsx(
              styles.dropdown__button,
              !tempImperial && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setTempImperial)}
            disabled={!tempImperial}
          >
            <p>Celsius (˚C)</p>
            {tempImperial ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button
            className={clsx(
              styles.dropdown__button,
              tempImperial && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setTempImperial)}
            disabled={tempImperial}
          >
            <p>Fahrenheit (˚F)</p>
            {tempImperial ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>

          <hr className={styles.dropdown__divider} />

          <p className={styles.dropdown__title}>Wind Speed</p>
          <button
            className={clsx(
              styles.dropdown__button,
              !speedImperial && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setSpeedImperial)}
            disabled={!speedImperial}
          >
            <p>km / h</p>
            {speedImperial ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button
            className={clsx(
              styles.dropdown__button,
              speedImperial && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setSpeedImperial)}
            disabled={speedImperial}
          >
            <p>mph</p>
            {speedImperial ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>

          <hr className={styles.dropdown__divider} />

          <p className={styles.dropdown__title}>Precipitation</p>
          <button
            className={clsx(
              styles.dropdown__button,
              !precipImperial && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setPrecipImperial)}
            disabled={!precipImperial}
          >
            <p>millimetres (mm)</p>
            {precipImperial ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button
            className={clsx(
              styles.dropdown__button,
              precipImperial && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setPrecipImperial)}
            disabled={precipImperial}
          >
            <p>inches (in)</p>
            {precipImperial ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>
        </DropdownContent>
      </Dropdown>
    </header>
  );
}
