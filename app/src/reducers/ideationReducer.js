const initialState = {
    loading: false,
    ideas: [],
};

const ideationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_IDEATION':
            return {
                ...state,
                loading: true,
            };
        case 'RECEIVE_IDEAS':
            return {
                ...state,
                loading: false,
                ideas: action.payload,
            };
        default:
            return state;
    }
};

export default ideationReducer;
