import {loadTodos, loadTodosSuccess,loadTodosFailure, setTodos, putTodo } from "../reducer/todos";
import * as uiActions from '../reducer/ui';

const loadTodosFlow = ({getAllTodos} ) => ({ dispatch }) => next => async (action) => {
    next(action);
    if (action.type === loadTodos.type) {
        try {
            dispatch(uiActions.setLoading(true));
            const todos = await getAllTodos();
            dispatch(loadTodosSuccess(todos));
            dispatch(uiActions.setLoading(false));
        } catch (error) {
            dispatch(loadTodosFailure(error));
        }
    }
}

const putTodoFlow = () => ({ dispatch, getState }) => next => action => {
    
    if (action.type === putTodo.type) {
        const oldTodosClone = getState().todos.allTodos.map(todo => ({...todo}));

        const newTodo = action.payload;

        const index = oldTodosClone.findIndex(todo => todo.id === newTodo.id);

        oldTodosClone[index] = newTodo;

        dispatch(setTodos(oldTodosClone));
    }

    next(action);
}

const todoSFlow = [
  loadTodosFlow,
  putTodoFlow,
]

export default todoSFlow;