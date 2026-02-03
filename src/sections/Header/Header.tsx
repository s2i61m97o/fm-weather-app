import logo from "/images/logo.svg";
import Dropdown from "../../components/Dropdown";
import unitsIcon from "/images/icon-units.svg";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="Weather Now Logo" />
      <div>
        <Dropdown>
          <Dropdown.Button icon={<img src={unitsIcon} />} arrow>
            Units
          </Dropdown.Button>
          <Dropdown.Content>
            <Dropdown.Title>Switch to Imperial</Dropdown.Title>
            <Dropdown.Group title="temperature">
              <Dropdown.Item>Celsius (˚C)</Dropdown.Item>
              <Dropdown.Item>Fahrenheit (˚F)</Dropdown.Item>
            </Dropdown.Group>
            <hr className={styles.header__divider} />
            <Dropdown.Group title="wind speed">
              <Dropdown.Item>km /h</Dropdown.Item>
              <Dropdown.Item>mph</Dropdown.Item>
            </Dropdown.Group>
            <hr className={styles.header__divider} />
            <Dropdown.Group title="precipitation">
              <Dropdown.Item>Millimetres (mm)</Dropdown.Item>
              <Dropdown.Item>Inches (in)</Dropdown.Item>
            </Dropdown.Group>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </header>
  );
}
