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
  isAnswerCorrect,
  attempts,
  handleTryAgain,
  slideType,
}) => {
  const parseHtmlContent = (htmlString) => {
    return { __html: htmlString };
  };
  console.log('feedback', isAnswerCorrect, submitted);

  return (
    <div className={styles.footerContainer}>
      <button className={`${styles.btn} ${styles.btnPrimary}`}>
        <div className={styles.btnContent}>
          <button onClick={() => handleSubmit('back')}>
            {' '}
            <img src={AngleLeftIcon} />
            Go Back
          </button>
        </div>
      </button>

      {/* CORRECT-ANSWER-MESSAGE */}
      {submitted && isAnswerCorrect && (
        <div
          className={`${styles.success} ${styles.messageContainer} ${
            slideType ? styles.fibstyle : ''
          }`}
        >
          <div className={styles.leftContent}>
            <div className={styles.audioBtn}>
              <img width={'17px'} height={'14px'} src={SoundIcon} />
            </div>
            <div className={styles.correctIcon}>
              <img src={CorrectIcon} />
            </div>
            <div className={styles.successMsg}>{renderFeedback()}</div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.btnContent}>
              <button
                className={`${styles.successMsg} ${styles.seeWhyBtn}`}
                // onClick={handleSubmit}
              >
                See Why? <img src={AngleRightIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* CORRECT-ANSWER-MESSAGE */}

      {/* WRONG-ANSWER-MESSAGE */}
      {submitted && !isAnswerCorrect && (
        <div
          className={`${styles.error} ${styles.messageContainer} ${
            slideType ? styles.fibstyle : ''
          }`}
        >
          <div className={styles.leftContent}>
            <div className={styles.audioBtn}>
              <img width={'17px'} height={'14px'} src={SoundIcon} />
            </div>
            <div className={styles.wrongIcon}>
              <img src={WrongIcon} />
            </div>
            <div className={styles.successMsg}>{renderFeedback()}</div>
          </div>
          <div className={`${styles.error} ${styles.rightContent}`}>
            <div className={styles.btnContent}>
              <button
                className={`${styles.successMsg} ${styles.showAnswersBtn}`}
                // onClick={handleSubmit}
              >
                Show Answers <img src={RedRightIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* WRONG-ANSWER-MESSAGE */}

      {isAnswerCorrect}
      {/* {submitted && (
          <div dangerouslySetInnerHTML={parseHtmlContent(seeWhyContent)} />
        )} */}

      <button
        onClick={
          submitted && attempts < 3 && !isAnswerCorrect
            ? () => handleSubmit('tryagain')
            : isAnswerCorrect && submitted
            ? () => handleSubmit('next')
            : () => handleSubmit('submit')
        }
        disabled={!selectedOption}
        className={`${styles.btn} ${styles.btnSecondary}`}
      >
        <div className={styles.btnContent}>
          {submitted && attempts < 3 && !isAnswerCorrect
            ? 'Try Again'
            : isAnswerCorrect && submitted
            ? 'Next'
            : 'Submit Answer'}{' '}
          <img src={AngleRightIcon} />
        </div>
      </button>
    </div>
  );
};

export default Footer;
