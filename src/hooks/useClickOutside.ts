import {useRef, useEffect} from "react";

export default function useClickOutside<
  T extends HTMLElement = HTMLButtonElement,
>(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !controlRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return [dropdownRef, controlRef] as const;
}
