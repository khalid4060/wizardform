import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import MCQ from '../../widgets/MCQ/MCQ';
import Footer from '@components/templates/Footer/Footer';
import styles from './Questions.module.scss';
import MultipleChoiceQuestion from '../../questions/MultipleChoiceQuestion';
import { dummyData } from '../../../utils/const';
import { data } from '../../../utils/formData';

const Questions = () => {
  /**--------------------New States------------------------------------------- */
  const [formData, setFormData] = useState(data);
  const [currentSlide, setCurrentSide] = useState(() => ({
    id: null,
    index: null,
    type: null,
    wizard: null,
  }));
  const [btnActionType, setBtnActionType] = useState('next');
  /**--------------------New States------------------------------------------- */
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

  const handleSubmit = (actionType) => {
    // if (submitted) return;
    // setAttempts(attempts + 1);
    // setSubmitted(true);
    /** The below code doesn't contain any validations, it simply navigate user to next slide */
    if (actionType === 'next') {
      const nextIndex = currentSlide.index + 1;
      const tempFormData = [...formData];
      tempFormData[currentSlide.index] = { ...tempFormData[currentSlide.index], submitted: true, visited: true }
      setFormData(tempFormData);
      setCurrentSide({
        id: formData[nextIndex].id,
        index: nextIndex,
        type: formData[nextIndex].type,
        wizard: formData[nextIndex],
      });
      setBtnActionType('next')
    }

    if (actionType === 'back') {
      const prevIndex = currentSlide.index - 1;
      const tempFormData = [...formData];
      tempFormData[currentSlide.index] = { ...tempFormData[currentSlide.index], visited: true }
      setFormData(tempFormData);
      setCurrentSide({
        id: formData[prevIndex].id,
        index: prevIndex,
        type: formData[prevIndex].type,
        wizard: formData[prevIndex],
      });
      setBtnActionType('back')
    }
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

  const handleOptionChange = (optionId) => {
    // setSelectedOption(optionId);
  };

  const renderSlide = (slide) => {
    let component = null;
    switch (slide.type) {
      case 'mcq':
        return (component = (
          <MultipleChoiceQuestion
            // questionData={dummyData}
            // submitted={submitted}
            // attempts={attempts}
            statementContent={slide.statement}
            options={slide.options}
            selectedOption={slide.answer}
            isCorrect={slide.isCorrect}
            handleOptionChange={handleOptionChange}
          />
        ));
    }

    return component;
  }

  const renderWizards = () => {
    return formData.map((slide, index) => {
      return (
        <div className={`card ${slide.id === currentSlide.id? btnActionType === 'next'? 'active-forward' : 'active-backward' : ''} data-step`}>
          {renderSlide(slide)}
        </div>
      );
    })
  };

  useEffect(() => {
    setCurrentSide({
      id: formData[0].id,
      index: 0,
      type: formData[0].type,
      wizard: formData[0],
    });
  }, []);

  useEffect(() => {
    const multiStepForm = document.querySelector("[data-multi-step]")
    const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
    let currentStep = formSteps.findIndex(step => {
      return step.classList.contains("active")
    })
    formSteps.forEach(step => {
      step.addEventListener("animationend", e => {
        formSteps[currentStep].classList.remove("hide")
        e.target.classList.toggle("hide", !e.target.classList.contains("active"))
      })
    })
    
    function showCurrentStep() {
      formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
      })
    }
  }, [])

  console.log('currentSlide', currentSlide.wizard);

  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className={styles.container}>
          <div>
            <WizardProgressBar formData={formData} currentSlide={currentSlide} />
            <form data-multi-step class="multi-step-form">
            {renderWizards()}
            </form>
            {/* <MultipleChoiceQuestion
              questionData={dummyData}
              submitted={submitted}
              attempts={attempts}
              statementContent={statementContent}
              options={options}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
            /> */}
          </div>
          <Footer
            handleSubmit={handleSubmit}
            submitted={submitted}
            feedback={feedback}
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
