import { ReduxConstants } from "../ReduxConstants"

const initialState = {
    data: [],
    //fetching: false,
    // failed: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case ReduxConstants.FETCH_REQUEST_BEGIN:
        //     return {
        //         ...state,
        //         fetching: true
        //     }
        case ReduxConstants.GET_DATA:
            console.log('state.data', state.data)
            const stateData = state.data
            console.log('console', stateData)
            return {
                ...state,
                data: [...state.data, ...action.payload],
            }
        // case ReduxConstants.FETCH_REQUEST_FAILED:
        //     return {
        //         ...state,
        //         failed: true
        //     }
        default:
            return state;
    }
}