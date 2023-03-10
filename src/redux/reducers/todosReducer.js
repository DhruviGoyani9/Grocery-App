import { ReduxConstants } from "../ReduxConstants"

const initialState = {
    todos: [],
}
export default (state = initialState, action) => {


    switch (action.type) {
        case ReduxConstants.ADD_TODO:
            return { todos: [...state.todos, action.payload] }
        case ReduxConstants.REMOVE_TODO:
            return { todos: handleRemoveTodo(action.payload, state.todos) }
        case ReduxConstants.UPDATE_TODO:
            return {
                todos: handleEditTodo(action.payload, state.todos,)
            }
        default:
            return state;
    }
}

const handleRemoveTodo = (item, todos) => {
    const todoIndex = todos.indexOf(item);
    console.log('remove', todoIndex)
    todos.splice(todoIndex, 1)
    console.log({ item })
    return todos;
}

const handleEditTodo = (item, todos) => {
    console.log('update', { item })
    console.log('iddf', item.id)
    const id = item.id;
    console.log({ id })
    const task = item.task;
    console.log({ task })
    todos.splice(id, 1, task)
    return todos;
}