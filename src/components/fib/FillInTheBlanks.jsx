import React, { useState, useEffect } from 'react';
import WordBank from './WordBank';
import '../../styles/scss/components/fib/FillInTheBlanks.scss';

const FillInTheBlanks = ({ setFibData, templateData }) => {
  const { fib } = templateData;
  const [dataSets, setDataSets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeDataSets = () => {
      try {
        if (!fib?.alphanumericalid) return;

        const { statement, sentence, feedback, items, wordbank_distractor } =
          fib?.alphanumericalid;

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
          inputs: Array(items.length).fill(''),
          feedback: Array(items.length).fill(null),
          feedbackContent,
        };
        setDataSets([initialData]);
        setFibData([initialData]);
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };
    initializeDataSets();
  }, [fib]);

  const handleInputChange = (questionIndex, value) => {
    const updatedDataSets = [...dataSets];
    updatedDataSets[0].inputs[questionIndex] = value;
    setDataSets(updatedDataSets);
    setFibData(updatedDataSets);
  };

  return (
    <div className="fill-in-the-blanks">
      {error && <p className="error">{error}</p>}
      {dataSets.length > 0 && (
        <div className="fib-content">
          <form className="fib-form">
            <h2>{dataSets[0].title}</h2>
            {dataSets[0].questions.map((question, questionIndex) => (
              <div className="question" key={questionIndex}>
                <label>
                  {question.split('_____')[0]}
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Type..."
                      value={dataSets[0].inputs[questionIndex] || ''}
                      onChange={(e) =>
                        handleInputChange(questionIndex, e.target.value)
                      }
                      className={
                        dataSets[0].feedback[questionIndex] === true
                          ? 'correct'
                          : dataSets[0].feedback[questionIndex] ===
                            false
                          ? 'incorrect'
                          : ''
                      }
                    />
                    {dataSets[0].feedback[questionIndex] === true && (
                      <span className="feedback-symbol correct-symbol">
                        &#10004;
                      </span>
                    )}
                    {dataSets[0].feedback[questionIndex] ===
                      false && (
                      <span className="feedback-symbol incorrect-symbol">
                        &#10060;
                      </span>
                    )}
                  </div>
                  {question.split('_____')[1]}
                </label>
              </div>
            ))}
          </form>
          <WordBank wordBankWords={dataSets[0]?.wordBankWords} />
        </div>
      )}
    </div>
  );
};

export default FillInTheBlanks;
