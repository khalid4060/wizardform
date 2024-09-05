export const SAVE_TRANSLATION = 'SAVE_TRANSLATION';

export function saveTranslation(data) {
  return {
    type: SAVE_TRANSLATION,
    payload: {
      data,
    },
  };
}
