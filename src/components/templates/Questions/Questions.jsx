import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import MCQ from '../../widgets/MCQ/MCQ';
import Footer from '@components/templates/Footer/Footer';
import styles from './Questions.module.scss';
import MultipleChoiceQuestion from '../../questions/MultipleChoiceQuestion';
import { dummyData } from '../../../utils/const';

const Questions = () => {
  const [statementContent, setStatementContent] = useState('');
  const [seeWhyContent, setSeeWhyContent] = useState('');
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const {
    statement,
    stem_image,
    see_why,
    options: optionsData,
    feedback: feedbackData,
  } = dummyData;

  useEffect(() => {
    // Load statement content
    setStatementContent(statement.content[0].file_name[0]);

    // Load see why content
    setSeeWhyContent(see_why.content[0].file_name[0]);

    // Load options
    const loadedOptions = optionsData.map((opt) => ({
      ...opt,
      html: opt.content[0].file_name[0],
    }));
    setOptions(loadedOptions);

    // Load feedback
    const feedbacks = {
      correct: feedbackData.correct.content[0].file_name[0],
      incorrect: feedbackData.incorrect.content[0].file_name[0],
    };
    setFeedback(feedbacks);
  }, [statement, see_why, optionsData, feedbackData]);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (submitted) return;
    setAttempts(attempts + 1);
    setSubmitted(true);
  };

  const renderFeedback = () => {
    const correctOption = options.find((opt) => opt.is_correct);

    if (selectedOption === correctOption.option_id) {
      return (
        <div className="feedback-correct">Correct! {feedback.correct}</div>
      );
    } else {
      return (
        <div className="feedback-incorrect">Oops, almost there. Try again.</div>
      );
    }
  };
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className={styles.container}>
          <WizardProgressBar />
          <MultipleChoiceQuestion
            questionData={dummyData}
            submitted={submitted}
            attempts={attempts}
            statementContent={statementContent}
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
          <Footer
            handleSubmit={handleSubmit}
            submitted={submitted}
            renderFeedback={renderFeedback}
            seeWhyContent={seeWhyContent}
            selectedOption={selectedOption}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
