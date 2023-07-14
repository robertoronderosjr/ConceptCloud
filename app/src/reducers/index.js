import { combineReducers } from 'redux';
import ideationReducer from './ideationReducer';

const rootReducer = combineReducers({
  ideation: ideationReducer,
});

export default rootReducer;
