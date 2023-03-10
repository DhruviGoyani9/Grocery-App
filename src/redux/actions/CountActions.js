import { ReduxConstants } from "../ReduxConstants"

export const increment = () => {
    return {
        type: ReduxConstants.COUNT_INCRESE,
    }
}

export const decrement = () => {
    return {
        type: ReduxConstants.COUNT_DECRESE
    }
}

export const incrementIfOdd = () => {
    return {
        type: ReduxConstants.COUNT_INCRESE
    }
}