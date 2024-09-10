import React from 'react';
import MenuIcon from '../../../assets/icons/menu-icon.svg';
import ResizerIcon from '../../../assets/icons/compress-alt-solid.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <img src={MenuIcon}  />
      </div>
      <div className={styles.surveyTitle}>
        Solar Energy
      </div>
      <div>
        <img src={ResizerIcon} />
      </div>
    </div>
  )
}

export default Header