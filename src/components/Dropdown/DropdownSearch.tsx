import {useContext, useEffect} from "react";
import type {ChangeEvent} from "react";
import {DropdownContext} from "./Dropdown";
import styles from "./Dropdown.module.scss";

export default function DropdownSearch({
  onchange,
  placeholder,
  value,
  selected,
}: {
  onchange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  placeholder: string;
  value: string;
  selected: boolean;
}) {
  const {setOpen} = useContext(DropdownContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length > 0) {
      setOpen(true);
      onchange(e);
    } else {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (selected) {
      setOpen(false);
    }
  }, [selected, setOpen]);

  return (
    <div className={styles.dropdown__search}>
      <input
        type="text"
        className={styles.dropdown__input}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
