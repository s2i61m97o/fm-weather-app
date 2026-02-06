import styles from "./Search.module.scss";
import {useState} from "react";
import type {ChangeEvent, MouseEvent} from "react";
import {queryApiForecast, getQueryLocations} from "../../api";
import Dropdown from "../../components/Dropdown/Dropdown";
import type {Forecast, Location} from "../../types";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import useToggle from "../../hooks/useToggle";

type SearchProps = {
  setForecastData: React.Dispatch<React.SetStateAction<Forecast | undefined>>;
  currentLocation: Location | undefined;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<Location | undefined>
  >;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({
  setForecastData,
  currentLocation,
  setCurrentLocation,
  setLocationName,
}: SearchProps) {
  const [open, toggleOpen] = useToggle();
  const [query, setQuery] = useState<string>("");
  const [queryLocations, setQueryLocations] = useState<Location[]>([]);

  async function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const query = e.currentTarget.value;
    setQuery(query);
    if (!open) {
      toggleOpen();
    } else if (open && query.length === 0) {
      toggleOpen();
    }
    const locations = await getQueryLocations(query);
    setQueryLocations(locations);
  }

  function handleSelection(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const locationId = e.currentTarget.id;
    const selectedLocation = queryLocations?.find(
      (location) => location.id.toString() === locationId,
    );
    setQuery(
      `${selectedLocation?.name}, ${selectedLocation?.admin1}, ${selectedLocation?.country}`,
    );
    setCurrentLocation(selectedLocation);
    if (open) {
      toggleOpen();
    }
  }

  async function getLocationForecast(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!currentLocation) {
      return; //Error => please search for location;
    }
    const lat = currentLocation.latitude;
    const long = currentLocation.longitude;
    const res = await queryApiForecast(lat, long);
    setLocationName(`${currentLocation.name}, ${currentLocation.country}`);
    setForecastData(res);
    setQuery("");
  }

  const dropdownContent = queryLocations?.map((location: Location) => {
    return (
      <button
        key={location.id}
        id={location.id.toString()}
        onClick={handleSelection}
      >{`${location.name}, ${location.admin1}, ${location.country}`}</button>
    );
  });

  return (
    <section className={styles.search}>
      <h1 className={styles.search__header}>How's the sky looking today?</h1>
      <form action="get" className={styles.search__form}>
        <Dropdown>
          <div className={styles.search__wrapper}>
            <input
              type="text"
              className={styles.search__input}
              onChange={handleInput}
              value={query}
            />
          </div>

          <DropdownContent open={open}>
            {dropdownContent ? (
              dropdownContent
            ) : (
              <button disabled>Searching for locations</button>
            )}
          </DropdownContent>
        </Dropdown>
        <button
          className={styles.search__button}
          onClick={(e) => getLocationForecast(e)}
        >
          Search
        </button>
      </form>
    </section>
  );
}
