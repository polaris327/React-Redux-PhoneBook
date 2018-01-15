import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  SET_FILTER,
  ADD_PERSONAL_INFO,
  CHANGE_PHONE_NUMBER,
} from './actions';

function personalInfos(state = { filterOption: [], datas: [] }, action) {
  switch(action.type) {
    case ADD_PERSONAL_INFO:
      return {
        filterOption: state.filterOption,
        datas: [
          ...state.datas,
          {
            id: new Date().getTime(),
            ...action.formValues,
            completed: false
          }
        ]
      }
    case CHANGE_PHONE_NUMBER:
      return {
        datas: state.datas.map((data) => data.id === action.editData.id ?
          {
            ...data,
            phoneNumber: action.editData.phoneNumber
          } : data
        )
      }
    case SET_FILTER:
      return {
        ...state,
        filterOption: action.options
      }
    default:
      return state;
  }
}

function logInfos(state = [], action) {
  switch(action.type) {
    case ADD_PERSONAL_INFO:
      return [
        ...state,
        `${new Date()} : Added new phone record ${JSON.stringify(action.formValues)}`
      ];
    case CHANGE_PHONE_NUMBER:
      return [
        ...state,
        `${new Date()} : Changed phone number ${JSON.stringify(action.editData)}`
      ];
    default:
      return state;
  }
}

const phoneBookApp = combineReducers({
  personalInfos: personalInfos,
  logInfos: logInfos,
  form: formReducer
});

export default phoneBookApp;