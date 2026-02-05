import {useState} from "react";
export default function useToggle() {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return [open, toggleOpen] as const;
}
