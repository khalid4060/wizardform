import React, { useState } from 'react'
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import MCQ from '../../widgets/MCQ/MCQ';
import Footer from '@components/templates/Footer/Footer';
import styles from './Questions.module.scss';
import MultipleChoiceQuestion from '../../questions/MultipleChoiceQuestion';
import { dummyData } from '../../../utils/const';

const Questions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    if (submitted) return;
    setAttempts(attempts + 1);
    setSubmitted(true);
  };

  return (
    <div>
      <Header />
      <div className='mainContainer'>
        <div className={styles.container}>
          <WizardProgressBar />
          <MultipleChoiceQuestion questionData={dummyData} submitted={submitted} attempts={attempts} />
          <Footer handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Questions;