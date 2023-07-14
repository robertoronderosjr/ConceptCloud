export const startIdeation = () => ({
    type: 'START_IDEATION',
});

export const receiveIdeas = (ideas) => ({
    type: 'RECEIVE_IDEAS',
    payload: ideas,
});
