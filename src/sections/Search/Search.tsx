import styles from "./Search.module.scss";
import {useState} from "react";
import type {ChangeEvent} from "react";
import {getApiData} from "../../api";
import Dropdown from "../../components/Dropdown";
import type {Location} from "../../types";

export default function Search() {
  const [locations, setLocations] = useState<Location[]>([]);

  async function getLocations(e: ChangeEvent<HTMLInputElement>) {
    const search: string = e.currentTarget.value;
    const results = await getApiData(search);
    setLocations(results || []);
  }
  return (
    <section className={styles.search}>
      <h1 className={styles.search__header}>How's the sky looking today?</h1>
      <form action="get" className={styles.search__form}>
        <Dropdown>
          <Dropdown.Search
            onchange={(e: ChangeEvent<HTMLInputElement>) => getLocations(e)}
            placeholder="Search for a place"
          />
          <Dropdown.Content>
            {locations.length >= 1 ? (
              locations.map((location: Location) => (
                <Dropdown.Item
                  key={location.id}
                >{`${location.name}, ${location.state}, ${location.country}`}</Dropdown.Item>
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
