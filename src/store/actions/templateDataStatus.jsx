export const UPDATE_TEMPLATE_DATA_STATUS = 'UPDATE_TEMPLATE_DATA_STATUS';

export function updateTemplateDataStatus(data) {

  return {
    type: UPDATE_TEMPLATE_DATA_STATUS,
    payload: {
      ...data
    },
  };
}
