import update from 'immutability-helper';

import { UPDATE_LESSON_DATA } from '@store/actions/lesson';

export default function user(state = {}, action) {
  switch (action.type) {
    case UPDATE_LESSON_DATA:
      return update(state, { $merge: action.payload.data });
    default:
      return state;
  }
}
