import {useContext} from "react";
import type {ChangeEvent} from "react";
import {DropdownContext} from "./Dropdown";
import styles from "./Dropdown.module.scss";

export default function DropdownSearch({
  onchange,
  placeholder,
}: {
  onchange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  placeholder: string;
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

  return (
    <div className={styles.dropdown__search}>
      <input
        type="text"
        className={styles.dropdown__input}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
