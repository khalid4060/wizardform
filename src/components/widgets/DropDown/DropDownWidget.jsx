import React, { useEffect, useState } from 'react';
import style from './DropDownWidget.module.scss';
import SelectField from '../../elements/SelectField/SelectField';
import SearchIcon from '../../../assets/icons/search-icon.svg';

function DropDownWidget({ dropDownData, setDropDownData, templateData }) {
  const { dropdown } = templateData;
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeDataSets = () => {
      try {
        if (!dropdown?.alphanumericalid) return;

        const { statement, sentence, feedback, items, wordbank_distractor } =
          dropdown?.alphanumericalid;

        const extractData = (fileKey, componentId) =>
          templateData[fileKey]?.[componentId]?.data || '';

        const questions = extractData(
          sentence.filename[0],
          sentence.component_id
        )
          ?.split('<br>')
          .map((q) => q.trim());

        const questionsState = questions.map((question, index) => {
          return {
            question,
            selectField: {
              ...items[index],
              options: items[index].options.map((optionObj) => ({
                ...optionObj,
                content: extractData(
                  optionObj.content.filename[0],
                  optionObj.content.component_id
                ),
              })),
            },
          };
        });

        const feedbackContent = {
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
        };

        const initialData = {
          title: extractData(statement.filename[0], statement.component_id),
          wordBankWords: wordbank_distractor,
          questions: questionsState,
          // correctAnswers: items.map((item) => item.answer_id),
          inputs: Array(items.length).fill(''),
          feedback: Array(items.length).fill(null),
          feedbackContent,
        };
        setDropDownData([initialData]);
        setDropDownData([initialData]);
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };
    initializeDataSets();
  }, [dropdown]);

  const handleInputChange = (questionIndex, value) => {
    const updatedDataSets = [...dropDownData];
    updatedDataSets[0].inputs[questionIndex] = value;
    setDropDownData(updatedDataSets);
    setDropDownData(updatedDataSets);
  };

  return (
    <div className="fill-in-the-blanks">
      {error && <p className="error">{error}</p>}
      {dropDownData.length > 0 && (
        <div className="fib-content">
          <div className={style.contentContainer}>
            <form className={`fib-form`}>
              <h2>{dropDownData[0].title}</h2>
              <h3>Type the correct option.</h3>
              {dropDownData[0].questions.map(
                ({ question, selectField, inputs }, questionIndex) => (
                  <div className="question" key={questionIndex}>
                    <label>
                      {question.split('_____')[0]}
                      <div className="input-container">
                        <SelectField
                          field={{
                            value: dropDownData[0].inputs[questionIndex],
                            onChange: (value) =>
                              handleInputChange(questionIndex, value),
                          }}
                          options={selectField.options.map((option) => ({
                            ...option,
                            value: option.id,
                            label: option.content,
                          }))}
                          isError={
                            dropDownData[0].feedback[questionIndex] === true
                              ? false
                              : dropDownData[0].feedback[questionIndex] === false
                              ? true
                              : null
                          }
                          questionIndex={questionIndex}
                        />
                      </div>
                      {question.split('_____')[1]}
                    </label>
                  </div>
                )
              )}
            </form>
            <div className={style.secondContainer}>
              <div className={style.imageBox}>
                <span>Image here 4:3 440 x 330 px</span>
                <div className={style.iconBox}>
                  <img src={SearchIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDownWidget;
