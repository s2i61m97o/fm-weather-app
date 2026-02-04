import styles from "./Search.module.scss";
import {useState} from "react";
import type {ChangeEvent, MouseEvent} from "react";
import {getApiData} from "../../api";
import Dropdown from "../../components/Dropdown";
import type {Location} from "../../types";

export default function Search() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selected, setSelected] = useState(false);
  const [query, setQuery] = useState<string>("");

  async function getLocations(e: ChangeEvent<HTMLInputElement>) {
    const search: string = e.currentTarget.value;
    const results = await getApiData(search);
    setSelected(false);
    setQuery(search);
    if (search.trim() === "") {
      setLocations([]);
    } else {
      setLocations(results || []);
    }
  }

  function selectLocation(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setQuery(e.currentTarget.textContent);
    setSelected(true);
  }
  return (
    <section className={styles.search}>
      <h1 className={styles.search__header}>How's the sky looking today?</h1>
      <form action="get" className={styles.search__form}>
        <Dropdown>
          <Dropdown.Search
            onchange={(e: ChangeEvent<HTMLInputElement>) => getLocations(e)}
            placeholder="Search for a place"
            value={query}
            selected={selected}
          />
          <Dropdown.Content>
            {locations.length >= 1 ? (
              locations.map((location: Location) => (
                <Dropdown.Item
                  key={location.id}
                  id={location.id}
                  clickFunc={selectLocation}
                >
                  {`${location.name}, ${location?.admin1}, ${location.country}`}
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item icon="loading">
                Search in progress...
              </Dropdown.Item>
            )}
          </Dropdown.Content>
        </Dropdown>
        <button className={styles.search__button}>Search</button>
      </form>
    </section>
  );
}
