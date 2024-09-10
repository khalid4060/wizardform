import React from 'react';
import styles from './Footer.module.scss';
import AngleLeftIcon from '../../../assets/icons/angle-left.svg';
import AngleRightIcon from '../../../assets/icons/angle-right.svg';

const Footer = ({ handleSubmit, renderFeedback, submitted, seeWhyContent }) => {
  const parseHtmlContent = (htmlString) => {
    return { __html: htmlString };
  };
  return (
    <div className={styles.footerContainer}>
      <div>
        <button className={`${styles.btn} ${styles.btnPrimary}`}>
          <div className={styles.btnContent}>
            <div>
              <img src={AngleLeftIcon} />
            </div>
            <div>Go Back</div>
          </div>
        </button>
      </div>
      {submitted && renderFeedback()}
      {submitted && (
        <div dangerouslySetInnerHTML={parseHtmlContent(seeWhyContent)} />
      )}
      <div>
        <button className={`${styles.btn} ${styles.btnSecondary}`}>
          <div className={styles.btnContent}>
            <button onClick={handleSubmit}>Submit Answer</button>
            <div>
              <img src={AngleRightIcon} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Footer;
