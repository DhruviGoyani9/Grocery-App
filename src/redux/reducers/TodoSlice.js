import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    todos: []
}
export const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        AddTodo: (state, action) => {
            // const todo = {
            //     id: Math.random() * 100,
            //     task: action.payload
            // }
            console.log('payload', action.payload)
            state.todos.push(action.payload)
            state.count += 1;
        },
        removeTodo: (state, action) => {
            handleRemoveTodo(action.payload, state.todos)
            state.count -= 1
        },
        updateTodo: (state, action) => {
            handleEditTodo(action.payload, state.todos,)
        }
        // toogleToDo: (state, action) => {
        //     const todo = state.todos.find(todo.count === action.payload)
        //     if (todo) {
        //         todo.completed = !todo.completed
        //     }
        // }

    }

})
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
    const task = item.task;
    todos.splice(id, 1, task)
    return todos;
}
export const { AddTodo, removeTodo, updateTodo } = TodosSlice.actions
export default TodosSlice.reducer