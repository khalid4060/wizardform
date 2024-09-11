import React from 'react';
import MenuIcon from '../../../assets/icons/menu-icon.svg';
import ResizerIcon from '../../../assets/icons/compress-alt-solid.svg';
import styles from './Header.module.scss';

const Header = ({ onAction,setOnAction }) => {
  const handleclick=()=>{
    setOnAction(!onAction)
  }
  return (
    <div className={styles.headerContainer}>
      <div>
        <img src={MenuIcon}  />
      </div>
      <div className={styles.surveyTitle}>
        Solar Energy
      </div>
      <div onClick={handleclick}>
        <img src={ResizerIcon} />
      </div>
    </div>
  )
}

export default Header