import { createReducer } from "@reduxjs/toolkit";
import {
  loadData,
  findWorkers,
  setSelectedCompany,
  removeCompany,
  selectAllCompanies,
  removeAllCompanies,
  updateSelectedCompanies,
  deleteWorkers,
  deleteCompany,
} from "./actions";

const initialState = {
  companies: [],
  workers: [],
  selectedCompanies: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(deleteCompany, (state, action) => {
    state.companies = action.payload;
    state.companies = state.companies.sort((a, b) => a.id - b.id);
    state.selectedCompanies = [];
  });
  builder.addCase(deleteWorkers, (state, action) => {
    state.companies = action.payload;
  });
  builder.addCase(loadData, (state, action) => {
    state.companies = action.payload;
    state.companies = state.companies.sort((a, b) => a.id - b.id);
  });
  builder.addCase(findWorkers, (state, action) => {
    state.workers = action.payload;
  });
  builder.addCase(updateSelectedCompanies, (state, action) => {
    state.selectedCompanies = action.payload;
  });
  builder.addCase(setSelectedCompany, (state, action) => {
    state.selectedCompanies = [action.payload, ...state.selectedCompanies];
    if (state.selectedCompanies.length) {
      state.selectedCompanies = state.selectedCompanies.sort(
        (a, b) => a.id - b.id
      );
    }
  });
  builder.addCase(selectAllCompanies, (state, action) => {
    state.selectedCompanies = [...action.payload];
  });
  builder.addCase(removeCompany, (state, action) => {
    state.selectedCompanies = state.selectedCompanies.filter(
      (item) => item.id !== action.payload.id
    );
    if (!state.selectedCompanies.length) {
      state.selectedCompanies = [];
    }
  });
  builder.addCase(removeAllCompanies, (state) => {
    state.selectedCompanies = [];
  });
});
