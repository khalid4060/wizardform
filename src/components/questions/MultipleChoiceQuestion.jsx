import React, { useState, useEffect } from 'react';
import './MultipleChoiceQuestion.css'; // Add CSS styles here

// Utility function to parse HTML content
const parseHtmlContent = (htmlString) => {
  return { __html: htmlString };
};

const MultipleChoiceQuestion = ({ questionData }) => {
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
  } = questionData;

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
    <div className={'mulitpleChoiceContainer'}>
      {/* Question Statement */}
      <div className={'contentBox'}>
        <h2 dangerouslySetInnerHTML={parseHtmlContent(statementContent)} />
        {/* {stem_image && <img src={stem_image.file_name[0]} alt="Question" />} */}
      </div>
      {/* Question Statement */}

      <p className={'instructionHeading'}>Select the Correct Answer:</p>

      <div className="optionsContainer">
        {options.map((opt) => (
          <label
            for={`option-${opt.option_id}`}
            className={`cardBox ${
              selectedOption === opt.option_id ? 'selected' : ''
            } ${
              submitted && selectedOption === opt.option_id && !opt.is_correct
                ? 'incorrect'
                : ''
            } ${
              submitted && selectedOption === opt.option_id && opt.is_correct
                ? 'correct'
                : ''
            }`}
          >
            <div
              key={opt.option_id}
              className={`option ${
                selectedOption === opt.option_id ? 'selected' : ''
              } ${
                submitted && selectedOption === opt.option_id && !opt.is_correct
                  ? 'incorrect'
                  : ''
              } ${
                submitted && selectedOption === opt.option_id && opt.is_correct
                  ? 'correct'
                  : ''
              }`}
              onClick={() => handleOptionChange(opt.option_id)}
            >
              <input
                type="radio"
                id={`option-${opt.option_id}`}
                name="options"
                value={opt.option_id}
                checked={selectedOption === opt.option_id}
                onChange={() => handleOptionChange(opt.option_id)}
                disabled={submitted}
              />
            </div>
            <div 
              className="optionLabel"
              htmlFor={`option-${opt.option_id}`}
              dangerouslySetInnerHTML={parseHtmlContent(opt.html)}
            />
          </label>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={submitted}>
        Submit
      </button>

      {submitted && renderFeedback()}

      {submitted && (
        <div dangerouslySetInnerHTML={parseHtmlContent(seeWhyContent)} />
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
