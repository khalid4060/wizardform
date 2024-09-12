import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import MCQ from '../../widgets/MCQ/MCQ';
import Footer from '@components/templates/Footer/Footer';
import styles from './Questions.module.scss';
import MultipleChoiceQuestion from '../../questions/MultipleChoiceQuestion';
import { dummyData } from '../../../utils/const';
const parseHtmlContent = (htmlString) => {
  return { __html: htmlString };
};
const Questions = () => {
  const [statementContent, setStatementContent] = useState('');
  const [seeWhyContent, setSeeWhyContent] = useState('');
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isAnswerCorrect, setisAnswerCorrect] = useState();
  const correctOption = options.find((opt) => opt.is_correct);
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
    if (attempts <= 3) {
      setAttempts(attempts + 1);
      setSubmitted(true);
    }
    setisAnswerCorrect(selectedOption === correctOption.option_id);
  };

  const renderFeedback = () => {
    const correctOption = options.find((opt) => opt.is_correct);
    if (selectedOption === correctOption.option_id) {
      return (
        <div dangerouslySetInnerHTML={parseHtmlContent(feedback.correct)} />
      );
    } else {
      return (
        <div dangerouslySetInnerHTML={parseHtmlContent(feedback.incorrect)} />
      );
    }
  };
  const handleTryAgain = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className={styles.container}>
          <div>
            <WizardProgressBar />
            <MultipleChoiceQuestion
              questionData={dummyData}
              submitted={submitted}
              attempts={attempts}
              statementContent={statementContent}
              options={options}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              stem_image={stem_image}
            />
          </div>
          <Footer
            handleSubmit={handleSubmit}
            submitted={submitted}
            feedback={feedback}
            renderFeedback={renderFeedback}
            seeWhyContent={seeWhyContent}
            selectedOption={selectedOption}
            isAnswerCorrect={isAnswerCorrect}
            attempts={attempts}
            handleTryAgain={handleTryAgain}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
