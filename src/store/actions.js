import { createAction } from "@reduxjs/toolkit";

export const ActionType = {
  LOAD_DATA: "load data",
  SELECT_WORKERS: "select workers",
  SET_SELECTED_COMPANY: "set selected company",
  SELECT_ALL_COMAPNIES: "select all companies",
  REMOVE_COMPANY: "remove company",
  REMOVE_ALL_COMPANIES: "remove all companies",
  UPDATE_SELECTED_COMPANIES: "update selected companies",
  DELETE_COMPANY: "delete company",
  DELETE_WORKERS: "delete workers",
};

export const deleteWorkers = createAction(ActionType.DELETE_WORKERS, (data) => {
  return {
    payload: data,
  };
});

export const updateSelectedCompanies = createAction(
  ActionType.UPDATE_SELECTED_COMPANIES,
  (data) => {
    return {
      payload: data,
    };
  }
);

export const loadData = createAction(ActionType.LOAD_DATA, (data) => {
  return {
    payload: data,
  };
});

export const findWorkers = createAction(ActionType.SELECT_WORKERS, (data) => {
  return {
    payload: data,
  };
});

export const setSelectedCompany = createAction(
  ActionType.SET_SELECTED_COMPANY,
  (company) => {
    return {
      payload: company,
    };
  }
);

export const removeCompany = createAction(
  ActionType.REMOVE_COMPANY,
  (company) => {
    return {
      payload: company,
    };
  }
);

export const selectAllCompanies = createAction(
  ActionType.SELECT_ALL_COMAPNIES,
  (companies) => {
    return {
      payload: companies,
    };
  }
);

export const removeAllCompanies = createAction(ActionType.REMOVE_ALL_COMPANIES);

export const deleteCompany = createAction(
  ActionType.DELETE_COMPANY,
  (companies) => {
    return {
      payload: companies,
    };
  }
);
