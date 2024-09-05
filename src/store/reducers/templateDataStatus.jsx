import update from 'immutability-helper';

import { UPDATE_TEMPLATE_DATA_STATUS } from '@store/actions/templateDataStatus';

export default function user(state = {}, action) {
  const { type, payload } = action;
  // console.log(action, "actionsss")
  // const { template, status } = action.payload;
  switch (action.type) {
    case UPDATE_TEMPLATE_DATA_STATUS:
      const newState = { ...state };
      if (!newState[action.payload.template]) {
        newState[action.payload.template] = {
          status
        };
      }
      return update(newState, { [action.payload.template]: { status: { $set: action.payload.status }} });
    default:
      return state;
  }
}
