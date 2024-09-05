export const UPDATE_LESSON_DATA = 'UPDATE_LESSON_DATA';

export function updateLessonData(data) {
  return {
    type: UPDATE_LESSON_DATA,
    payload: {
      data,
    },
  };
}
