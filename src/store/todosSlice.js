import {createSlice} from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all',
    sort: 'id',
  },
  reducers: {
    setTodos(state, action) {
      state.items = action.payload;
    },
    addTodo(state, action) {
      state.items.push(action.payload);
    },
    toggleComplete(state, action) {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  toggleComplete,
  deleteTodo,
  setFilter,
  setSort,
} = todosSlice.actions;
export default todosSlice.reducer;
