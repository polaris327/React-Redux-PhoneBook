export const SET_FILTER = 'SET_FILTER';
export const ADD_PERSONAL_INFO = 'ADD_PERSONAL_INFO';
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';

export function addPersonalInfo(formValues) {
  return { type: ADD_PERSONAL_INFO, formValues };
}

export function changePhoneNumber(editData) {
  return { type: CHANGE_PHONE_NUMBER, editData };
}

export function setFilter(options) {
  return { type: SET_FILTER, options }
}
