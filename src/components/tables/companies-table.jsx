import { useEffect, useState } from "react";
import CompanyItem from "../company-item/company-item";
import Loader from "../loader/loader";
import { selectAllCompanies, removeAllCompanies } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { deleteAndPutData } from "../../store/api-actions";
import { getDifference } from "../../utils/utils";

const CompanyTable = ({ data }) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // actions
  const dispatch = useDispatch();
  const onSelectedAllCompanies = (companies) =>
    dispatch(selectAllCompanies(companies));
  const onRemoveAllCompanies = () => dispatch(removeAllCompanies());
  const onRemoveAndPushData = (array, callback) =>
    dispatch(deleteAndPutData(array, callback));

  // redux-state
  const selectedCompanies = useSelector((state) => state.selectedCompanies);

  // Если количество выбранных компаний совпадает с количеством всего компаний, то включить чекбокс "Выбрать все"
  useEffect(() => {
    if (selectedCompanies.length === data.length) {
      setIsAllSelected(true);
    }
  }, [selectedCompanies]);

  // Выбрать все
  const onSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    if (!isAllSelected) {
      onSelectedAllCompanies(data);
    } else {
      onRemoveAllCompanies();
    }
  };

  // Удаление компаний
  const onDeleteCompanies = () => {
    setLoading(true);
    if (selectedCompanies.length === data.length) {
      onRemoveAndPushData([], setLoading);
    } else {
      const diff = getDifference(data, selectedCompanies);
      onRemoveAndPushData(diff, setLoading);
    }
  };

  return (
    <div className="left-column">
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-center select-all">
              <label htmlFor="select-all" className="visually-hidden">
                Выделить всё
              </label>
              <input
                className="checkbox-input"
                type="checkbox"
                id="select-all"
                name="select-all"
                checked={
                  isAllSelected && selectedCompanies.length === data.length
                }
                onChange={() => onSelectAll()}
              />
            </th>
            <th className="text-center">Название компании</th>
            <th className="text-center">Адрес</th>
            <th className="text-center">Количество сотрудников</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {data.length > 0 &&
            data.map((company, index) => (
              <CompanyItem
                company={company}
                key={index}
                isAll={isAllSelected}
                setAll={setIsAllSelected}
                isLoading={isLoading}
              />
            ))}
        </tbody>
      </table>
      {selectedCompanies.length > 0 && (
        <div className="delete-wrapper">
          <button
            className="btn-delete"
            type="button"
            disabled={isLoading}
            onClick={() => onDeleteCompanies()}
          >
            Удалить выбранные данные
          </button>
          {isLoading && <Loader />}
        </div>
      )}
    </div>
  );
};

export default CompanyTable;
