import React, { useState } from 'react';
import MenuIcon from '../../../assets/icons/menu-icon.svg';
import MinimizeIcon from '../../../assets/icons/minimize-icon.svg';
import MaximizeIcon from '../../../assets/icons/maximize-icon.svg';
import styles from './Header.module.scss';

const Header = ({ onAction,setOnAction }) => {
  const [isScreenMax, setScreenSizeStatus] = useState(false);
  const handleScreenSize=()=>{
    const element = document.getElementById("root");
    if (!isScreenMax) {
      setScreenSizeStatus(true);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // For Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // For IE/Edge
      element.msRequestFullscreen();
    }
    } else {
      setScreenSizeStatus(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  }
  return (
    <div className={styles.headerContainer}>
      <div>
        <img src={MenuIcon}  />
      </div>
      <div className={styles.surveyTitle}>
        Solar Energy
      </div>
      <div style={{ padding: '4px'}} onClick={() => handleScreenSize(isScreenMax)}>
        <img width={'14px'} src={isScreenMax? MinimizeIcon : MaximizeIcon} />
      </div>
    </div>
  )
}

export default Header