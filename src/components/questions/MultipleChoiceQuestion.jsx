import React, { useState, useEffect } from 'react';
import style from'./MultipleChoiceQuestion.module.scss'; // Add CSS styles here

// Utility function to parse HTML content
const parseHtmlContent = (htmlString) => {
  return { __html: htmlString };
};

const MultipleChoiceQuestion = ({
  submitted,
  statementContent,
  selectedOption,
  options,
  handleOptionChange,
}) => {
  return (
    <div className={style.mulitpleChoiceContainer}>
      {/* Question Statement */}
      <div className={style.contentBox} style={{ backgroundColor: '#A6E4E2' }}>
        <h2 dangerouslySetInnerHTML={parseHtmlContent(statementContent)} />
        {/* {stem_image && <img src={stem_image.file_name[0]} alt="Question" />} */}
      </div>
      {/* Question Statement */}

      <div className={style.contentLabelStmt} style={{ backgroundColor: '#A6E4E2' }}>
        {/* <p className={'instructionHeading'}></p> */}
      </div>

      <div className={style.optionsContainer} style={{ backgroundColor: '#A6E4E2' }}>
        {/* {options.map((opt) => (
          <label
            for={`option-${opt.option_id}`}
            className={`${style.cardBox} ${
              selectedOption === opt.option_id ? style.selected : ''
            } ${
              submitted && selectedOption === opt.option_id && !opt.is_correct
                ? style.incorrect
                : ''
            } ${
              submitted && selectedOption === opt.option_id && opt.is_correct
                ? style.correct
                : ''
            }`}
          >
            <div
              key={opt.option_id}
              className={`${style.option} ${
                selectedOption === opt.option_id ? style.selected : ''
              } ${
                submitted && selectedOption === opt.option_id && !opt.is_correct
                  ? style.incorrect
                  : ''
              } ${
                submitted && selectedOption === opt.option_id && opt.is_correct
                  ? style.correct
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
              className={style.optionLabel}
              htmlFor={`option-${opt.option_id}`}
              dangerouslySetInnerHTML={parseHtmlContent(opt.html)}
            />

            {submitted &&
              selectedOption === opt.option_id &&
              opt.is_correct && (
                <div>
                  <span className={style.correctSymbol}>&#10004;</span>
                </div>
              )}

            {submitted &&
              selectedOption === opt.option_id &&
              !opt.is_correct && (
                <span className={style.incorrectSymbol}>
                  &#10060;
                </span>
              )}
          </label>
        ))} */}
      </div>

      {/* <button onClick={handleSubmit} disabled={submitted}>
        Submit
      </button> */}

      {/* {submitted && renderFeedback()} */}

      {/* {submitted && (
        <div dangerouslySetInnerHTML={parseHtmlContent(seeWhyContent)} />
      )} */}
    </div>
  );
};

export default MultipleChoiceQuestion;