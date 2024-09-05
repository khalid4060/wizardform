import { SAVE_TRANSLATION } from '@store/actions/translation';

const initialState = {
  data: [],
};

const saveTranslation = (state, action) => {
  let { data } = action.payload;
  return {
    ...state,
    data,
  };
};

export default function tools(state = initialState, action) {
  switch (action.type) {
    case SAVE_TRANSLATION:
      return saveTranslation(state, action);
    default:
      return state;
  }
}
