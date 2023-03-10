import { createStore, combineReducers } from 'redux'
import ApiCallReducer from '../reducers/ApiCallReducer';
import CountReducer from "../reducers/CountReducer";
import todosReducer from '../reducers/todosReducer';

const rootReducer = combineReducers({
    count: CountReducer,
    todos: todosReducer,
    data: ApiCallReducer,
});

export const store = createStore(rootReducer)