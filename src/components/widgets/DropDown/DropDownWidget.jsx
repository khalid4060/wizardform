import React, { useEffect, useState } from 'react';
import {
  mainContainer,
  contentContainer,
  firstContainer,
  secondContainer,
  imageBox,
  iconBox,
  selectList
} from './DropDownWidget.module.scss';
import SelectField from '../../elements/SelectField/SelectField';
import SearchIcon from '../../../assets/icons/search-icon.svg';

function DropDownWidget({ setDropDownData, templateData }) {
  const { dropdown } = templateData;
  console.log('DropDownWidget', templateData)
  const [dataSets, setDataSets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeDataSets = () => {
      try {
        console.log('outsidetry', templateData)
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
          questions,
          correctAnswers: items.map((item) => item.answer),
          // inputs: Array(items.length).fill(''),
          feedback: Array(items.length).fill(null),
          feedbackContent,
        };
        console.log('initialData', initialData)
        setDataSets([initialData]);
        setFibData([initialData]);
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };
    initializeDataSets();
  }, [dropdown]);

  // const handleInputChange = (questionIndex, value) => {
  //   const updatedDataSets = [...dataSets];
  //   updatedDataSets[0].inputs[questionIndex] = value;
  //   setDataSets(updatedDataSets);
  //   setFibData(updatedDataSets);
  // };

  return (
    <div className={mainContainer}>
      <h2>Complete each Solar Energy sentence with the correct term.</h2>
      <div className={contentContainer}>
        <div className={firstContainer}>
          <span>Select the correct option.</span>

          <ul className={selectList}>
            <li>
              The<SelectField />
              span process converts sunlight to DC, then to AC for various uses.
            </li>
            <li>
              The<SelectField />
              span process converts sunlight to DC, then to AC for various uses.
            </li>
          </ul>
        </div>
        <div className={secondContainer}>
          <div className={imageBox}>
            <span>Image here 4:3 440 x 330 px</span>
            <div className={iconBox}>
              <img width={'32px'} height={'32px'} src={SearchIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropDownWidget;
