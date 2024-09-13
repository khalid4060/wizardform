import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Questions from './components/templates/Questions/Questions';
import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { store } from '@store';
import MultipleChoiceQuestion from './components/mcq/MultipleChoiceQuestion';
import { dummyData } from './utils/const';
import FillInTheBlanks from './components/fib/FillInTheBlanks';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <MultipleChoiceQuestion questionData={dummyData} /> */}
      <Questions />
      {/* <FillInTheBlanks /> */}
    </Provider>
  </React.StrictMode>
);
