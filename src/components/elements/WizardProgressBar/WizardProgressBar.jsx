import React from 'react';
import SoundIcon from '../../../assets/icons/volume-up.svg';
import LightBulbIcon from '../../../assets/icons/lightbulb.svg';
import DownloadIcon from '../../../assets/icons/download.svg';
import ReadPassageIcon from '../../../assets/icons/read-passage.svg';
import styles from './WizardProgressBar.module.scss';

const WizardProgressBar = () => {
    return (
        <div>
            <div className={styles.wizardContainer}>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: '#21BCB6' }}
                >
                    <div></div>
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: '#9198A3' }}
                >
                    <div></div>
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: `#ECEDEF` }}
                >
                    <div></div>
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: `#ECEDEF` }}
                >
                    <div></div>
                </div>
                <div
                    className={styles.progressBarContainer}
                    style={{ width: `${100 / 5 - 1}%`, backgroundColor: `#ECEDEF` }}
                >
                    <div></div>
                </div>
            </div>
            <div className={styles.helpContainer}>
                <div className={styles.helperBtnContainer}>
                    <div className={styles.helperBtnSection}><img width={'17px'} height={'14px'} src={SoundIcon} /></div>
                    <div className={styles.helperBtnSection}><img width={'17px'} height={'14px'} src={DownloadIcon} /></div>
                    <div className={`${styles.helperBtnSection} ${styles.readBtn}`} style={{ justifyContent: 'space-evenly'}}><img width={'17px'} height={'14px'} src={ReadPassageIcon} /><span>Read Passage</span></div>
                </div>
                <div className={styles.screenHeadingContainer}>
                    <div className={styles.screenTitle}>Title</div>
                    <div className={styles.screenSubtitle}>Subtitle</div>
                </div>
                <div className={styles.helpBtnContainer}>
                    <div>Need Help?</div>
                    <div className={styles.lightBulbBtn}>
                        <img width={'12px'} height={'17px'} src={LightBulbIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WizardProgressBar