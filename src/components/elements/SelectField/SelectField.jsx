import React from 'react';
import { dropdownContainer } from './SelectField.module.scss';
function Dropdown() {
  return (
 
      <select className={dropdownContainer}>
        <option value="">select...</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
  
  );
}

export default Dropdown;
