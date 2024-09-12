import React from 'react';

const WordBank = ({ wordBankWords }) => {
  return (
    <div className="word-bank">
      <h3 className="word-bank-title">Word Bank</h3>
      <ul>
        {wordBankWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordBank;
