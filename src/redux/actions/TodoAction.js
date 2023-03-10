import { ReduxConstants } from "../ReduxConstants"

export const addTodoAction = payload => (
    {
        type: ReduxConstants.ADD_TODO,
        payload,
    }
)
export const removeTodoAction = payload => ({ type: ReduxConstants.REMOVE_TODO, payload })

export const updateTodoAction = (payload) => ({ type: ReduxConstants.UPDATE_TODO, payload })