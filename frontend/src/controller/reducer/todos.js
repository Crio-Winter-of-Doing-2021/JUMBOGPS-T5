import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
    error: null
},
  reducers: {
    loadTodos: ()=>{},
    loadTodosSuccess: (state, action) => ({ allTodos: action.payload, error: null }),
    loadTodosFailure: ()=>{},
    setTodos: (state, action) => ({ allTodos: action.payload, error: null }),
    putTodo: state => state,
  },
});

export const { loadTodos, loadTodosSuccess,loadTodosFailure, setTodos, putTodo } = counterSlice.actions;

export default counterSlice.reducer;

export const getTodos = state => state.todos.allTodos;
