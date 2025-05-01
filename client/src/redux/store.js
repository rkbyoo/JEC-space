import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";
import { usersSlice } from "./usersSlice";
import filtersReducer from "./filtersSlice"

const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users : usersSlice.reducer,
    filters: filtersReducer,
  },
});

export default store;