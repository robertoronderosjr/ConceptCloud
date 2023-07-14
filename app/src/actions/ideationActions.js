import { START_IDEATION, RECEIVE_IDEAS, IDEATION_ERROR } from './actionTypes';

export const startIdeation = () => ({
  type: START_IDEATION,
});

export const receiveIdeas = (ideas) => ({
  type: RECEIVE_IDEAS,
  payload: ideas,
});

export const ideationError = (error) => ({
    type: IDEATION_ERROR,
    payload: error,
  });
