import React from 'react';
import styles from './MCQ.module.scss';

const MCQ = () => {
  return (
    <div className={styles.mulitpleChoiceContainer}>

      {/* Question Statement */}
      <div className={styles.contentBox}>
        <h2>Which of the following statements most accurately describes a key aspect of Solar Energy, as outlined in the passage, in terms of its functionality, applications, and overall benefits to both individuals and the environment?</h2>
      </div>
      {/* Question Statement */}

      <p className={styles.instructionHeading}>Select the Correct Answer:</p>
      <div className={styles.optionsContainer}>
        {/* OPTION 1 */}
        <label for='option-1' className={styles.cardBox}>
          <div className={styles.option}>
            <input id='option-1' type='radio' />
          </div>
          {/* <label for='option-1'> */}
            <div className={styles.optionLabel}>
            The process of converting sunlight into direct current (DC) and then to alternating current (AC) for use in homes and businesses.
            </div>
          {/* </label> */}
        </label>
        {/* OPTION 1 */}

        {/* OPTION 2 */}
        <label for='option-2' className={styles.cardBox}>
          <div className={styles.option}>
            <input id='option-2' type='radio' />
          </div>
          <div className={styles.optionLabel}>
          Low maintenance costs associated with solar panels
          </div>
        </label>
        {/* OPTION 2 */}

        {/* OPTION 3 */}
        <label for='option-3' className={styles.cardBox}>
          <div className={styles.option}>
            <input id='option-3' type='radio' />
          </div>
          <div className={styles.optionLabel}>
          Environmental impact, focusing on reduced greenhouse gas emissions and combating climate change.
          </div>
        </label>
        {/* OPTION 3 */}

        {/* OPTION 4 */}
        <label for='option-4' className={styles.cardBox}>
          <div className={styles.option}>
            <input id='option-4' type='radio' />
          </div>
          <div className={styles.optionLabel}>
          Reducing electricity bills through solar power.
          </div>
        </label>
        {/* OPTION 4 */}
      </div>
    </div>
  )
}

export default MCQ;