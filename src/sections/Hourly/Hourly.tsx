import Dropdown from "../../components/Dropdown/Dropdown";
import type {HourForecast} from "../../types";
import styles from "./Hourly.module.scss";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import {useEffect, useState, type JSX} from "react";
import {getIcon, toFahrenheit} from "../../utils";
import type {MouseEvent} from "react";
import {DAYS} from "../../constants";
import dropdownIcon from "/images/icon-dropdown.svg";
import useClickOutside from "../../hooks/useClickOutside";

type Card = {
  day: string;
  time: number;
  element: JSX.Element;
};

export default function Hourly({
  forecast,
  imperial,
  timezone,
}: {
  forecast: HourForecast | undefined;
  imperial: boolean;
  timezone: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<string>();

  const [dropdownRef, controlRef] = useClickOutside<HTMLButtonElement>(setOpen);

  const today = new Date().toLocaleDateString("utc", {
    weekday: "long",
    timeZone: timezone,
  });

  //Set using a useEffect so only runs on first render
  useEffect(() => {
    setDay(today);
  }, [today]);

  if (!forecast?.time) {
    return;
  }

  const imperialTemp = forecast.temperature_2m.map((temp) => {
    return toFahrenheit(temp);
  });

  const cards: Card[] = forecast.time.map((time, index) => {
    const cardDay = new Date(time).toLocaleDateString("utc", {
      weekday: "long",
      timeZone: timezone,
    });
    const cardTime = new Date(time);
    const time24hrs = cardTime.getHours();
    const time12hrs = cardTime.toLocaleTimeString("utc", {
      timeZone: timezone,
      hour12: true,
      hour: "numeric",
    });
    const icon = getIcon(forecast.weather_code[index]);
    return {
      day: cardDay,
      time: time24hrs,
      element: (
        <div className={styles.hourly__card}>
          <img src={icon} alt="" className={styles.hourly__icon} />
          <p>{time12hrs}</p>
          <p className={styles.hourly__temp}>
            {imperial
              ? imperialTemp[index]
              : Math.round(forecast.temperature_2m[index])}
            ˚
          </p>
        </div>
      ),
    };
  });

  const displayCards = cards
    .filter((card) => card.day === day)
    .filter((card) =>
      day === today ? card.time >= new Date().getHours() : card,
    )
    .map((card, index) => <span key={index}>{card.element}</span>);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const value = e.currentTarget.textContent;
    setDay(value);
    setOpen(false);
  }

  return (
    <section className={styles.hourly}>
      <div className={styles.hourly__header}>
        <h3 className={styles.hourly__title}>Hourly forecast</h3>
        <Dropdown>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={styles.hourly__button}
            ref={controlRef}
            aria-expanded={open}
          >
            {day}
            <img src={dropdownIcon} alt="" />
          </button>
          <DropdownContent open={open} ref={dropdownRef}>
            {DAYS.map((day, index) => {
              if (index === DAYS.length - 1) {
                return (
                  <button
                    key={day}
                    onClick={handleClick}
                    className={
                      today === day ? styles.dropdown__itemActive : undefined
                    }
                    onBlur={() => setOpen(false)}
                  >
                    {day}
                  </button>
                );
              }
              return (
                <button
                  key={day}
                  onClick={handleClick}
                  className={
                    today === day ? styles.dropdown__itemActive : undefined
                  }
                >
                  {day}
                </button>
              );
            })}
          </DropdownContent>
        </Dropdown>
      </div>
      <div className={styles.hourly__container}>{displayCards}</div>
    </section>
  );
}
