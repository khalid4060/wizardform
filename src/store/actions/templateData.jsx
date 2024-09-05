export const UPDATE_TEMPLATE_DATA = 'UPDATE_TEMPLATE_DATA';

export function updateTemplateData(data) {
  return {
    type: UPDATE_TEMPLATE_DATA,
    payload: {
      data,
    },
  };
}
