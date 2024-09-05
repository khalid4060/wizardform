import update from 'immutability-helper';

import { UPDATE_TEMPLATE_DATA } from '@store/actions/templateData';

export default function user(state = {}, action) {
  switch (action.type) {
    case UPDATE_TEMPLATE_DATA:
      const newState = { ...state };
      const template = newState[action.payload.data.template];
      if (!template) {
        newState[action.payload.data.template] = {};
      }
      return update(newState, { $merge: action.payload.data.data });
    default:
      return state;
  }
}
