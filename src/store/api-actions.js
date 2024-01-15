import { loadData, deleteCompany, deleteWorkers } from "./actions";

export const fetchData = () => (dispatch, _getState, api) => {
  api.get("/659e87fe1f5677401f1a2fae").then(({ data }) => {
    dispatch(loadData(data.record));
  });
};

export const putData = (companies, callback) => (dispatch, _getState, api) =>
  api
    .put(`/659e87fe1f5677401f1a2fae`, companies)
    .then(({ data }) => dispatch(loadData(data.record)))
    .then(() => {
      if (callback) {
        callback(false);
      }
    });

export const deleteAndPutData =
  (companies, callback) => (dispatch, _getState, api) =>
    api
      .put(`/659e87fe1f5677401f1a2fae`, companies)
      .then(({ data }) => {
        {
          dispatch(deleteCompany(data.record));
        }
      })
      .then(() => callback(false));

export const deleteAndPutWorkers =
  (companies, callback) => (dispatch, _getState, api) =>
    api
      .put(`/659e87fe1f5677401f1a2fae`, companies)
      .then(({ data }) => {
        {
          dispatch(deleteWorkers(data.record));
        }
      })
      .then(() => callback(false));
