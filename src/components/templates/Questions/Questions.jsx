import React from 'react'
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import MCQ from '../../widgets/MCQ/MCQ';
import Footer from '@components/templates/Footer/Footer';
import styles from './Questions.module.scss';

const Questions = () => {
  return (
    <div>
      <Header />
      <div className='mainContainer'>
        <div className={styles.container}>
          <WizardProgressBar />
          <MCQ />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Questions;