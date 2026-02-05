import styles from "./Search.module.scss";
import {useState} from "react";
import type {ChangeEvent, MouseEvent} from "react";
import {getApiData} from "../../api";
import Dropdown from "../../components/Dropdown/Dropdown";
import type {Location} from "../../types";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import useToggle from "../../hooks/useToogle";

export default function Search() {
  const [open, toggleOpen] = useToggle();
  const [queryLocations, setQueryLocations] = useState([]);

  async function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const query = e.currentTarget.value;
    if (!open) {
      toggleOpen();
    } else if (open && query.length === 0) {
      toggleOpen();
    }
    const locations = await getApiData(query);
    setQueryLocations(locations);
  }

  const dropdownContent = queryLocations?.map((location: Location) => {
    return (
      <button
        key={location.id}
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
