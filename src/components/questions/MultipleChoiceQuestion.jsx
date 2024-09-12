import React, { useState, useEffect } from 'react';
import style from './MultipleChoiceQuestion.module.scss'; // Add CSS styles here
import CustomImage from '../elements/CustomImage/CustomImage';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJSONData } from '@utils/templateLoader';

// Utility function to parse HTML content
const parseHtmlContent = (htmlString) => {
  return { __html: htmlString };
};

const selectTemplateData = createSelector(
  (state) => state.templateData,
  (templateData) => templateData
);
fetchJSONData();
const MultipleChoiceQuestion = ({
  submitted,
  statementContent,
  selectedOption,
  options,
  handleOptionChange,
  stem_image,
}) => {
  const data = useSelector(selectTemplateData);

  const [statement, setStatement] = useState();
  const [ste_image_url, setStem_image_url] = useState();
  const [option, setOption] = useState();
  const [finalData, setfinalData] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length > 1) {
      console.log(data, 'data');
      const {
        mcq: {
          statement: {
            content: [
              {
                component_name,
                component_id,
                file_name: [stm_filename],
              },
            ],
          },
          stem_image: {
            component_name: stemImageComponentName,
            component_id: stemImageComponentId,
            file_name: stemImageFileName,
          },
          options,
        },
      } = data;

      const finalobj = {
        statement: data[stm_filename][component_id].data,
        stem_image: data[stm_filename][stemImageComponentId]?.url,
      };
      setStatement(data[stm_filename][component_id].data);
      setStem_image_url(data[stm_filename][stemImageComponentId]?.url);
      setfinalData(finalobj);
      setOption(options);
    }
  }, [data]);

  console.log(finalData, 'template data');
  return (
    <div className={style.mulitpleChoiceContainer}>
      {/* Question Statement */}
      <div className={style.contentBox}>
        <h2>{statement}</h2>
      </div>
      {/* {ste_image_url && (
        <CustomImage
          src={ste_image_url} // Change this to a real image URL
          alt="Example Image"
          fallbackSrc="https://via.placeholder.com/150" // Fallback image URL
          loader={<p>Loading image...</p>} // Custom loader text
          errorMessage={<p>Oops! Could not load the image.</p>} // Custom error message
          className={style.imageDiv}
          primeryClass={style.image}
        />
      )} */}

      {/* Question Statement */}

      <div className={style.contentLabelStmt}>
        <p className={'instructionHeading'}></p>
      </div>

      <div className={style.optionsContainer}>
        {options.map((opt) => (
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
                <div className={style.symbol}>
                  <span className={style.correctSymbol}>&#10004;</span>
                </div>
              )}

            {submitted &&
              selectedOption === opt.option_id &&
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
