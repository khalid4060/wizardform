import React from 'react';
import SoundIcon from '../../../assets/icons/volume-up.svg';
import LightBulbIcon from '../../../assets/icons/lightbulb.svg';
import DownloadIcon from '../../../assets/icons/download.svg';
import ReadPassageIcon from '../../../assets/icons/read-passage.svg';
import styles from './style.module.scss';

const WizardProgressBar = ({
  formData,
  currentSlide,
  thinkingOrganizerTitle,
}) => {
  return (
    <div>
      <div className={styles.wizardContainer}>
        {formData.map((slide) => {
          return (
            <div
              className={styles.progressBarContainer}
              style={{
                width: `${100 / formData.length - 1}%`,
                backgroundColor:
                  currentSlide.id === slide.id
                    ? '#9198A3'
                    : slide.submitted === true
                    ? '#21BCB6'
                    : `#ECEDEF`,
              }}
            ></div>
          );
        })}
        {/* <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: '#21BCB6' }}
                >
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: currentSlide.id === slide.id? '#9198A3' : currentSlide.wizard.submitted === true? '#21BCB6' : `#ECEDEF` }}
                >
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: `#ECEDEF` }}
                >
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: `#ECEDEF` }}
                >
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: `#ECEDEF` }}
                >
                </div> */}
      </div>
      <div className={styles.helpContainer}>
        <div className={styles.helperBtnContainer}>
          <div className={styles.helperBtnSection}>
            <img width={'17px'} height={'14px'} src={SoundIcon} />
          </div>
          <div className={styles.helperBtnSection}>
            <img width={'17px'} height={'14px'} src={DownloadIcon} />
          </div>
          <div
            className={`${styles.helperBtnSection} ${styles.readBtn}`}
            style={{ justifyContent: 'space-evenly' }}
          >
            <img width={'17px'} height={'14px'} src={ReadPassageIcon} />
            <span>Read Passage</span>
          </div>
        </div>
        <div className={styles.screenHeadingContainer}>
          <div className={styles.screenTitle}>
            {currentSlide.type === 'thinking-organizer'
              ? thinkingOrganizerTitle
              : `Screen ${currentSlide.index + 1}`}
          </div>
          {/* <div className={styles.screenSubtitle}>MCQ</div> */}
        </div>
        <div className={styles.helpBtnContainer}>
          <div>Need Help?</div>
          <div className={styles.lightBulbBtn}>
            <img width={'12px'} height={'17px'} src={LightBulbIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardProgressBar;
