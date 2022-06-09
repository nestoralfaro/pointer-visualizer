import Dropdown from "./Dropdown";
import LinkSwitch from "./LinkSwitch";
import Notice from "./Notice";
import './Header.css';
import { Dispatch, SetStateAction } from "react";

interface Props {
  onShowLinks: Dispatch<SetStateAction<boolean>>;
  onChange: Dispatch<SetStateAction<string>>;
}

const Header = ({onShowLinks, onChange}: Props) => {
  return (
    <nav className="header">
      <header className="title">Pointer Visualizer <Notice/> </header> 
      <LinkSwitch setShowLinks={onShowLinks}/>
      <Dropdown setCode={onChange}/>
    </nav>
  )
}

export default Header;