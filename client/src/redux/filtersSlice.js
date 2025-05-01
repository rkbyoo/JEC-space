import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    status: "approved",
    category: [],
    age: [],
    search: '',
  },
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: (state) => {
      return {
        status: "approved",
        category: [],
        age: [],
        search: '',
      };
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
