import styles from "./Search.module.scss";
import {useState} from "react";
import type {ChangeEvent, MouseEvent} from "react";
import {getQueryLocations} from "../../api";
import Dropdown from "../../components/Dropdown/Dropdown";
import type {Location} from "../../types";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import useToggle from "../../hooks/useToogle";

export default function Search({
  setLocation,
}: {
  setLocation: React.Dispatch<React.SetStateAction<Location | undefined>>;
}) {
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
    setLocation(selectedLocation);
    if (open) {
      toggleOpen();
    }
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
        <button className={styles.search__button}>Search</button>
      </form>
    </section>
  );
}
