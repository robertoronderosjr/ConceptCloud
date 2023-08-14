import { START_IDEATION, RECEIVE_IDEAS, IDEATION_ERROR } from '../actions/actionTypes';

const initialState = {
  loading: false,
  ideas: [],
};

const ideationReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_IDEATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RECEIVE_IDEAS:
      return {
        ...state,
        loading: false,
        ideas: action.payload,
      };
    case IDEATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ideationReducer;
