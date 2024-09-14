import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import Footer from '@components/templates/Footer/Footer';
import styles from './style.module.scss';
import MultipleChoiceQuestion from '../../mcq/MultipleChoiceQuestion';
import { dummyData } from '../../../utils/const';
import { fetchJSONData } from '../../../utils/templateLoader';
import FillInTheBlanks from '../../fib/FillInTheBlanks';
import DropDownWidget from '../../widgets/DropDown/DropDownWidget';

const selectTemplateData = createSelector(
  (state) => state.templateData,
  (templateData) => templateData
);

const Questions = () => {
  const templateData = useSelector(selectTemplateData);
  const [formData, setFormData] = useState(dummyData);
  const [currentSlide, setCurrentSide] = useState(() => ({
    id: null,
    index: null,
    type: null,
    wizard: null,
  }));
  const [btnActionType, setBtnActionType] = useState('submit');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [onAction, setOnAction] = useState(false);
  const [fibData, setFibData] = useState([]);
  const [mcqData, setMcqData] = useState([]);
  const [dropDownData, setDropDownData] = useState([]);

  const [isAnswerCorrect, setisAnswerCorrect] = useState();

  const resetFibForm = () => {
    const updatedDataSets = [...fibData];
    const dataSet = updatedDataSets[0];

    dataSet.inputs = Array(dataSet.questions.length).fill('');
    dataSet.feedback = Array(dataSet.questions.length).fill(null);
    dataSet.isSubmitted = false;

    setFibData(updatedDataSets);
    setFeedbackMessage('');
  };

  const handleFIBSubmit = () => {
    const updatedDataSets = [...fibData];
    const currentDataSet = updatedDataSets[0];

    if (currentDataSet.isSubmitted && currentDataSet.feedback.includes(false)) {
      setSubmitted(false);
      resetFibForm();
    } else {
      const newFeedback = currentDataSet?.inputs?.map((input, index) => {
        const correctAnswer = currentDataSet.correctAnswers[index];
        const normalizedInput = input.trim().toLowerCase();
        if (Array.isArray(correctAnswer)) {
          return correctAnswer.some(
            (answer) => answer.trim().toLowerCase() === normalizedInput
          );
        }
        return correctAnswer.trim().toLowerCase() === normalizedInput;
      });

      currentDataSet.feedback = newFeedback;
      currentDataSet.isSubmitted = true;
      setSubmitted(true);

      let allCorrect = newFeedback.every((val) => val === true);
      let feedbackType = allCorrect ? 'correct' : 'incorrect';
      setisAnswerCorrect(feedbackType === 'correct');
      setFeedbackMessage(
        allCorrect
          ? currentDataSet.feedbackContent.correct
          : currentDataSet.feedbackContent.incorrect
      );
      setFibData(updatedDataSets);
    }
  };

  const handleSubmit = (actionType) => {
    if (actionType === 'next') {
      const nextIndex = currentSlide.index + 1;
      const tempFormData = [...formData];
      tempFormData[currentSlide.index] = {
        ...tempFormData[currentSlide.index],
        submitted: true,
        visited: true,
      };
      setFormData(tempFormData);
      setCurrentSide({
        id: formData[nextIndex].id,
        index: nextIndex,
        type: formData[nextIndex].type,
        wizard: formData[nextIndex],
      });
      setBtnActionType('submit');

      setMcqData({ ...mcqData, selectedOption: null });
      setSubmitted(false);
      setAttempts(-1);
    }

    if (actionType === 'submit') {
      if (currentSlide.type === 'mcq') {
        if (attempts <= 3) {
          setAttempts(attempts + 1);
          setSubmitted(true);
        }
        setisAnswerCorrect(mcqData.selectedOption === mcqData.correctOption);
        setFeedbackMessage(
          mcqData.selectedOption === mcqData.correctOption
            ? mcqData.feedbackContent.correct
            : mcqData.feedbackContent.incorrect
        );
      }

      if (currentSlide.type === 'fib') {
        handleFIBSubmit();
      }
    }
    if (actionType === 'tryagain') {
      if (currentSlide.type === 'mcq') {
        setMcqData([]);
        setSubmitted(false);
      }
      if (currentSlide.type === 'fib') {
        setSubmitted(false);
        resetFibForm();
      }
    }
    if (actionType === 'back') {
      const prevIndex = currentSlide.index - 1;
      const tempFormData = [...formData];
      tempFormData[currentSlide.index] = {
        ...tempFormData[currentSlide.index],
        visited: true,
      };
      setFormData(tempFormData);
      setCurrentSide({
        id: formData[prevIndex].id,
        index: prevIndex,
        type: formData[prevIndex].type,
        wizard: formData[prevIndex],
      });
      setBtnActionType('back');
    }
  };
  console.log(mcqData, 'mcqData');
  const renderFeedback = () => {
    return feedbackMessage;
  };

  const renderSlide = (slide) => {
    let component = null;
    switch (slide.type) {
      case 'mcq':
        return (component = (
          <MultipleChoiceQuestion
            submitted={submitted}
            setMcqData={setMcqData}
            templateData={templateData}
            mcqData={mcqData}
          />
        ));
      case 'fib':
        return (component = (
          <FillInTheBlanks
            setFibData={setFibData}
            templateData={templateData}
          />
        ));
      case 'dropdown':
        return (component = (
          <DropDownWidget
            setDropDownData={setDropDownData}
            templateData={templateData}
          />
        ));
    }
    return component;
  };

  const renderWizards = () => {
    return formData.map((slide, index) => {
      return (
        <div
          className={`card ${
            slide.id === currentSlide.id
              ? btnActionType === 'next'
                ? 'active-forward'
                : 'active-backward'
              : ''
          } data-step`}
        >
          {renderSlide(slide)}
        </div>
      );
    });
  };

  useEffect(() => {
    fetchJSONData();
    setCurrentSide({
      id: formData[0].id,
      index: 0,
      type: formData[0].type,
      wizard: formData[0],
    });
  }, []);

  useEffect(() => {
    const multiStepForm = document.querySelector('[data-multi-step]');
    const formSteps = [...multiStepForm?.querySelectorAll('[data-step]')];
    let currentStep = formSteps.findIndex((step) => {
      return step.classList.contains('active');
    });
    formSteps.forEach((step) => {
      step.addEventListener('animationend', (e) => {
        formSteps[currentStep].classList.remove('hide');
        e.target.classList.toggle(
          'hide',
          !e.target.classList.contains('active')
        );
      });
    });

    function showCurrentStep() {
      formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
      });
    }
  }, []);

  return (
    <div>
      <Header onAction={onAction} setOnAction={setOnAction} />
      <div className={`${onAction ? 'ActionStyle' : 'mainContainer'}`}>
        <div className={styles.container}>
          <div>
            <WizardProgressBar
              formData={formData}
              currentSlide={currentSlide}
            />
            <form
              data-multi-step
              class="multi-step-form"
              className={styles.wizardContainer}
            >
              {renderWizards()}
            </form>
          </div>
          <Footer
            handleSubmit={handleSubmit}
            submitted={submitted}
            renderFeedback={renderFeedback}
            selectedOption={
              currentSlide.type === 'fib' ? true : mcqData.selectedOption
            }
            isAnswerCorrect={isAnswerCorrect}
            attempts={attempts}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
