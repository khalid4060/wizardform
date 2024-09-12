import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import WizardProgressBar from '../../elements/WizardProgressBar/WizardProgressBar';
import MCQ from '../../widgets/MCQ/MCQ';
import Footer from '@components/templates/Footer/Footer';
import styles from './Questions.module.scss';
import MultipleChoiceQuestion from '../../questions/MultipleChoiceQuestion';
import { dummyData } from '../../../utils/const';
import { data } from '../../../utils/formData';
const parseHtmlContent = (htmlString) => {
  return { __html: htmlString };
};
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
const Questions = () => {
  /**--------------------New States------------------------------------------- */
  const [formData, setFormData] = useState(dummyData);
  const [currentSlide, setCurrentSide] = useState(() => ({
    id: null,
    index: null,
    type: null,
    wizard: null,
  }));
  const [btnActionType, setBtnActionType] = useState('submit');
  /**--------------------New States------------------------------------------- */
  const [statementContent, setStatementContent] = useState('');
  const [seeWhyContent, setSeeWhyContent] = useState('');
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [onAction, setOnAction] = useState(false);

  const [isAnswerCorrect, setisAnswerCorrect] = useState();
  const correctOption = options.find((opt) => opt.is_correct);

  const {
    statement,
    stem_image,
    see_why,
    options: optionsData,
    feedback: feedbackData,
  } = dummyData[0];

  useEffect(() => {
    // Load statement content
    // setStatementContent(statement.content[0].file_name[0]);

    // Load see why content
    // setSeeWhyContent(see_why.content[0].file_name[0]);

    // Load options
    const shuffledOptions = shuffleArray(
      optionsData.map((opt) => ({
        ...opt,
        html: opt.content[0].file_name[0],
      }))
    );
    setOptions(shuffledOptions);

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
      setBtnActionType('submit')

      setSelectedOption(null);
      setSubmitted(false);
      setAttempts(-1);
    }

    if (actionType === 'submit') {
      if (currentSlide.type === 'mcq') {
        if (attempts <= 3) {
          setAttempts(attempts + 1);
          setSubmitted(true);
        }
        setisAnswerCorrect(selectedOption === correctOption.option_id);
      }
    }
    if (actionType === 'tryagain') {
      if (currentSlide.type === 'mcq') {
        setSelectedOption(null);
        setSubmitted(false);
      }
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
        <div dangerouslySetInnerHTML={parseHtmlContent(feedback.correct)} />
      );
    } else {
      return (
        <div dangerouslySetInnerHTML={parseHtmlContent(feedback.incorrect)} />
      );
    }
  };

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const renderSlide = (slide) => {
    let component = null;
    switch (slide.type) {
      case 'mcq':
        return (component = (
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

  // useEffect(() => {
  //   const multiStepForm = document.querySelector("[data-multi-step]")
  //   const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
  //   let currentStep = formSteps.findIndex(step => {
  //     return step.classList.contains("active")
  //   })
  //   formSteps.forEach(step => {
  //     step.addEventListener("animationend", e => {
  //       formSteps[currentStep].classList.remove("hide")
  //       e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  //     })
  //   })
    
  //   function showCurrentStep() {
  //     formSteps.forEach((step, index) => {
  //       step.classList.toggle("active", index === currentStep)
  //     })
  //   }
  // }, [])

  console.log('currentSlide', currentSlide.wizard);

  return (
    <div>
      <Header onAction={onAction} setOnAction={setOnAction} />
      <div className={`${onAction ? "ActionStyle" : "mainContainer"}`}>
        <div className={styles.container}>
          <div>
            <WizardProgressBar formData={formData} currentSlide={currentSlide} />
            {/* <form data-multi-step class="multi-step-form"> */}
            {renderWizards()}
            {/* </form> */}
            {/* <MultipleChoiceQuestion
              questionData={dummyData}
              submitted={submitted}
              attempts={attempts}
              statementContent={statementContent}
              options={options}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              stem_image={stem_image}
            /> */}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
