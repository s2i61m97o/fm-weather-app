import DropdownRoot from "./Dropdown";
import DropdownButton from "./DropdownButton";
import DropdownItem from "./DropdownItem";
import DropdownTitle from "./DropdownTitle";
import DropdownGroup from "./DropdownGroup";
import DropdownContent from "./DropdownContent";
import DropdownSearch from "./DropdownSearch";

const Dropdown = Object.assign(DropdownRoot, {
  Button: DropdownButton,
  Content: DropdownContent,
  Search: DropdownSearch,
  Group: DropdownGroup,
  Item: DropdownItem,
  Title: DropdownTitle,
});

export default Dropdown;
