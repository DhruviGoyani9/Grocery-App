import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/CounterSlice'
import TodoSlice from '../reducers/TodoSlice'
import ApiCallSlice from '../reducers/ApiCallSlicer'

export const toolkitStore = configureStore({
    reducer: {
        counter: counterReducer,
        todos: TodoSlice,
        data: ApiCallSlice,
    }
})