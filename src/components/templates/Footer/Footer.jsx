import React from 'react';
import styles from './Footer.module.scss';
import SoundIcon from '../../../assets/icons/volume-up.svg';
import CorrectIcon from '../../../assets/icons/correct-icon.svg';
import AngleLeftIcon from '../../../assets/icons/angle-left.svg';
import AngleRightIcon from '../../../assets/icons/angle-right.svg';
import WrongIcon from '../../../assets/icons/wrong-icon.svg';
import RedRightIcon from '../../../assets/icons/red-right-icon.svg';

const Footer = ({
  handleSubmit,
  feedback,
  renderFeedback,
  submitted,
  seeWhyContent,
  selectedOption,
  btnAction,
}) => {
  console.log('feedback', feedback);
  const parseHtmlContent = (htmlString) => {
    return { __html: htmlString };
  };
  return (
    <>
      <div className={styles.footerContainer}>
        <div onClick={() => handleSubmit('back')} className={`${styles.btnPrimary} ${styles.btnContent}`}>
          <button>
            {' '}
            <img src={AngleLeftIcon} />
            Go Back
          </button>
        </div>

        {/* CORRECT-ANSWER-MESSAGE */}
        {/* <div className={`${styles.success} ${styles.messageContainer}`}>
        <div className={styles.leftContent}>
          <div className={styles.audioBtn}><img width={'17px'} height={'14px'} src={SoundIcon} /></div>
          <div className={styles.correctIcon}><img src={CorrectIcon} /></div>
          <div className={styles.successMsg}>Well done, it’s a correct answer.</div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.btnContent}>
            <button className={`${styles.successMsg} ${styles.seeWhyBtn}`} onClick={handleSubmit}>See Why?  <img src={AngleRightIcon} /></button>
          </div>
        </div>
      </div> */}
        {/* CORRECT-ANSWER-MESSAGE */}

        {/* WRONG-ANSWER-MESSAGE */}
        {/* <div className={`${styles.error} ${styles.messageContainer}`}>
          <div className={styles.leftContent}>
            <div className={styles.audioBtn}>
              <img width={'17px'} height={'14px'} src={SoundIcon} />
            </div>
            <div className={styles.wrongIcon}>
              <img src={WrongIcon} />
            </div>
            <div className={styles.successMsg}>
              Oops, almost there. Try one more time.
            </div>
          </div>
          <div className={`${styles.error} ${styles.rightContent}`}>
            <div className={styles.btnContent}>
              <button
                className={`${styles.successMsg} ${styles.showAnswersBtn}`}
                onClick={handleSubmit}
              >
                Show Answers <img src={RedRightIcon} />
              </button>
            </div>
          </div>
        </div> */}
        {/* WRONG-ANSWER-MESSAGE */}

        {/* {submitted && renderFeedback()} */}
        {/* {submitted && (
          <div dangerouslySetInnerHTML={parseHtmlContent(seeWhyContent)} />
        )} */}

        <div onClick={() => handleSubmit('next')} className={` ${styles.btnSecondary}`}>
          <button 
            // disabled={!selectedOption}
          >
            {btnAction ? 'Submit Answer' : 'Next'} <img src={AngleRightIcon} />
          </button>
        </div>
      </div>

      {/* mobile view  */}
      <div className={styles.mobileFooterContainer}>
        <div>
          {/* CORRECT-ANSWER-MESSAGE */}
          {/* <div className={`${styles.success} ${styles.messageContainer}`}>
        <div className={styles.leftContent}>
          <div className={styles.audioBtn}><img width={'17px'} height={'14px'} src={SoundIcon} /></div>
          <div className={styles.correctIcon}><img src={CorrectIcon} /></div>
          <div className={styles.successMsg}>Well done, it’s a correct answer.</div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.btnContent}>
            <button className={`${styles.successMsg} ${styles.seeWhyBtn}`} onClick={handleSubmit}>See Why?  <img src={AngleRightIcon} /></button>
          </div>
        </div>
      </div> */}
          {/* CORRECT-ANSWER-MESSAGE */}

          {/* WRONG-ANSWER-MESSAGE */}
          {/* <div className={`${styles.error} ${styles.messageContainer}`}>
            <div className={styles.leftContent}>
              <div className={styles.wrongIcon}>
                <img src={WrongIcon} />
              </div>
              <div className={styles.successMsg}>
                Oops, almost there. Try one more time.
              </div>
            </div>
            <div className={`${styles.error} ${styles.rightContent}`}>
              <div className={styles.btnContent}>
                <button
                  className={`${styles.successMsg} ${styles.showAnswersBtn}`}
                  onClick={handleSubmit}
                >
                  Show Answers <img src={RedRightIcon} />
                </button>
              </div>
            </div>
          </div> */}
          {/* WRONG-ANSWER-MESSAGE */}

          {/* {submitted && renderFeedback()} */}
          {/* {submitted && (
          <div dangerouslySetInnerHTML={parseHtmlContent(seeWhyContent)} />
        )} */}
        </div>
        <div className={styles.mobileButtonContainer}>
          <div onClick={() => handleSubmit('back')} className={`${styles.btnPrimary} ${styles.btnContent}`}>
            <button>
              {' '}
              <img src={AngleLeftIcon} />
              <span> Go Back</span>
            </button>
          </div>
          <div onClick={() => handleSubmit('next')} className={` ${styles.btnSecondary}`}>
            <button 
              // disabled={!selectedOption}
            >
              <span>{btnAction ? 'Submit Answer' : 'Next'} </span>
              <img src={AngleRightIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
