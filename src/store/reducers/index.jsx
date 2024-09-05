import { combineReducers } from 'redux';

import lesson from './lesson';
import templateData from './templateData';
import templateDataStatus from './templateDataStatus';
import translation from './translation';

const createRootReducer = routerReducer => combineReducers({
  router: routerReducer,
  lesson,
  templateData,
  templateDataStatus,
  translation,
});

export default createRootReducer;
