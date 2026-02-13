import logo from "/images/logo.svg";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import unitsIcon from "/images/icon-units.svg";
import dropdownIcon from "/images/icon-dropdown.svg";
import styles from "./Header.module.scss";
import checkIcon from "/images/icon-checkmark.svg";
import clsx from "clsx";
import {useState} from "react";
import useClickOutside from "../../hooks/useClickOutside";

interface HeaderProps {
  setSpeedImperial: React.Dispatch<React.SetStateAction<boolean>>;
  setTempImperial: React.Dispatch<React.SetStateAction<boolean>>;
  setPrecipImperial: React.Dispatch<React.SetStateAction<boolean>>;
  imperial: {
    speed: boolean;
    temp: boolean;
    precipitation: boolean;
  };
}

export default function Header({
  setSpeedImperial,
  setTempImperial,
  setPrecipImperial,
  imperial,
}: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  function toggleUnits(setFn: React.Dispatch<React.SetStateAction<boolean>>) {
    setFn((prev) => !prev);
  }

  const [dropdownRef, controlRef] = useClickOutside<HTMLButtonElement>(setOpen);

  let numOfImperials: number = 0;
  for (const [, value] of Object.entries(imperial)) {
    if (value) {
      numOfImperials++;
    }
  }

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
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={styles.header__button}
          ref={controlRef}
        >
          <img src={unitsIcon} alt="" />
          Units
          <img src={dropdownIcon} alt="" />
        </button>
        <DropdownContent open={open} ref={dropdownRef}>
          <button className={styles.dropdown__switch} onClick={toggleAllUnits}>
            Switch to
            {numOfImperials > 1 ? " Metric" : " Imperial"}
          </button>

          <p className={styles.dropdown__title}>Temperature</p>
          <button
            className={clsx(
              styles.dropdown__button,
              !imperial.temp && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setTempImperial)}
            disabled={!imperial.temp}
          >
            <p>Celsius (˚C)</p>
            {imperial.temp ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button
            className={clsx(
              styles.dropdown__button,
              imperial.temp && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setTempImperial)}
            disabled={imperial.temp}
          >
            <p>Fahrenheit (˚F)</p>
            {imperial.temp ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>

          <hr className={styles.dropdown__divider} />

          <p className={styles.dropdown__title}>Wind Speed</p>
          <button
            className={clsx(
              styles.dropdown__button,
              !imperial.speed && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setSpeedImperial)}
            disabled={!imperial.speed}
          >
            <p>km / h</p>
            {imperial.speed ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button
            className={clsx(
              styles.dropdown__button,
              imperial.speed && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setSpeedImperial)}
            disabled={imperial.speed}
          >
            <p>mph</p>
            {imperial.speed ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>

          <hr className={styles.dropdown__divider} />

          <p className={styles.dropdown__title}>Precipitation</p>
          <button
            className={clsx(
              styles.dropdown__button,
              !imperial.precipitation && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setPrecipImperial)}
            disabled={!imperial.precipitation}
          >
            <p>millimetres (mm)</p>
            {imperial.precipitation ? undefined : (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            )}
          </button>
          <button
            className={clsx(
              styles.dropdown__button,
              imperial.precipitation && styles.dropdown__buttonActive,
            )}
            onClick={() => toggleUnits(setPrecipImperial)}
            disabled={imperial.precipitation}
          >
            <p>inches (in)</p>
            {imperial.precipitation ? (
              <img src={checkIcon} alt="" className={styles.dropdown__icon} />
            ) : undefined}
          </button>
        </DropdownContent>
      </Dropdown>
    </header>
  );
}
