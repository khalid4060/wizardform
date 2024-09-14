import React, { useState, useEffect } from 'react';
import style from './style.module.scss'; // Add CSS styles here
import CustomImage from '../elements/CustomImage/CustomImage';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJSONData } from '@utils/templateLoader';

// Utility function to parse HTML content
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

const MultipleChoiceQuestion = ({
  submitted,
  setMcqData,
  templateData,
  mcqData,
}) => {
  const [finalData, setfinalData] = useState([]);
  const { mcq } = templateData;
  useEffect(() => {
    console.log(mcqData, finalData, 'alldata');
    const initializeDataSets = () => {
      try {
        if (!mcq) return;
        const { statement, stem_image, see_why, feedback, options } = mcq;
        const extractData = (fileKey, componentId) =>
          templateData[fileKey]?.[componentId]?.data || '';
        const questions = extractData(
          statement.content[0].file_name[0],
          statement.content[0].component_id
        );
        const finalobj = {
          statement: questions,
          stem_image: '',
          option_data: shuffleArray(
            options.map((option) => {
              return {
                option_id: option.option_id,
                is_correct: option.is_correct,
                content: extractData(
                  option.content[0].file_name[0],
                  option.content[0].component_id
                ),
              };
            })
          ),
          selectedOption: '',
          feedbackContent: {
            correct: extractData(
              feedback.correct.content[0].file_name[0],
              feedback.correct.content[0].component_id
            ),
            incorrect: extractData(
              feedback.incorrect.content[0].file_name[0],
              feedback.incorrect.content[0].component_id
            ),
            partial: extractData(
              feedback.partial?.content[0]?.file_name[0],
              feedback.partial?.content[0]?.component_id
            ),
          },
          correctOption: options.find((option) => option.is_correct === true)
            .option_id,
        };
        setfinalData(finalobj); //internal
        setMcqData(finalobj); //external
      } catch (error) {
        console.error(err.message);
      }
    };
    initializeDataSets();
  }, [mcq]);

  const handleOptionChange = (id) => {
    setfinalData({ ...finalData, selectedOption: id });
    setMcqData({ ...finalData, selectedOption: id });
  };

  return (
    <div className={style.mulitpleChoiceContainer}>
      {/* Question Statement */}
      <div className={style.contentBox}>
        <h2>{finalData.statement}</h2>
        {/* {ste_image_url && (
          <CustomImage
            src={finalData.stem_image} // Change this to a real image URL
            alt="Example Image"
            fallbackSrc="https://via.placeholder.com/150" // Fallback image URL
            loader={<p>Loading image...</p>} // Custom loader text
            errorMessage={<p>Oops! Could not load the image.</p>} // Custom error message
            className={style.imageDiv}
            primeryClass={style.image}
          />
        )} */}
      </div>

      {/* Question Statement */}

      {/* <div className={style.contentLabelStmt}>
        <p className={'instructionHeading'}></p>
      </div> */}
      <h3 className={style.subHeading}>Select the Correct Answer:</h3>

      <div className={style.optionsContainer}>
        {finalData?.option_data?.map((opt) => (
          <label
            for={`option-${opt.option_id}`}
            className={`${style.cardBox} ${
              finalData.selectedOption === opt.option_id ? style.selected : ''
            } ${
              submitted &&
              finalData.selectedOption === opt.option_id &&
              !opt.is_correct
                ? style.incorrect
                : ''
            } ${
              submitted &&
              finalData.selectedOption === opt.option_id &&
              opt.is_correct
                ? style.correct
                : ''
            }`}
          >
            <div
              key={opt.option_id}
              className={`${style.option} ${
                finalData.selectedOption === opt.option_id ? style.selected : ''
              } ${
                submitted &&
                finalData.selectedOption === opt.option_id &&
                !opt.is_correct
                  ? style.incorrect
                  : ''
              } ${
                submitted &&
                finalData.selectedOption === opt.option_id &&
                opt.is_correct
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
                checked={finalData.selectedOption === opt.option_id}
                onChange={() => handleOptionChange(opt.option_id)}
                disabled={submitted}
              />
            </div>
            <div
              className={style.optionLabel}
              htmlFor={`option-${opt.option_id}`}
              onClick={() => handleOptionChange(opt.option_id)}
            >
              {opt.content}
            </div>

            {submitted &&
              finalData.selectedOption === opt.option_id &&
              opt.is_correct && (
                <div className={style.symbol}>
                  <span className={style.correctSymbol}>&#10004;</span>
                </div>
              )}

            {submitted &&
              finalData.selectedOption === opt.option_id &&
              !opt.is_correct && (
                <div className={style.symbol}>
                  <span className={style.incorrectSymbol}>&#10060;</span>
                </div>
              )}
          </label>
        ))}
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
