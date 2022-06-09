/*
 * Codepen Source for Dropdown: https://codepen.io/worsnupd/pen/VgZwOw
 */

import React, { useState } from "react";
import files from '../../Snippets/files.json'
import './Dropdown.css';

const Menu = ({ children }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [head, ...tail] = React.Children.toArray(children);
    
    return (
      <div
        className='menu'
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {head}
        {
          isOpen ?
            <div className='open' style={{opacity: 1}}>{tail}</div> :
            <div className='open' style={{opacity: 0}}>{tail}</div>
        }
      </div>
    );
  };
  
  const Item = ({ children, onClick }: any) => {
    return (
      <div className='item' onClick={onClick}>
        {children}
      </div>
    );
  };
  
  const Dropdown = (props: any) => {
    const [top, setTop] = useState(files.snippets[0]);
    const handleTop = (evt: any) => {
      setTop(evt.target.textContent);
      const file = require(`../../Snippets/${evt.target.textContent}.txt`);
      fetch(file)
      .then((r) => r.text())
      .then(text => {
          props.setCode(text)
      });
    }    
    return (
      <Menu>
          <Item onClick={()=>{}}>{top}</Item>
          {
            files.snippets.map(
              item => <Item onClick={handleTop}>{item}</Item>
            )
          }
      </Menu>
    )
  };
  
 export default Dropdown; 