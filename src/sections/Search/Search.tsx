import styles from "./Search.module.scss";
import {useState} from "react";
import type {ChangeEvent, MouseEvent} from "react";
import useToggle from "../../hooks/useToggle";
import type {Forecast, Location, ErrorRes} from "../../types";
import {queryApiForecast, getQueryLocations} from "../../api/api";
import Dropdown from "../../components/Dropdown/Dropdown";
import DropdownContent from "../../components/Dropdown/DropdownContent";
import clsx from "clsx";

type SearchProps = {
  setForecastData: React.Dispatch<React.SetStateAction<Forecast | undefined>>;
  currentLocation: Location | undefined;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<Location | undefined>
  >;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: ErrorRes["error"] | undefined;
  setError: React.Dispatch<React.SetStateAction<ErrorRes["error"] | undefined>>;
  forecast: boolean;
};

export default function Search({
  setForecastData,
  currentLocation,
  setCurrentLocation,
  setLocationName,
  loading,
  setLoading,
  error,
  setError,
  forecast,
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
    if (!locations?.success) {
      setError(locations?.error);
      return;
    }
    setQueryLocations(locations?.data);
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
    // Close dropdown menu, set loading state
    if (open) {
      toggleOpen();
    }
    setLoading(true);

    // handle empty input
    if (!query) {
      setError({
        type: "EMPTY_INPUT",
        status: 0,
        userMessage: "Please enter a location",
        shouldRetry: false,
        details: "empty input on submit",
      });
      setLoading(false);
      return;
    }

    // Case nothing selected from dropdown
    if (!currentLocation) {
      setError({
        type: "EMPTY_INPUT",
        status: 0,
        userMessage: "Please select a location from the dropdown",
        shouldRetry: false,
        details: "empty input on submit",
      });
      return;
    }

    const {latitude: lat, longitude: long} = currentLocation;

    // get forecast
    try {
      const res = await queryApiForecast(lat, long);
      // handle error response
      if (!res || !res.success) {
        setError(res?.error);
        return;
      }
      // set the location name and data, reset query
      setLocationName(`${currentLocation.name}, ${currentLocation.country}`);
      setForecastData(res?.data);
      setQuery("");
    } finally {
      // remove loading state
      setLoading(false);
    }
  }

  function handleFocus() {
    if (error?.type === "EMPTY_INPUT") {
      setError(undefined);
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
    <section className={clsx(styles.search, !forecast && styles.searchInitial)}>
      <h1 className={styles.search__header}>How's the sky looking today?</h1>
      <form action="get" className={styles.search__form}>
        <Dropdown>
          <p
            className={clsx(
              error?.type === "EMPTY_INPUT" && styles.search__error,
            )}
          >
            {error?.userMessage}
          </p>
          <div className={styles.search__wrapper}>
            <input
              type="text"
              className={clsx(
                styles.search__input,
                error?.type === "EMPTY_INPUT" && styles.search__inputError,
              )}
              onChange={handleInput}
              value={query}
              onFocus={handleFocus}
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
          disabled={loading}
        >
          Search
        </button>
      </form>
    </section>
  );
}
