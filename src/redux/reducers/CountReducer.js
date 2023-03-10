import { ReduxConstants } from "../ReduxConstants";

const initialState = {
    count: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ReduxConstants.COUNT_INCRESE:
            return { ...state, count: state.count + 1 };
        case ReduxConstants.COUNT_DECRESE:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}
