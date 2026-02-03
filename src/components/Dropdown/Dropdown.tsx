import type {JSX} from "react";
import styles from "./Dropdown.module.scss";
import {createContext, useState} from "react";

type DropdownContextType = {
  open: true | false;
  setOpen: React.Dispatch<React.SetStateAction<true | false>>;
};

const DropdownContext = createContext<DropdownContextType>({
  open: false,
  setOpen: () => {},
});

export default function Dropdown({children}: {children: JSX.Element[]}) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{open, setOpen}}>
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
}

export {DropdownContext};
